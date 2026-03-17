<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import Menu from '@/components/Menu/index.vue'
import { routes } from '@/router'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

const menuList = computed(() => {
  // 从路由配置中获取一级菜单（排除登录页）
  const mainRoute = routes.find(r => r.path === '/')
  const children = mainRoute?.children || []
  
  return children
    .filter(r => r.meta?.title && !r.meta?.hidden)
    .map(item => ({
      path: item.path,
      title: item.meta?.title as string,
      icon: item.meta?.icon as string,
      children: item.children?.filter(c => c.meta?.title).map(c => ({
        path: c.path,
        title: c.meta?.title as string,
        icon: c.meta?.icon as string
      }))
    }))
})

const activeMenu = computed(() => route.path)

function handleMenuSelect(index: string) {
  router.push(index)
}

function toggleSidebar() {
  appStore.toggleSidebar()
}
</script>

<template>
  <div class="sidebar" :class="{ 'collapse': !appStore.sidebarOpened }">
    <div class="logo">
      <img src="@/assets/logo.png" alt="logo" class="logo-img" />
      <span v-if="appStore.sidebarOpened" class="logo-text">点位拓展</span>
    </div>
    <div class="sidebar-content">
      <Menu
        :menus="menuList"
        :active="activeMenu"
        :collapse="!appStore.sidebarOpened"
        @select="handleMenuSelect"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  width: $sidebar-width;
  height: 100vh;
  background: #001529;
  transition: width 0.3s;
  overflow: hidden;

  &.collapse {
    width: $sidebar-collapsed-width;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $header-height;
    padding: 0 16px;
    background: #002140;

    .logo-img {
      width: 32px;
      height: 32px;
    }

    .logo-text {
      margin-left: 12px;
      color: #fff;
      font-size: 18px;
      font-weight: 600;
      white-space: nowrap;
    }
  }

  .sidebar-content {
    height: calc(100vh - #{$header-height});
    overflow-y: auto;
  }
}
</style>
