import { WorkSpaceScreen } from "./WorkSpaceInterfaces";

export interface AuthState {
  currentScreen: WorkSpaceScreen.Home;
  userPlan: string | null;
  secondsLeft: string | null;
}
