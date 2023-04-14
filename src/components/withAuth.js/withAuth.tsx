import { FirebaseAuth } from "@/firebase/config";
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
      const unsubscribe = FirebaseAuth.onAuthStateChanged((user) => {
        // TODO: Handle permissions & set permissions.
        if (user) {
          dispatch(
            login({
              uid: user.uid,
              name: user.displayName,
              email: user.email,

              token: user.uid,
            })
          );
          router.push("/workspace");
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
