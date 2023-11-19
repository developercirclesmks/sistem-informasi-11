import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./ProfileNav.module.css";
import { onAuthStateChanged, signOut, User as FirebaseAuthUser } from "firebase/auth";
import { auth } from "../../../config/firebase-config";

interface User {
  email: string;
}

const ProfileNav: React.FC = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user: FirebaseAuthUser | null) => {
      if (user) {
        const mappedUser: User = {
          email: user.email || "",
        };
        setAuthUser(mappedUser);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  if (!authUser) {
    return (
      <main className={style.main}>
        <Link to="/login">
          <IonButton color="" size="default" fill="outline">
            Login
          </IonButton>
        </Link>
        <Link to="/signup">
          <IonButton color="" size="default" fill="solid">
            Signup
          </IonButton>
        </Link>
      </main>
    );
  } else {
    return (
      <>
        {authUser ? <div>hi {authUser.email}</div> : ""}
      </>
    );
  }
};

export default ProfileNav;
