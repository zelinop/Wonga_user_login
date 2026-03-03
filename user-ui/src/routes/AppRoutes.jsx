import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import UserDetailsPage from '../pages/UserDetailsPage'
import AppContainer from '../layouts/AppContainer'
import PrivateRoute from './PrivateRoute'
function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? '/welcome' : '/login'} replace />
        }
      />

      <Route
        path="/register"
        element={
          <AppContainer>
            <RegisterPage />
          </AppContainer>
        }
      />

      <Route
        path="/login"
        element={
          <AppContainer>
            <LoginPage />
          </AppContainer>
        }
      />

      <Route
        path="/welcome"
        element={
          <PrivateRoute layout={AppContainer} component={UserDetailsPage} />
        }
      />

      <Route path="/credentials" element={<Navigate to="/welcome" replace />} />

      <Route
        path="*"
        element={
          <PrivateRoute layout={AppContainer} component={UserDetailsPage} />
        }
      />
    </Routes>
  )
}

export default AppRoutes
