const CURRENT_USER_KEY = 'currentUser'
const readJson = (key, fallback) => {
  const raw = localStorage.getItem(key)

  if (!raw) {
    return fallback
  }

  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}
export const getCurrentUser = () => readJson(CURRENT_USER_KEY, null)
export const saveCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
}
export const clearCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY)
}
