import {
	IonButton,
	IonCard,
	IonCardContent,
	IonIcon,
	IonImg,
	IonLabel,
} from "@ionic/react";
import style from "./ExamCard.module.css";
import { calendarOutline, timerOutline } from "ionicons/icons";
import { useHistory } from "react-router";

interface ExamCardProps {
  examId: string;
	examName: string;
	examDate?: string;
	examDuration: number;
	examDescription: string;
}

export const ExamCard: React.FC<ExamCardProps> = ({
  examId,
	examName,
	examDate,
	examDuration,
	examDescription,
}) => {
  const history = useHistory()
	return (
		<main className={style.card}>
			<IonCard color={"light"}>
				<IonCardContent>
					<main className={style.cardContent}>
						<section className={style.title}>
							<div className={style.imgCtn}>
								<IonImg draggable={false} src="/icon/Logo.svg" />
							</div>
							<div className={style.titleText}>{examName}</div>
						</section>
						<section className={style.info}>
							<section className={style.itemInfo}>
								<IonIcon icon={calendarOutline} />
								<IonLabel className={style.label}>{examDate}</IonLabel>
							</section>
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
				</IonCardContent>
				<IonButton fill="clear" className="full" onClick={()=>history.push(`/exam/${examId}`)}>
					View Detail
				</IonButton>
			</IonCard>
		</main>
	);
};
