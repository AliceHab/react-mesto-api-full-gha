import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function EditProfilePopup({ isOpen, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({ name: "", description: "" });

  React.useEffect(() => {
    setValues({ name: currentUser.name, description: currentUser.about });
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonValue="Сохранить"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="text"
        minLength="2"
        maxLength="40"
        placeholder="Напишите ваше имя"
        className="popup__input-text popup__input-text_type_name"
        id="popup__name-input"
        name="name"
        onChange={handleChange}
        value={values.name || ""}
      />
      <span className="popup__input-error popup__name-input-error"></span>
      <input
        required
        type="text"
        minLength="2"
        maxLength="200"
        placeholder="Расскажите о себе"
        className="popup__input-text popup__input-text_type_job"
        id="popup__job-input"
        name="about"
        onChange={handleChange}
        value={values.description || ""}
      />
      <span className="popup__input-error popup__job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
