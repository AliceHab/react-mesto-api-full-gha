import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonValue="Сохранить"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="url"
        placeholder="Укажите ссылку"
        className="popup__input-text popup__input-text_type_link"
        id="popup__avatar-input"
        name="avatar"
        ref={avatarRef}
      />
      <span className="popup__input-error popup__avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
