import { createContext, useContext, useState } from "react";

interface ShowNurseAssistantContextType {
  showNurseAssistant: boolean;
  setShowNurseAssistant: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowNurseAssistantContext =
  createContext<ShowNurseAssistantContextType | null>(null);

export function ShowNurseAssistantProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showNurseAssistant, setShowNurseAssistant] = useState(false);

  return (
    <ShowNurseAssistantContext.Provider
      value={{ showNurseAssistant, setShowNurseAssistant }}
    >
      {children}
    </ShowNurseAssistantContext.Provider>
  );
}

export function useShowNurseAssistant() {
  const context = useContext(ShowNurseAssistantContext);
  if (!context) {
    throw new Error(
      "useShowNurseAssistant must be used within a ShowNurseAssistantProvider",
    );
  }
  return context;
}
