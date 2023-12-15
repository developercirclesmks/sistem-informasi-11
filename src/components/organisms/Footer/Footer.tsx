import {
  IonContent,
  IonFooter,
  IonText,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import React from "react";
import Logo from "../../molecules/Logo/Logo";
import Navitem from "../../atoms/Navitem/Navitem";
import style from "./Footer.module.css";
import FollowUs from "../../molecules/FollowUs/FollowUs";

const Footer: React.FC = () => {
  return (
    <IonFooter color="primary">
      <main className={style.main}>
        <div className={style.start}>
          <Logo/>
          
          <section className={style.contact}>
            <section className={style.location}>
              <IonIcon
                className={style.loclogo}
                color="primary"
                src="./icon/location-outline.svg"
              ></IonIcon>
              <IonText className={style.loctext}>
                Gedung Student Center Lt. 1 Fakultas Teknik <br />
                Universitas Hasanuddin, Gowa 92171
              </IonText>
            </section>

            <section className={style.email}>
              <IonIcon
                className={style.emaillogo}
                color="primary"
                src="./icon/mail-outline.svg"
              ></IonIcon>
              <IonText className={style.emailtext}>OnExam@gmail.com</IonText>
            </section>
          </section>
        </div>
        <div className={style.end}>
          <section className={style.navitemcontainer}>
            {navitemlist.map((nav, index) => (
              <Navitem key={index} navname={nav.navname} navto={nav.navto} />
            ))}
          </section>
          <div className={style.endbottom}>
            <FollowUs />
          </div>
        </div>
      </main>
    </IonFooter>
  );
};

export default Footer;

const navitemlist = [
  {
    navname: "Home",
    navto: "/",
  },
  {
    navname: "Exams",
    navto: "/",
  },
  {
    navname: "About Us",
    navto: "/about-us",
  },
  {
    navname: "Contact us",
    navto: "/",
  },
];
