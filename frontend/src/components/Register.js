import React from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";
import AuthForm from "./AuthForm";

function Register() {
  const { values, handleChange } = useForm({ email: "", password: "" });
  const [showInfo, setShowInfo] = React.useState(false);
  const [textInfo, setTextInfo] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(false);
  const navigate = useNavigate();

  function closeInfo() {
    setShowInfo(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    auth
      .registerUser(values.password, values.email)
      .then((res) => {
        if (res) {
          setShowInfo(true);
          setIsRegister(true);
          setTextInfo("Вы успешно зарегистрировались");
          setTimeout(() => {
            navigate("/signin", { replace: true });
          }, 2000);
        }
      })
      .catch((err) => {
        setShowInfo(true);
        setIsRegister(false);
        console.error(err);
      });
  }

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      buttonText={"Зарегистрироваться"}
      titleText={"Регистрация"}
      link={"/signin"}
      linkText={"Войти"}
      linkTitile={"Уже зарегистрированы?"}
    >
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
        isSuccess={isRegister}
      />
    </AuthForm>
  );
}

export default Register;
