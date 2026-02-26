import App from "@/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./style/index.css";
import { ContainerRefProvider } from "./hooks/useContainerRef";
import { ShowNurseAssistantProvider } from "./context/showNurseAssistant";
import { NurseAssistantProviderProps } from "./types/nurseAssistant";

const queryClient = new QueryClient();

export default function Providers(props: NurseAssistantProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ShowNurseAssistantProvider>
        <ContainerRefProvider>
          <App {...props} />
        </ContainerRefProvider>
      </ShowNurseAssistantProvider>
    </QueryClientProvider>
  );
}
