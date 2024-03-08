<template>
    <el-card class="containner">
        <div style="margin-top:10px">
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
                    <el-button style="height:40px" type="warning" @click="addTerritory()">添加辖区</el-button>
                </el-col>
            </el-row>
            <el-table :data="pagedTableData" :row-class-name="tableRowClassName" style="height:79vh">
                <el-table-column type="index" label="序号" width="55" align="center">
                </el-table-column>
                <el-table-column prop="territoryId" label="内部编号" align="center" min-width="50">
                </el-table-column>
                <el-table-column prop="territoryName" label="辖区名称" align="center" min-width="100">
                </el-table-column>
                <el-table-column prop="hardwareName" label="硬件配置" align="center" min-width="50">
                </el-table-column>
                <el-table-column prop="storageSize" label="存储大小" align="center" min-width="50">
                </el-table-column>
                <el-table-column prop="action" label="预警后事件" align="center">
                </el-table-column>
                <el-table-column align="center" label="操作" min-width="240">
                    <template #default="scope">
                        <div class="button-group" style="text-align:center">
                            <el-button type="success" @click="rating(scope.row)">查看拥有者</el-button>
                            <el-button type="primary" @click="rating(scope.row)">修改配置</el-button>
                            <el-button type="warning" @click="rating(scope.row)">修改行为</el-button>
                            <el-popconfirm title="确认要删除吗?" @confirm="deletetTerritory(scope.row)">
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
                layout="total, sizes, prev, pager, next, jumper" :total="allTerritory.length">
            </el-pagination>
        </div>
    </el-card>


    <el-dialog v-model="dialogVisibleAddTerritory" title="新建辖区" width="45%">
        <el-form :model="AddTerritoryForm">
            <el-form-item label="名称">
                <el-input v-model="AddTerritoryForm.territoryName"></el-input>
            </el-form-item>
            <el-form-item label="硬件配置">
                <el-select v-model="AddTerritoryForm.hardwareSettingId" placeholder="请选择硬件配置">
                    <el-option v-for="item in hardwareOptions" :key="item.value" :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="预警行为">
                <el-select v-model="AddTerritoryForm.territoryConfigurationId" placeholder="请选择预警行为">
                    <el-option v-for="action in alertActions" :key="action.value" :label="action.label"
                        :value="action.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="本地存储大小">
                <el-input-number v-model="AddTerritoryForm.storageSize" :step="10" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button type="info" @click="dialogVisibleAddTerritory = false; AddTerritoryForm = {
                name: '',
                hardware: '',
                alertAction: '',
                storageSize: ''
            }">
                    取消
                </el-button>
                <el-button type="primary" @click="submitAddTerritory(); dialogVisibleAddTerritory = false">
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
            AddTerritoryForm: {
                territoryName: '',
                hardwareSettingId: '',
                territoryConfigurationId: '',
                storageSize: ''
            },
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
    },
    methods: {
        submitAddTerritory() {
            get('/territory/createTerritory', this.AddTerritoryForm, true).then(res => {
                if (res.data.success === true) {
                    let hardwareOption = this.hardwareOptions.find(option => option.value == res.data.data.hardwareSettingId);
                    let action = this.alertActions.find(option => option.value == res.data.data.territoryConfigurationId);
                    console.log(action.label)
                    this.allTerritory.push({
                        territoryId: res.data.data.territoryId,
                        territoryName: res.data.data.territoryName,
                        hardwareName: hardwareOption.label,
                        action: action.label,
                        storageSize: res.data.data.storageSize
                    })
                    ElMessage({
                        message: '提交成功',
                        type: 'success',
                    });
                } else {
                    ElMessage({
                        message: '服务器内部错误',
                        type: 'error',
                    });
                }
            })
            this.dialogVisibleAddTerritory = {
                name: '',
                hardware: '',
                alertAction: '',
                storageSize: ''
            }
        },
        addTerritory() {
            this.hardwareOptions = []
            this.alertActions = []
            get('/HardwareSetting/getAll', {}, true).then(res => {
                if (res.data.success === true) {
                    for (var i = 0; i < res.data.data.length; i++) {
                        this.hardwareOptions.push({ value: res.data.data[i].hardwareSettingId, label: res.data.data[i].hardwareName })
                    }
                } else {
                    ElMessage({
                        message: '服务器内部错误',
                        type: 'error',
                    });
                }
            })
            get('/TerritoryConfiguration/getAll', {}, true).then(res => {
                if (res.data.success === true) {
                    for (var i = 0; i < res.data.data.length; i++) {
                        this.alertActions.push({ value: res.data.data[i].territoryConfigurationId, label: res.data.data[i].action })
                    }
                } else {
                    ElMessage({
                        message: '服务器内部错误',
                        type: 'error',
                    });
                }
            })
            this.dialogVisibleAddTerritory = true
        },
        deletetTerritory(row) {
            const territoryId = row.territoryId; 
            get('/territory/deleteTerritory', { id: territoryId }, true).then(res => {
                if (res.data.success === true) {
                    ElMessage({
                        message: '删除成功',
                        type: 'success',
                    });
                    const index = this.allTerritory.findIndex(t => t.territoryId === territoryId);
                    if (index !== -1) {
                        this.allTerritory.splice(index, 1);
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


        getAllTerritory() {
            get('/territory/getAllTerritory', {}, true).then(res => {
                if (res.data.success === true) {
                    console.log(res.data)
                    this.allTerritory = res.data.data
                } else {
                    ElMessage({
                        message: '请求失败,请重新登录',
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
        submit(scope) {
            scope.isopen = true
        },

        handleSelect(row) {
            this.currentTable = row;
        },
    },


};
</script>

<style scoped>
.containner {
    margin-top: 20px;
}

.el-table /deep/ .warning-row td {
    background: rgba(204, 224, 255, 0.477) !important;

}



.el-table /deep/ .error-row {
    background: #fae9e4 !important;
}
</style>