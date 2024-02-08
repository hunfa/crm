export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  user_name: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: string
  role: string
  user_name: string
  password: string
  avatar?: string | null
  name: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
