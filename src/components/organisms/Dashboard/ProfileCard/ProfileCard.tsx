import {
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React from "react";
import style from "./ProfileCard.module.css";

const ProfileCard: React.FC = () => {
  return (
    <>
      <IonCard color="light" className="ion-padding">
        <div className={style.heads}>
          <IonButton
            href="/profile"
            shape="round"
            fill="outline"
            className={style.smButton}
          >
            <IonIcon src="/icon/redirect.svg"></IonIcon>
          </IonButton>
        </div>
        <IonCardContent className={`${style.cardContent}`}>
          <main className={style.LeftSide}>
            <section className={style.handleGridDown}>
              <IonItem color="light">
                <div className={style.avatar}>
                  <IonImg src="/images/Test.jpeg" alt="asdas" />
                </div>
              </IonItem>
            </section>
            <article>
              <IonItem color="light">
                <IonLabel>
                  <h2>Name</h2>
                  <p>Andi M. Fadhilul</p>
                </IonLabel>
              </IonItem>{" "}
              <IonItem color="light">
                <IonLabel>
                  <h2>Email</h2>
                  <p>andiilul728@gmail.com</p>
                </IonLabel>
              </IonItem>
              <IonItem color="light">
                <IonLabel>
                  <h2>Username</h2>
                  <p>@Andiilul</p>
                </IonLabel>
              </IonItem>
            </article>
          </main>
          <aside className={style.aside}>
            <section>
              <IonItem color="light">
                <IonLabel>
                  <h2>Sex</h2>
                  <p>Male</p>
                </IonLabel>
              </IonItem>
              <IonItem color="light">
                <IonLabel>
                  <h2>Date Of Birth</h2>
                  <p>03/11/2003</p>
                </IonLabel>
              </IonItem>
              <IonItem color="light">
                <IonLabel>
                  <h2>Phone Number</h2>
                  <p>084232524324</p>
                </IonLabel>
              </IonItem>
            </section>
            <section>
              <IonItem color="light">
                <IonLabel>
                  <h2>Occupation</h2>
                  <p>Undergraduate Student</p>
                </IonLabel>
              </IonItem>
              <IonItem color="light">
                <IonLabel>
                  <h2>Institution</h2>
                  <p>Hasanuddin University</p>
                </IonLabel>
              </IonItem>
            </section>
          </aside>
        </IonCardContent>
        <IonItem color="light">
          <IonButton
            size="default"
            className={`${style.button}`}
            href="/profile"
            color="primary"
            shape="round"
          >
            <p>Edit Profile</p>
          </IonButton>
        </IonItem>
      </IonCard>
    </>
  );
};

export default ProfileCard;
