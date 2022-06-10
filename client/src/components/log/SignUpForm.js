import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
  const [firstname, setFirstname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const firstnameError = document.querySelector(".firstname.error");
    const nameError = document.querySelector(".name.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector("password.error");
    const passwordConfirmError = document.querySelector(
      "password-confirm.error"
    );

    if (password != controlPassword) {
      console.log(password);
      console.log(controlPassword);
      passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
    }
  };

  return (
    <form action="" onSubmit={handleRegister} id="sign-up-form">
      <label htmlFor="firstname">Prénom</label>
      <br />
      <input
        type="text"
        name="firstname"
        id="firstname"
        onChange={(e) => setFirstname(e.target.value)}
        value={firstname}
      />
      <div className="firstname error"></div>
      <br />

      <label htmlFor="name">Nom</label>
      <br />
      <input
        type="text"
        name="name"
        id="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <div className="name error"></div>
      <br />

      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />

      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />

      <label htmlFor="password-conf">Confimer mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password-conf"
        onChange={(e) => setControlPassword(e.target.value)}
        value={controlPassword}
      />
      <div className="password-confirm error"></div>
      <br />

      <input type="submit" value="Valider inscription" />
    </form>
  );
};

export default SignUpForm;
