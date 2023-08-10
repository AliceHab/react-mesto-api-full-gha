import React from "react";
import { AppContext } from "../contexts/AppContext";

function PopupWithForm({ name, title, buttonValue, isOpen, onSubmit, ...props }) {
  const { isLoading, closeAllPopups } = React.useContext(AppContext);

  return (
    <div className={`popup popup-${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button className="popup__exit" type="button" onClick={closeAllPopups} />
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={`popup__${name}`} onSubmit={onSubmit}>
          {props.children}
          <input
            type="submit"
            className="popup__save-button"
            value={isLoading ? "Сохранение..." : buttonValue}
          />
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
