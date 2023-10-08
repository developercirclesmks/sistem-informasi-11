import React from "react";
import style from './Navitem.module.css'

// Define the interface for the props
interface NavitemProps {
	navname: string;
	navto: string;
}

const Navitem: React.FC<NavitemProps> = (props) => {
	const { navname, navto } = props;
	return (
		<a href={navto}>
			<button className={`${style.navitems}`}>{navname}</button>
		</a>
	);
};

export default Navitem;


