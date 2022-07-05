export default function PopupWithForm({ isOpen, popupClass, formClass, onClose, header, children, buttonText, onSubmit }) {

  const open = isOpen ? 'popup_opened' : '';

  return (
    <section className={`${popupClass} popup ${open}`}>
      <form className={`popup__form form ${formClass}`} name="popup__container" onSubmit={onSubmit}>
        <button onClick={onClose} type="button" className="popup__close" aria-label="Закрыть"></button>
        <h2 className="popup__header">{header}</h2>

        {children}

        <button className="popup__button" type="submit">{buttonText}</button>
      </form>
    </section >
  )

}

