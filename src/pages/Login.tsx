import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Input from '../components/organisms/Input/Input';
const Login: React.FC = () => {

    return (
        <IonPage>
            <IonContent >
              <Input/>  
            </IonContent>
        </IonPage>
    );
};

export default Login;