import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonText,
  IonItem,
} from "@ionic/react";
import React from "react";
import Navbar from "../components/organisms/Navbar/Navbar";
import Sidebar from "../components/organisms/Sidebar/Sidebar";
import style from "./Profile.module.css";
import ProfileCard from "../components/organisms/Dashboard/ProfileCard/ProfileCard";
const Profile: React.FC = () => {
  return (
    <>
      <Sidebar />
      <IonPage id="main-content">
        <Navbar />
        <IonContent className='ion-padding'>
          <ProfileCard/>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Profile;
