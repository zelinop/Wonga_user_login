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
            type: 'access_denied',
            message: 'You do not have the necessary access for this page.',
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
