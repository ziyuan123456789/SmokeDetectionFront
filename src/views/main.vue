<template>

  <div v-if="territoriesList.length === 0">
    <el-empty description="暂无辖区信息" />
  </div>

  <div v-else>
    <div v-if="territoriesList.length === 1">
      <el-empty description="即将为您跳转到详情页" />
    </div>

    <div v-else>
      <el-row :gutter="20">
        <el-col :span="12" v-for="(territory, index) in territoriesList.slice(0, 2)" :key="index">
          <TerritorySocketShow @button-clicked="handleButtonClick"
                               :territory="territory"

          />
        </el-col>
      </el-row>
      <el-divider v-if="territoriesList.length > 2" />
      <el-row :gutter="20">
        <el-col :span="12" v-for="(territory, index) in territoriesList.slice(2)" :key="index">
          <TerritorySocketShow @button-clicked="handleButtonClick"
                               :territory="territory"

          />
        </el-col>
        <el-col :span="12" v-if="territoriesList.length === 3">
          <el-empty description="未分配辖区" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>

import TerritorySocketShow from '@/components/TerritorySocketShow.vue'
import { get } from '@/utils/request'
import { ElMessage } from 'element-plus'

export default {
  components: {
    TerritorySocketShow
  },
  name: "HomeView",
  data() {
    return {
      territoriesList: [],
      tableData: [
        {
          date: '今日预警次数',
          name: '0',
        },
        {
          data: '本月预警人数',
          name: '0'
        },
        {
          date: '人脸缓存区大小',
          name: '0',
        },
      ],

    };
  },
  watch: {
    'territoriesList.length'(newLength) {
      if (newLength === 1) {
        this.handleButtonClick()
      }
    }
  },
  mounted() {
    get('/territory/getUserTerritories', null, true).then(res => {
      if (res.data.success === true) {
        this.territoriesList = res.data.data
        if (this.territoriesList.length === 1) {
          this.handleButtonClick()
        }
      } else {
        ElMessage({
          message: '服务器内部错误',
          type: 'error',
        });
      }
    })
  },
  methods: {
    handleButtonClick(data) {
      localStorage.removeItem('territory')
      localStorage.setItem('territory', JSON.stringify(data.message))
      this.$router.push('/territoryDetailPage')
    }
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

  