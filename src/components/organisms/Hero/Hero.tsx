import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton,
  IonImg,
} from "@ionic/react";
import React from "react";
import style from "./Hero.module.css";
import RoundButton from "../../atoms/button/roundButton";

const Hero: React.FC = () => {
	return (
		<main className={style.main}>
			<section className={style.heroContent}>
				<span className={style.heading}>
					Elevate Your
					<br /> Education
				</span>
				<span className={style.text}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, non
					provident dolore illo quo doloremque
				</span>
				<div>
				<RoundButton>Get Started !!!</RoundButton>
				</div>
			</section>
      <section className={style.heroImages} draggable={false} >
          <IonImg draggable={false} src="./images/Hero Image.png" alt="Heroes"/>
      </section>

		</main>
	);
};

export default Hero;
