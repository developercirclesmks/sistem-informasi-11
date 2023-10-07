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
					<IonButton color="" size="large" shape="round">
						<span className={style.buttons}>Get Started !!!</span>
					</IonButton>
				</div>
			</section>
      <section className={style.heroImages} draggable={false} >
          <IonImg draggable={false} src="./images/Hero Image.png" alt="Heroes"/>
      </section>

		</main>
	);
};

export default Hero;
