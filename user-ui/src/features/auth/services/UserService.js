import env from '../../../config/env'
export class UserService {
  constructor() {
    this.baseUrl = String(env.userApiUrl || '').replace(/\/$/, '')
    this.endpoints = ['users']
  }
  buildUrl(path = '') {
    if (!path) {
      return this.baseUrl
    }

    return `${this.baseUrl}/${path.replace(/^\//, '')}`
  }
  async request(path = '', options = {}) {
    try {
      const response = await fetch(this.buildUrl(path), {
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
        ...options,
      })

      const contentType = response.headers.get('content-type') || ''
      const hasJsonBody = contentType.includes('application/json')
      const body = hasJsonBody ? await response.json() : null

      if (response.ok) {
        return {
          ok: true,
          status: response.status,
          data: body,
        }
      }

      return {
        ok: false,
        status: response.status,
        error: body?.message || 'Request failed.',
      }
    } catch (error) {
      return {
        ok: false,
        status: 0,
        error: error instanceof Error ? error.message : 'Network error.',
      }
    }
  }
  async register(user) {
    return this.request('register', {
      method: 'POST',
      body: JSON.stringify(user),
    })
  }
  async login(credentials) {
    return this.request('login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }
  async getById(id, token) {
    return this.request(`user/${id}`, {
      method: 'GET',
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    })
  }
}

const userService = new UserService()

export default userService
