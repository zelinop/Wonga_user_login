import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
function PrivateRoute({ component, layout }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
          authError: {
            message: 'Your session is no longer available. Please sign in again.',
          },
        }}
      />
    )
  }

  const Component = component
  const Layout = layout

  return (
    <Layout>
      <Component />
    </Layout>
  )
}

export default PrivateRoute
