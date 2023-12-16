import { IonToast } from "@ionic/react";
import { checkmarkCircle, closeCircle } from "ionicons/icons";
import React, { useState } from "react";

type Variant = "error" | "success" | "plain" | "loading";

let toastFunction:
	| ((variant: Variant, message: any, duration?: number) => void)
	| null = null;

const ToastComponent: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastVariant, setToastVariant] = useState<Variant>("plain");
	const [toastDuration, setToastDuration] = useState<number>(3000);

	const openToast = (variant: Variant, message: any, duration?: number) => {
		const stringMessage = message ? message.toString() : "";
		setToastMessage(stringMessage);
		setToastVariant(variant);
		setToastDuration(duration || 3000); // Set default duration if not provided
		setIsOpen(true);
	};

	toastFunction = openToast;

	return (
		<IonToast
			isOpen={isOpen}
			message={toastMessage}
			onDidDismiss={() => setIsOpen(false)}
			duration={toastDuration}
			position="top"
			color={
				toastVariant === "plain" || toastVariant === "loading"
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
					: undefined
			}
		></IonToast>
	);
};

export const showToast = (
	variant: Variant,
	message: any,
	duration?: number
) => {
	if (toastFunction) {
		toastFunction(variant, message, duration);
	}
};

export default ToastComponent;
