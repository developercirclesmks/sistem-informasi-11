import { IonButton, IonContent, IonImg, IonPage } from '@ionic/react';
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
                                <IonImg draggable={false} src="./images/Hero Image.png" alt="Login"/>
                            </div>
                            <div className={style.SignUpBox}>
                                <div className={style.SignUpHeader}>
                                    Sign Up
                                </div>
                                <div className={style.inputs}>
                                    <input className={style.email} placeholder="Enter Your Name"/>
                                    <input className={style.email} placeholder="Enter Your Email"/>
                                    <input type="password" className={style.password} placeholder='Create New Password'/>
                                    <i className="far fa-eye" id="togglePassword"></i>
                                    <input type="password" className={style.password} placeholder='Confirm New Password'/>
                                    <IonButton shape="round" onClick={handleClick}>
                                        Sign Up
                                    </IonButton>
                                </div>
                                <div className={style.SignUp}>
                                    <span>
                                        {`Already have account? `}
                                    </span>
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