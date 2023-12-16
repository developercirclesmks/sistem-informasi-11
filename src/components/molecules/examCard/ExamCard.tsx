import {
	IonButton,
	IonCard,
	IonCardContent,
	IonIcon,
	IonImg,
	IonItem,
	IonLabel,
	IonNavLink,
	IonRouterLink,
	IonText,
} from "@ionic/react";
import style from "./ExamCard.module.css";
import { calendarOutline, timerOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { Timestamp } from "firebase/firestore";

interface ExamCardProps {
	examId: string;
	examName: string;
	examDate?: string;
	examDeadline: Timestamp | null;
	examDuration: number;
	examDescription: string;
}

export const ExamCard: React.FC<ExamCardProps> = ({
	examId,
	examName,
	examDate,
	examDuration,
	examDeadline,
	examDescription,
}) => {
	const rightNow = Timestamp.now();
	return (
		<main>
			<IonRouterLink href={`/exam/${examId}`}>
				<IonItem button color={"light"}>
					<main className={`ion-padding ${style.cardContent}`}>
						<section className={style.title}>
							<div className={style.imgCtn}>
								<IonImg draggable={false} src="/icon/Logo.svg" />
							</div>
							<IonText className={style.titleText}>{examName}</IonText>
						</section>
						<section className={style.info}>
							<section className={style.itemInfo}>
								<IonIcon
									color={
										examDeadline &&
										examDeadline.toMillis() < rightNow.toMillis()
											? "danger"
											: ""
									}
									icon={calendarOutline}
								/>
								<IonLabel
									color={
										examDeadline &&
										examDeadline.toMillis() < rightNow.toMillis()
											? "danger"
											: ""
									}
									className={style.label}
								>
									{examDate}
								</IonLabel>
							</section>
							{examDeadline ? (
								<section className={style.itemInfo}>
									<IonIcon
										color={
											examDeadline &&
											examDeadline.toMillis() < rightNow.toMillis()
												? "danger"
												: ""
										}
										src="/icon/deadline.svg"
									/>
									<IonLabel
										color={
											examDeadline &&
											examDeadline.toMillis() < rightNow.toMillis()
												? "danger"
												: ""
										}
										className={style.label}
									>
										{examDeadline
											? `${examDeadline
													.toDate()
													.toLocaleDateString()} at ${examDeadline
													.toDate()
													.toLocaleTimeString()}`
											: null}
									</IonLabel>
								</section>
							) : null}
							<section className={style.itemInfo}>
								<IonIcon icon={timerOutline} />
								<IonLabel className={style.label}>
									{examDuration} minute
								</IonLabel>
							</section>
						</section>
						<section>
							Description :
							<section className={style.descText}>{examDescription}</section>
						</section>
					</main>
				</IonItem>
			</IonRouterLink>
		</main>
	);
};
