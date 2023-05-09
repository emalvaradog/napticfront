import { WorkSpaceScreen } from "./WorkSpaceInterfaces";

export enum AuthStatus {
  NotAuthenticated = "not-authenticated",
  Authenticating = "authenticating",
  Authenticated = "authenticated",
  Error = "error",
}

export interface AuthState {
  authStatus: AuthStatus;
  currentScreen: WorkSpaceScreen.Home;
}
