const uuid = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`
}
export class User {
  constructor(jsonData = {}) {
    this.Id = uuid()
    this.Email = ''
    this.Password = ''
    this.FirstName = ''
    this.LastName = ''

    Object.assign(this, jsonData)

    this.Email = String(this.Email).trim().toLowerCase()
    this.FirstName = String(this.FirstName).trim()
    this.LastName = String(this.LastName).trim()
  }
  toSafeUser() {
    return {
      Id: this.Id,
      Email: this.Email,
      FirstName: this.FirstName,
      LastName: this.LastName,
    }
  }
  toJSON() {
    return {
      Id: this.Id,
      Email: this.Email,
      Password: this.Password,
      FirstName: this.FirstName,
      LastName: this.LastName,
    }
  }
}
export const userEntity = (payload) => new User(payload)
export const safeUserEntity = (entity) => entity.toSafeUser()
