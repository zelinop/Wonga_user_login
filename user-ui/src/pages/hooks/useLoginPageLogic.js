import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/hooks/useAuth'
import { useFeedback } from '../../shared/hooks/useFeedback'

const loginFields = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
]

export const useLoginPageLogic = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast, openErrorModal } = useFeedback()
  const [error, setError] = useState('')

  const redirectTarget = location.state?.from?.pathname || '/welcome'

  useEffect(() => {
    if (!location.state?.authError) {
      return
    }

    const message = location.state.authError.message

    openErrorModal({
      title: 'Access Denied',
      message,
    })

    showToast({
      message,
      type: 'warning',
    })
  }, [location.state, openErrorModal, showToast])

  const handleLogin = async (formValues) => {
    const result = await login(formValues)

    if (!result.success) {
      setError(result.message)

      if (result.reason === 'access') {
        openErrorModal({
          title: 'Unauthorized',
          message: result.message || 'You do not have permission to sign in.',
        })
      }

      if (result.reason === 'api' && (result.status === 0 || result.status >= 500)) {
        openErrorModal({
          title: 'Server Issue',
          message: result.message || 'The API returned an unexpected error.',
        })
      }

      showToast({
        message: result.message || 'Sign in failed.',
        type: 'error',
      })

      return
    }

    setError('')
    showToast({
      message: 'Signed in successfully.',
      type: 'success',
    })
    navigate(redirectTarget, { replace: true })
  }

  const goToRegister = () => {
    navigate('/register')
  }

  return {
    loginFields,
    error,
    handleLogin,
    goToRegister,
  }
}
