import {
	IonCard,
	IonCardContent,
	IonContent,
	IonHeader,
	IonIcon,
	IonPage,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import style from './LinkCard.module.css'
interface LinkCardInterface {
	link?: string;
	children?: ReactNode;
	icon:string;
}

const LinkCard: React.FC<LinkCardInterface> = (props) => {
	const { link = "/", children = "Default",icon } = props;
	return (
		<>
			<div className={style.none}> 
				<IonCard href={link} className="pointer mid vertical ion-padding" color={"light"}>
					<IonIcon size="large" color="primary" src={`/icon/${icon}`}></IonIcon>
					<IonCardContent>
						<IonText className="none">{children}</IonText>
					</IonCardContent>
				</IonCard>
			</div>
		</>
	);
};

export default LinkCard;