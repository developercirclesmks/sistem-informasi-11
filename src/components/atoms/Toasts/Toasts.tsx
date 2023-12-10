// ToastComponent.tsx

import { IonToast } from "@ionic/react";
import { checkmarkCircle, closeCircle } from "ionicons/icons";
import React, { useState } from "react";

type Variant = "error" | "success" | "plain";

let toastFunction: ((variant: Variant, message: any) => void) | null = null;

const ToastComponent: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastVariant, setToastVariant] = useState<Variant>("plain");

	const openToast = (variant: Variant, message: any) => {
		const stringMessage = message ? message.toString() : "";
		setToastMessage(stringMessage);
		setToastVariant(variant);
		setIsOpen(true);
	};

	toastFunction = openToast;

	return (
		<IonToast
			isOpen={isOpen}
			message={toastMessage}
			onDidDismiss={() => setIsOpen(false)}
			duration={3000}
			position="top"
			color={
				toastVariant === "plain"
					? "light"
					: toastVariant === "error"
					? "danger"
					: "success"
			}
			icon={
				toastVariant === "error"
					? closeCircle
					: toastVariant === "success"
					? checkmarkCircle
					: ""
			}
      
		/>
	);
};

export const showToast = (variant: Variant, message: any) => {
	if (toastFunction) {
		toastFunction(variant, message);
	}
};

export default ToastComponent;
