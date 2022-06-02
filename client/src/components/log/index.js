import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const Log = (props) => {
  const [SignUpModal, setSignUpModal] = useState(props.signup);
  const [SignInModal, setSignInModal] = useState(props.signin);

  const handleModals = (element) => {
    if (element.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (element.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };
  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={SignUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={SignInModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        {SignUpModal && <SignUpForm />}
        {SignInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;