<template>
  <div v-if="territoriesList.length === 0">
    <el-empty description="暂无辖区信息" />
  </div>

  <div v-else>
    
      <el-row :gutter="20">
        <el-col :span="12" v-for="(territory, index) in territoriesList.slice(0, 2)" :key="index">
          <TerritorySocketShow
            :icon="icon"
            :tableData="tableData"
            :alertEnabled="territory.isAlertEnabled"
          />
        </el-col>
      </el-row>
      <el-divider v-if="territoriesList.length > 2" />
      <el-row :gutter="20">
        <el-col :span="12" v-for="(territory, index) in territoriesList.slice(2)" :key="index">
          <TerritorySocketShow
            :icon="territory.icon"
            :tableData="territory.tableData"
            :alertEnabled="territory.isAlertEnabled"
          />
        </el-col>
        <el-col :span="12" v-if="territoriesList.length === 3">
          <el-empty description="未分配辖区" />
        </el-col>
      </el-row>
  
  </div>
</template>
<script>

import TerritorySocketShow from '@/components/TerritorySocketShow.vue'

export default {
  components: {
    TerritorySocketShow
  },
  name: "HomeView",
  data() {
    return {
      territoriesList: [{ id: 1, name: '厨房', confidenceLevel: 0.7 },
        { id: 2, name: '客厅', confidenceLevel: 0.6 },
        { id: 2, name: '客厅', confidenceLevel: 0.6 },
        { id: 2, name: '客厅', confidenceLevel: 0.6 }],
      icon: '',
      tableData: [
        {
          date: '今日预警次数',
          name: '0',
        }, {
          date: '自动截图次数',
          name: '0',
        },
      ],

    };
  },

  mounted() {
    this.connectWebSocket();
  },
  methods: {
    connectWebSocket() {
      let tokenData = localStorage.getItem('loginData')
      tokenData = JSON.parse(tokenData)
      this.ws = new WebSocket('ws://127.0.0.1:8000/ws?token=' + tokenData.token)
      this.ws.onmessage = (event) => {
        if (this.icon) {
          URL.revokeObjectURL(this.icon)
        }

        const blob = new Blob([event.data], { type: 'image/jpeg' });
        this.icon = URL.createObjectURL(blob);
        this.$nextTick(() => {
          let img = document.querySelector('.image-style')
          img.onload = () => {
            URL.revokeObjectURL(this.icon)
          }
        })
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };

      this.ws.onclose = () => {
        console.log('服务器关闭连接');
        if (this.icon) {
          URL.revokeObjectURL(this.icon)
          this.icon = null
        }
      };
    },
  },
  GoToFirstPage() {
    console.log("跳转到第一详情页面")
    this.$router.push({ path: '/FirstPage' })
  },
  handleSelect(key, keyPath) {
    console.log(key, keyPath);
  },
};
</script> 
<style scoped>


.error-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  color: #999;
}

.el-divider--horizontal {
  height: 2px !important;
  margin: 10px 0;
}
</style>

  