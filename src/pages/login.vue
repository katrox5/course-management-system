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

  // TOTP 模块
  const totpView = ref(false)

  const totpFormRef = ref<FormInstance>()
  const totpForm = reactive({
    username: '',
    captcha: '',
  })
  const totpRules: FormRules<typeof totpForm> = {
    username: [{ required: true, message: '请输入账号', trigger: 'change' }],
    captcha: [{ message: '请输入验证码', trigger: 'change' }],
  }

  function requestCaptcha() {
    totpFormRef.value?.validate(async (valid) => {
      if (!valid) return
    })
    // TODO: 获取验证码
  }

  function totpLogin() {
    totpFormRef.value?.validate(async (valid) => {
      if (!valid) return
      loading.value = true
      try {
        // TODO: totpLogin
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
      v-show="!totpView"
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
          <el-input v-model="form.username" placeholder="请输入您的账号" @keydown.enter="login" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入您的密码"
            show-password
            validate-event
            @keydown.enter="login"
          />
        </el-form-item>
        <el-button type="primary" :disabled="loading" :loading @click="login"> 登录 </el-button>
        <div class="flex flex-row-reverse mt-4">
          <el-button type="primary" link @click="totpView = true"> TOTP 登录 </el-button>
        </div>
      </div>
    </el-form>
    <el-form
      v-show="totpView"
      class="flex h-full"
      ref="totpFormRef"
      :model="totpForm"
      :rules="totpRules"
      label-width="auto"
      label-position="left"
      hide-required-asterisk
    >
      <div class="flex flex-col m-auto w-90 gap-y-2">
        <h3 class="text-2xl font-medium mb-8">TOTP 登录</h3>
        <el-form-item prop="username">
          <el-input v-model="totpForm.username" placeholder="请输入您的账号" />
        </el-form-item>
        <div class="grid grid-cols-2 gap-x-4">
          <el-form-item prop="captcha">
            <el-input
              v-model="totpForm.captcha"
              placeholder="输入验证码"
              validate-event
              @keydown.enter="totpLogin"
            />
          </el-form-item>
          <el-button type="primary" @click="requestCaptcha">获取验证码</el-button>
        </div>
        <el-button type="primary" :disabled="loading" :loading @click="totpLogin"> 登录 </el-button>
        <div class="flex flex-row-reverse mt-4">
          <el-button type="primary" link @click="totpView = false"> 密码登录 </el-button>
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
