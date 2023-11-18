import {
	IonButton,
	IonCheckbox,
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import Input from "../../components/organisms/Input/Input";
import style from "./Login.module.css";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = () => {
		console.log(email);
		console.log(password);
	};

	return (
		<IonPage>
			<IonContent>
				<Input>
					<section className={style.welcomeText}>
						<IonText color="dark">
							<h1>Sign In To Your Account</h1>
						</IonText>
						<IonText color="dark">
							Welcome Back! Fill The Form To Sign In
						</IonText>
					</section>
					<form>
						<section className={style.input}>
							<IonInput
								onIonInput={(e) => setEmail(e.detail.value!)}
								placeholder="Enter Your Email"
								label="Email"
								labelPlacement="stacked"
								fill="outline"
							></IonInput>
							<IonInput
								onIonInput={(e) => setPassword(e.detail.value!)}
								placeholder="Enter Your Password"
								label="Password"
								labelPlacement="stacked"
								fill="outline"
							></IonInput>
							<IonRow className={style.after}>
								<IonCheckbox labelPlacement="end">Remember Me</IonCheckbox>
								<Link to={"./"}>
									<IonText color={"primary"}>Forgot Password?</IonText>
								</Link>
							</IonRow>
						</section>
						<section>
							<IonButton onClick={handleSubmit}>
								<p>Sign In</p>
							</IonButton>
						</section>
					</form>
					<section className={style.options}>
						<IonText>Dont Have An Account?</IonText>
						<Link className="clearText" to={"./signup"}>
							<IonText>Sign Up</IonText>
						</Link>
					</section>
					<section>
						email:{email} || password:{password}
					</section>
				</Input>
			</IonContent>
		</IonPage>
	);
};

export default Login;
