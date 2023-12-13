import { IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import style from "./LoadingBox.module.css"

const LoadingBox: React.FC = () => {

  return (
    <main className={style.main}>
      <IonSpinner></IonSpinner>
    </main>
  );
};

export default LoadingBox;