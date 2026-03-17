export interface UserInfo {
  id: string
  name: string
  avatar?: string
  email?: string
  phone?: string
  roleIds?: string[]
  permissions?: string[]
  department?: string
  position?: string
}

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  token: string
  userInfo: UserInfo
}
