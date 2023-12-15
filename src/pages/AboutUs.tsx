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
import style from "./styles/AboutUs.module.css";
import AboutUsCard from "../components/molecules/aboutuscard/AboutUsCard";
import AboutUsMission from "../components/organisms/AboutUsMission/AboutUsMission";
import Footer from "../components/organisms/Footer/Footer";
import Sidebar from "../components/organisms/Sidebar/Sidebar";

import Dilul from "../../public/images/Dilul.png";
import Tasya from "../../public/images/Tasya.png";
import Richal from "../../public/images/Richal.png";
import Sasa from "../../public/images/Sasa.png";

const AboutUs: React.FC = () => {
  return (
    <>
    <Sidebar />
    <IonPage id="main-content">
      <IonHeader>
        <Navbar />
      </IonHeader>
      
      <IonContent fullscreen className={style.main}>
        <AboutUsDesc/>
        <AboutUsMission/>
        <main className={style.ctn}>
          <span className={style.teamTitle}>Meet The Team</span>
          <section className={style.card}>
            {AboutUsList.map((card, index) => (
              <AboutUsCard key={index} img={card.img} name={card.name} occupations={card.occupations} desc={card.desc}/>
            ))}
          </section>
        </main>

        <Footer/>
        
      </IonContent>
    </IonPage>
  </>
  );
};

export default AboutUs;

const AboutUsList =[
  {
    img: Dilul,
    name: "A. Fadhilul Asyam H.",
    occupations: "Informatic Engineering Student",
    desc: "Criticism is like a brick, use it to build a foundation, not a wall, nor throwing it to people."
  },
  {
    img: Tasya,
    name: "Tasya Nabila Hasanuddin",
    occupations: "Informatic Engineering Student",
    desc: "The only way to do great work is to love what you do."
  },
  {
    img: Richal,
    name: "Richal Akbar",
    occupations: "Informatic Engineering Student",
    desc: "Education is the most powerful weapon which you can use to change the world."
  },
  {
    img: Sasa,
    name: "Nur Salzabila Suryawan",
    occupations: "Informatic Engineering Student",
    desc: "Your time is limited, don't waste it living someone else's life."
  },
]
