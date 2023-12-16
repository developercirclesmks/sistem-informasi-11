import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonInput,
	IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import style from "./DashboardHero.module.css";
import { useHistory } from "react-router-dom";
import Create from "../../Create/Create";

const DashboardHero: React.FC = () => {

	const history = useHistory();
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (inputValue) {
			history.push(`/exam/${inputValue}`);
		}
	};
	const handleInputChange = (event: any) => {
		setInputValue(event.target.value);
	};


	return (
		<main id="create-exam">
			<IonCard color="light" className={`${style.codeCard}`}>
				<IonCardHeader>
					<IonText color={"primary"}>
						<h4>Create Exam :</h4>
					</IonText>
				</IonCardHeader>
				<IonCardContent className="ion-padding">
					<Create />
				</IonCardContent>
			</IonCard>
		</main>
	);
};

export default DashboardHero;
