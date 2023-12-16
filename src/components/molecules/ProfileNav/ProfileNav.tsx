import {
	IonAccordion,
	IonButton,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonPage,
	IonPopover,
	IonSelect,
	IonSelectOption,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { person } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import style from "./ProfileNav.module.css";
import {
	onAuthStateChanged,
	signOut,
	User as FirebaseAuthUser,
} from "firebase/auth";
import { auth } from "../../../../config/firebase-config";
import { showToast } from "../../atoms/Toasts/Toasts";

const ProfileNav: React.FC = () => {
	const history = useHistory();
	const [user, setUser] = useState<FirebaseAuthUser | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});

		return () => unsubscribe();
	}, []);

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				showToast("success", "Sign out successful");
				history.push("/login");
			})
			.catch((error) => {
				showToast("error", "Sign out error");
			});
	};

	const popover = useRef<HTMLIonPopoverElement>(null);
	const [popoverOpen, setPopoverOpen] = useState(false);

	const openPopover = (e: any) => {
		popover.current!.event = e;
		setPopoverOpen(true);
	};
	return (
		<main className={style.main}>
			{user ? (
				// Signed in
				<>
					<IonItem
						onClick={openPopover}
						color=""
						aria-hidden="true"
						button={true}
						lines="none"
					>
						<IonIcon color="primary" icon={person}></IonIcon>
						<IonLabel color={"primary"} className={style.label}>
							Profile
						</IonLabel>
					</IonItem>

					<IonPopover	
						ref={popover}
						isOpen={popoverOpen}
						onDidDismiss={() => setPopoverOpen(false)}
					>
						<IonItem href="/profile" button>
							Go To Profile
						</IonItem>
						<IonItem onClick={handleSignOut} button>
							{" "}
							Sign Out
						</IonItem>
					</IonPopover>
				</>
			) : (
				// Not Signed In
				<>
					<Link to="/login">
						<IonButton color="" size="default" fill="outline">
							Login
						</IonButton>
					</Link>
					<Link to="/signup">
						<IonButton color="" size="default" fill="solid">
							Signup
						</IonButton>
					</Link>
				</>
			)}
		</main>
	);
};

export default ProfileNav;
