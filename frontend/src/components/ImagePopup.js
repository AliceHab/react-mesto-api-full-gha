import React from "react";
import { AppContext } from "../contexts/AppContext";

function ImagePopup({ isOpen, onClose }) {
  const { closeAllPopups } = React.useContext(AppContext);

  return (
    <div className={`popup image-popup ${isOpen._id && "popup_opened"}`}>
      <div className="image-popup__container">
        <figure className="image-popup__figure">
          <img src={isOpen.link} alt={isOpen.name} className="image-popup__image" />
          <figcaption className="image-popup__caption">{isOpen.name}</figcaption>
        </figure>
        <button className="popup__exit image-popup__exit" type="button" onClick={closeAllPopups} />
      </div>
    </div>
  );
}

export default ImagePopup;
