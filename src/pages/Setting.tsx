import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
	IonAvatar,
	IonButton,
	IonCard,
	IonCardContent,
	IonInput,
	IonItem,
	IonImg,
	IonText,
	IonSpinner,
	IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase-config";
import PageContainer from "../components/PageContainer";
import style from "./styles/Setting.module.css";

interface UserData {
	id: string;
	email: string;
	username: string;
	dateOfBirth: string;
}

const Setting: React.FC = () => {
	const history = useHistory();

	const [uid, setUid] = useState<string | null>(null);
	const [userDoc, setUserDoc] = useState<UserData | null>(null);

	const getUserData = async (userId: string) => {
		const colref = collection(db, "users");
		const snapshot = await getDocs(colref);

		const docs = snapshot.docs.map((doc) => {
			const data = doc.data() as UserData; // Cast data to UserData type
			data.id = doc.id;
			return data;
		});

		const foundUserDoc = docs.find((doc) => doc.id === userId);
		if (foundUserDoc) {
			console.log("Fetched userDoc:", foundUserDoc); // Log the fetched userDoc
			setUserDoc(foundUserDoc);
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUid(user.uid);
			}
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (uid) {
			getUserData(uid);
		}
	}, [uid]);

	const handleSave = async () => {
		if (userDoc) {
			try {
				const userDocRef = doc(db, "users", userDoc.id);
				await updateDoc(userDocRef, {
					username: userProfile.username,
					dateOfBirth: userDoc.dateOfBirth,
					// Add other fields to update as needed
				});
				console.log("User data updated successfully!");

				// Log changes or specific information before redirecting
				console.log("Changes made:", userProfile); // Log the userProfile object or specific changes made

				// Redirect to /profile
				history.push("/profile");
			} catch (error) {
				console.error("Error updating user data:", error);
			}
		}
	};

	const [userProfile, setUserProfile] = useState({
		username: userDoc?.username,
	});

	return (
		<PageContainer nopadding>
			<main className={style.settingGrid}>
				<IonCard>
					<IonCardContent className={`ion-padding ${style.avatarContent}`}>
						<section>
							<div className={style.avatar}>
								<IonImg src="/images/Test.jpeg" alt="asdas" />
							</div>
						</section>
						<IonText>{userDoc ? userDoc.email : ""}</IonText>
						<IonButton className="light" fill="outline">
							Change Picture
						</IonButton>
					</IonCardContent>
				</IonCard>
				<IonCard className="grow ion-padding">
					<IonItem>
						<IonInput type="text" label="Name : "></IonInput>
					</IonItem>
					<IonItem>
						<IonInput
							value={userProfile.username}
							onIonInput={(e) =>
								setUserProfile({
									...userProfile,
									username: e.detail.value ?? "", // Set username from input value or empty string
								})
							}
							label="UserName : "
							defaultValue={userDoc?.username}
							placeholder={userDoc?.username}
						></IonInput>
					</IonItem>
					<IonItem>
						<IonInput
							defaultValue={userDoc ? userDoc.dateOfBirth : ""}
							type="date"
							value={userDoc ? userDoc.dateOfBirth : ""}
							label="Date Of Birth : "
							clearInput
						></IonInput>
					</IonItem>
					<IonItem>
						<IonSelect label="Sex : ">
              <IonSelectOption>Male</IonSelectOption>
              <IonSelectOption>Female</IonSelectOption>
            </IonSelect>
					</IonItem>
					<IonItem>
						<IonInput type="text" label="Phone Number : "></IonInput>
					</IonItem>
					<IonItem>
						<IonInput type="text" label="Occupation : "></IonInput>
					</IonItem>
					<IonItem>
						<IonInput type="text" label="Institution : "></IonInput>
					</IonItem>
					<IonButton onClick={handleSave} className=" full light">
						Save
					</IonButton>
				</IonCard>
			</main>
		</PageContainer>
	);
};

export default Setting;
