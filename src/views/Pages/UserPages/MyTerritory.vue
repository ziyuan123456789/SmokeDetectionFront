<template>
  <el-card class="containner">
    <div style="display: flex; flex-direction: column; height: calc(100vh - 7vh);margin-top:10px">
      <el-table :data="pagedTableData" :row-class-name="tableRowClassName" style="flex-grow: 1; overflow: auto;"
                @selection-change="handleSelectionChange">
        <el-table-column type="index" label="序号" width="55" align="center">
        </el-table-column>
        <el-table-column prop="id" label="内部编号" align="center">
        </el-table-column>
        <el-table-column prop="territoryName" label="辖区名称" align="center">
        </el-table-column>
        <el-table-column prop="hardwareName" label="硬件配置" align="center">
        </el-table-column>
        <el-table-column prop="action" label="预警后行为" align="center">
        </el-table-column>
        <el-table-column prop="storageSize" label="本地存储大小" align="center">
        </el-table-column>
        <el-table-column prop="confidenceLevel" label="默认置信度" align="center">
        </el-table-column>
        <el-table-column align="center" label="操作" width="240">
          <template #default="scope">
            <el-button type="primary"
                       @click="revokeApply(scope.row.changeRequestId)">修改报警阈值
            </el-button>
            <el-popconfirm title="确认要归还吗?确认后无法撤销" @confirm="deleteUserTerritory(scope.row)">
              <template #reference>
                <el-button type="danger"
                           @click="revokeApply(scope.row.changeRequestId)">归还辖区
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" style="margin-top: auto;"
                     :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="allTerritory.length">
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

      selectedRows: [],
      dialogVisibleAddTerritory: false,
      currentPage: 1,
      pageSize: 10,
      allTerritory: [],
      hardwareOptions: [],
      alertActions: []
    }

  },
  mounted() {
    this.getAllTerritory()
  },
  computed: {
    pagedTableData() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.allTerritory.slice(start, end)
    }

  },
  methods: {
    deleteUserTerritory(data){
      get('/territory/deleteUserTerritory', {id:data.id}, true).then(res => {
        if (res.data.success === true) {
          ElMessage({
            message: '删除成功',
            type: 'success'
          })
          const index = this.allTerritory.findIndex(t => t.id ===  data.id);
          if (index !== -1) {
            this.allTerritory.splice(index, 1);
          }

        } else {
          ElMessage({
            message: '请求失败',
            type: 'error'
          })
        }
      }).catch(error => {
        console.log(error)
        ElMessage({
          message: '请求异常,服务器内部错误',
          type: 'error'
        })
      })
    },
    getAllTerritory() {
      get('/territory/getUserTerritories', {}, true).then(res => {
        if (res.data.success === true) {
          this.allTerritory = res.data.data
        } else {
          ElMessage({
            message: '请求失败',
            type: 'error'
          })
        }
      }).catch(error => {
        console.log(error)
        ElMessage({
          message: '请求异常,服务器内部错误',
          type: 'error'
        })
      })

    }
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

::v-deep .el-table__header-wrapper .el-checkbox {

  visibility: hidden;
}
</style>