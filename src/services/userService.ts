import {
	collection,
	query,
	where,
	getDocs,
	doc,
	getDoc,
	Timestamp,
	setDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase-config";
import { IUser } from "../interfaces/user";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export const getUserData = async (uid: string) => {
	try {
		const usersRef = collection(db, "users");
		const userQuery = query(usersRef, where("uid", "==", uid));
		const querySnapshot = await getDocs(userQuery);

		let userData = null;

		querySnapshot.forEach((doc) => {
			userData = { ...doc.data(), id: doc.id };
		});

		return userData;
	} catch (error) {
		throw new Error("Error fetching user data");
	}
};

export const createUser = async (
	email: string,
	password: string,
	firstName: string,
	lastName: string
): Promise<IUser | null> => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		if (userCredential) {
			const user = userCredential.user;

			const newUser: IUser = {
				uid: user.uid,
				email: email,
				firstName: firstName,
				lastName: lastName,
				role: "user",
				phoneNumber: "",
				dateOfBirth: null,
				gender: "not-set",
				institution: "",
				occupation: "",
				createdAt: Timestamp.now(),
			};

			await setDoc(doc(db, "users", user.uid), newUser);
		}
	} catch (error: unknown) {
		if ((error as FirebaseError).code === "auth/email-already-in-use") {
			throw new Error("This credential already in use ");
		} else {
			throw error;
		}
	}

	return null;
};
