<template>
  <div class="main">
    <el-form :model="from" label-position="top" :rules="rules" ref="fromRef">
      <div class="back_img"></div>
      <div class="login">
        <div class="lgoinImg">
          <img src="../../assets/img/logo.jpeg" />
        </div>
        <div class="login_title"></div>
        <div class="login_input">
          <el-form-item prop="userName">
            <el-input
              prefix-icon="User"
              placeholder="请输入账号"
              v-model="from.userName"
            ></el-input>
          </el-form-item>
        </div>
        <div class="login_input">
          <el-form-item prop="passWord">
            <el-input
              prefix-icon="Lock"
              placeholder="请输入密码"
              show-password
              v-model="from.passWord"
            ></el-input>
          </el-form-item>
        </div>
        <el-select
          v-model="value"
          placeholder="请选择用户类型"
          class="login_input1"
        >
          <el-option
            v-for="item in types"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          >
          </el-option>
        </el-select>
        <div class="login_button">
          <p @click="checkLogin(from)">登录</p>
          <p @click="checkLogin1">注册</p>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import { get } from '../../utils/request'
import { ElMessage } from 'element-plus'
import { ref } from '@vue/reactivity'
// do not use same name with ref

export default {
  name: 'LoginRegister',
  data() {
    return {
      from: {
        roleID: '',
        roleName: '',
        userName: '',
        passWord: ''
      },
      loginState: sessionStorage.login,
      types: [],
      value: '',
      login: []
    }
  },
  setup() {
    const rules = ref({
      userName: [
        {
          required: true,
          message: '请填写账户',
          trigger: 'blur'
        }
      ],
      passWord: [
        {
          required: true,
          message: '请填写密码',
          trigger: 'blur'
        }
      ]
    })

    return { rules }
  },
  mounted() {
    get('/getRoleList').then((res) => {
      this.types = res.data.data
    })
  },
  methods: {
    checkLogin() {
      get('/checkLogin', {
        userName: this.from.userName,
        password: this.from.passWord,
        userRole: this.value
      }).then((res) => {
        this.login = res.data
        sessionStorage.setItem("token",res.data.token);
        console.log(res.data.token)
        if (this.login.code == 0) {
          if (res.data.data.userRole == 'user') {
            this.$router.push({
              name: 'Notice'
            })
            ElMessage({
              message: '登录成功！',
              type: 'success'
            })
          }
          if (this.login.data.userRole == 'doctor') {
            get('/getDoctorsByNameAndTelephone', {
              docName: res.data.data.realName,
              telephone: res.data.data.telephone,
            }).then((res) => {
              sessionStorage.login = true;
              sessionStorage.docId = res.data.data.docId;
            })
            ,
            this.$router.push({
              name: 'doctorLogin'
            })
            ElMessage({
              message: '登录成功！',
              type: 'success'
            })
          }
        } else {
          ElMessage.error('登录失败，请输入正确的密码，或用户名，或权限！')
        }
      })
    }
  }
}
</script>

<style scoped>
.back_img {
  background: url('../../assets/img/login.jpeg');
  background-size: 100% 100%;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  opacity: 0.9;
  /* background: #65768557; */
  padding: 30px;
  width: 18%;
  border: 1px solid #eee;
  border-radius: 20px;
}
.lgoinImg {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
.lgoinImg img {
  width: 110px;
  height: 110px;
  background: #eceeed;
  border-radius: 50%;
  border: 10px solid #fff;
}

.login_title {
  text-align: center;
  padding-bottom: 20px;
}
.login_input {
  margin-top: 15px;
}
.login_input:nth-child(2) {
  margin-bottom: 20px;
}
.login_input:nth-child(3) {
  margin-top: 20px;
}
.login_button {
  margin-top: 20px;
  display: flex;
}
.login_button p {
  color: #fff;
  font-size: 15px;
  display: block;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  width: 100%;
  border: 1px solid #ddd;
}
.login_button p:nth-child(1) {
  background: #409eff;
  margin-right: 10px;
}
.login_button p:nth-child(2) {
  background: #67c23a;
  margin-left: 10px;
}
</style>
