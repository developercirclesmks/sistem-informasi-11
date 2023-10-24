import { IonContent, IonImg, IonPage } from '@ionic/react';
import React from 'react';
import RoundButton from '../../atoms/button/roundButton';
import style from './Input.module.css'
import { useHistory, useRouteMatch } from 'react-router';
const Login: React.FC = () => {
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
                            <div className={style.LoginBox}>
                                <div className={style.LoginHeader}>
                                    Login
                                </div>
                                <div className={style.inputs}>
                                    <input className={style.email} placeholder="Enter Your Email"/>
                                    <input type="password" className={style.password} placeholder='Enter Your Password'/>
                                    <div className={style.InputDeco}>
                                        <div className={style.CheckboxRemember}>
                                            <input type="checkbox" className={style.checkbox} />
                                            <span className={style.remember}>
                                                Remember Me
                                            </span>
                                        </div>
                                        <div>
                                            <a href="/" className={style.forget}>
                                                Forget Password?
                                            </a>
                                        </div>
                                    </div>
                                    <RoundButton onclick={handleClick}>
                                        Login
                                    </RoundButton>
                                </div>
                                <div className={style.SignUp}>
                                    <span>
                                        {`Don't have an account? `}
                                    </span>
                                    <a href="/" className={style.SignUpText}>
                                        Sign Up
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

export default Login;