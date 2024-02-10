<template>
  <div class="back">
    <el-form ref="form" :model="form" :rules="rules" class="login-box" style=" opacity: 0.95;background-color: #FFFFFF;">
      <h3 class="login-title" >欢迎登录</h3>
      <br>
      <el-form-item label="账号" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item label="权限" prop="role">
        <el-select v-model="form.role">
          <el-option label="管理员" value="1"></el-option>
          <el-option label="用户" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <div style="text-align: center;">
          <el-button type="primary" @click="submitForm()">确定</el-button>
          <el-button>取消</el-button>
        </div>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
export default {
  name: "Login",
  data() {
    return {
      BASE_URL : 'http://localhost:8089/',
      form: {
        name: '',
        password: '',
        role: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入账户', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        role: [
          { required: true, message: '请选择权限', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      const that=this
      axios.get(this.BASE_URL+'checkLogin', {
        params: {
          username: this.form.name,
          password: this.form.password,
          role: this.form.role
        }
      })
        .then(function (response) {
          if (response.data.success == true) {
            localStorage.setItem('token', response.data.data.token);
            ElMessage({
              message: '登录成功',
              type: 'success',
            })
            that.$router.push('/main') 
          } else {
            ElMessage({
              message: '登录失败',
              type: 'warning',
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },



}

</script>

<style>

.login-box {
  width: 350px;
  margin: 120px auto;
  border: 1px solid #DCDFE6;
  padding: 20px;
  border-radius: 5px;
  opacity: 1;
  box-shadow: 0 0 30px #DCDFE6;
}

.login-title {
  text-align: center;
  opacity: 1;
}
.back {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;

  background-image: url(https://images.unsplash.com/photo-1527314392553-2c7bded21b23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80) ;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
</style>