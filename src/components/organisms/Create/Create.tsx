import {
	IonButton,
	IonCol,
	IonInput,
	IonRadio,
	IonRadioGroup,
	IonRow,
	IonTextarea,
} from "@ionic/react";
import style from "./Create.module.css";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { showToast } from "../../atoms/Toasts/Toasts";
import { createExam } from "../../../services/examService";
import { Timestamp } from "firebase/firestore";

const Create: React.FC = () => {
	const currentTime = new Date().toISOString().slice(0, 16);

	const [examName, setExamName] = useState("");
	const [examDate, setExamDate] = useState("");
	const [examDesc, setExamDesc] = useState("");

	const [duration, setDuration] = useState(0);

	const [radioValue, setRadioValue] = useState("Manual");
	const handleChangeRadio = (prop: string) => {
		setRadioValue(prop);
	};
	const handleDurationInput = (e: number) => {
		if (e < 0) {
			showToast("error", "Invalid Duration");
		} else if (e > 240) {
			showToast("error", "Duration Can't Exceed More Than 4 Hours");
		} else {
			setDuration(e);
		}
	};

	const handleCreateExam = async () => {
		let newErrors: string[] = [];

		if (!examName.trim()) {
			newErrors.push("Name");
		}
		if (duration === 0) {
			newErrors.push("Duration");
		}
		if (!examDesc.trim()) {
			newErrors.push("Description");
		}

		if (newErrors.length !== 0) {
			const errorMsg =
				newErrors.join(", ") +
				` Need${newErrors.length > 1 ? "(s)" : ""} to Be Filled`;
			showToast("error", errorMsg.trim());
		} else {
			try {
				if (duration > 240 || duration < 0) {
					showToast("error", "Invalid Duration!!");

					return;
				}
				const examDateAsDate = new Date(examDate);
				const examDateTimestamp = Timestamp.fromDate(examDateAsDate);

				const currentTimestamp = Timestamp.now();

				if (
					radioValue === "Scheduled" &&
					examDateTimestamp.toMillis() < currentTimestamp.toMillis()
				) {
					showToast("error", "Selected date and time have already passed.");
					return;
				}

				let endedAtTimestamp: Timestamp | null = null;

				if (radioValue === "Scheduled") {
					const startedAtTimestamp = examDateTimestamp;

					const durationInMilliseconds = duration * 60 * 1000;

					endedAtTimestamp = Timestamp.fromMillis(
						startedAtTimestamp.toMillis() + durationInMilliseconds
					);
				}

				await createExam({
					name: examName,
					desc: examDesc,
					questionList: [
						{
							correctAnswer: 0,
							name: "Demo Question",
							optionList: [
								{
									iscorrect: true,
									name: "Correct One",
									optionLabel :"A"
								},
								{
									iscorrect: false,
									name: "False One",
									optionLabel :"B"
								},
							],
						},
					],
					createdAt: Timestamp.now(),
					startedAt: radioValue === "Scheduled" ? examDateTimestamp : null,
					endedAt: radioValue === "Scheduled" ? endedAtTimestamp : null,
					totalDuration: duration,
				});

				showToast("success", `Exam Created`);
				window.location.reload();
			} catch (error) {
				showToast("error", "Failed to create exam.");
				console.error("Error creating exam:", error);
			}
		}
	};

	return (
		<>
			<main className={style.main}>
				<form>
					<main className={style.input}>
						<main className={style.labeledInput}>
							<p>Name:</p>
							<IonRow className="full gap">
								<IonCol className="full">
									<IonInput
										className="custom"
										type="text"
										debounce={0}
										placeholder="Enter Exams Name"
										color={"primary"}
										clearInput
										maxlength={30}
										fill="outline"
										value={examName}
										counter
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
									placeholder="Enter Exams Description"
									color={"primary"}
									fill="outline"
									value={examDesc}
									counter
									maxlength={300}
									onIonInput={(e) => setExamDesc(e.detail.value!)}
								></IonTextarea>
							</IonRow>
						</main>

						<IonRow className={style.submitBtn}>
							<IonCol className="noPadding">
								<IonButton
									onClick={handleCreateExam}
									expand="block"
									size="default"
									color="primary"
									fill="outline"
								>
									Submit
								</IonButton>
							</IonCol>
						</IonRow>
					</main>
				</form>
			</main>
		</>
	);
};

export default Create;
