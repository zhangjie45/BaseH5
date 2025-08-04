import { defineStore } from 'pinia'
import { store } from '@/store'

export const useTokenStore = defineStore('token', {
  state: () => ({
    token: ''
  }),
  getters: {
    getToken: state => state.token
  },
  actions: {
    setToken (token) {
      console.log("token--->", token);

      this.token = token
    },
    removeToken () {
      this.token = ''
    }
  },
  persist: true
})
export function useTokenStoreWithOut () {
  return useTokenStore(store)
}
