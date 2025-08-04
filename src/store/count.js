// src/store/count.js
import { defineStore } from 'pinia'
import { store } from '@/store'
export const useCountStore = defineStore('count', {
  state: () => {
    return {
      count: 0
    }
  },
  actions: {
    increment () {
      this.count++
    }
  },
  persist: true
  // persist: {
  //   storage: {
  //     setItem (key, value) {
  //       wx.setstoragesync(key, value)
  //     },
  //     getItem (key) {
  //       return wx.getstoragesync(key)
  //     }
  //   }

  // } // 配置持久化
})

export function useOutsideCountStore () {
  return useCountStore(store)
}
