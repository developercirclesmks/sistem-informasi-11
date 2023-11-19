import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton,
	IonImg,
	IonText,
} from "@ionic/react";
import React from "react";
import style from "./Hero.module.css";
import { signOut, Auth } from "firebase/auth";
import { auth } from "../../../config/firebase-config";
import { useHistory } from "react-router";

const Hero: React.FC = () => {
	const history = useHistory()
	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				console.log("Sign out successful");
				history.push('/login');
			})
			.catch((error) => {
				console.log("Sign out failed:", error);
			});
	};

	return (
		<main className={style.main}>
			<section className={style.heroContent}>
				<IonText className={style.heading}>
					Elevate Your
					<br /> Education
				</IonText>
				<IonText className={style.text}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, non
					provident dolore illo quo doloremque
				</IonText>
				<IonButton onClick={handleSignOut} shape="round" size="large">
					Get Started !!!
				</IonButton>
			</section>

			<section className={style.heroImages} draggable={false}>
				<IonImg draggable={false} src="./images/Hero Image.png" alt="Heroes" />
			</section>
		</main>
	);
};

export default Hero;
