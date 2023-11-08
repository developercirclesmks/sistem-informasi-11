import { IonPage, IonContent } from "@ionic/react";
import Navbar from "./organisms/Navbar/Navbar";
import Sidebar from "./organisms/Sidebar/Sidebar";
import { Children, ReactNode } from "react";

interface PageContainerProps {
	children: ReactNode;
  color?:"danger"|"light"|"dark"|"medium"|"primary"|"secondary"|"success"|"tertiary"|"warning"
}

const PageContainer: React.FC<PageContainerProps> = ( props) => {
	const {children = ""} =props
  return (
		<>
			<>
				<Sidebar />
				<IonPage id="main-content">
					<Navbar />
					<IonContent className="ion-padding" color="">
            {children}
            </IonContent>
				</IonPage>
			</>
		</>
	);
};

export default PageContainer;
