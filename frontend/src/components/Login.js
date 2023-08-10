import React from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";
import AuthForm from "./AuthForm";

function Login({ isLoggedIn, setIsLogged, setEmail }) {
  const { values, handleChange } = useForm({ email: "", password: "" });
  const [showInfo, setShowInfo] = React.useState(false);
  const [textInfo, setTextInfo] = React.useState("");

  const navigate = useNavigate();

  function closeInfo() {
    setShowInfo(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    auth
      .loginUser(values.password, values.email)
      .then((res) => {
        if (res) {
          setShowInfo(true);
          setIsLogged(true);
          setTextInfo("Входим...");
          localStorage.setItem("jwt", res.token);
          setTimeout(() => {
            navigate("/", { replace: true });
            setEmail(values.email);
          }, 2000);
        }
      })
      .catch((err) => {
        setShowInfo(true);
        setIsLogged(false);
        console.error(err);
      });
  }

  return (
    <AuthForm handleSubmit={handleSubmit} buttonText={"Войти"} titleText={"Вход"}>
      <input
        className="sign__input"
        placeholder="Email"
        required
        id="email"
        name="email"
        type="text"
        onChange={handleChange}
      />
      <input
        className="sign__input"
        placeholder="Пароль"
        required
        id="password"
        name="password"
        type="password"
        onChange={handleChange}
      />
      <InfoTooltip
        showInfo={showInfo}
        onClick={closeInfo}
        message={textInfo}
        isSuccess={isLoggedIn}
      />
    </AuthForm>
  );
}

export default Login;
