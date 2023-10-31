import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import style from "./AboutUsMission.module.css"
import React from 'react';

const AboutUsMission: React.FC = () => {

    return (
        <main className={style.main}>
        <section className={style.cube}>
            <section className={style.images}>
                <img src="./images/aboutus2.png" alt="aboutus2" />
            </section>

            <section className={style.text}>
                <IonText className={style.textTitle}>Our MissiON</IonText>
                <IonText className={style.textcontent}>
                    Our mission on this online exam platform is to provide an innovative and user-friendly learning environment for students, teachers, and parents. We are committed to helping students achieve their best learning outcomes through easy access to high-quality online exams and relevant educational resources.
                </IonText>
            </section>
        </section>
        </main>
    );
};

export default AboutUsMission;