<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

const form = reactive({
  name: userStore.userInfo?.name || '管理员',
  email: 'admin@example.com',
  phone: '13800138000',
  department: '销售部',
  position: '经理'
})

const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

function handleUpdate() {
  ElMessage.success('基本信息更新成功')
}

function handleUpdatePassword() {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    ElMessage.error('两次密码输入不一致')
    return
  }
  ElMessage.success('密码修改成功')
  passwordForm.oldPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
}
</script>

<template>
  <div class="profile-page">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div class="avatar-section">
            <el-avatar :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <h3>{{ form.name }}</h3>
            <p>{{ form.position }}</p>
          </div>
          <el-divider />
          <div class="info-list">
            <div class="info-item">
              <span class="label">部门：</span>
              <span>{{ form.department }}</span>
            </div>
            <div class="info-item">
              <span class="label">职位：</span>
              <span>{{ form.position }}</span>
            </div>
            <div class="info-item">
              <span class="label">手机：</span>
              <span>{{ form.phone }}</span>
            </div>
            <div class="info-item">
              <span class="label">邮箱：</span>
              <span>{{ form.email }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本信息" name="info">
              <el-form :model="form" label-width="80px" style="max-width: 400px">
                <el-form-item label="姓名">
                  <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="form.email" />
                </el-form-item>
                <el-form-item label="手机">
                  <el-input v-model="form.phone" />
                </el-form-item>
                <el-form-item label="部门">
                  <el-input v-model="form.department" />
                </el-form-item>
                <el-form-item label="职位">
                  <el-input v-model="form.position" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleUpdate">保存</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="password">
              <el-form :model="passwordForm" label-width="100px" style="max-width: 400px">
                <el-form-item label="原密码">
                  <el-input v-model="passwordForm.oldPassword" type="password" show-password />
                </el-form-item>
                <el-form-item label="新密码">
                  <el-input v-model="passwordForm.newPassword" type="password" show-password />
                </el-form-item>
                <el-form-item label="确认密码">
                  <el-input v-model="passwordForm.confirmPassword" type="password" show-password />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleUpdatePassword">修改密码</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      activeTab: 'info'
    }
  }
}
</script>

<style scoped lang="scss">
.profile-page {
  .avatar-section {
    text-align: center;
    padding: 20px 0;

    h3 {
      margin: 16px 0 8px;
      font-size: 18px;
      color: #333;
    }

    p {
      color: #666;
      font-size: 14px;
    }
  }

  .info-list {
    .info-item {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .label {
        width: 60px;
        color: #999;
      }
    }
  }
}
</style>
