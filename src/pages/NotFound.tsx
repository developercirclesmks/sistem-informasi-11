import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; 
import Navbar from "../components/organisms/Navbar/Navbar";
import style from "./NotFound.module.css";

const NotFound: React.FC = () => {
  const history = useHistory(); 
  const [redirectTimer, setRedirectTimer] = useState(7); 

  useEffect(() => {
    const timer = setInterval(() => {
      if (redirectTimer > 0) {
        setRedirectTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(timer); 
        redirectToHome()
        watisdis();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [redirectTimer]);

  const redirectToHome = () => {
    history.push("/"); 
  };

  const watisdis =()=> {
    console.log(("redirect"));
  }
  return (
    <IonPage>
      <IonHeader>
        <Navbar />
      </IonHeader>
      <IonContent fullscreen>
        <main className={style.main}>
          <div className={style.container}>
            <img src="./icon/404.svg" alt="logos" draggable={false} />
            <IonText color='primary' className={style.text}>
              Oops, it seems you've ventured off the path!
            </IonText>
            <IonButton size="large" shape="round"  onClick={redirectToHome}>Back To Home in... {redirectTimer}</IonButton>
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
