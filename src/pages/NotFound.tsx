import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory from react-router-dom
import Navbar from "../components/organisms/Navbar/Navbar";
import style from "./NotFound.module.css";
import RoundButton from "../components/atoms/button/roundButton";

const NotFound: React.FC = () => {
  const history = useHistory(); // Get access to the router history
  const [redirectTimer, setRedirectTimer] = useState(7); // Initial timer value in seconds

  // This effect will decrement the timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      if (redirectTimer > 0) {
        setRedirectTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(timer); // Stop the timer when it reaches 0
        redirectToHome();
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, [redirectTimer]);

  // Function to redirect to the homepage
  const redirectToHome = () => {
    history.push("/"); // Replace '/' with the actual URL of your homepage
  };

  return (
    <IonPage>
      <IonHeader>
        <Navbar />
      </IonHeader>
      <IonContent fullscreen>
        <main className={style.main}>
          <div className={style.container}>
            <img src="./icon/404.svg" alt="logos" draggable={false} />
            <span className={style.text}>
              Oops, it seems you've ventured off the path!
            </span>
            <RoundButton onclick={redirectToHome}>Back To Home in... {redirectTimer}</RoundButton>

          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
