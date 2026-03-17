<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElAvatar, ElBadge } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()

const notifications = ref(3)

function handleCommand(command: string) {
  if (command === 'logout') {
    userStore.logout()
    router.push('/login')
  } else if (command === 'profile') {
    router.push('/system/profile')
  }
}

function toggleSidebar() {
  appStore.toggleSidebar()
}
</script>

<template>
  <div class="main-header">
    <div class="header-left">
      <el-icon class="fold-btn" @click="toggleSidebar">
        <Fold v-if="appStore.sidebarOpened" />
        <Expand v-else />
      </el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.meta.title">{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right">
      <el-badge :value="notifications" class="notification-badge">
        <el-icon size="20"><Bell /></el-icon>
      </el-badge>
      <el-dropdown @command="handleCommand">
        <div class="user-info">
          <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="username">{{ userStore.userInfo?.name || '管理员' }}</span>
          <el-icon><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $header-height;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .header-left {
    display: flex;
    align-items: center;

    .fold-btn {
      font-size: 20px;
      cursor: pointer;
      margin-right: 16px;
      color: #666;

      &:hover {
        color: $primary-color;
      }
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;

    .notification-badge {
      cursor: pointer;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;

      .username {
        font-size: 14px;
        color: #333;
      }
    }
  }
}
</style>
