// import React, {SignUpForm} from "react";

// class BackButton extends SignUpForm {
//     static back() {
//         return window.history.back()
//     }
// }

// window.backButton = BackButton 

import React from "react";
import backbutton from "./svg/back-button.svg";
import "./BackButton.css";

const BackButton = ({onClick}) => {
    const handleBackButtonClick = () => {
        if (onClick) {
            // Call the onClick function passed as prop
            onClick();
        } else {
            // Default action: navigate back in the browser history
          window.history.back();
        }
    };

    return (
        <div className="back-button" onClick={handleBackButtonClick}>
            <img src={backbutton} alt="Back Button" /> 
        </div>
    );
};

export default BackButton;
