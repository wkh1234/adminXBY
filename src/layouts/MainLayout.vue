<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { MainSidebar, MainHeader, MainContent } from './components'
import { useAppStore } from '@/stores/app'

const route = useRoute()
const appStore = useAppStore()

const isHideSidebar = computed(() => {
  return route.meta.hiddenSidebar
})
</script>

<template>
  <div class="main-layout" :class="{ 'sidebar-hidden': isHideSidebar }">
    <MainSidebar v-if="!isHideSidebar" />
    <div class="main-container" :class="{ 'sidebar-expanded': appStore.sidebarOpened }">
      <MainHeader />
      <MainContent />
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-layout {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  &.sidebar-hidden {
    .main-container {
      width: 100%;
    }
  }
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: calc(100% - #{$sidebar-collapsed-width});
  transition: width 0.3s;

  &.sidebar-expanded {
    width: calc(100% - #{$sidebar-width});
  }
}
</style>
