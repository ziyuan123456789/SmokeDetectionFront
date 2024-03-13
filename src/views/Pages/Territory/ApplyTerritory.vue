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
                    <el-button style="height:40px" type="success" @click="applyForAll"
                        v-if="selectedRows.length > 0">申请全部</el-button>
                </el-col>
            </el-row>
            <el-alert v-if="allowAddTerritoryNums === -1" type="error" title="当前您的辖区已达限制" :closable="false">
            </el-alert>
            <el-table :data="pagedTableData" :row-class-name="tableRowClassName" style="height:79vh"
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
            if (this.selectedRows.length >= this.allowAddTerritoryNums && !this.selectedRows.includes(row)) {
                return false;
            }
            return true;
        },
        askForTerritory(row) {
            let tokenData = localStorage.getItem('loginData')
            tokenData = JSON.parse(tokenData)
            get('/territory/requestChanges', { userId: tokenData.id, territoryIds: row.territoryId }, true).then(res => {
                if (res.data.success === true) {
                    ElMessage({
                        message: '申请成功',
                        type: 'success',
                    });

                    location.reload();
                } else {
                    ElMessage({
                        message: res.data.message,
                        type: 'error',
                    });
                }
            })
        },
        applyForAll() {
            // 申请全部的逻辑
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