import React, { useState, ChangeEvent, useEffect } from "react";
import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonInput,
	IonItem,
	IonTextarea,
	IonIcon,
	IonSelect,
	IonSelectOption,
	IonText,
} from "@ionic/react";
import { close, trashOutline } from "ionicons/icons"; // Import IonIcon from ionicons

import style from "./CreateQuestionCard.module.css";

interface CreateQuestionCardProps {
	questionNumber: number;
	onDelete: () => void;
	questionId: string;
	id:string
}

const CreateQuestionCard: React.FC<CreateQuestionCardProps> = (props) => {
	const { questionNumber, onDelete ,questionId, id} = props;
	const [questionTitle, setQuestionTitle] = useState("");
	const [options, setOptions] = useState(["", ""]);
	const [selectedOption, setSelectedOption] = useState<number | null>(null);

	const handleQuestionChange = (e: CustomEvent) => {
		const newValue = e.detail.value as string;
		setQuestionTitle(newValue);
	};

	const handleOptionChange = (index: number, value: string) => {
		const newOptions = [...options];
		newOptions[index] = value;
		setOptions(newOptions);
	};

	const addOption = () => {
		if (options.length < 5) {
			setOptions([...options, ""]);
		}
	};

	const deleteOption = (index: number) => {
		const newOptions = [...options];
		newOptions.splice(index, 1);
		setOptions(newOptions);
	};

	const handleSelectChange = (e: CustomEvent) => {
		const selectedIndex = e.detail.value;
		setSelectedOption(selectedIndex !== undefined ? +selectedIndex : null);
	};

	const isSaveButtonDisabled = selectedOption === null;

	useEffect(() => {
		console.log(questionTitle);
		console.log(options);
	}, [questionTitle, options]);

	return (
		<IonCard id={id} className={`${style.cardmain} noMargin`}>
			<IonCardHeader>Question : {questionNumber} , {questionId}</IonCardHeader>
			<IonCardContent>
				<IonTextarea
					autoGrow
					fill="outline"
					label="Enter Question Here"
					labelPlacement="floating"
					counter
					placeholder="Enter Question"
					onIonChange={handleQuestionChange}
				></IonTextarea>
				<section>
					{options.map((option, index) => (
						<IonItem key={index} lines="none" className={style.option}>
							<div className={style.optionlabel}>
								{String.fromCharCode(65 + index)}
							</div>
							<IonTextarea
								autoGrow
								placeholder={`Option ${index + 1}`}
								value={option}
								onIonChange={(e) => handleOptionChange(index, e.detail.value!)}
							></IonTextarea>
							{index > 1 && (
								<div>
									<IonButton
										fill="clear"
										color={"dark"}
										onClick={() => deleteOption(index)}
									>
										<IonIcon icon={close} color="dark" />
									</IonButton>
								</div>
							)}
						</IonItem>
					))}
					<IonButton
						fill="clear"
						className={style.bold}
						onClick={addOption}
						color={options.length < 5 ? "primary" : "dark"}
						disabled={options.length >= 5}
					>
						{options.length < 5 ? "Add Option +" : "Options Capped At 5"}
					</IonButton>
				</section>
				<section>
					<IonItem>
						<IonSelect
							interface="popover"
							aria-label="Correct"
							placeholder="Select Correct Answer"
							onIonChange={handleSelectChange}
						>
							{options.map((option, index) => (
								<IonSelectOption key={index} value={index}>
									Option {index + 1}
								</IonSelectOption>
							))}
						</IonSelect>
					</IonItem>
				</section>
				<section className={style.buttons}>
					<IonButton className="extra-light" disabled={isSaveButtonDisabled}>Save Question</IonButton>
					<IonButton
						fill="outline"
						className={style.bold}
						onClick={props.onDelete}
					>
						<IonText>Delete Question</IonText>
						<IonIcon icon={trashOutline}></IonIcon>
					</IonButton>
				</section>
			</IonCardContent>
		</IonCard>
	);
};

export default CreateQuestionCard;
