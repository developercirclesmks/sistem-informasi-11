import React from "react";
import style from "./Logo.module.css";
import { IonText } from "@ionic/react";

const Logo: React.FC = () => {
	return (
		<main className={style.maincontainer} >
			<section className={style.logoPicCtn}>
				<img draggable={false} src="/icon/Logo.svg" alt="Logo" className={style.logopic}/>
			</section>
        <IonText color='primary' className={style.logoText}>OnExam</IonText>
		</main>
	);
};

export default Logo;