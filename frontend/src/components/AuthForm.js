import React from "react";
import { Link } from "react-router-dom";

function AuthForm({ handleSubmit, buttonText, titleText, link, linkText, linkTitile, ...props }) {
  return (
    <div className="sign">
      <p className="sign__title">{titleText}</p>
      <form className="sign__form" onSubmit={handleSubmit}>
        {props.children}
        <input type="submit" className="sign__button" value={buttonText} />
        {link && (
          <div className="sign__redirect">
            <p className="sign__link">Уже зарегистрированы?⠀</p>
            <Link to="/signin" className="sign__link">
              Войти
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}

export default AuthForm;
