"use client";

import type { FC } from "react";

import { Fit, Layout, Rive } from "@rive-app/webgl2";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/utils/utils";

export type PersonaState =
  | "idle"
  | "listening"
  | "thinking"
  | "speaking"
  | "asleep";

interface PersonaProps {
  state: PersonaState;
  onLoad?: (rive: Rive) => void;
  onLoadError?: (error: unknown) => void;
  onReady?: () => void;
  onPause?: () => void;
  onPlay?: () => void;
  onStop?: () => void;
  className?: string;
  variant?: keyof typeof sources;
}

// The state machine name is always 'default' for Elements AI visuals
const stateMachine = "default";

const sources = {
  command: {
    dynamicColor: true,
    hasModel: true,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/command-2.0.riv",
  },
  glint: {
    dynamicColor: true,
    hasModel: true,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/glint-2.0.riv",
  },
  halo: {
    dynamicColor: true,
    hasModel: true,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/halo-2.0.riv",
  },
  mana: {
    dynamicColor: false,
    hasModel: true,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/mana-2.0.riv",
  },
  obsidian: {
    dynamicColor: true,
    hasModel: true,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/obsidian-2.0.riv",
  },
  opal: {
    dynamicColor: false,
    hasModel: false,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/orb-1.2.riv",
  },
};

export const Persona: FC<PersonaProps> = memo(
  ({
    variant = "obsidian",
    state = "idle",
    onLoad,
    onLoadError,
    onReady,
    onPause,
    onPlay,
    onStop,
    className,
  }) => {
    const source = sources[variant];
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const riveRef = useRef<Rive | null>(null);
    const [riveInstance, setRiveInstance] = useState<Rive | null>(null);

    if (!source) {
      throw new Error(`Invalid variant: ${variant}`);
    }

    // Stabilize callbacks to prevent useRive from reinitializing
    const callbacksRef = useRef({
      onLoad,
      onLoadError,
      onPause,
      onPlay,
      onReady,
      onStop,
    });

    useEffect(() => {
      callbacksRef.current = {
        onLoad,
        onLoadError,
        onPause,
        onPlay,
        onReady,
        onStop,
      };
    }, [onLoad, onLoadError, onPause, onPlay, onReady, onStop]);

    const stableCallbacks = useMemo(
      () => ({
        onLoad: (loadedRive: Rive) => callbacksRef.current.onLoad?.(loadedRive),
        onLoadError: (err: unknown) => callbacksRef.current.onLoadError?.(err),
        onPause: () => callbacksRef.current.onPause?.(),
        onPlay: () => callbacksRef.current.onPlay?.(),
        onReady: () => callbacksRef.current.onReady?.(),
        onStop: () => callbacksRef.current.onStop?.(),
      }),
      [],
    );

    useEffect(() => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const syncCanvasSize = () => {
        const { height, width } = canvas.getBoundingClientRect();

        if (width === 0 || height === 0) {
          return;
        }

        const dpr = window.devicePixelRatio || 1;
        const nextWidth = Math.round(width * dpr);
        const nextHeight = Math.round(height * dpr);

        if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
          canvas.width = nextWidth;
          canvas.height = nextHeight;
          riveRef.current?.resizeDrawingSurfaceToCanvas();
        }
      };

      syncCanvasSize();

      const rive = new Rive({
        autoplay: true,
        canvas,
        layout: new Layout({ fit: Fit.Contain }),
        onLoad: () => {
          stableCallbacks.onLoad(rive);
          stableCallbacks.onReady();
        },
        onLoadError: stableCallbacks.onLoadError,
        onPause: stableCallbacks.onPause,
        onPlay: stableCallbacks.onPlay,
        onStop: stableCallbacks.onStop,
        src: source.source,
        stateMachines: stateMachine,
      });

      syncCanvasSize();

      const resizeObserver = new ResizeObserver(() => {
        syncCanvasSize();
      });

      resizeObserver.observe(canvas);

      riveRef.current = rive;
      setRiveInstance(rive);

      return () => {
        resizeObserver.disconnect();
        rive.cleanup();
        riveRef.current = null;
        setRiveInstance(null);
      };
    }, [source.source, stableCallbacks]);

    useEffect(() => {
      if (!riveInstance) {
        return;
      }

      const inputs = riveInstance.stateMachineInputs(stateMachine) ?? [];

      for (const input of inputs) {
        if (input.name === "listening") {
          input.value = state === "listening";
        } else if (input.name === "thinking") {
          input.value = state === "thinking";
        } else if (input.name === "speaking") {
          input.value = state === "speaking";
        } else if (input.name === "asleep") {
          input.value = state === "asleep";
        }
      }
    }, [state, riveInstance]);

    return (
      <canvas ref={canvasRef} className={cn("size-16 shrink-0", className)} />
    );
  },
);

Persona.displayName = "Persona";
