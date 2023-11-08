import { IonButton, IonImg } from '@ionic/react'
import style from './ContactUs.module.css'

const ContactUs: React.FC = () => {
    return (
        <section className={style.main}>
            <div className={style.contact}>
                <p className={style.title}>
                    Questions?
                </p>
                <p className={style.subtitle}>
                    Contact us!
                </p>
                <div className={style.form}>
                    <div className={style.name}>
                        <input className={style.input} placeholder="First Name"/>
                        <input className={style.input} placeholder="Last Name"/>
                    </div>
                    <input className={style.email} placeholder="Email"/>
                    <textarea className={style.message} placeholder="Message" />
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