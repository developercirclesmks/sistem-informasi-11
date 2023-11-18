import {
	IonButton,
	IonCard,
	IonCardContent,
	IonInput,
	IonItem,
	IonLabel,
	IonSegment,
	IonSegmentButton,
	IonText,
} from "@ionic/react";
import React, { useState } from "react";
import style from "./DashboardHero.module.css";
import LinkCard from "../../../molecules/LinkCard/LinkCard";
import { useHistory } from "react-router-dom";
import Create from "../../Create/Create";

const DashboardHero: React.FC = () => {
	const history = useHistory();
	const [inputValue, setInputValue] = useState("");
	const [segment, setSegment] = useState("join");

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (inputValue) {
			history.push(`/join/${inputValue}`);
		}
	};
	const handleInputChange = (event: any) => {
		setInputValue(event.target.value);
	};

	const handleChangeSegment = (target: string) => {
		setSegment(target);
	};
	const setDisable = inputValue !== "" ? false : true;

	return (
		<main>
			<IonCard color="light" className={`${style.codeCard}`}>
				<IonSegment value={segment} className="fullgrid">
					<IonSegmentButton
						onClick={() => handleChangeSegment("join")}
						value={"join"}
						className="custom"
					>
						Join Exam
					</IonSegmentButton>
					<IonSegmentButton
						onClick={() => handleChangeSegment("create")}
						value={"create"}
						className="custom"
					>
						Create Exam
					</IonSegmentButton>
				</IonSegment>
				<IonCardContent className="ion-padding">
					{segment === "join" && (
						<form onSubmit={handleSubmit}>
							<main className={style.input}>
								<IonInput
									className="custom"
									type="search"
									debounce={0}
									placeholder="Enter Exams ID"
									clearInput={true}
									color={"primary"}
									maxlength={12}
									fill="outline"
									value={inputValue}
									onIonInput={handleInputChange}
								></IonInput>
								<main className={style.btnContainer}>
									<IonButton
										size="default"
										color="primary"
										onClick={handleSubmit}
										disabled={setDisable}
									>
										Submit
									</IonButton>
								</main>
							</main>
						</form>
					)}
					{segment === "create" && <Create />}
				</IonCardContent>
			</IonCard>
		</main>
	);
};

export default DashboardHero;
