<script setup lang="ts">
import { ref, computed } from 'vue'

interface MenuItem {
  path: string
  title: string
  icon?: string
  children?: MenuItem[]
}

interface Props {
  menus: MenuItem[]
  active: string
  collapse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  menus: () => [],
  active: '',
  collapse: false
})

const emit = defineEmits<{
  select: [index: string]
}>()

const selectedKeys = ref<string[]>([props.active])
const openKeys = ref<string[]>([])

function handleMenuClick(item: MenuItem) {
  selectedKeys.value = [item.path]
  emit('select', item.path)
}

function handleSubMenuOpen(keys: string[]) {
  openKeys.value = keys
}

function findOpenKeys(path: string): string[] {
  for (const menu of props.menus) {
    if (menu.children?.some(c => c.path === path)) {
      return [menu.path]
    }
  }
  return []
}
</script>

<template>
  <div class="menu-wrapper">
    <el-menu
      :default-active="active"
      :collapse="collapse"
      :unique-opened="true"
      background-color="#001529"
      text-color="#bfcbd9"
      active-text-color="#409eff"
      router
    >
      <template v-for="item in menus" :key="item.path">
        <el-sub-menu v-if="item.children?.length" :index="item.path">
          <template #title>
            <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :key="child.path"
            :index="child.path"
          >
            <el-icon v-if="child.icon"><component :is="child.icon" /></el-icon>
            <span>{{ child.title }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.path">
          <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.menu-wrapper {
  :deep(.el-menu) {
    border-right: none;
  }

  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    &:hover {
      background-color: #000c17 !important;
    }
  }


}
</style>
