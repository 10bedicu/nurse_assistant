import { useShowNurseAssistant } from "@/context/showNurseAssistant";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

export default function NurseAssistantToggle(props: { className?: string }) {
  const { showNurseAssistant, setShowNurseAssistant } = useShowNurseAssistant();

  return (
    <div className="nurse-assistant-container">
      <Button
        onClick={() => setShowNurseAssistant(!showNurseAssistant)}
        className={props.className}
        variant={"default"}
      >
        <Sparkles size={20} />
        Nurse Assistant
      </Button>
    </div>
  );
}
