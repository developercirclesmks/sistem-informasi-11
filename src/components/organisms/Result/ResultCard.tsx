import {
    IonContent,
    IonHeader,
    IonPage,
    IonIcon,
    IonText,
    IonTitle,
    IonToolbar,
    IonCard,
  } from "@ionic/react";
  import React from "react";
  import style from "./ResultCard.module.css";
  
  const ResultCard: React.FC = () => {
    const Time = 10.05;
    const Score = 10;
  
    return (
      <main>
        <IonCard className={style.result_card}>
          <section className={style.result}>
            <IonText className={style.result_title} color={"primary"}>
              <h1>Result</h1>
            </IonText>
            <IonText>
              <h2 className={style.result_text}>Score : {Score}</h2>
            </IonText>
            <IonText>
              <h2 className={style.result_text}>Time : {Time}</h2>
            </IonText>
            
          </section>
        </IonCard>
      </main>
    );
  };
  export default ResultCard;