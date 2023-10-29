import {
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import React from "react";
import style from "./AuthSide.module.css";

const AuthSide: React.FC = () => {
	return (
		<div>
			<IonItem
				color=""
				className={style.menuItemCtn}
				aria-hidden="true"
				button={true}
				lines="none"
			>
				<IonIcon className={style.sideIcon} src="/icon/login.svg"></IonIcon>
				<IonLabel>Login</IonLabel>
			</IonItem>
      <IonItem
				color=""
				className={style.menuItemCtn}
				aria-hidden="true"
				button={true}
				lines="none"
			>
				<IonIcon className={style.sideIcon} src="/icon/signup.svg"></IonIcon>
				<IonLabel>SignUp</IonLabel>
			</IonItem>

		</div>
	);
};

export default AuthSide;
