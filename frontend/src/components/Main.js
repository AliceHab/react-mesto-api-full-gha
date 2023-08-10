import React from "react";
import Card from "./Card";
import Footer from "./Footer.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__user">
          <button className="profile__edit-avatar" type="button" onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
          </button>
          <div className="profile__user-info">
            <div className="profile__edit-name">
              <h1 className="profile__user-name">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" onClick={onEditProfile} />
            </div>
            <p className="profile__user-describe">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace} />
      </section>
      <section className="cards">
        <ul className="elements">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                onCardClick={onCardClick}
                key={card._id}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
      <Footer />
    </main>
  );
}

export default Main;
