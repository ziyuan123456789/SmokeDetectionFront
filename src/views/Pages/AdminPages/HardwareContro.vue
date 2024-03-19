<template>
    <el-card class="containner">
        <div >
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-input style="height:40px" v-model="filterId" placeholder="请输入指定编号" clearable
                        @clear="resetSearch"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button style="height:40px" type="warning"
                        @click="dialogVisibleAddHardware = true">添加硬件配置</el-button>
                </el-col>
            </el-row>
            <el-table :data="pagedTableData" :row-class-name="tableRowClassName" style="height:75vh">
                <el-table-column type="index" label="序号" width="80px" align="center">
                </el-table-column>
                <el-table-column prop="hardwareSettingId" label="内部编号" align="center">
                </el-table-column>
                <el-table-column prop="hardwareName" label="硬件配置名" align="center">
                </el-table-column>

                <el-table-column align="center" label="操作">
                    <template #default="scope">
                        <div class="button-group" style="text-align:center">
                            <el-button type="primary"
                                @click="changeHardwares = scope.row; dialogVisibleChangeHardware = true">修改配置</el-button>
                            <el-popconfirm title="确认要删除吗?" @confirm="deletetHardware(scope.row)">
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
        </div>
    </el-card>


    <el-dialog v-model="dialogVisibleAddHardware" title="新建硬件配置" width="45%">
        <el-form :model="AddHardwareForm">
            <el-form-item label="配置详情">
                <el-input v-model="AddHardwareForm.hardwareName"></el-input>
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button type="info" @click="dialogVisibleAddHardware = false;">
                    取消
                </el-button>
                <el-button type="primary" @click="submitAddHardware(); dialogVisibleAddHardware = false">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="dialogVisibleChangeHardware" title="修改硬件配置" width="45%">
        <el-form :model="changeHardwares">
            <el-form-item label="配置详情">
                <el-input v-model="changeHardwares.hardwareName"></el-input>
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button type="info" @click="dialogVisibleChangeHardware = false;">
                    取消
                </el-button>
                <el-button type="primary" @click="submitChangeHardware(); dialogVisibleChangeHardware = false">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'
import * as echarts from "echarts";
import axios from 'axios'
import { get, post, del, put } from '@/utils/request';
export default {
    data() {
        return {
            dialogVisibleAddHardware: false,
            currentPage: 1,
            pageSize: 10,
            hardwareInfo: [
            ],
            AddHardwareForm: {},
            filterId: '',
            dialogVisibleChangeHardware: false,
            changeHardware: {}

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
                return this.hardwareInfo.filter(item => item.hardwareSettingId == this.filterId);
            }
            return this.hardwareInfo;
        },

    },
    methods: {
        resetSearch() {
            this.searchId = '';
        },
        submitAddHardware() {
            get('/HardwareSetting/create', this.AddHardwareForm, true).then(res => {
                this.hardwareInfo.push({ hardwareSettingId: res.data.data.hardwareSettingId, hardwareName: res.data.data.hardwareName })
            }).catch(error => {
                console.log(error)
                ElMessage({
                    message: '请求异常，请稍后再试',
                    type: 'error',
                });
            })
            this.AddHardwareForm = {}
        },
        deletetHardware(row) {
            const hardwareId = row.hardwareSettingId;
            get('/HardwareSetting/delete', { id: hardwareId }, true).then(res => {
                if (res.data.success === true) {
                    ElMessage({
                        message: '删除成功',
                        type: 'success',
                    });
                    const index = this.hardwareInfo.findIndex(t => t.hardwareSettingId === hardwareId);
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
        submitChangeHardware() {

            get('/HardwareSetting/update', this.changeHardwares, true).then(res => {
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
        get('/HardwareSetting/getAll', {}, true).then(res => {
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