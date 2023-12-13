import {
	IonCard,
	IonCardContent,
	IonItem,
	IonItemGroup,
	IonLabel,
	IonText,
} from "@ionic/react";
import React from "react";
import style from "./ExamListsCard.module.css";
import { Exams } from "../../../_dummydata";

interface ExamListCardInterface {
	passed?: boolean;
}

const ExamListsCard: React.FC<ExamListCardInterface> = (props) => {
	const { passed = false } = props;

	const currentDateTime = new Date();

	const PassedList = Exams.filter(
		(exam) => exam.schedule.getTime() <= currentDateTime.getTime()
	).sort((a, b) => a.schedule.getTime() - b.schedule.getTime());

	const UpcomingList = Exams.filter(
		(exam) => exam.schedule.getTime() > currentDateTime.getTime()
	).sort((a, b) => a.schedule.getTime() - b.schedule.getTime());

	const ExamList = passed ? PassedList : UpcomingList;


	return (
		<>
			<IonCard className="ion-padding" color={"light"}>
				<IonItem lines="none" color={"light"}>
					{passed ? "Exams Done" : "Upcoming Exams"} :
				</IonItem>
				<IonCardContent>
					<IonItemGroup className={style.Group}>
						{ExamList.map((exam, index) => {
							const scheduleDate = exam.schedule;
							const day = scheduleDate.getDate();
							const month = scheduleDate.getMonth() + 1;
							const year = scheduleDate.getFullYear();
							const hour = scheduleDate.getHours();
							const minute = scheduleDate.getMinutes();

							return (
								<IonItem button={true} detail={false}>
									<IonLabel>
										<strong>{exam.label}</strong>
										<div className={style.ItemContent}>
											<IonText>By : {exam.creator}</IonText>
											<IonText className={style.date}>
												{`${day < 10 ? "0" + day : day}/${month}/${year}`} -{" "}
												{`${hour < 10 ? "0" + hour : hour}:${
													minute < 10 ? "0" + minute : minute
												}`}
											</IonText>
										</div>
										<br />
									</IonLabel>
								</IonItem>
							);
						})}
					</IonItemGroup>
				</IonCardContent>
			</IonCard>
		</>
	);
};

export default ExamListsCard;
