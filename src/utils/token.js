

import { useTokenStoreWithOut } from "@/store/token"
const useTokenStore = useTokenStoreWithOut()

export const SET_TOKEN = (token) => {
  useTokenStore.setToken(token)
}

export const GET_TOKEN = () => {
  return useTokenStore.token
}

export const REMOVE_TOKEN = () => {
  return useTokenStore.removeToken()
}
