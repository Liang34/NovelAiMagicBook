<template>
  <el-card shadow="always" class="card">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        登陆
      </el-menu-item>
      <el-menu-item index="2">
        注册
      </el-menu-item>
    </el-menu>
    <el-form label-position="center" label-width="100px" :model="form" style="max-width: 460px" class="form" >
      <el-form-item label="邮箱">
        <el-input v-model="form.email" clearable/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" show-password clearable />
      </el-form-item>
      <el-form-item label="名称" v-if="activeIndex === '2'">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="验证码" v-if="activeIndex === '2' && isActive">
        <el-input v-model="form.code" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="onSubmit" class="btn">{{activeIndex === '1' ? '登陆': (isActive ? '激活': '注册')}}</el-button>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { register, login, activate } from '@/http/request'
import { ElMessage } from 'element-plus';
import router from '@/router';
type LoginType = 'login' | 'register' | 'activate';
const isActive = ref(false);
const form = ref({
  email: '',
  password: '',
  name: '',
  code: ''
})
const activeIndex = ref('1')
const loginType: Ref<LoginType> = ref('login');
const onSubmit = async () => {
  switch(loginType.value) {
    case 'login': 
      const { status: statusLog } = await login(form.value);
      if (statusLog === 1) {
        ElMessage.success('登陆成功');
        router.push('/home')
      }
    break;
    case 'register': 
      const { status: statusReg, msg: msgReg } = await register(form.value);
      if(statusReg === 1) {
        ElMessage.success('请查看邮箱验证码，输入验证码以激活账号')
      } else {
        ElMessage.warning(msgReg)
      }
      loginType.value = 'activate'
      isActive.value = true;
    break;
    case 'activate':
      const { status, msg } = await activate(form.value);
      if(status === 1) {
        ElMessage.success('激活成功, 请登陆')
        isActive.value = false;
        loginType.value = 'login'
        activeIndex.value = '1'
      } else {
        ElMessage.warning(msg)
      }
  }
}
const handleSelect = (val: string) => {
  if(val === '2') {
    loginType.value = 'register'
  } else if (val === '1') {
    loginType.value = 'login'
  }
  activeIndex.value = val
}
</script>

<style scoped lang="less">
.card {
  width: 600px;
  height: 350px;

  :global(.el-menu--horizontal) {
    display: flex;
    justify-content: center;
    border-bottom: none
  }

  .form {
    margin-top: 20px;
  }
  .btn {
    margin: 0 auto;
    display: block;
  }
}
</style>
