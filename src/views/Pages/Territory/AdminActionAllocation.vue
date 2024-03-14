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
            </el-row>

            <el-table :data="pagedTableData" :row-class-name="tableRowClassName" style="height:79vh"
                @selection-change="handleSelectionChange">
                <el-table-column type="index" label="序号" width="55" align="center">
                </el-table-column>
                <el-table-column prop="changeRequestId" label="内部编号" align="center">
                </el-table-column>
                <el-table-column prop="territoryName" label="辖区名称" align="center">
                </el-table-column>
                <el-table-column prop="username" label="申请人" align="center">
                </el-table-column>
                <el-table-column prop="requestStatus" label="审批状态" align="center">
                </el-table-column>
                <el-table-column prop="requestDate" label="申请日期" align="center">
                </el-table-column>
                <el-table-column align="center" label="操作" width="240">
                    <template #default="scope">
                        <el-button type="success" @click="submitReviewResult(true, scope.row)">同意申请</el-button>
                        <el-button type="danger" @click="submitReviewResult(false, scope.row)">拒绝申请</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="allTerritory.length">
            </el-pagination>
        </div>
    </el-card>



</template>

<script>
import { ElMessage } from 'element-plus'
import { get, post, del, put } from '@/utils/request';

export default {
    data() {
        return {

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

    },
    methods: {
        submitReviewResult(isOk, data) {
            
            get('/territory/updateTerritoryChange', {approvalOutcome:isOk,changeRequestId:data.changeRequestId,requestedTerritoryId:data.requestedTerritoryId,remarks:data.remarks,userId:data.userId}, true).then(res => {
                if (res.data.success === true) {
                    console.log(res.data.data)
                } else {
                    ElMessage({
                        message: '请求失败',
                        type: 'error',
                    });
                }
            })
        },

        getAllTerritory() {
            get('/territory/findAllTerritoriesApply', {}, true).then(res => {
                if (res.data.success === true) {
                    this.allTerritory = res.data.data
                    for (var i = 0; i < this.allTerritory.length; i++) {
                        if (this.allTerritory[i].requestStatus == 'refuse') {
                            this.allTerritory[i].requestStatus = "驳回"
                        } else if (this.allTerritory[i].requestStatus == 'pending') {
                            this.allTerritory[i].requestStatus = "处理中"
                        } else if (this.allTerritory[i].requestStatus == 'agree') {
                            this.allTerritory[i].requestStatus = "批准"
                        } else {
                            this.allTerritory[i].requestStatus = "未知状态"
                        }
                    }
                    console.log( this.allTerritory)
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

::v-deep .el-table__header-wrapper .el-checkbox {

    visibility: hidden;
}
</style>