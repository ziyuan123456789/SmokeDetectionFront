<template>
  <el-card class="containner">
    <div>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-select v-model="selectState" @change="changeState()" placeholder="请选择筛选条件"
                     size="large" no-data-text="服务器异常">
            <el-option v-for="item in selectDataInfo" :key="item.id" :label="item.name"
                       :value="item.id" />
          </el-select>
        </el-col>
      </el-row>
      <el-table :data="pagedTableData" style="height:75vh" >
        <el-table-column prop="userID" label="用户ID"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="role" label="角色" v-slot="{ row }">
          <template v-if="row.role === '1'">
            管理员
          </template>
          <template v-else>
            普通用户
          </template>
        </el-table-column>
        <el-table-column prop="telephone" label="电话"></el-table-column>
        <el-table-column prop="regTime" label="注册时间"></el-table-column>
        <el-table-column
          label="状态"
          v-slot="{ row }"
        >
          <template v-if="row.enabled == '1'">
            正常
          </template>
          <template v-else>
            用户封禁中
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template v-slot="{ row }">
            <el-button type="primary" :disabled ="row.role === '1' " @click="viewTerritories(row)">查看用户辖区</el-button>
            <el-button
              :type="row.enabled == '1' ? 'danger' : 'success'"
              :disabled ="row.role === '1' "
              @click="toggleUserStatus(row)"
            >
              {{ row.enabled == '1 '? '封禁用户' : '解封用户' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="hardwareInfo.length">
      </el-pagination>
    </div>
  </el-card>

</template>

<script>
import { ElMessage } from 'element-plus'
import { get } from '@/utils/request'

export default {
  data() {
    return {
      selectState: '',
      dialogVisibleAddHardware: false,
      currentPage: 1,
      pageSize: 10,
      hardwareInfo: [],
      AddHardwareForm: {},
      filterId: '',
      dialogVisibleChangeHardware: false,
      selectDataInfo: [{ id: 0, name: '显示正常状态用户' }, { id: 1, name: '显示全部用户' }]

    }
  },
  computed: {
    pagedTableData() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredHardwareInfo.slice(start, end)
    },
    filteredHardwareInfo() {
      if (this.filterId) {
        return this.hardwareInfo.filter(item => item.hardwareSettingId == this.filterId)
      }
      return this.hardwareInfo
    }

  },
  methods: {
    toggleUserStatus(row){
      if(row.enabled===1){
        get('/userControl/ban', {id:row.userID}, true).then(res => {
          ElMessage({
            message: '封禁成功',
            type: 'success'
          })
          row.enabled=0;
        }).catch(error => {
          console.log(error)
          ElMessage({
            message: '请求异常，请稍后再试',
            type: 'error'
          })
        })
      }else{
        get('/userControl/unban', {id:row.userID}, true).then(res => {
          ElMessage({
            message: '解封成功',
            type: 'success'
          })
          row.enabled=1;
        }).catch(error => {
          console.log(error)
          ElMessage({
            message: '请求异常，请稍后再试',
            type: 'error'
          })
        })
      }
      },

    changeState() {

      this.hardwareInfo = []
      // 正常用户
      if (this.selectState === 0) {
        this.init()
      } else {
        // 全部用户
        get('/userControl/getAllUsers', {}, true).then(res => {
          this.hardwareInfo = res.data.data
        }).catch(error => {
          console.log(error)
          ElMessage({
            message: '请求异常，请稍后再试',
            type: 'error'
          })
        })
      }
    },
    init() {
      get('/userControl/getAllActiveUsers', {}, true).then(res => {
        this.hardwareInfo = res.data.data

      }).catch(error => {
        console.log(error)
        ElMessage({
          message: '请求异常，请稍后再试',
          type: 'error'
        })
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>
.containner {
  height: 99%;
}

.el-table /deep/ .warning-row td {
  background: rgba(204, 224, 255, 0.477) !important;

}


.el-table /deep/ .error-row {
  background: #fae9e4 !important;
}
</style>
./HardwareContro.vue