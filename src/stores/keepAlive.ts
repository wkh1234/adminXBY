import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useKeepAliveStore = defineStore('keepAlive', () => {
  const cachedViews = ref<string[]>([])

  function addCachedView(viewName: string) {
    if (!cachedViews.value.includes(viewName)) {
      cachedViews.value.push(viewName)
    }
  }

  function removeCachedView(viewName: string) {
    const index = cachedViews.value.indexOf(viewName)
    if (index > -1) {
      cachedViews.value.splice(index, 1)
    }
  }

  return {
    cachedViews,
    addCachedView,
    removeCachedView
  }
})
