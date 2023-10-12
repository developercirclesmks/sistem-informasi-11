import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import RoundButton from '../../atoms/button/roundButton';
import style from './Input.module.css'
const Login: React.FC = () => {

    return (
        <IonPage>
            
            <IonContent >
                <main className={style.main}>
                    <section className={style.section}>
                     <div className={style.LoginBox}>
                        <div className={style.LoginHeader}>Login</div>
                            <div className={style.inputs}>
                                <input className={style.email} placeholder="Enter Your Email"/>
                                <input type="password" className={style.password} placeholder='Enter Your Password'/>
                                <RoundButton>Login</RoundButton>
                            </div>    
                    </div>
                    </section>
                </main>
            </IonContent>
        </IonPage>
    );
};

export default Login;