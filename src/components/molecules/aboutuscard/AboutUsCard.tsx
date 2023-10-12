import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import React from "react";
import style from "./AboutUsCard.module.css"

const AboutUsCard: React.FC = () => {
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
            <IonCardTitle className={style.name}>Tasya Nabila Hasanuddin</IonCardTitle>
            <IonCardSubtitle className={style.subtitle}>3rd Year Undergraduate Student at Unhas</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent className={style.sectionContent}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, voluptatem esse!
          </IonCardContent>
        </section>

      </IonCard>
    </main>
  );
};

export default AboutUsCard;
