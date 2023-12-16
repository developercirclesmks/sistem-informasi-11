import { IonPage, IonContent, IonHeader } from "@ionic/react";
import Navbar from "./organisms/Navbar/Navbar";
import Sidebar from "./organisms/Sidebar/Sidebar";
import { Children, ReactNode } from "react";

interface PageContainerProps {
	children: ReactNode;
	nopadding?: boolean;
	color?:
		| "danger"
		| "light"
		| "dark"
		| "medium"
		| "primary"
		| "secondary"
		| "success"
		| "tertiary"
		| "warning";
}

const PageContainer: React.FC<PageContainerProps> = (props) => {
	const { children, nopadding = false, color = "" } = props;
	return (
		<>
			<>
				<Sidebar />
				<IonPage id="main-content">
					<IonHeader>
						<Navbar />
					</IonHeader>
					<IonContent
						className={`${nopadding ? "" : "ion-padding"}`}
						color={color}
					>
						{children}
					</IonContent>
				</IonPage>
			</>
		</>
	);
};

export default PageContainer;
