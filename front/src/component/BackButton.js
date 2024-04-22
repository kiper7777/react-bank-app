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
    return (
        <div className="back-button">
            <img src={backbutton} alt="Back Button" /> 
        </div>
    )
}

export default BackButton;
