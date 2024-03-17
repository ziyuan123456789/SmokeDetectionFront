<template>
    <el-card class="containner">
      <div>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-input style="height:40px" v-model="input" placeholder="请输入指定用户"></el-input>
                </el-col>
                <el-col :span="4"><el-select v-model="selectClassId" @change="changeClass()" placeholder="请选择状态"
                        size="large" no-data-text="服务器异常">
                        <el-option v-for="item in selectClassInfo" :key="item.id" :label="item.classname"
                            :value="item.id" />
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-button style="height:40px" type="success" @click="applyForAll"
                        v-if="selectedRows.length > 0">申请全部</el-button>
                </el-col>
            </el-row>
            <el-alert v-if="allowAddTerritoryNums === -1" type="error" title="当前您的辖区已达限制" :closable="false">
            </el-alert>
        <el-table :data="pagedTableData" :row-class-name="tableRowClassName" style="flex-grow: 1; overflow: auto;"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" :selectable="selectable" />

                <el-table-column type="index" label="序号" width="55" align="center">
                </el-table-column>
                <el-table-column prop="territoryId" label="内部编号" align="center">
                </el-table-column>
                <el-table-column prop="territoryName" label="辖区名称" align="center">
                </el-table-column>
                <el-table-column prop="hardwareName" label="硬件配置" align="center">
                </el-table-column>
                <el-table-column prop="storageSize" label="存储大小" align="center">
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template #default="scope">
                        <el-button type="warning" @click="askForTerritory(scope.row)"
                            :disabled="isLimitReached && !selectedRows.includes(scope.row)">申请辖区</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="allTerritory.length"
                           style="margin-top: auto;">
            </el-pagination>
        </div>
      <el-dialog v-model="centerDialogVisible" title="申请内容" width="40%" center>
        <el-form :model="submitData">
          <el-form-item label="申请原因">
            <el-input v-model="submitData.remarks"></el-input>
          </el-form-item>
          <el-form-item label="预警后行为">
            <el-select v-model="submitData.territoryConfigurationId" placeholder="请选择预警行为">
              <el-option v-for="action in alertActions" :key="action.value" :label="action.label"
                         :value="action.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>


        <template #footer>
          <div class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false;submit()">
              提交
            </el-button>
          </div>
        </template>
      </el-dialog>

    </el-card>



</template>

<script>
import { ElMessage } from 'element-plus'
import { get } from '@/utils/request'

export default {
    data() {
        return {
          centerDialogVisible: false,
          submitData: {},
            allowAddTerritoryNums: '',
            selectedRows: [],
            dialogVisibleAddTerritory: false,
            currentPage: 1,
            pageSize: 10,
            allTerritory: [],
            hardwareOptions: [
            ],
            alertActions: [
            ],
        };

    },
    mounted() {
        this.getAllTerritory()
    },
    computed: {
        pagedTableData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.allTerritory.slice(start, end);
        },
        isLimitReached() {
            return this.allowAddTerritoryNums !== -1 && this.selectedRows.length >= this.allowAddTerritoryNums;
        }
    },
    methods: {
        handleSelectionChange(val) {
            if (this.allowAddTerritoryNums === -1) {
                return
            }
            this.selectedRows = val;
            if (this.selectedRows.length >= this.allowAddTerritoryNums) {
                ElMessage.error('已达最大选中数量')
            }
        },
        selectable(row, index) {

            if (this.allowAddTerritoryNums === -1) {
                return false
            }
          return !(this.selectedRows.length >= this.allowAddTerritoryNums && !this.selectedRows.includes(row))
        },
        askForTerritory(row) {
          get('/TerritoryConfiguration/getAll', {}, true).then(res => {
            if (res.data.success === true) {
              for (var i = 0; i < res.data.data.length; i++) {
                this.alertActions.push({
                  value: res.data.data[i].territoryConfigurationId,
                  label: res.data.data[i].action
                })
              }
            } else {
              ElMessage({
                message: '服务器内部错误',
                type: 'error'
              })
            }
          })
          this.centerDialogVisible = true
          this.submitData = row

        },
      submit() {
        let tokenData = localStorage.getItem('loginData')
        tokenData = JSON.parse(tokenData)
        get('/territory/requestChanges', {
          userId: tokenData.id,
          territoryIds: this.submitData.territoryId,
          remarks: this.submitData.remarks,
          territoryConfigurationId: this.submitData.territoryConfigurationId,

        }, true).then(res => {
          if (res.data.success === true) {
            ElMessage({
              message: '申请成功',
              type: 'success'
            })

            location.reload()
          } else {
            ElMessage({
              message: res.data.message,
              type: 'error'
            })
          }
        })
        },
        getAllTerritory() {
            get('/territory/availableTerritories', {}, true).then(res => {
                if (res.data.success === true) {
                    console.log(res.data)
                    this.allowAddTerritoryNums = res.data.data.currentCount
                    this.allTerritory = res.data.data.availableTerritories
                } else {
                    ElMessage({
                        message: '请求失败',
                        type: 'error',
                    });
                }
            }).catch(error => {
                console.log(error)
                ElMessage({
                    message: '请求异常,服务器内部错误',
                    type: 'error',
                });
            });

        },
    },


};
</script>

<style scoped>

.container{
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