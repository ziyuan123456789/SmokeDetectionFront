<template>
  <div  class="aside-menu">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="vertical" @select="handleSelect"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <template v-for="item in menuItems()" :key="item.path">
          <el-menu-item v-if="item.children.length <= 1" :index="checkUrl(item.path, item.children[0].path)">
            {{ item.cnName }}
          </el-menu-item>
          <el-sub-menu v-else :index="item.path">
            <template #title>{{ item.cnName }}</template>
            <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
              {{ child.cnName }}
            </el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
  </div>

</template>

<script>
export default {
  //xxx:对路由做了简单封装,可以自动实现子路由的层级,但是如果想要作为一个父路由单独显示就也得声明为父子层级
  data() {
    return {
      activeIndex: this.$route.path,
      isAdmin: false,
      loginData: {}
    };
  },
  mounted() {
    this.checkLogin();
  },
  watch: {
    '$route'(newRoute) {
      this.activeIndex = newRoute.path;
    }
  },
  computed: {



  },
  methods: {
    menuItems() {
      let routes = this.$router.options.routes;
      const userInfo = JSON.parse(localStorage.getItem('loginData'));
      const userRole = userInfo ? userInfo.role : null;
      return routes.filter(route => {
        if (route.hidden) {
          return false;
        }
        if (!route.meta || !route.meta.needRole || route.meta.needRole === userRole) {
          return true;
        }
        return false;
      });
    },

    checkUrl(baseurl, childurl) {
      if (childurl === '') {
        return baseurl
      } else {
        return baseurl + '/' + childurl
      }
    },
    gotoLogin() {
      this.$store.commit('SET_RETURN_URL', this.$route.fullPath);
      this.$router.push({ name: 'LoginPage' });
    },
    handleSelect(key, keyPath) {
      if (keyPath.length > 1) {
        this.$router.push(keyPath[0] + '/' + keyPath[1]);
        return
      }
      console.log(keyPath)
      this.$router.push(key);
    },
    checkLogin() {
      this.loginData = JSON.parse(localStorage.getItem("loginData"));
      if (this.loginData == null) {
        return true;
      } else {
        this.isAdmin = this.loginData.role === "1";
        return false;
      }
    },
    logout() {
      localStorage.removeItem('loginData')
      this.isAdmin = false
      this.menuItems()
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.aside-menu {
  height: calc(100%);
}

.el-menu-demo {
  height: calc(100%);
}
</style>
