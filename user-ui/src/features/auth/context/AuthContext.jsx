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
    const source = payload?.user || payload || {}

    return userEntity({
      Id: source.Id ?? source.id,
      Email: source.Email ?? source.email,
      Password: source.Password ?? source.password,
      FirstName: source.FirstName ?? source.firstName,
      LastName: source.LastName ?? source.lastName,
    })
  }
  const register = async (payload) => {
    const newUserEntity = userEntity({
      Email: payload.email,
      Password: payload.password,
      FirstName: payload.firstName,
      LastName: payload.lastName,
    })

    const response = await userService.register(newUserEntity.toJSON())

    if (!response.ok) {
      return {
        success: false,
        message: response.error || 'Failed to register user.',
        status: response.status,
        reason: response.status === 403 ? 'access' : 'api',
      }
    }

    const mappedUser = mapApiPayloadToUser(response.data)
    const registeredUser = mappedUser.Email ? mappedUser : newUserEntity
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
    const token = response.data?.token

    if (!authenticatedUser.Email) {
      return {
        success: false,
        message: 'Invalid user payload from API.',
        reason: 'api',
      }
    }

    if (!authenticatedUser.Id || !token) {
      return {
        success: false,
        message: 'Missing user id or token in login response.',
        reason: 'api',
      }
    }

    const userDetailsResponse = await userService.getById(authenticatedUser.Id, token)

    if (!userDetailsResponse.ok) {
      return {
        success: false,
        message: userDetailsResponse.error || 'Failed to load user details.',
        status: userDetailsResponse.status,
        reason:
          userDetailsResponse.status === 401 || userDetailsResponse.status === 403
            ? 'access'
            : 'api',
      }
    }

    const hydratedUser = mapApiPayloadToUser(userDetailsResponse.data)

    if (!hydratedUser.Email) {
      return {
        success: false,
        message: 'Invalid user details payload from API.',
        reason: 'api',
      }
    }

    setUser(safeUserEntity(hydratedUser))

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
