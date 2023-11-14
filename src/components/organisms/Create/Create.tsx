import {
	InputChangeEventDetail,
	IonButton,
	IonCol,
	IonInput,
	IonItem,
	IonLabel,
	IonRadio,
	IonRadioGroup,
	IonRow,
	IonText,
	IonTextarea,
	IonToast,
} from "@ionic/react";
import style from "./Create.module.css";
import React, { useState } from "react";

const Create: React.FC = () => {
	const today = new Date().toISOString().split("T")[0]; // Get today's date in the format "YYYY-MM-DD"

	const [examName, setExamName] = useState("");
	const [examDate, setExamDate] = useState(today);
	const [examDesc, setExamDesc] = useState("");
	const [toastMessages, setToastMessages] = useState("");
	const [toastOpen, setToastOpen] = useState(false);

	const [minute, setMinute] = useState(0);
	const [hour, setHour] = useState(0);

	const handleDateBlur = () => {
		const enteredDate = new Date(examDate);
		if (enteredDate < new Date(today)) {
			setExamDate(today);
		}
	};

	const [radioValue, setRadioValue] = useState("Manual");
	const handleChangeRadio = (prop: string) => {
		setRadioValue(prop);
	};

	const handleMinuteInput = (e: number) => {
		if (hour < 4) {
			if (e >= 60) {
				setHour(hour + 1);
				setMinute(0);
			} else if (e < 0) {
				setMinute(0);
				return;
			}
		} else if (hour === 4) {
			if (e >= 60) {
				setMinute(0);
			} else if (e < 0) {
				setMinute(0);
				return;
			}
		}
	};

	const handleHourInput = (e: number) => {
		if (e > 4) {
			setHour(4);
		} else if (e < 0) {
			setHour(0);
		} else {
			setHour(e);
		}
	};

	const handleCreateExam = () => {
		if (toastOpen === true) {
			setToastOpen(false);
		}

		console.log(hour, minute, examName, examDesc);
		let error: string[] = [];
		//checking
		const durationInMinute: number = hour * 60 + minute;

		if (!examName.trim()) {
			// Check if examName is empty or contains only whitespace
			error.push("Name");
		}
		if (durationInMinute <= 0) {
			error.push("Duration");
		}
		if (!examDesc.trim()) {
			error.push("Description");
		}

		const totalMinute = hour * 60 + minute;

		if (error.length !== 0) {
			const errorMsg = error.join(", ") + " Needs to Be Filled";
			setToastMessages(errorMsg);
			setToastOpen(true);
		} else {
			if (totalMinute > 240) {
				setToastMessages("Duration Cant Exceed More Than 4 Hour");
				setToastOpen(true);
			} else {
				setToastMessages("Success");
				setToastOpen(true);
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
							<p>Duration - Max 4 Hour</p>
							<IonRow className="full gap">
								<IonCol className="full">
									<IonInput
										className="custom"
										type="number"
										label="Hour"
										labelPlacement="stacked"
										color={"primary"}
										fill="outline"
										value={hour}
										onIonInput={(e) =>
											handleHourInput(
												e.detail.value ? parseInt(e.detail.value) : 0
											)
										}
										min={0}
										max={4}
									></IonInput>
								</IonCol>
								<IonCol className="full">
									<IonInput
										pattern="[0-9]*"
										className="custom"
										type="number"
										label="Minutes"
										labelPlacement="stacked"
										color="primary"
										clearOnEdit
										fill="outline"
										value={minute}
										onIonInput={(e) =>
											handleMinuteInput(
												e.detail.value ? parseInt(e.detail.value) : 0
											)
										}
										max={60}
										min={0}
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
										type="date"
										label="From"
										labelPlacement="stacked"
										clearInput={true}
										color={"primary"}
										fill="outline"
										value={examDate}
										onIonChange={(e) => setExamDate(e.detail.value!)}
										onIonBlur={handleDateBlur}
										min={today}
									></IonInput>
								</IonCol>
								<IonCol className="full">
									<IonInput
										className="custom"
										type="date"
										label="To"
										labelPlacement="stacked"
										clearInput={true}
										color={"primary"}
										fill="outline"
										value={examDate}
										onIonInput={(e) => setExamDate(e.detail.value!)}
										onIonBlur={handleDateBlur}
										min={today}
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

						<IonRow className={`full`}>
							<IonCol className="full">
								<IonButton
									onClick={handleCreateExam}
									expand="block"
									size="default"
									color="primary"
								>
									Submit
								</IonButton>
							</IonCol>
						</IonRow>
					</main>
				</form>
			</main>

			<IonToast
				isOpen={toastOpen}
				position="top"
				message={toastMessages}
				duration={5000}
				buttons={[
					{
						text: "X",
						role: "cancel",
						handler: () => {
							console.log("Dismiss clicked");
						},
					},
				]}
				onDidDismiss={() => setToastOpen(false)}
				className="custom"
			></IonToast>
		</>
	);
};

export default Create;
