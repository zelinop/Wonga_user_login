import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/hooks/useAuth'
import { useFeedback } from '../../shared/hooks/useFeedback'

const registerFields = [
  { name: 'firstName', label: 'First name', type: 'text' },
  { name: 'lastName', label: 'Last name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
]

export const useRegisterPageLogic = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const { showToast, openErrorModal } = useFeedback()
  const [error, setError] = useState('')

  const handleRegister = async (formValues) => {
    const result = await register(formValues)

    if (!result.success) {
      setError(result.message)

      if (result.reason === 'access') {
        openErrorModal({
          title: 'Unauthorized',
          message: result.message || 'You do not have permission to register.',
        })
      }

      if (result.reason === 'api' && (result.status === 0 || result.status >= 500)) {
        openErrorModal({
          title: 'Server Issue',
          message: result.message || 'The API returned an unexpected error.',
        })
      }

      showToast({
        message: result.message || 'Registration failed.',
        type: 'error',
      })

      return
    }

    setError('')
    showToast({
      message: 'Account created successfully.',
      type: 'success',
    })
    navigate('/welcome')
  }

  const goToLogin = () => {
    navigate('/login')
  }

  return {
    registerFields,
    error,
    handleRegister,
    goToLogin,
  }
}
