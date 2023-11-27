import React from "react";
import style from "./AboutUsDesc.module.css";
import { IonText } from "@ionic/react";

const AboutUsDesc: React.FC = () => {
  return (
    <main className={style.main}>
      <section className={style.desc}>
        <IonText className={style.desctitle}>Why ON Exam?</IonText>
        <IonText className={style.textcontent}>We're the architects of educational transformation. Our platform is built on innovation, inclusivity, and the belief that learning has no limits. We're here to make your journey of creating and accessing exam rooms as seamless and rewarding as possible.</IonText>
      </section>
      
      <section className={style.images}>
        <img src="./images/aboutus1.png" alt="aboutus1" />
      </section>
    </main>
  );
};

export default AboutUsDesc;
