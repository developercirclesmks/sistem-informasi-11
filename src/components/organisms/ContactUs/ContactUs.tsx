import { IonButton, IonImg, IonInput, IonText, IonTextarea } from '@ionic/react'
import style from './ContactUs.module.css'

const ContactUs: React.FC = () => {
    return (
        <section className={style.main}>
            <div className={style.contact}>
                <IonText className={style.title}>
                    Questions?
                </IonText>
                <IonText className={style.subtitle}>
                    Contact us!
                </IonText>
                <div className={style.form}>
                    <div className={style.name}>
                        <IonInput className={style.input} placeholder="First Name"/>
                        <IonInput className={style.input} placeholder="Last Name"/>
                    </div>
                    <IonInput className={style.email} placeholder="Email"/>
                    <IonTextarea className={style.message} placeholder="Message" />
                    <IonButton className={style.button} shape="round">
                        Send
                    </IonButton>
                </div>
            </div>
            <div className={style.contact}>
                <IonImg draggable={false} src="./images/ContactUs.png" alt="Contact Us"/>
            </div>
        </section>
    )
}

export default ContactUs