<template>
  <div class="container">
    <div class="form-container">
      <div class="form-header">
        <h2 class="form-title" v-if="showRegister">注册</h2>
        <h2 class="form-title" v-else>登录</h2>
      </div>
      <!-- 注册-->
      <form v-if="showRegister" @submit.prevent="register" class="form">
        <input v-model="registerForm.username" class="form-input" placeholder="Username"
          @blur="RegisterUsernameVerification(registerForm)" />
        <input v-model="registerForm.email" class="form-input" placeholder="Email"
          @blur="RegisterEmailVerification(registerForm)" />
        <input v-model="registerForm.password" class="form-input" placeholder="Password"
          @blur="RegisterForPasswordVerification(registerForm)" type="password" />
        <button type="submit" class="form-button">注册</button>
        <p class="form-switch">
          已经有账号？
          <button @click="toggleForm" class="form-switch-button">登录</button>
        </p>
      </form>
      <!-- 登录 -->
      <form v-else @submit.prevent="login" class="form">
        <input v-model="loginForm.username" class="form-input" placeholder="Username" />
        <input v-model="loginForm.password" class="form-input" placeholder="Password" type="password" />
        <button type="submit" class="form-button">登录</button>
        <p class="form-switch">
          还没有账号？
          <button @click="toggleForm" class="form-switch-button">注册</button>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { userRegisterService, userLoginService } from "@/api/user"
import { useUserStore } from "@/store/user"
import { useRouter } from "vue-router"

const router = useRouter()
import { generateRandomAvatar } from "@/mock/avatar.js"
// 创建一个变量记录是否是注册页面
let showRegister = ref(true)
const userStore = useUserStore()
let registerForm = ref({ username: "", email: "", password: "" })
let loginForm = ref({ username: "", password: "" })
async function register() {
  console.log(registerForm.value)
  // 开启请求
  await userRegisterService(registerForm.value)
  ElMessage({ message: "注册成功", type: "success" })
  // 注册成功后把user存储在store中
  userStore.setToken(registerForm.value)
  // 注册成功后，把页面变成登录页
  showRegister.value = false
}

async function login() {
  await userLoginService(loginForm.value)
    .then((response) => {
      // 存储token
      localStorage.setItem("token", response.data.token)
      // 存储头像
      localStorage.setItem("avatar", generateRandomAvatar())
      ElMessage({ message: "登录成功", type: "success" })
      // 跳转
      router.push("/")
    })
    .catch(() => ElMessage({ message: "用户名或者密码无效", type: "error" }))
}
function toggleForm() {
  showRegister.value = !showRegister.value
  resetForm()
}
// 取消表单的原先数据
function resetForm() {
  registerForm.value = { username: "", email: "", password: "" }
  loginForm.value = { username: "", password: "" }
}
// 注册用户名校验
const RegisterUsernameVerification = (registerForm) => {
  if (registerForm.username) {
    // 校验规则用户名必须以字母开头。用户名可以包含字母、数字、下划线。用户名的长度应该在4到6个字符之间。
    const usernameRegex = /^[a-zA-Z]\w{3,5}$/
    if (usernameRegex.test(registerForm.username)) {
      // 符合规则
      ElMessage({ message: "用户名正确", type: "success" })
    } else {
      ElMessage({
        message:
          "用户名无效,用户名必须以字母开头。用户名可以包含字母、数字、下划线。用户名的长度应该在4到6个字符之间",
        type: "error",
      })
    }
  }
}
// 注册邮箱检验
const RegisterEmailVerification = (registerForm) => {
  if (registerForm.email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (emailRegex.test(registerForm.email)) {
      // 符合规则
      ElMessage({ message: "邮箱正确", type: "success" })
    } else {
      ElMessage({
        message: "邮箱无效",
        type: "error",
      })
    }
  }
}
// 注册密码校验
const RegisterForPasswordVerification = (registerForm) => {
  if (!registerForm.password) {
    ElMessage({
      message: "请输入密码",
      type: "error",
    })
  }
}
</script>
<style scoped>
.container {
  padding: 100px;
  display: flex;
  justify-content: center;
}

.form-container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 1rem;
}

.form-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.form-button {
  width: 100%;
  padding: 0.5rem;
  background-color: #3490dc;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.form-switch {
  text-align: center;
  font-size: 0.875rem;
}

.form-switch-button {
  color: #3490dc;
  text-decoration: underline;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
