import { useEffect, useState } from 'react'
import { clearCurrentUser, getCurrentUser, saveCurrentUser } from '../services/authStorage'
import { safeUserEntity, userEntity } from '../entities/UserEntity'
import userService from '../services/UserService'
import AuthContext from './authContext'
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const currentUser = getCurrentUser()
    return currentUser ? safeUserEntity(userEntity(currentUser)) : null
  })

  useEffect(() => {
    if (user) {
      saveCurrentUser(user)
      return
    }

    clearCurrentUser()
  }, [user])
  const mapApiPayloadToUser = (payload) => {
    const source = payload || {}

    return userEntity({
      Id: source.Id,
      Email: source.Email,
      Password: source.Password,
      FirstName: source.FirstName,
      LastName: source.LastName,
    })
  }
  const register = async (payload) => {
    const userEntity = userEntity({
      Email: payload.email,
      Password: payload.password,
      FirstName: payload.firstName,
      LastName: payload.lastName,
    })

    const response = await userService.register(userEntity.toJSON())

    if (!response.ok) {
      return {
        success: false,
        message: response.error || 'Failed to register user.',
        status: response.status,
        reason: response.status === 403 ? 'access' : 'api',
      }
    }

    const registeredUser = mapApiPayloadToUser(response.data || userEntity)
    setUser(safeUserEntity(registeredUser))

    return { success: true }
  }
  const login = async ({ email, password }) => {
    const response = await userService.login({
      Email: email,
      Password: password,
    })

    if (!response.ok) {
      return {
        success: false,
        message: response.error || 'Invalid email or password.',
        status: response.status,
        reason: response.status === 401 || response.status === 403 ? 'access' : 'api',
      }
    }

    const authenticatedUser = mapApiPayloadToUser(response.data)

    if (!authenticatedUser.Email) {
      return {
        success: false,
        message: 'Invalid user payload from API.',
        reason: 'api',
      }
    }

    setUser(safeUserEntity(authenticatedUser))

    return { success: true }
  }
  const logout = () => {
    setUser(null)
  }
  const value = {
    user,
    isAuthenticated: Boolean(user),
    register,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
