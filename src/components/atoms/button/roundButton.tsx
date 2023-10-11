import {
	IonButton,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import React from "react";
import style from "./roundButton.module.css";

interface RoundButtonProps {
	children: React.ReactNode;
	onclick?:()=>void;
	};

const RoundButton: React.FC<RoundButtonProps> = (props) => {
	const { children,onclick } = props;
	return (
			<IonButton onClick={onclick} color="" size="large" shape="round">
				<span className={style.buttons}>{children}</span>
			</IonButton>
	);
};

export default RoundButton; // Renamed to start with a capital letter (convention)
 