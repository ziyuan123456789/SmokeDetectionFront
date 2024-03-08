<template>
    <el-card class="containner">
        <div style="margin-top:10px">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-input style="height:40px" v-model="input" placeholder="请输入指定编号"></el-input>
                </el-col>
                <el-col :span="4"><el-select v-model="selectClassId" @change="changeClass()" placeholder="请选择状态"
                        size="large" no-data-text="服务器异常">
                        <el-option v-for="item in selectClassInfo" :key="item.id" :label="item.classname"
                            :value="item.id" />
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-button style="height:40px" type="warning" @click="addTerritory()">添加行为</el-button>
                </el-col>
            </el-row>
            <el-table :data="pagedTableData" :row-class-name="tableRowClassName" style="height:79vh">
                <el-table-column type="index" label="序号" width="70" align="center">
                </el-table-column>
                <el-table-column prop="hardwareSettingId" label="内部编号" align="center">
                </el-table-column>
                <el-table-column prop="hardwareName" label="主要行为" align="center">
                </el-table-column>
                
                <el-table-column align="center" label="操作">
                    <template #default="scope">
                        <div class="button-group" style="text-align:center">
                            <el-button type="warning" @click="changeAction(scope.row)">修改行为</el-button>
                            <el-popconfirm title="确认要删除吗?" @confirm="deletetAction(scope.row)">
                                <template #reference>
                                    <el-button type="danger"> 删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="allTerritory.length">
            </el-pagination>
        </div>
    </el-card>


    <el-dialog v-model="dialogVisibledownload" title="新建辖区" width="55%">
        <div style="text-align:center">
            <el-progress type="circle" :percentage="progressBar" status="success" />
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="dialogVisibledownload = false">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="changeMark" title="修改行为" width="55%">
        <div style="text-align:center">
            <el-progress type="circle" :percentage="progressBar" status="success" />
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="changeMark = false">
                    取消
                </el-button>
                <el-button type="primary" @click="submitActionChange()">
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
            changeMark: false,
            currentPage: 1,
            pageSize: 10,
            allTerritory: []
        };
    },
    computed: {
        pagedTableData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.allTerritory.slice(start, end);
        },
    },
    methods: {
        deletetTerritory(id) {
            get('/territory/deleteTerritory', { id: id.territoryId }, true).then(res => {
                if (res.data.success === true) {
                    ElMessage({
                        message: '删除成功',
                        type: 'success',
                    });
                    this.allTerritory.splice(id.index, 1)
                } else {
                    ElMessage({
                        message: '删除失败',
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
        getAllAction() {
            get('/HardwareSetting/getAll', {}, true).then(res => {
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
    mounted() {
        this.getAllAction()
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
        