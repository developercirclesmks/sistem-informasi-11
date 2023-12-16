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
	IonSelect,
	IonSelectOption,
} from "@ionic/react";
import { onAuthStateChanged } from "firebase/auth";
import style from "./styles/Setting.module.css";
import { IUser } from "../interfaces/user";
import PageContainer from "../components/PageContainer";
import { getUserData, updateUser } from "../services/userService";
import { auth } from "../../config/firebase-config";
import { showToast } from "../components/atoms/Toasts/Toasts";
import { Timestamp } from "firebase/firestore";

const Setting: React.FC = () => {
	const history = useHistory();

	const [uid, setUid] = useState<string | null>(null);
	const [userProfile, setUserProfile] = useState<IUser | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUid(user.uid);
				fetchUserData(user.uid);
			}
		});

		return () => unsubscribe();
	}, []);

	const fetchUserData = async (uid: string) => {
		try {
			const userData = await getUserData(uid);
			if (userData) {
				setUserProfile(userData);
			}
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};

	const [userFirstName, setUserFirstName] = useState("");
	const [userLastName, setUserLastName] = useState("");
	const [userDateOfBirth, setUserDateOfBirth] = useState("");
	const [userOccupation, setUserOccupation] = useState("");
	const [userInstitution, setUserInstitution] = useState("");
	const [userPhoneNumber, setUserPhoneNumber] = useState("");
	const [userGender, setUserGender] = useState<
		"not-set" | "male" | "female" | undefined
	>(userProfile?.gender || "not-set");

	useEffect(() => {
		if (userProfile) {
			setUserFirstName(userProfile.firstName || "");
			setUserLastName(userProfile.lastName || "");

			if (userProfile.dateOfBirth) {
				const dateOfBirth = userProfile.dateOfBirth.toDate();
				const formattedDate = dateOfBirth.toISOString().split("T")[0];
				setUserDateOfBirth(formattedDate);
			}

			setUserOccupation(userProfile.occupation || "");
			setUserInstitution(userProfile.institution || "");
			setUserPhoneNumber(userProfile.phoneNumber || "");
			setUserGender(userProfile.gender || "not-set");
		}
	}, [userProfile]);

	const handleSave = async () => {
		try {
			setIsLoading(true);

			if (userDateOfBirth) {
				const dateParts = userDateOfBirth.split("-");
				const userDOB = new Date(
					parseInt(dateParts[0]),
					parseInt(dateParts[1]) - 1,
					parseInt(dateParts[2])
				);

				userDOB.setHours(userDOB.getHours() + 8);

				const tenYearsAgo = new Date();
				tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);

				if (userDOB > tenYearsAgo) {
					showToast("error", "Invalid Date");
					setIsLoading(false);
					return;
				}
			}

			const updatedUser: Partial<IUser> = {
				firstName: userFirstName,
				lastName: userLastName,
				occupation: userOccupation,
				institution: userInstitution,
				phoneNumber: userPhoneNumber,
				gender: userGender,
			};

			if (userDateOfBirth) {
				const dateParts = userDateOfBirth.split("-");
				const userDOB = new Date(
					parseInt(dateParts[0]),
					parseInt(dateParts[1]) - 1,
					parseInt(dateParts[2])
				);
				userDOB.setHours(userDOB.getHours() + 8);

				updatedUser.dateOfBirth = Timestamp.fromDate(userDOB);
			}

			if (uid) {
				await updateUser(uid, updatedUser);
				showToast("success", "Profile updated successfully");
				history.push("/profile");
			} else {
				throw new Error("User ID not found");
			}
		} catch (error) {
			console.error("Error updating profile:", error);
			showToast("error", "Failed to update profile");
		} finally {
			setIsLoading(false);
		}
	};

	if (userProfile) {
		return (
			<PageContainer nopadding>
				<main className={style.settingGrid}>
					<IonCard className="grow ion-padding">
						<IonItem>
							<IonInput
								type="text"
								label="First Name :"
								value={userFirstName}
								onIonChange={(e) => setUserFirstName(e.detail.value!)}
							></IonInput>
						</IonItem>
						<IonItem>
							<IonInput
								type="text"
								label="Last Name :"
								value={userLastName}
								onIonChange={(e) => setUserLastName(e.detail.value!)}
							></IonInput>
						</IonItem>
						<IonItem>
							<IonInput
								type="date"
								value={userDateOfBirth || ""}
								onIonChange={(e) => setUserDateOfBirth(e.detail.value!)}
								label="Date Of Birth : "
								clearInput
							></IonInput>
						</IonItem>
						<IonItem>
							<IonSelect
								label="Gender"
								name="Gender"
								value={userGender}
								placeholder="Gender"
								onIonChange={(e) => setUserGender(e.detail.value)}
							>
								<IonSelectOption value="male">Male</IonSelectOption>
								<IonSelectOption value="female">Female</IonSelectOption>
							</IonSelect>
						</IonItem>
						<IonItem>
							<IonInput
								type="text"
								label="Phone Number : "
								value={userPhoneNumber}
								onIonChange={(e) => setUserPhoneNumber(e.detail.value!)}
							></IonInput>{" "}
						</IonItem>
						<IonItem>
							<IonInput
								type="text"
								label="Occupation : "
								value={userOccupation}
								onIonChange={(e) => setUserOccupation(e.detail.value!)}
							></IonInput>{" "}
						</IonItem>
						<IonItem>
							<IonInput
								type="text"
								label="Institution : "
								value={userInstitution}
								onIonChange={(e) => setUserInstitution(e.detail.value!)}
							></IonInput>{" "}
						</IonItem>
						<IonButton onClick={handleSave} className=" full light">
							Save
						</IonButton>
					</IonCard>
				</main>
			</PageContainer>
		);
	}
};

export default Setting;
