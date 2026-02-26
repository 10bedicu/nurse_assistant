import { useEffect, useRef } from "react";
import { useContainerRef } from "./hooks/useContainerRef";
import Chatbox from "./components/Chatbox";
import { NurseAssistantProviderProps } from "./types/nurseAssistant";

export default function App(props: NurseAssistantProviderProps) {
  const container = useRef<HTMLDivElement>(null);
  const containerRef = useContainerRef();

  useEffect(() => {
    if (container.current) {
      containerRef.current = container.current;
    }
  }, [container, containerRef]);

  return (
    <div ref={container}>
      {props.children}
      <Chatbox {...props} />
    </div>
  );
}
