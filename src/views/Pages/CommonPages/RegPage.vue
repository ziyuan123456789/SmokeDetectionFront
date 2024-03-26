<template>
    <div class="back">
        <el-form ref="form" :model="form" :rules="rules" class="register-box" label-position="top">
            <h3 class="register-title">欢迎注册</h3>
            <!-- 用户名 -->
            <el-form-item label="用户名" prop="username" required>
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <!-- 电话 -->
            <el-form-item label="电话" prop="telephone" required>
                <el-input v-model="form.telephone"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password" required>
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item label="确认密码" prop="confirmPassword" required>
                <el-input type="password" v-model="form.confirmPassword"></el-input>
            </el-form-item>
            <el-form-item>
                <div class="form-buttons">
                    <el-button type="primary" @click="submitForm()">注册</el-button>
                    <el-button >取消</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { get, post, del, put } from '@/utils/request';
import { ElMessage } from 'element-plus'
export default {
    name: "Register",
    data() {
        return {
            form: {
                username: '',
                telephone: '',
                password: '',
                confirmPassword: '',
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                telephone: [
                    { required: true, message: '请输入电话号码', trigger: 'blur' },
                    { type: 'telephone', message: '请输入正确的电话号码', trigger: ['blur', 'change'] }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 1, message: '密码长度不能少于1位', trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value !== this.form.password) {
                                callback(new Error('两次输入的密码不一致!'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        submitForm() {
            if (this.form.password !== this.form.confirmPassword) {
                this.$message.error('两次输入的密码不一致!');
                return;
            }
            this.form.confirmPassword = ''
            console.log(this.form)
            get('/reg', this.form, false).then(response => {
                if (response.data.success === true) {
                    localStorage.setItem('loginData', JSON.stringify(response.data.data));
                    ElMessage({
                        message: '注册成功',
                        type: 'success',
                    });
                    this.$router.push("/login");
                } else {
                    ElMessage({
                        message: '注册失败',
                        type: 'error',
                    });
                }
            }).catch(error => {
                console.log(error)
                ElMessage({
                    message: '登录异常，请稍后再试',
                    type: 'error',
                });
            });

        }
    }
}

</script>

<style scoped>
.register-box {
    width: 350px;
    margin: 120px auto;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 30px #DCDFE6;
    background-color: #FFFFFF;
    opacity: 0.95;
}

.register-title {
    text-align: center;
}

.back {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(https://images.unsplash.com/photo-1527314392553-2c7bded21b23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80);
    /* 替换为您的图片URL */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}

.el-form-item {
    margin-bottom: 16px;
    /* 或者任何您需要的空间来确保统一的间距 */
}

.el-input {
    width: 100%;
    /* 确保输入框填满其容器 */
}

.form-buttons {
    text-align: center;
    /* 对齐按钮 */
}

.el-button {
    margin: 0 10px;
    /* 在按钮之间提供空间 */
}
</style>
