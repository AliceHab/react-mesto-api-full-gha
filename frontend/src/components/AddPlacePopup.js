import React from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function AddPlacePopup({ isOpen, onAddPlace }) {
  const { values, handleChange, setValues } = useForm({ name: "", link: "" });

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonValue="Создать"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="text"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        className="popup__input-text popup__input-text_type_heading"
        id="popup__heading-input"
        name="name"
        onChange={handleChange}
        value={values.name}
      />
      <span className="popup__input-error popup__heading-input-error"></span>
      <input
        required
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input-text popup__input-text_type_link"
        id="popup__link-input"
        name="link"
        onChange={handleChange}
        value={values.link}
      />
      <span className="popup__input-error popup__link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
