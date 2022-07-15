export default function InfoTooltip({ ...props }) {

  const open = props.isOpen ? 'popup_opened' : '';

  return (
    <section className={`popup ${open}`}>
      <form className={`popup__form form_login`}>
        <button onClick={props.onClose} type="button" className="popup__close" aria-label="Закрыть"></button>
        <img src={props.data.photoUrl} alt={props.data.header} className='form__image' />
        <h2 className="popup__header form__header_entrance ">{props.data.header}</h2>
      </form>
    </section >
  )
} 