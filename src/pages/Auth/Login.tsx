import {
	IonButton,
	IonCheckbox,
	IonCol,
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonPage,
	IonRow,
	IonSpinner,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import Input from "../../components/organisms/Input/Input";
import style from "./Login.module.css";
import { Link, Redirect } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase-config";
import { useHistory } from "react-router-dom";
import { db } from "../../../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { showToast } from "../../components/atoms/Toasts/Toasts";

const Login: React.FC = () => {
	const history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [emailError, setEmailError] = useState("");
	const [emailClass, setEmailClass] = useState("");
	const [passError, setPassError] = useState("");
	const [passClass, setPassClass] = useState("");

	const [isloading, setIsLoading] = useState(false);

	const handleEmailInput = (e: string) => {
		setEmailClass("");
		setEmail(e);
	};
	const handlePassInput = (e: string) => {
		setPassClass("");
		setPassword(e);
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!email || !password) {
			if (!email) {
				setEmailError("Please enter your email");
				setEmailClass("ion-touched ion-invalid");
			}
			if (!password) {
				setPassError("Please enter your password");
				setPassClass("ion-touched ion-invalid");
			}
		} else {
			try {
				setIsLoading(true);

				const userRef = collection(db, "users");
				const querySnapshot = await getDocs(userRef);
				const existingUser = querySnapshot.docs.find(
					(doc) => doc.data().email === email
				);

				if (existingUser) {
					if (existingUser.data().role === "user") {
						setIsLoading(true);
						await signInWithEmailAndPassword(auth, email, password);
					} else {
						showToast("error", "Invalid Credentials");
					}
				} else {
					showToast("error", "Invalid Credentials");
				}
			} catch (error: any) {
				showToast("error", "Authentication error:" + error.message);
			} finally {
				setIsLoading(false);
			}
		}
	};

	return (
		<IonPage>
			<IonContent className="hug-height" color={""} fullscreen>
				<Input>
					<section className={style.welcomeText}>
						<IonText color="dark">
							<h1>Sign In To Your Account</h1>
						</IonText>
						<IonText color="dark">
							Welcome to OnExam! Fill The Form To Sign In
						</IonText>
					</section>
					<form onSubmit={(e) => handleSubmit(e)}>
						<section className={style.input}>
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
							<IonRow className={style.after}>
								<IonCheckbox labelPlacement="end">Remember Me</IonCheckbox>
								<Link to={"./login"}>
									<IonText color={"primary"}>Forgot Password?</IonText>
								</Link>
							</IonRow>
						</section>
						<section>
							<IonButton className="full" type="submit">
								{isloading ? (
									<IonSpinner
										className="noMargin noPadding"
										name="dots"
									></IonSpinner>
								) : (
									<p>Sign In</p>
								)}
							</IonButton>
						</section>
					</form>
					<section className={style.signinFooter}>
						<section className={style.options}>
							<IonText>Dont Have An Account?</IonText>
							<Link className="clearText" to={"./signup"}>
								<IonText>Sign Up</IonText>
							</Link>
						</section>
						<section className={style.options}>
							<Link className="clearText" to={"./admin/login"}>
								<IonText>Admin?</IonText>
							</Link>
						</section>
					</section>
					{/* <section>
						email:{email} || password:{password}
					</section> */}
				</Input>
			</IonContent>
		</IonPage>
	);
};

export default Login;
