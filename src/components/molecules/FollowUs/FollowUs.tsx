import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import style from "./FollowUs.module.css";
import { IonText } from "@ionic/react";

const FollowUs: React.FC = () => {
  return (
    <main>
      <section className={style.followus}>
        <IonText color={"primary"} className={style.title1}>Follow Us</IonText>
        <section className={style.icon}>
          <IonIcon color="primary" src="./icon/logo-facebook.svg"></IonIcon>
          <IonIcon color="primary" src="./icon/logo-instagram.svg"></IonIcon>
          <IonIcon color="primary" src="./icon/logo-twitter.svg"></IonIcon>
          <IonIcon color="primary" src="./icon/logo-linkedin.svg"></IonIcon>
        </section>
        <IonText className={style.title2}></IonText>
      </section>
    </main>
  );
};

export default FollowUs;
