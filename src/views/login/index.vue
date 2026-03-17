<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance } from 'element-plus'
import { useUserStore } from '@/stores/user'
import type { LoginParams } from '@/types/user'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive<LoginParams>({
  username: 'admin',
  password: 'admin123'
})

async function handleLogin() {
  if (!formRef.value) return
  await formRef.value.validate()

  loading.value = true
  try {
    // 模拟登录
    const mockToken = 'mock-token-' + Date.now()
    userStore.setToken(mockToken)
    userStore.setUserInfo({
      id: '1',
      name: '管理员',
      permissions: ['*'],
      roleIds: ['1']
    })
    ElMessage.success('登录成功')
    router.push('/')
  } catch (error) {
    ElMessage.error('登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h1>点位拓展管理系统</h1>
        <p>Location Expansion Management System</p>
      </div>
      <el-form ref="formRef" :model="form" class="login-form" @submit.prevent="handleLogin">
        <el-form-item prop="username" :rules="[{ required: true, message: '请输入用户名' }]">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            prefix-icon="User"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码' }]">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            class="login-btn"
            native-type="submit"
          >
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .login-box {
    width: 420px;
    padding: 40px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

    .login-header {
      text-align: center;
      margin-bottom: 40px;

      h1 {
        font-size: 24px;
        color: #333;
        margin-bottom: 8px;
      }

      p {
        font-size: 14px;
        color: #999;
      }
    }

    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
