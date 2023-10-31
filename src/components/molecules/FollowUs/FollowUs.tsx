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
        <IonText className={style.title1}>Follow Us</IonText>
        <section className={style.icon}>
          <IonIcon src="./icon/logo-facebook.svg"></IonIcon>
          <IonIcon src="./icon/logo-instagram.svg"></IonIcon>
          <IonIcon src="./icon/logo-twitter.svg"></IonIcon>
          <IonIcon src="./icon/logo-linkedin.svg"></IonIcon>
        </section>
        <IonText className={style.title2
        }></IonText>
      </section>
    </main>
  );
};

export default FollowUs;
