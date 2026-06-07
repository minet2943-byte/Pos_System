function Modal({ children, isOpen, onClose, title }) {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal" role="dialog" aria-modal="true">
        <header className="modal-header">
          <h2>{title}</h2>
          <button aria-label="Close modal" onClick={onClose} type="button">
            x
          </button>
        </header>
        {children}
      </section>
    </div>
  )
}

export default Modal
