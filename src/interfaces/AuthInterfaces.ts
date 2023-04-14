import { WorkSpaceScreen } from "./WorkSpaceInterfaces";

export enum AuthStatus {
  NotAuthenticated = "not-authenticated",
  Authenticating = "authenticating",
  Authenticated = "authenticated",
  Error = "error",
}

export interface AuthState {
  uid: string | null;
  name: string | null;
  email: string | null;
  token: string | null;
  isAuth: boolean | null;
  authStatus: AuthStatus;
  error: string | null;
  permissions: string[] | null;

  // TODO: This should be in it's own WorkspaceSlice, not in Auth.
  currentScreen: WorkSpaceScreen.Home;
}
