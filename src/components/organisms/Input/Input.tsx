import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCheckbox,
	IonCol,
	IonContent,
	IonIcon,
	IonImg,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
} from "@ionic/react";
import React, { ReactNode } from "react";
import style from "./Input.module.css";
import { useHistory } from "react-router";

interface InputProps {
	children: ReactNode;
}

const Input: React.FC<InputProps> = ({ children }) => {
	let history = useHistory();

	const handleClick: any = () => {
		history.push("/");
	};
	
	return (
		<main className={`${style.main}`}>
			<IonCard className={`noPadding noMargin ${style.Authwrapper}`}>
				<IonCardContent className="noPadding noMargin">
					<IonRow className={style.authBox}>
						<IonCol
							draggable={false}
							className={`noPadding noMargin ${style.authImage}`}
						>
							<IonImg draggable={false} src="./icon/Auth Icon.svg"></IonImg>
						</IonCol>
						<IonCol className={style.form}>
							<IonIcon className={style.logo} src="./icon/Logo.svg"></IonIcon>
							<section className={style.input}>{children}</section>
						</IonCol>
					</IonRow>
				</IonCardContent>
			</IonCard>
		</main>
	);
};

export default Input;
