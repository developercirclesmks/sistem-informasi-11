import {
  IonMenu,
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import React from "react";
import style from "./Dashboard.module.css";
const Dashboard: React.FC = () => {
  return (
    <>
    <IonMenu contentId="main-content" type="push">
      <IonHeader>
        <IonToolbar>
          <IonToolbar>
              </IonToolbar>
          <IonTitle>Menu Content</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">This is the menu content.</IonContent>
    </IonMenu>
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
        <section className={style.toolbar}>
          <IonTitle>Dashboard</IonTitle>
            <IonSearchbar></IonSearchbar>
              <section>Profile</section>
          </section>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      Dashboard Content  </IonContent>
    </IonPage>
   </>
  );
};

export default Dashboard;
