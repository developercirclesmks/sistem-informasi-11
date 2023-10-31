import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import React from "react";
import style from "./AboutUsCard.module.css"

interface AboutUsCardInterface{
  name:string;
  occupations:string;
  desc:string;
}

const AboutUsCard: React.FC<AboutUsCardInterface> = (props) => {
  const {name, occupations, desc} = props
return (
    <main>
      <IonCard className={style.ionCard}>
        <section>
          <img className={style.img}
            alt="Silhouette of mountains"
            src="https://ionicframework.com/docs/img/demos/card-media.png"
            />
        </section>
        
        <section className={style.contentCtn}>
          <IonCardHeader className={style.sectionHeader}>
            <IonCardTitle className={style.name}>{name}</IonCardTitle>
            <IonCardSubtitle className={style.subtitle}>{occupations}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent className={style.sectionContent}>{desc}</IonCardContent>
        </section>

      </IonCard>
    </main>
  );
};

export default AboutUsCard;
