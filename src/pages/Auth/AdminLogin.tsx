import {
	IonButton,
	IonCard,
	IonContent,
	IonInput,
	IonPage,
	IonSpinner,
	IonText,
} from "@ionic/react";
import React, { useState } from "react";
import style from "./AdminLogin.module.css";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../config/firebase-config";
import { useHistory } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { showToast } from "../../components/atoms/Toasts/Toasts";

const AdminLogin: React.FC = () => {
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
					const userData = existingUser.data();
					if (userData.role === "admin") {
						const userCredential = await signInWithEmailAndPassword(
							auth,
							email,
							password
						);
						if (userCredential) {
							showToast("success", "Logged In As Admin");
							history.push("/");
						} else {
							showToast("error", "Error Occurred during login.");
						}
					} else {
						showToast("error", "User is not found or not an admin");
					}
				} else {
					showToast("error", "User is not found or not an admin");
				}
			} catch (error: any) {
				showToast("error", "User is not found or not an admin");
			} finally {
				setIsLoading(false);
				history.push('/dashboard')
			}
		}
	};

	return (
		<IonPage>
			<IonContent className="hug-height" color={""} fullscreen>
				<main className={style.Authwrapper}>
					<IonCard className={`ion-padding ${style.authcontainer}`}>
						<section className={style.welcomeText}>
							<IonText color="dark">
								<h1>Sign In As Admin</h1>
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
							</section>
							<section>
								<IonButton className="full" size="small" type="submit">
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
							<section className={style.options}>
								<Link className="clearText" to={"/login"}>
									<IonText>Sign In As user</IonText>
								</Link>
							</section>
						</form>
					</IonCard>
				</main>

				{/* <section>
						email:{email} || password:{password}
					</section> */}
			</IonContent>
		</IonPage>
	);
};

export default AdminLogin;
