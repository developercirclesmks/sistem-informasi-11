import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import style from "./HelpAsk.module.css";

const HelpAsk: React.FC = () => {
  return (
    <main>
      <IonAccordionGroup>
        <IonAccordion value="first">
          <IonItem className={style.ask} slot="header" color="light">
            <IonLabel>Saya Tidak Dapat Mengakses Akun On Exam</IonLabel>
          </IonItem>
          <div className={style.askCtn} slot="content">
            Penyebab tidak dapat mengakses akun OnExam adalah login dengan email
            yang tidak aktif, memiliki banyak akun, melakukan penipuan serta
            manipulatif.
          </div>
        </IonAccordion>

        <IonAccordion className={style.ask} value="second">
          <IonItem slot="header" color="light">
            <IonLabel>Saya Tidak Bisa Login Akun OnExam</IonLabel>
          </IonItem>
          <div className={style.askCtn} slot="content">
            Panduan untuk login akun OnExam melalui apps, desktop dan nomor HP.
            Hal-hal yang menyebabkan kamu tidak bisa login akun OnExam
          </div>
        </IonAccordion>

        <IonAccordion className={style.ask} value="third">
          <IonItem slot="header" color="light">
            <IonLabel>Cara Daftar Akun OnExam</IonLabel>
          </IonItem>
          <div className={style.askCtn} slot="content">
            Berikut adalah informasi cara daftar akun di OnExam.
          </div>
        </IonAccordion>
      </IonAccordionGroup>
    </main>
  );
};

export default HelpAsk;
