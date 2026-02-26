import { useEffect, useRef } from "react";
import { useContainerRef } from "./hooks/useContainerRef";
import Chatbox from "./components/Chatbox";
import { NurseAssistantProps } from "./types/nurseAssistant";

export default function App(props: NurseAssistantProps) {
  const container = useRef<HTMLDivElement>(null);
  const containerRef = useContainerRef();

  useEffect(() => {
    if (container.current) {
      containerRef.current = container.current;
    }
  }, [container, containerRef]);

  return (
    <div ref={container}>
      <Chatbox {...props} />
    </div>
  );
}
