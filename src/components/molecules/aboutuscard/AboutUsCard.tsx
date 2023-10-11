import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import React from "react";

const AboutUsCard: React.FC = () => {
  return (
    <main>
      <IonCard>
        <img
          alt="Silhouette of mountains"
          src="https://ionicframework.com/docs/img/demos/card-media.png"
        />
        <IonCardHeader>
          <IonCardTitle>Tasya Nabila Hasanuddin</IonCardTitle>
          <IonCardSubtitle>3rd Year Undergraduate Student at Unhas</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati doloribus quisquam assumenda iusto laboriosam. 
          Cum aperiam hic a laboriosam laudantium esse cupiditate! Sit impedit deserunt facere sapiente reprehenderit eveniet 
          voluptatem.
        </IonCardContent>
      </IonCard>
    </main>
  );
};

export default AboutUsCard;
