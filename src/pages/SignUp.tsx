import { IonButton, IonContent, IonImg, IonPage, IonText, IonTitle } from '@ionic/react';
import React from 'react';
import style from './SignUp.module.css'
import { useHistory } from 'react-router';
const SignUp: React.FC = () => {
    let history = useHistory();

    const handleClick: any = () => {
        history.push("/");
    }

    return (
        <IonPage>
            <IonContent>
                <main className={style.main}>
                    <section className={style.section}>
                        <div className={style.SectionBox}>
                            <div className={style.ImageBox}>
                                <IonImg draggable={false} src="./images/Hero Image.png" alt="Sign Up"/>
                            </div>
                            <div className={style.SignUpBox}>
                                <div>
                                    <IonTitle className={style.SignUpHeader}>
                                        Sign Up
                                    </IonTitle>
                                </div>
                                <div className={style.inputs}>
                                    <input className={style.email} placeholder="Enter Your Name"/>
                                    <input className={style.email} placeholder="Enter Your Email"/>
                                    <input type="password" className={style.password} placeholder='Create New Password'/>
                                    <input type="password" className={style.password} placeholder='Confirm New Password'/>
                                    <IonButton shape="round" onClick={handleClick}>
                                        Sign Up
                                    </IonButton>
                                </div>
                                <div className={style.SignUp}>
                                    <IonText>
                                        {`Already have account? `}
                                    </IonText>
                                    <a href="/login" className={style.SignUpText}>
                                        Login
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </IonContent>
        </IonPage>
    );
};

export default SignUp;