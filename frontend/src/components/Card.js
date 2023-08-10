import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like-icon ${isLiked && "elements__like-icon_active"}`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLike() {
    onCardLike(card);
  }
  function handleDelete() {
    onCardDelete(card);
  }

  return (
    <li className="elements__item">
      {isOwn && <button className="elements__delete" type="button" onClick={handleDelete} />}
      <img className="elements__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="elements__bottom">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-wrapper">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLike} />
          <p className="elements__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
