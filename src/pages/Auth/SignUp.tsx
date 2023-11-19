import {
	IonButton,
	IonCheckbox,
	IonCol,
	IonContent,
	IonImg,
	IonInput,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
} from "@ionic/react";
import React, { useState } from "react";
import style from "./SignUp.module.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Input from "../../components/organisms/Input/Input";
const SignUp: React.FC = () => {
	let history = useHistory();
	const [isTouched, setIsTouched] = useState(false);
	const [isValid, setIsValid] = useState<boolean>();

	//all user property
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");

	//Input Handler
	const handleUsernameInput = (e: string) => {
		setNameClass("");
		setUserName(e);
	};
	const handleEmailInput = (e: string) => {
		setEmailClass("");
		setEmail(e);
	};
	const handlePassInput = (e: string) => {
		setPassClass("");
		setPassword(e);
	};
	const handleConfirmPass = (e: string) => {
		setConfirmClass("");
		setConfirm(e);
	};

	const [emailError, setEmailError] = useState("");
	const [emailClass, setEmailClass] = useState("");
	const [passError, setPassError] = useState("");
	const [passClass, setPassClass] = useState("");
	const [nameError, setNameError] = useState("");
	const [nameClass, setNameClass] = useState("");
	const [confirmClass, setConfirmClass] = useState("");
	const [confirmError, setConfirmError] = useState("");

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (!userName || !email || !password) {
			if (!userName) {
				setNameError("Please enter your name");
				setNameClass("ion-touched ion-invalid");
			}
			if (!email) {
				setEmailError("Please enter your email");
				setEmailClass("ion-touched ion-invalid");
			}
			if (!password) {
				setPassError("Please enter your password");
				setPassClass("ion-touched ion-invalid");
			}
		} else {
			if (confirm !== password) {
				setConfirmError("Your confirmation does not match the password");
				setConfirmClass("ion-touched ion-invalid");
			}
		}
	};
	return (
		<IonPage>
			<IonContent className="" fullscreen>
				<Input>
					<section className={style.welcomeText}>
						<IonText color="dark">
							<h1>Sign Up For Your Account</h1>
						</IonText>
						<IonText color="dark">Welcome to OnExam</IonText>
					</section>
					<form onSubmit={(e) => handleSubmit(e)}>
						<section className={style.input}>
							<IonInput
								className={nameClass}
								placeholder="Enter Your Username"
								label="Username"
								labelPlacement="stacked"
								errorText={nameError}
								fill="outline"
								type="text"
								onIonInput={(e) => handleUsernameInput(e.detail.value!)}
							></IonInput>
							<IonInput
								className={emailClass}
								placeholder="Enter Your Email"
								label="Email"
								labelPlacement="stacked"
								required={false}
								fill="outline"
								type="email"
								errorText={emailError}
								onIonInput={(e) => handleEmailInput(e.detail.value!)}
							></IonInput>

							<IonInput
								className={passClass}
								label="Password"
								labelPlacement="stacked"
								type="password"
								errorText={passError}
								fill="outline"
                                clearOnEdit
								onIonInput={(e) => handlePassInput(e.detail.value!)}
								placeholder="Enter Your Password"
							></IonInput>
							<IonInput
								className={confirmClass}
								errorText={confirmError}
								label="Confirm Password"
								labelPlacement="stacked"
								type="password"
								fill="outline"
								onIonInput={(e) => handleConfirmPass(e.detail.value!)}
								placeholder="Confirm Your Password"
							></IonInput>
						</section>
						<section>
							<IonButton type="submit" className="full">
								<p>Sign Up</p>
							</IonButton>
						</section>
					</form>
					<section className={style.options}>
						<IonText>Already Have An Account?</IonText>
						<Link className="clearText" to={"./login"}>
							<IonText>Sign In</IonText>
						</Link>
					</section>
					<section>
						User: {userName}, Email:{email}, Pass: {password}
					</section>
				</Input>
			</IonContent>
		</IonPage>
	);
};

export default SignUp;
