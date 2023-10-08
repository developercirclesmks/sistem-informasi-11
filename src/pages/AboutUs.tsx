import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import AboutUsCard from '../components/aboutuscard/AboutUsCard';

const AboutUs: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                Navbar Goes Here
            </IonHeader>
            <IonContent className="ion-padding">
                About Us
                <AboutUsCard/>
                <AboutUsCard/>
                <AboutUsCard/>
                <AboutUsCard/>
                <AboutUsCard/>
            </IonContent>
        </IonPage>
    );
};

export default AboutUs;