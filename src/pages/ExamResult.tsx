import {
    IonContent,
    IonHeader,
    IonPage,
    IonIcon,
    IonText,
    IonTitle,
    IonToolbar,
    IonButton,
  } from "@ionic/react";
  import React from "react";
  import ResultCard from "../components/organisms/Result/ResultCard";
  import style from "./styles/ExamResult.module.css";
  import { useHistory } from "react-router-dom";
  
  const ExamResult: React.FC = () => {
    const history = useHistory();
    const redirectToHome = () => {
      history.push("/");
    };
  
    return (
      <>
        <section className={style.result}>
          <div>
            <IonIcon className={style.result_icon} src="./icon/Group 3.svg" />
          </div>
          <div className={style.result_card}>
            <ResultCard />
          </div>
          <section className={style.buttons}>
            <div>
              <IonButton className={style.button} fill="outline" color={"primary"} onClick={redirectToHome}>
                Back to Home
              </IonButton>
            </div>
          </section>
        </section>
      </>
    );
  };
  
  export default ExamResult;