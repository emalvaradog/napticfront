import { useDispatch, useSelector } from "react-redux";
import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";
import { RootState } from "@/store/store";
import { WorkspaceLayout } from "@/Layouts";

import {
  AudioRecorderView,
  HomeWorkspaceView,
  SelectedRecordView,
  UploadFileView,
} from "@/views";

import { AsideWorkspace } from "@/components";

import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserSSR,
} from "next-firebase-auth";

import { userHasAccess } from "@/firebase/authProviders";
import { useEffect, useState } from "react";
import { startUserLogout } from "@/store/auth/authThunks";
import { login } from "@/store/auth/authSlice";

function Index() {
  const [hasAccess, setHasAccess] = useState(false);
  const authUser = useAuthUser();
  const dispatch = useDispatch();

  // TODO: Delete this useEffect after waitlist ends :D
  useEffect(() => {
    const userHasAppAccess = async () => {
      // @ts-ignore
      const access = await userHasAccess(authUser.id);
      return access;
    };

    userHasAppAccess()
      .then((access) => {
        console.log(access);
        if (!access) {
          // @ts-ignore
          dispatch(startUserLogout());
          return;
        }
        dispatch(
          login({
            uid: authUser.id,
            email: authUser.email,
            name: authUser.displayName,
            photoUrl: authUser.photoURL,
            token: authUser.id,
          })
        );
        setHasAccess(true);
      })
      .catch(console.error);
  }, []);

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
      {hasAccess && (
        <WorkspaceLayout
          aside={AsideWorkspace}
          mainContent={handleCurrentScreen}
        />
      )}
    </>
  );
}

export const getServerSideProps = withAuthUserSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.RENDER,
})();

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Index);
