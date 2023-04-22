import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";
import { RootState } from "@/store/store";
import { WorkspaceLayout } from "@/Layouts/WorkspaceLayout/WorkspaceLayout";
import {
  AudioRecorderView,
  HomeWorkspaceView,
  SelectedRecordView,
  UploadFileView,
} from "@/views";
import { AsideWorkspace, withAuth } from "@/components";

function Index() {
  const { uid, isAuth } = useSelector((state: RootState) => state.auth);

  const currentScreen: WorkSpaceScreen = useSelector(
    (state: RootState) => state.auth.currentScreen
  ) as WorkSpaceScreen;

  function handleCurrentScreen() {
    switch (currentScreen) {
      case WorkSpaceScreen.Home:
        return <HomeWorkspaceView />;
      case WorkSpaceScreen.Record:
        return <AudioRecorderView />;
      case WorkSpaceScreen.Upload:
        return <UploadFileView />;
      case WorkSpaceScreen.SelectedRecord:
        return <SelectedRecordView />;
      case WorkSpaceScreen.RecordsList:
        return <AsideWorkspace />;
      default:
        return <HomeWorkspaceView />;
    }
  }

  return (
    <>
      {uid && isAuth && (
        <WorkspaceLayout
          aside={AsideWorkspace}
          mainContent={handleCurrentScreen}
        />
      )}
    </>
  );
}

// @ts-ignore
export default withAuth(Index);
