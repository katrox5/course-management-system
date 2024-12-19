<script setup lang="ts">
  // import { useUserStore } from '@/stores/user'
  import { type FormInstance, type FormRules } from 'element-plus'

  // const userStore = useUserStore()
  // const router = useRouter()

  const formRef = ref<FormInstance>()
  const form = reactive({
    username: '',
    password: '',
  })
  const rules: FormRules<typeof form> = {
    username: [{ required: true, message: '请输入账号', trigger: 'change' }],
    password: [{ required: true, message: '请输入密码', trigger: 'change' }],
  }
  const loading = ref(false)

  function login() {
    formRef.value?.validate(async (valid) => {
      if (!valid) return
      loading.value = true
      try {
        // TODO: login
        // userStore.token = resp.token
        // ElMessage({ type: 'success', message: '登录成功' })
        // if (router.currentRoute.value.query.redirect) {
        //   router.push(router.currentRoute.value.query.redirect as string)
        // } else {
        //   router.push('/')
        // }
      } catch (error: any) {
      } finally {
        loading.value = false
      }
    })
  }
</script>

<template>
  <div class="w-2/3 h-full float-left bg" />
  <div class="w-1/3 h-full float-right">
    <el-form
      class="flex h-full"
      ref="formRef"
      :model="form"
      :rules
      label-width="auto"
      label-position="left"
      hide-required-asterisk
    >
      <div class="flex flex-col m-auto w-90 gap-y-2">
        <h3 class="text-2xl font-medium mb-8">欢迎使用</h3>
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" placeholder="请输入账号" @keydown.enter="login" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
            validate-event
            @keydown.enter="login"
          />
        </el-form-item>
        <el-button type="primary" :disabled="loading" :loading @click="login"> 登录 </el-button>
        <div class="flex flex-row-reverse mt-4">
          <el-button type="primary" link @click=""> TOTP 登录 </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
  .bg {
    background-image: url(../assets/bg.png);
    background-position: center;
  }
</style>
