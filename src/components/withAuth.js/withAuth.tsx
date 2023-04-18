import { userHasAccess } from "@/firebase/authProviders";
import { FirebaseAuth } from "@/firebase/config";
import { startRetrievingRecords } from "@/store/audioLogs/audioLogsThunks";
import { login, logout } from "@/store/auth/authSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const WithAuthComponent: React.FC<any> = (props) => {
    const { uid, name, email, token } = useSelector(
      (state: RootState) => state.auth
    );
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
      const unsubscribe = FirebaseAuth.onAuthStateChanged(async (user) => {
        let userAccess = false;

        // @ts-ignore
        userAccess = await userHasAccess(user?.uid);

        // TODO: Handle permissions & set permissions.
        if (user && userAccess) {
          dispatch(
            login({
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              token: user.uid,
              hasAccess: true,
            })
          );

          // @ts-ignore
          dispatch(startRetrievingRecords());
          router.push("/workspace");
        } else if (user && !userAccess) {
          dispatch(logout());

          // TODO: CHANGE WAITLIST TO LOGIN WHEN WAITLIST IS NOT NEEDED
          router.push("/waitlist");
        } else {
          dispatch(logout());
          router.push("/login");
        }
      });

      return () => {
        unsubscribe();
      };
    }, [dispatch]);

    const user = {
      uid,
      name,
      email,
      token,
    };

    return <WrappedComponent user={user} {...props} />;
  };

  return WithAuthComponent;
};
