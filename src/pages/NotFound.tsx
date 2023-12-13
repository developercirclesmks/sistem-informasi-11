import {
	IonButton,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/organisms/Navbar/Navbar";
import style from "./styles/NotFound.module.css";

const NotFound: React.FC = () => {
	const history = useHistory();

	return (
		<IonPage>
			<IonHeader>
				<Navbar />
			</IonHeader>
			<IonContent fullscreen>
				<main className={style.main}>
					<div className={style.container}>
						<img src="./icon/404.svg" alt="logos" draggable={false} />
						<IonText color="primary" className={style.text}>
							Oops, it seems you've ventured off the path!
						</IonText>
						<div className={style.buttonGroup}>
							<IonButton
								size="default"
								className={`light ${style.button}`}
								onClick={() => history.push("/")}
							>
								Back To Home
							</IonButton>
							<IonButton
								size="default"
								className={`light ${style.button}`}
								fill="outline"
								onClick={() => history.goBack()}
							>
								Back
							</IonButton>
						</div>
					</div>
				</main>
			</IonContent>
		</IonPage>
	);
};

export default NotFound;
