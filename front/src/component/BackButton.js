import React from "react";
import { useNavigate } from "react-router-dom";
import backbutton from "./svg/back-button.svg";
import "./BackButton.css";

const BackButton = ({onClick}) => {
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        if (onClick) {
          onClick();
        } else {
          navigate(-1);
        }
    };

    return (
        <div className="back-button" onClick={handleBackButtonClick}>
            <img src={backbutton} alt="Back Button" /> 
        </div>
    );
};

export default BackButton;
