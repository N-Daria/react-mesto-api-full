export default function InfoTooltip({ isOpen, headerPopup, image, onClose }) {

  const open = isOpen ? 'popup_opened' : '';

  return (
    <section className={`popup ${open}`}>
      <form className={`popup__form form_login`}>
        <button onClick={onClose} type="button" className="popup__close" aria-label="Закрыть"></button>
        <img src={image} alt={headerPopup} className='form__image' />
        <h2 className="popup__header form__header_entrance ">{headerPopup}</h2>
      </form>
    </section >
  )
}