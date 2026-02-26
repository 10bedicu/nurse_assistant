import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useSyncExternalStore,
} from "react";

interface ShowNurseAssistantContextType {
  showNurseAssistant: boolean;
  setShowNurseAssistant: Dispatch<SetStateAction<boolean>>;
}

const ShowNurseAssistantContext =
  createContext<ShowNurseAssistantContextType | null>(null);

let showNurseAssistantState = false;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => showNurseAssistantState;

const setGlobalShowNurseAssistant: Dispatch<SetStateAction<boolean>> = (
  nextValue,
) => {
  const resolvedValue =
    typeof nextValue === "function"
      ? (nextValue as (value: boolean) => boolean)(showNurseAssistantState)
      : nextValue;

  if (resolvedValue === showNurseAssistantState) {
    return;
  }

  showNurseAssistantState = resolvedValue;
  listeners.forEach((listener) => listener());
};

function useShowNurseAssistantStore(): ShowNurseAssistantContextType {
  const showNurseAssistant = useSyncExternalStore(subscribe, getSnapshot);

  return {
    showNurseAssistant,
    setShowNurseAssistant: setGlobalShowNurseAssistant,
  };
}

export function ShowNurseAssistantProvider({
  children,
}: {
  children: ReactNode;
}) {
  const value = useShowNurseAssistantStore();

  return (
    <ShowNurseAssistantContext.Provider value={value}>
      {children}
    </ShowNurseAssistantContext.Provider>
  );
}

export function useShowNurseAssistant() {
  const store = useShowNurseAssistantStore();
  const context = useContext(ShowNurseAssistantContext);

  return context ?? store;
}
