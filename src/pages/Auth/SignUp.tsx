import {
	IonButton,
	IonCol,
	IonContent,
	IonInput,
	IonPage,
	IonRow,
	IonText,
} from "@ionic/react";
import React, { useState } from "react";
import style from "./SignUp.module.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Input from "../../components/organisms/Input/Input";
import { createUser } from "../../services/userService";
import GlobalToasts, { showToast } from "../../components/atoms/Toasts/Toasts";

const SignUp: React.FC = () => {
	const history = useHistory();
	const [isTouched, setIsTouched] = useState(false);
	const [isValid, setIsValid] = useState<boolean>();

	//all user property
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");

	//Input Handler
	const handleFirstNameInput = (e: string) => {
		setFirstNameClass("");
		setFirstName(e);
	};
	const handleLastNameInput = (e: string) => {
		setLastNameClass("");
		setLastName(e);
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

	const [emailError, setEmailError] = useState<string>("");
	const [emailClass, setEmailClass] = useState<string>("");
	const [passError, setPassError] = useState<string>("");
	const [passClass, setPassClass] = useState<string>("");
	const [firstNameError, setFirstNameError] = useState("");
	const [firstNameClass, setFirstNameClass] = useState("");

	const [lastNameError, setLastNameError] = useState("");
	const [lastNameClass, setLastNameClass] = useState("");
	const [confirmClass, setConfirmClass] = useState("");
	const [confirmError, setConfirmError] = useState("");
	const [error, setError] = useState<string>("");

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!firstName || !lastName || !email || !password) {
			if (!firstName) {
				setFirstNameError("First Name Required");
				setFirstNameClass("ion-touched ion-invalid");
			}
			if (!lastName) {
				setLastNameError("Last Name Required");
				setLastNameClass("ion-touched ion-invalid");
			}
			if (!email) {
				setEmailError("Email Required");
				setEmailClass("ion-touched ion-invalid");
			}
			if (!password) {
				setPassError("Password Required");
				setPassClass("ion-touched ion-invalid");
			}
		} else {
			if (confirm !== password) {
				setConfirmError("password doesn't match");
				setConfirmClass("ion-touched ion-invalid");
			} else {
				try {
					await createUser(email, password, firstName, lastName);
					// Redirect to success page or login after successful signup
					showToast("success","Sign Up Success");
					history.push("/");
				} catch (e) {
					showToast("error", e);
				}
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
							<IonRow className="gap">
								<IonCol className="noMargin noPadding">
									<IonInput
										className={lastNameClass}
										placeholder="Enter Your First Name"
										label="First Name"
										labelPlacement="stacked"
										errorText={lastNameError}
										fill="outline"
										type="text"
										onIonInput={(e) => handleFirstNameInput(e.detail.value!)}
									></IonInput>
								</IonCol>
								<IonCol className="noMargin noPadding">
									<IonInput
										className={firstNameClass}
										placeholder="Enter Your Last Name"
										label="Last Name"
										labelPlacement="stacked"
										errorText={firstNameError}
										fill="outline"
										type="text"
										onIonInput={(e) => handleLastNameInput(e.detail.value!)}
									></IonInput>
								</IonCol>
							</IonRow>
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
					{/* <section>
						User: {userName}, Email:{email}, Pass: {password}
					</section> */}
				</Input>
			</IonContent>
		</IonPage>
	);
};

export default SignUp;
