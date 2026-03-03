import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/hooks/useAuth'
import { useFeedback } from '../../shared/hooks/useFeedback'

export const useUserDetailsPageLogic = () => {
  const { user, logout } = useAuth()
  const { showToast } = useFeedback()
  const navigate = useNavigate()
  const hasHandledMissingUser = useRef(false)

  useEffect(() => {
    if (user || hasHandledMissingUser.current) {
      return
    }

    hasHandledMissingUser.current = true
    showToast({
      message: 'Your session is no longer available. Please sign in again.',
      type: 'warning',
    })
    navigate('/login', { replace: true })
  }, [user, showToast, navigate])

  return {
    user,
    logout,
  }
}
