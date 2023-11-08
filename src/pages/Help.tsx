import {
  IonContent,
  IonHeader,
  IonPage,
  IonIcon,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import Navbar from "../components/organisms/Navbar/Navbar";
import style from "./Help.module.css";
import HelpCard from "../components/molecules/HelpCard/HelpCard";
import HelpAsk from "../components/molecules/HelpAsk/HelpAsk";
import ContactUs from "../components/organisms/ContactUs/ContactUs";

const Help: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Navbar />
      </IonHeader>

      <IonContent className={style.ctn}>
        <section className={style.main}>
          <section className={style.help}>
            <IonText className={style.helpText}>
              Choose a topic according to your problem
            </IonText>
            <section className={style.card}>
              {HelpList.map((card, index) => (
                <HelpCard key={index} content={card.content} />
              ))}
            </section>
          </section>

          <section className={style.ask}>
            <img className={style.img} src="./images/help1.png" alt="" />

            <div className={style.askCtn}>
              <IonText className={style.askText}>
                Frequently asked questions
              </IonText>
              <HelpAsk />
            </div>
          </section>
          
          <ContactUs></ContactUs>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Help;

const HelpList = [
  {
    // Icon: "./icon/people-outline.svg",
    content: "Account",
  },
  {
    // Icon: "./icon/create-outline.svg",
    content: "Creating an Exam",
  },
  {
    // Icon: "./icon/search.svg",
    content: "Searching for an Exam",
  },
  {
    // Icon: "./icon/grid-outline.svg",
    content: "Others",
  },
];
