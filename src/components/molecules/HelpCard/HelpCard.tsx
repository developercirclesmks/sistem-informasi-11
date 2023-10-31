import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import style from "./HelpCard.module.css";

interface HelpCardInterface{
  // Icon:string
  content:string
}

const HelpCard: React.FC<HelpCardInterface> = (props) => {
  const {content} = props
  return (
    <main>
      <IonItem
        color='light'
        className={style.item}
        aria-hidden="true"
        // key={index}
        button={true}
        lines="none"
        // onClick={handleArrowClick}
      >
        <IonIcon icon="people-outline" className={style.sideIcon}></IonIcon>
        <IonLabel className={style.ItemContent}>{content}</IonLabel>
      </IonItem>
    </main>
  );
};

export default HelpCard;
