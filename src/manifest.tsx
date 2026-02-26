import { lazy } from "react";
import { NurseAssistantProviderProps } from "./types/nurseAssistant";

interface NavigationLink {
  url: string;
  name: string;
  icon?: React.ReactNode;
  children?: NavigationLink[];
}
interface Manifest {
  plugin: string;
  routes: Record<string, (...args: any) => React.ReactNode>;
  extends: string[];
  components: {
    NurseAssistantProvider: React.LazyExoticComponent<
      React.FC<NurseAssistantProviderProps>
    >;
    NurseAssistantToggle: React.LazyExoticComponent<
      React.FC<Record<string, never>>
    >;
  };
  navItems?: NavigationLink[];
  userNavItems?: NavigationLink[];
  adminNavItems?: NavigationLink[];
}

const manifest: Manifest = {
  plugin: "care-nurse-assistant",
  routes: {},
  extends: [],
  components: {
    NurseAssistantProvider: lazy(() => import("./providers")),
    NurseAssistantToggle: lazy(() => import("./components/Toggle")),
  },
  userNavItems: [],
  adminNavItems: [],
};

export default manifest;
