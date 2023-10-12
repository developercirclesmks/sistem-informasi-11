import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import AboutUsDesc from "../components/organisms/AboutUsDesc/AboutUsDesc";
import Navbar from "../components/organisms/Navbar/Navbar";
import style from "./AboutUs.module.css";
import AboutUsCard from "../components/molecules/aboutuscard/AboutUsCard";

const AboutUs: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Navbar />
      </IonHeader>
      <IonContent className={style.main}>
        <AboutUsDesc />
        <main className={style.ctn}>
          <span className={style.teamTitle}>Meet The Team</span>
          <section className={style.card}>
            <AboutUsCard />
            <AboutUsCard />
            <AboutUsCard />
            <AboutUsCard />
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default AboutUs;
