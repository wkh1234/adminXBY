import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserInfo } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref<UserInfo | null>(null)
  const permissions = ref<string[]>([])

  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function setUserInfo(info: UserInfo) {
    userInfo.value = info
    permissions.value = info.permissions || []
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    permissions.value = []
    localStorage.removeItem('token')
  }

  function hasPermission(permission: string): boolean {
    return permissions.value.includes(permission)
  }

  return {
    token,
    userInfo,
    permissions,
    setToken,
    setUserInfo,
    logout,
    hasPermission
  }
})
