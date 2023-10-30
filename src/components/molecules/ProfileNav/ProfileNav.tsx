import {
	IonButton,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import React from "react";
import { Link } from "react-router-dom";
import style from "./ProfileNav.module.css";

const ProfileNav: React.FC = () => {
	return (
		<main className={style.main}>
			<Link to="/login">
				<IonButton color="" size="default" fill="outline">
					Login
				</IonButton>
			</Link>
			<Link to="/signup">
				<IonButton color="" size="default" fill="solid">
					Signup
				</IonButton>
			</Link>
		</main>
	);
};

export default ProfileNav;
