import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonContent,
	IonHeader,
	IonItem,
	IonPage,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import React from "react";
import style from "./StatsCard.module.css";

interface StatsCardInterface {
	label: string;
	value: string | number;
}

const StatsCard: React.FC<StatsCardInterface> = (props) => {
	const { label, value } = props;

	return (
		<>
			<IonCard color="light" className={`${style.cardCtn} ion-padding`}>
				<div className={style.heads}>
					<IonItem color="light" lines="none">{label} :</IonItem>
				</div>
				<IonCardContent className={style.value}>
					<IonItem color="light" lines={"none"} className={`${style.value}`}>
						{value}
					</IonItem>
				</IonCardContent>
			</IonCard>
		</>
	);
};

export default StatsCard;
