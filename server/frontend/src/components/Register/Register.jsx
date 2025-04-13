import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import close_icon from "../assets/close.png";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    firstName: "",
    lastName: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${window.location.origin}/djangoapp/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Échec de l'inscription");
      }

      sessionStorage.setItem('username', data.userName);
      window.location.href = window.location.origin;
      
    } catch (err) {
      setError(err.message);
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register_container" style={{ width: "50%" }}>
      <div className="header" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <span className="text" style={{ flexGrow: "1" }}>Inscription</span>
        <a href="/" className="close-link">
          <img style={{ width: "1cm" }} src={close_icon} alt="Fermer" />
        </a>
        <hr />
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={register}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} className="img_icon" alt="Nom d'utilisateur" />
            <input
              type="text"
              name="userName"
              placeholder="Nom d'utilisateur"
              className="input_field"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <img src={user_icon} className="img_icon" alt="Prénom" />
            <input
              type="text"
              name="firstName"
              placeholder="Prénom"
              className="input_field"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <img src={user_icon} className="img_icon" alt="Nom de famille" />
            <input
              type="text"
              name="lastName"
              placeholder="Nom de famille"
              className="input_field"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <img src={email_icon} className="img_icon" alt="Adresse e-mail" />
            <input
              type="email"
              name="email"
              placeholder="Adresse e-mail"
              className="input_field"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <img src={password_icon} className="img_icon" alt="Mot de passe" />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              className="input_field"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
            />
          </div>
        </div>

        <div className="submit_panel">
          <button 
            className="submit" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Chargement..." : "S'inscrire"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
