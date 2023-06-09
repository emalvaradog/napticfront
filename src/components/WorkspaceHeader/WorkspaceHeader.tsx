import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { setCurrentScreen } from "@/store/auth/authSlice";
import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { startUserLogout } from "@/store/auth/authThunks";
import { useAuthUser } from "next-firebase-auth";
import { RootState } from "@/store/store";

const plan = { free: "0", personal: "15", professional: "40" };

export function WorkspaceHeader() {
  const authUser = useAuthUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userPlan, secondsLeft } = useSelector(
    (state: RootState) => state.auth
  );

  const modalRef = useRef(null);
  const userRef = useRef(null);

  const dispatch = useDispatch();

  function handleHome() {
    dispatch(setCurrentScreen(WorkSpaceScreen.Home));
  }

  function handleLogout() {
    setIsModalOpen(false);
    // @ts-ignore
    dispatch(startUserLogout());
  }

  useEffect(() => {
    // @ts-ignore
    function handleModalToggle(e) {
      if (
        // @ts-ignore
        (userRef.current && userRef.current.contains(e.target)) ||
        // @ts-ignore
        (modalRef.current && !modalRef.current.contains(e.target))
      ) {
        setIsModalOpen((prev) => !prev);
      }
    }

    document.addEventListener("mousedown", handleModalToggle);
    return () => document.removeEventListener("mousedown", handleModalToggle);
  }, []);

  return (
    <div className={styles.header}>
      <h1 onClick={handleHome}>naptic</h1>
      <div className={styles.headerUser}>
        <p>{authUser.displayName}</p>
        {authUser.photoURL && (
          <Image
            ref={userRef}
            width={30}
            height={30}
            src={authUser.photoURL}
            alt="photo"
            style={{ borderRadius: "50%" }}
          />
        )}
      </div>
      {isModalOpen && (
        <div className={styles.headerModal} ref={modalRef}>
          <div className={styles.headerModalPlan}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              id="invoice"
            >
              <path d="M9.5,10.5H12a1,1,0,0,0,0-2H11V8A1,1,0,0,0,9,8v.55a2.5,2.5,0,0,0,.5,4.95h1a.5.5,0,0,1,0,1H8a1,1,0,0,0,0,2H9V17a1,1,0,0,0,2,0v-.55a2.5,2.5,0,0,0-.5-4.95h-1a.5.5,0,0,1,0-1ZM21,12H18V3a1,1,0,0,0-.5-.87,1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0A1,1,0,0,0,2,3V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM5,20a1,1,0,0,1-1-1V4.73L6,5.87a1.08,1.08,0,0,0,1,0l3-1.72,3,1.72a1.08,1.08,0,0,0,1,0l2-1.14V19a3,3,0,0,0,.18,1Zm15-1a1,1,0,0,1-2,0V14h2Z"></path>
            </svg>
            <div>
              <h4>Plan {userPlan}</h4>

              <p>
                Horas restantes:{" "}
                {
                  // @ts-ignore
                  parseFloat(secondsLeft) / 3600
                }
                /
                {
                  // @ts-ignore
                  plan[userPlan]
                }
              </p>
            </div>
          </div>
          <div className={styles.headerModalSession} onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              id="exit"
            >
              <path d="M6 2a4 4 0 0 0-4 4v3h2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3H2v3a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4H6Z"></path>
              <path d="M3 11a1 1 0 1 0 0 2h9.582l-2.535 2.536a1 1 0 0 0 1.414 1.414l4.196-4.196a.998.998 0 0 0 0-1.508L11.46 7.05a1 1 0 1 0-1.414 1.414L12.582 11H3Z"></path>
            </svg>
            <h4>Cerrar sesión</h4>
          </div>
        </div>
      )}
    </div>
  );
}
