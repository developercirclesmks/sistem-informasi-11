import {
  IonContent,
  IonFooter,
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
import AboutUsMission from "../components/organisms/AboutUsMission/AboutUsMission";
import Footer from "../components/organisms/Footer/Footer";

const AboutUs: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Navbar />
      </IonHeader>
      
      <IonContent className={style.main}>
        <AboutUsDesc/>
        <AboutUsMission/>
        <main className={style.ctn}>
          <span className={style.teamTitle}>Meet The Team</span>
          <section className={style.card}>
            {AboutUsList.map((card, index) => (
              <AboutUsCard key={index} name={card.name} occupations={card.occupations} desc={card.desc}/>
            ))}
          </section>
        </main>

        <Footer/>
        
      </IonContent>
    </IonPage>
  );
};

export default AboutUs;

const AboutUsList =[
  {
    name: "A. Fadhilul Asyam H.",
    occupations: "Informatic Engineering Student",
    desc: "lalalala"
  },
  {
    name: "Tasya Nabila Hasanuddin",
    occupations: "Informatic Engineering Student",
    desc: "lalalala"
  },
  {
    name: "Richal Akbar",
    occupations: "Informatic Engineering Student",
    desc: "lalalala"
  },
  {
    name: "Salzabila Suryawan",
    occupations: "Informatic Engineering Student",
    desc: "lalalala"
  },
]