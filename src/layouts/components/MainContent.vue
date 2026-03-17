<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useKeepAliveStore } from '@/stores/keepAlive'

const route = useRoute()
const keepAliveStore = useKeepAliveStore()

defineProps<{
  keepAlive?: boolean
}>()
</script>

<template>
  <div class="main-content">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveStore.cachedViews">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: $bg-color;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
