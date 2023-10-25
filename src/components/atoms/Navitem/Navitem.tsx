import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IonText } from "@ionic/react";
import style from "./Navitem.module.css";

// Define the interface for the props
interface NavitemProps {
  navname: string;
  navto: string;
}

const Navitem: React.FC<NavitemProps> = (props) => {
  const { navname, navto } = props;
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(location.pathname === navto);
  }, [location, navto]);

  return (
    <Link
      to={navto}
      className={`${style.navitems} ${isActive ? style.active : ""}`}
      onClick={() => setIsActive(true)}
    >
      <IonText>{navname}</IonText>
    </Link>
  );
};

export default Navitem;
