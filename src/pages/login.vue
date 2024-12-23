<script setup lang="ts">
  import { useUserStore } from '@/stores/user'
  import { useMousePressed } from '@vueuse/core'
  import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
  // @ts-ignore
  import QRCode from 'qrcode'

  const userStore = useUserStore()
  const router = useRouter()

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
      fetch(`/dev/login?username=${form.username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
      })
        .then((response) => response.json())
        .then((result) => {
          userStore.userInfo = result
          router.push('/')
          ElMessage.success('登录成功')
        })
        .catch((error) => console.warn(error))
      loading.value = false
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

  const captcha = ref('')
  const { pressed } = useMousePressed()
  watch(pressed, () => (qrcodeVisible.value = false))
  const qrcodeVisible = ref(false)
  const qrcodeDataUrl = ref('')

  function requestCaptcha() {
    totpFormRef.value?.validate(async (valid) => {
      if (!valid) return
      captcha.value = String(Math.floor(Math.random() * 1000000))
      QRCode.toDataURL(captcha.value, {
        color: {
          light: '#ffffff',
        },
      }).then((url: string) => {
        qrcodeDataUrl.value = url
        qrcodeVisible.value = true
      })
    })
  }

  function totpLogin() {
    totpFormRef.value?.validate(async (valid) => {
      if (!valid) return
      if (!captcha.value || captcha.value !== totpForm.captcha) {
        ElMessage.error('验证码错误')
        totpForm.captcha = ''
        return
      }
      loading.value = true
      fetch(`/dev/login?username=${totpForm.username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
      })
        .then((response) => response.json())
        .then((result) => {
          userStore.userInfo = result
          router.push('/')
          ElMessage.success('登录成功')
        })
        .catch((error) => console.warn(error))
      loading.value = false
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
          <el-popover :visible="qrcodeVisible" trigger="click">
            <img :src="qrcodeDataUrl" alt="验证码" />
            <template #reference>
              <el-button type="primary" @click="requestCaptcha">获取验证码</el-button>
            </template>
          </el-popover>
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
