import {
	IonButton,
	IonCard,
	IonCol,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonRadio,
	IonRadioGroup,
	IonRow,
	IonText,
	IonTextarea,
} from "@ionic/react";
import style from "./styles/EditExamPage.module.css";
import React, { useEffect, useState } from "react";
import { showToast } from "../components/atoms/Toasts/Toasts";
import { Link, useHistory, useParams } from "react-router-dom";
import { getOneExam, updateExam } from "../services/examService";
import { IExam } from "../interfaces/exam";
import LoadingBox from "../components/organisms/LoadingBox/LoadingBox";
import { arrowBackOutline } from "ionicons/icons";
import PageContainer from "../components/PageContainer";
import { Timestamp } from "firebase/firestore";
import { formatDate, formatToHour } from "../formatter/formatter";

interface routerProps {
	examId: string;
}

const EditExamPage: React.FC = () => {
	const history = useHistory();

	const [loading, setLoading] = useState<boolean>(false);
	const { examId } = useParams<routerProps>();

	const currentTime = new Date().toISOString().slice(0, 16);

	const [exam, setExam] = useState<IExam | undefined>(undefined);

	useEffect(() => {
		const fetchExam = async () => {
			try {
				setLoading(true);
				const fetchedExam = await getOneExam(examId);
				if (fetchedExam) {
					setExam(fetchedExam);
					setExamName(fetchedExam.name || "");
					setExamDesc(fetchedExam.desc || "");
					if (fetchedExam.startedAt) {
						setExamDate(fetchedExam.startedAt.toString().slice(0, 16) || "");
					}
					if (fetchedExam.totalDuration) {
						setDuration(fetchedExam.totalDuration);
					}
				} else {
					showToast("error", "Exam not founde");
				}
			} catch (error) {
				showToast("error", "Some error occured");
			} finally {
				setLoading(false);
			}
		};
		fetchExam();
	}, [examId]);

	const [radioValue, setRadioValue] = useState<string>("Manual");

	const handleChangeRadio = (prop: string) => {
		setRadioValue(prop);
	};
	const handleDurationInput = (e: number) => {
		if (e < 0) {
			showToast("error", " Invalid Duration");
		} else if (e > 240) {
			showToast("error", "Duration Can't Exceed More Than 4 Hours");
		} else {
			setDuration(e);
		}
	};

	const [examName, setExamName] = useState<string>("");
	const [examDesc, setExamDesc] = useState<string>("");
	const [examDate, setExamDate] = useState<string>(
		exam?.startedAt ? exam.startedAt.toString().slice(0, 16) : ""
	);
	const [duration, setDuration] = useState<number>(exam?.totalDuration ?? 0);

	const handleSaveChanges = async () => {
		console.log("update");
		const convertedDate = examDate
			? Timestamp.fromDate(new Date(examDate))
			: null;
		try {
			setLoading(true);
			const startedAt = convertedDate ? convertedDate.toDate() : new Date();
			const endedAt = new Date(startedAt.getTime() + duration * 60 * 1000);

			const updatedExam: Partial<
				Omit<IExam, "id" | "createdAt" | "updatedAt" | "questionList">
			> = {
				name: examName,
				desc: examDesc,
				totalDuration: duration,
				startedAt: radioValue === "Scheduled" ? convertedDate : null,
				endedAt:
					radioValue === "Scheduled" ? Timestamp.fromDate(endedAt) : null,
			};

			await updateExam({ id: examId, exam: updatedExam as IExam });
			showToast("success", `Exam ${exam?.id} updated successfully`);
		} catch (error) {
			console.log(error);
			showToast("error", error);
			console.error("Error updating exam:", error);
		} finally {
			window.location.reload();
		}
	};

	if (loading) {
		return <LoadingBox />;
	} else {
		if (exam) {
			return (
				<PageContainer nopadding>
					<main className={style.main}>
						<aside className={style.aside}>
							<IonItem className="">
								<IonButton onClick={()=>history.push("/dashboard")} size="default" fill="clear" className="">
									<IonIcon icon={arrowBackOutline}></IonIcon>
									<IonText className="">&nbsp;Back</IonText>
								</IonButton>
							</IonItem>
							<section>
								<IonItem
									title={exam.name}
									lines="none"
									button
									className="noPadding noMargin"
								>
									<IonLabel>Name :</IonLabel>
									<p className={style.ellipsis}>{exam.name}</p>
								</IonItem>
								<IonItem lines="none" button className="noPadding noMargin">
									<IonLabel>Started At:</IonLabel>
									{exam?.startedAt
										? exam?.startedAt &&
										  `${formatDate(
												exam.startedAt.toDate().toISOString(),
												"medium"
										  )} at ${
												exam?.startedAt &&
												formatToHour(exam.startedAt.toDate().toISOString())
										  }`
										: "Manual"}
								</IonItem>
							</section>
							<div className={style.gridctn}>
								<section className={`ion-padding ${style.numberGrid}`}>
									{exam?.questionList.map((question, Index) => (
										<div key={Index} className={style.numberButton}>
											<Link to={`/exam/${examId}/edit/${Index + 1}`}>
												<IonButton
													id={question.name}
													className="fixwidth"
													fill="outline"
													color="dark"
												>
													{Index + 1}
												</IonButton>
											</Link>
										</div>
									))}
								</section>
								<IonItem lines="none">
									<IonButton
										size="default"
										className="full light"
										fill="outline"
										onClick={() => history.push(`/exam/${examId}/edit/new`)}
									>
										Add Question +
									</IonButton>
								</IonItem>
							</div>
						</aside>
						<IonCard className="ion-padding full">
							<form>
								<main className={style.input}>
									<IonText></IonText>
									<main className={style.labeledInput}>
										<p>Name: </p>
										<IonRow className="full gap">
											<IonCol className="full">
												<IonInput
													className="custom"
													type="text"
													debounce={0}
													placeholder="Enter Exam Name"
													color={"primary"}
													maxlength={30}
													fill="outline"
													value={examName}
													onIonInput={(e) => setExamName(e.detail.value!)}
												></IonInput>
											</IonCol>
										</IonRow>
									</main>

									<main className={style.labeledInput}>
										<p>Duration - Max 240 Minutes (4 Hour)</p>
										<IonRow className="full gap">
											<IonCol className="full">
												<IonInput
													className="custom"
													type="number"
													color={"primary"}
													helperText="Max 240 Minutes (4 Hours)"
													fill="outline"
													value={duration}
													onIonInput={(e) =>
														handleDurationInput(
															e.detail.value ? parseInt(e.detail.value) : 0
														)
													}
													min={0}
													max={240}
												></IonInput>
											</IonCol>
										</IonRow>
									</main>
									<main className={style.labeledInput}>
										<p>How Do You Want To Start Your Exam?</p>
										<IonRow className="full">
											<IonCol>
												<IonRadioGroup value={radioValue}>
													<IonRadio
														onClick={() => handleChangeRadio("Manual")}
														value="Manual"
														labelPlacement="end"
													>
														Start Manually
													</IonRadio>
													<br></br>
													<IonRadio
														onClick={() => handleChangeRadio("Scheduled")}
														value="Scheduled"
														labelPlacement="end"
													>
														Make A Schedule
													</IonRadio>
												</IonRadioGroup>
											</IonCol>
										</IonRow>
									</main>
									{radioValue !== "Scheduled" ? null : (
										<IonRow
											className={`full gap ${style.appear} ${
												radioValue !== "Scheduled" && style.disappear
											}`}
										>
											<IonCol className="full">
												<IonInput
													className="custom"
													type="datetime-local"
													label="Start At"
													labelPlacement="stacked"
													clearInput={true}
													required
													helperText="Input Date And Time"
													errorText="Invalid Date And Time"
													color={"primary"}
													fill="outline"
													value={examDate}
													onIonChange={(e) => setExamDate(e.detail.value!)}
													min={currentTime}
												></IonInput>
											</IonCol>
										</IonRow>
									)}
									<main className={style.labeledInput}>
										<p>Description:</p>
										<IonRow className="full gap">
											<IonTextarea
												className="custom"
												autoGrow
												placeholder="Enter Exam Description"
												color={"primary"}
												fill="outline"
												value={examDesc}
												counter
												maxlength={300}
												onIonInput={(e) => setExamDesc(e.detail.value!)}
											></IonTextarea>
										</IonRow>
									</main>

									<IonRow className={`full`}>
										<IonCol className="fullwidth noPadding">
											<IonButton
												expand="block"
												size="default"
												color="primary"
												onClick={handleSaveChanges}
											>
												Save Changes
											</IonButton>
										</IonCol>
									</IonRow>
								</main>
							</form>
						</IonCard>
					</main>
				</PageContainer>
			);
		} else {
			return <div>Exam Not Found...</div>;
		}
	}
};

export default EditExamPage;
