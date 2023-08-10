import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";
import auth from "../utils/auth";

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  // Открытие и закрытие попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();

  function setIsLogged() {
    setLoggedIn(true);
  }

  // Проверяем токен
  const checkTocken = () => {
    auth
      .getContent(localStorage.getItem("jwt"))
      .then((res) => {
        if (!res) {
          return;
        }
        setEmail(res.data.email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setLoggedIn(false);
        navigate("/signin");
        console.error(err);
      });
  };

  React.useEffect(() => {
    checkTocken();
    //eslint-disable-next-line
  }, []);

  // Обращение к api за данными пользователя и карточками
  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => console.error(err));

      api
        .getInitialCards()
        .then((dataCards) => {
          setCards(dataCards);
        })
        .catch((err) => console.error(err));
    }
  }, [isLoggedIn]);

  // Обработчики для компонентов попапов
  // Общие
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.error(err));
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const filteredCards = cards.filter((newCard) => newCard._id !== card._id);
        setCards(filteredCards);
      })
      .catch((err) => console.error(err));
  }
  // Универсальная функция-обработчик
  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }
  // Обработчик редактирования пользователя
  function handleUpdateUser(data) {
    function makeRequest() {
      return api.editUserInfo(data).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }
  // Обработчик аватара
  function handleUpdateAvatar(data) {
    function makeRequest() {
      return api.editAvatar(data).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }
  // Обработчик добавления карточки
  function handleAddPlaceSubmit(data) {
    function makeRequest() {
      return api.postCard(data).then((newCard) => {
        setCards([newCard, ...cards]);
      });
    }
    handleSubmit(makeRequest);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }
  // Обработчик закрытия Esc
  const isOpen =
    isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <div className="App">
      <div className="root">
        <div className="page">
          <Header email={email} setEmail={setEmail} />
          <AppContext.Provider value={{ isLoading, closeAllPopups }}>
            <CurrentUserContext.Provider value={currentUser}>
              <Routes>
                <Route path="/signup" element={<Register />} />
                <Route
                  path="/signin"
                  element={
                    <Login isLoggedIn={isLoggedIn} setIsLogged={setIsLogged} setEmail={setEmail} />
                  }
                />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute
                      element={
                        <Main
                          onEditProfile={() => setIsEditProfilePopupOpen(true)}
                          onAddPlace={() => setIsAddPlacePopupOpen(true)}
                          onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                          onCardClick={(card) => setSelectedCard(card)}
                          onCardLike={(card) => handleCardLike(card)}
                          onCardDelete={(card) => handleCardDelete(card)}
                          cards={cards}
                        />
                      }
                      isLoggedIn={isLoggedIn}
                    />
                  }
                  exact
                />
              </Routes>
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} />
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} />
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} />
              <ImagePopup isOpen={selectedCard} />
            </CurrentUserContext.Provider>
          </AppContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
