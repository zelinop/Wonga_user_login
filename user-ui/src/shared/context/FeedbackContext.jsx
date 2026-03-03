import { useCallback, useState } from 'react'
import FeedbackContext from './feedbackContext'

export function FeedbackProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
  })

  const showToast = useCallback(({ message, type = 'error', durationMs = 3500 }) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`

    setToasts((currentToasts) => [...currentToasts, { id, message, type }])

    window.setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== id),
      )
    }, durationMs)
  }, [])

  const openErrorModal = useCallback(({ title, message }) => {
    setModal({
      isOpen: true,
      title,
      message,
    })
  }, [])

  const closeErrorModal = useCallback(() => {
    setModal({
      isOpen: false,
      title: '',
      message: '',
    })
  }, [])
  const value = {
    showToast,
    openErrorModal,
    closeErrorModal,
  }

  return (
    <FeedbackContext.Provider value={value}>
      {children}

      <div className="toast-stack" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast-item toast-${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>

      {modal.isOpen && (
        <div className="error-modal-overlay" role="presentation">
          <div
            className="error-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="error-modal-title"
          >
            <h3 id="error-modal-title">{modal.title}</h3>
            <p>{modal.message}</p>
            <button className="primary-button" type="button" onClick={closeErrorModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </FeedbackContext.Provider>
  )
}
