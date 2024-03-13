<template>
  <el-card class="root-page-container">
    <div class="mhy-main-page mhy-account-center">
      <div class="mhy-layout">
        <div class="mhy-container mhy-account-center-header">
          <div class="mhy-avatar mhy-account-center-header__avatar mhy-avatar__xxl">
            <img src="https://img-static.mihoyo.com/communityweb/upload/c9d11674eac7631d2210a1ba20799958.png"
              class="mhy-avatar__img">
          </div>
          <div class="mhy-account-center-user">
            <div class="mhy-account-center-user__header">
              <div class="mhy-account-center-user__title">
                <span class="mhy-account-center-user__name">WZY</span>

                <img src="https://img-static.mihoyo.com/level/level1.png"
                  class="mhy-img-icon mhy-account-center-user__level mhy-account-center-user__level--self">

              </div>
              <div class="mhy-account-center-header__buttons">
                <div>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-button type="primary" @click="updateMyInfo">编辑</el-button>
                    </el-col>
                    <el-col :span="12">
                      <el-button type="warning" @click="dialogVisiblePassword = true">修改密码</el-button>
                    </el-col>
                  </el-row>

                </div>

              </div>
            </div>
            <div class="mhy-account-center-user__audit">
              <span class="mhy-account-center-user__uid">ID:378888828</span>

            </div>
            <div class="mhy-account-center-user__intro">
              <p><i style="color: #ad4e69;margin-right: 10px;font-size: 18px;"></i>暂无个人签名</p>
            </div>
            <div class="mhy-account-center-user__intro">
              <p><i style="color: #00c3ff;margin-right: 10px;font-size: 18px;"></i>权限:普通用户</p>
            </div>

          </div>
        </div>

        <!--左侧菜单栏-->
        <div class="mhy-container mhy-side-menu mhy-account-center__menu">
          <header class="mhy-side-menu__header">个人中心</header>
          <ul class="mhy-side-menu__list" style="list-style-type: none;">
            <li v-for="(item, index) in menus" :key="index" @click="selMenu(item)">
              <a :class="'mhy-router-link mhy-side-menu__item ' + (activeIndex === item.path ? 'nuxt-link-active' : '')">
                <i :class="item.icon" style="font-size: 18px;margin-right: 10px;"></i>
                <span>{{ item.name }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- 右侧内容-->
        <div class="mhy-container mhy-account-center-content">
          <router-view></router-view>
        </div>

      </div>

    </div>
  </el-card>
  <el-dialog title="编辑个人信息" v-model="dialogVisible" width="55%" center>
    <el-form ref="userInfoForm" :model="userInfo" label-width="100px">
      <!-- 昵称 -->
      <el-form-item label="昵称">
        <el-input v-model="userInfo.nickname"></el-input>
      </el-form-item>
      <!-- 性别 -->
      <el-form-item label="性别">
        <el-radio-group v-model="userInfo.gender">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱">
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <!-- 电话号码 -->
      <el-form-item label="电话号码">
        <el-input v-model="userInfo.phone"></el-input>
      </el-form-item>
      <!-- 家庭住址 -->
      <el-form-item label="家庭住址">
        <el-input type="textarea" v-model="userInfo.address"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">保存修改</el-button>
      </div>
    </template>

  </el-dialog>

  <el-dialog title="修改密码" v-model="dialogVisiblePassword" width="40%" center>
    <el-form label-position="top" :model="passwordPair">
      <el-form-item label="原密码">
        <el-input type="password" v-model="passwordPair.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input type="password" v-model="passwordPair.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="密码确认">
        <el-input type="password" v-model="passwordPair.newPasswordConfirm"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisiblePassword = false">取消</el-button>
        <el-button type="primary" @click="submitPasswordChange">保存修改</el-button>
      </div>
    </template>

  </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisiblePassword: false,
      passwordPair: {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      },
      userInfo: {
        nickname: 'Wzy',
        gender: 'male',
        email: '313',
        phone: '114',
        address: '大连'
      },
      activeIndex: '/index',
      menus: [
        { name: '个人简介', path: '/personal/user_info', icon: 'el-icon-document' },
        { name: '我的合集', path: '/personal/myCollect', icon: 'el-icon-document' },
      ]
    };
  },
  mounted() {
    let that = this;
    setInterval(function () {
      that.activeIndex = that.$router.currentRoute.path;
    }, 300);
  },
  methods: {
    submitPasswordChange() {
      if (this.passwordPair.newPassword === this.passwordPair.newPasswordConfirm) {
        this.dialogVisiblePassword = false,
          this.passwordPair = {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: ''
          }
      } else {
        ElMessage({
          message: '两次密码不一致',
          type: 'error'
        })
        this.passwordPair.newPassword = ''
        this.passwordPair.newPasswordConfirm = ''

      }


    },
    submitForm() {
      console.log('提交表单:', this.userInfo);
      // 在这里执行表单提交操作，例如发送请求到后端API
      this.dialogVisible = false;
    },
    resetForm() {
      this.$refs.userInfoForm.resetFields(); // 重置表单
      this.dialogVisible = false;
    },
    selMenu(item) {
      this.activeIndex = item.path;
      this.$router.push({ path: item.path });
    },
    updateMyInfo() {

      this.dialogVisible = true
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}

.root-page-container {
  height: 85vh;
  margin-top: 20px
}

.mhy-account-center-header {
  padding: 20px 50px 24px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 20px;
}

.mhy-container {
  background-color: #fff;
  border-radius: 4px;
}

.mhy-account-center-header__avatar {
  margin-right: 24px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

.mhy-avatar__xxl {
  width: 120px;
  height: 120px;
}

.mhy-avatar {
  display: inline-block;
  position: relative;
}

.mhy-avatar__img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ebebeb;
  vertical-align: top;
}

.mhy-avatar__img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ebebeb;
  vertical-align: top;
}

.mhy-account-center-user {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  height: 100%;
}

.mhy-account-center-user__header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.mhy-account-center-user__title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.mhy-account-center-user__name {
  font-size: 16px;
  line-height: 21px;
  font-weight: 600;
}

.mhy-account-center-user__level.mhy-img-icon {
  margin-left: 10px;
  height: 16px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

.mhy-account-center-user__level--self {
  cursor: pointer;
}

.mhy-img-icon {
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}

.mhy-button.mhy-button-md.mhy-button-outlined {
  line-height: 32px;
}




.mhy-account-center-user__audit {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.mhy-account-center-user__uid {
  font-size: 12px;
  color: #ccc;
}

a {
  text-decoration: none;
}

.mhy-account-center-user__certification,
.mhy-account-center-user__intro {

  margin-top: 12px;
  margin-left: -10px;
  color: #666;
  line-height: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.9em;
  margin-bottom: 10px;
}



/*左侧菜单栏*/

.mhy-side-menu__header {
  width: 100%;
  padding: 0 30px;
  line-height: 50px;
  border-bottom: 1px solid #ebebeb;
  font-size: 16px;
}

.mhy-side-menu__list {
  padding: 0 30px 10px;
}

.mhy-account-center__menu li:nth-of-type(3),
.mhy-account-center__menu li:nth-of-type(5) {
  border-bottom: 1px solid #f0f0f0;
}

.mhy-side-menu .nuxt-link-active {
  color: #00c3ff;
}

.mhy-side-menu__item {
  padding: 0 20px;
  line-height: 50px;
  font-size: 14px;
  color: #666;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
}
</style>