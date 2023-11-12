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
import Help from "../../../pages/Help";

interface HelpCardInterface {
  Icons: any;
  content: string;
  scrollId?: string;
}

const HelpCard: React.FC<HelpCardInterface> = (props) => {
  const { content, Icons, scrollId='' } = props;
  const handleClickScroll = () => {
    const scrollTo = document.getElementById(scrollId);
    if (scrollTo) {
      scrollTo.scrollIntoView({ behavior: "smooth" });
    }
  };
    return (
    <main>
      <IonItem
        color="light"
        className={style.item}
        aria-hidden="true"
        button={true}
        lines="none"
        onClick={handleClickScroll}
      >
        <IonIcon icon={Icons} className={style.sideIcon}></IonIcon>
        <IonLabel className={style.ItemContent}>{content}</IonLabel>
      </IonItem>
    </main>
  );
};

export default HelpCard;