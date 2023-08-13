import React from "react";

function InfoTooltip({ showInfo, isSuccess, onClick, message }) {
  return (
    <div className={`popup ${showInfo && "popup_opened"}`}>
      <div className="popup__container popup__container_type_infoTooltip">
        <button className="popup__exit" type="button" onClick={onClick} />
        <div className={`${isSuccess && "popup__success"} ${!isSuccess && "popup__fail"}`}></div>
        <h2 className="popup__title">
          {message}
          {!isSuccess && "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
