<template>
    <el-card class="containner">

            <el-row :gutter="20">
                <el-col :span="4">
                    <el-input style="height:40px" v-model="filterId" placeholder="请输入指定编号" clearable
                        @clear="resetSearch"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button style="height:40px" type="warning"
                        @click="dialogVisibleAddAction = true">添加行为配置</el-button>
                </el-col>
            </el-row>
            <el-table :data="pagedTableData" :row-class-name="tableRowClassName" style="height:79vh">
                <el-table-column type="index" label="序号" width="80px" align="center">
                </el-table-column>
                <el-table-column prop="territoryConfigurationId" label="内部编号" align="center">
                </el-table-column>
                <el-table-column prop="action" label="行为配置名" align="center">
                </el-table-column>

                <el-table-column align="center" label="操作">
                    <template #default="scope">
                        <div class="button-group" style="text-align:center">
                            <el-button type="primary"
                                @click="changeActions = scope.row; dialogVisibleChangeAction = true">修改配置</el-button>
                            <el-popconfirm title="确认要删除吗?" @confirm="deleteAction(scope.row)">
                                <template #reference>
                                    <el-button type="danger"> 删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="hardwareInfo.length">
            </el-pagination>

    </el-card>


    <el-dialog v-model="dialogVisibleAddAction" title="新建行为配置" width="45%">
        <el-form :model="AddActionForm">
            <el-form-item label="配置详情">
                <el-input v-model="AddActionForm.action"></el-input>
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button type="info" @click="dialogVisibleAddAction = false;">
                    取消
                </el-button>
                <el-button type="primary" @click="submitAddAction(); dialogVisibleAddAction = false">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="dialogVisibleChangeAction" title="修改行为配置" width="45%">
        <el-form :model="changeActions">
            <el-form-item label="配置详情">
                <el-input v-model="changeActions.action"></el-input>
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button type="info" @click="dialogVisibleChangeAction = false;">
                    取消
                </el-button>
                <el-button type="primary" @click="submitchangeAction(); dialogVisibleChangeAction = false">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'
import { get, post, del, put } from '@/utils/request';
export default {
    data() {
        return {
            dialogVisibleAddAction: false,
            currentPage: 1,
            pageSize: 10,
            hardwareInfo: [
            ],
            AddActionForm: {},
            filterId: '',
            dialogVisibleChangeAction: false,
            changeAction: {}

        };
    },
    computed: {
        pagedTableData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredHardwareInfo.slice(start, end);
        },
        filteredHardwareInfo() {
            if (this.filterId) {
                return this.hardwareInfo.filter(item => item.territoryConfigurationId == this.filterId);
            }
            return this.hardwareInfo;
        },

    },
    methods: {
        resetSearch() {
            this.searchId = '';
        },
        submitAddAction() {
            get('/TerritoryConfiguration/create', this.AddActionForm, true).then(res => {
                this.hardwareInfo.push({ territoryConfigurationId: res.data.data.territoryConfigurationId, action: res.data.data.action })
            }).catch(error => {
                console.log(error)
                ElMessage({
                    message: '请求异常，请稍后再试',
                    type: 'error',
                });
            })
            this.AddActionForm = {}
        },
        deleteAction(row) {
            const actionId = row.territoryConfigurationId;
            get('/TerritoryConfiguration/delete', { id: actionId }, true).then(res => {
                if (res.data.success === true) {
                    ElMessage({
                        message: '删除成功',
                        type: 'success',
                    });
                    const index = this.hardwareInfo.findIndex(t => t.territoryConfigurationId === actionId);
                    if (index !== -1) {
                        this.hardwareInfo.splice(index, 1);
                    }
                } else {
                    ElMessage({
                        message: '删除失败',
                        type: 'error',
                    });
                }
            }).catch(error => {
                ElMessage({
                    message: '请求失败: ' + error.message,
                    type: 'error',
                });
            });
        },
        submitchangeAction() {

            get('/TerritoryConfiguration/update', this.changeActions, true).then(res => {
                ElMessage({
                    message: '修改成功',
                    type: 'success',
                });
            }).catch(error => {
                console.log(error)
                ElMessage({
                    message: '请求异常，请稍后再试',
                    type: 'error',
                });
            })
        }
    },
    mounted() {
        get('/TerritoryConfiguration/getAll', {}, true).then(res => {
            this.hardwareInfo = res.data.data

        }).catch(error => {
            console.log(error)
            ElMessage({
                message: '请求异常，请稍后再试',
                type: 'error',
            });
        })
    },
};
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