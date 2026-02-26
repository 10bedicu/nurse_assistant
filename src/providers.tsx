import App from "@/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./style/index.css";
import { ContainerRefProvider } from "./hooks/useContainerRef";
import { ShowNurseAssistantProvider } from "./context/showNurseAssistant";
import { NurseAssistantProps } from "./types/nurseAssistant";

const queryClient = new QueryClient();

export default function Providers(props: NurseAssistantProps) {
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
