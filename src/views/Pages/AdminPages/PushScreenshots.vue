<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <el-cascader-panel
        :key="componentKey"
        v-model="selectedOptions"
        :options="options"
        style="height: 99%;"
        @change="handleChange"
      />
    </el-aside>
    <el-main>
      {{data}}
      <div v-if="!selectedOptions.length===0">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-image style="width: 100%; height: auto" :src="url" :fit="fit" />
          </el-col>
          <el-col :span="8">
            <el-image style="width: 100%; height: auto" :src="url" :fit="fit" />
          </el-col>
          <el-col :span="8">
            <el-image style="width: 100%; height: auto" :src="url" :fit="fit" />
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>



<script>
import { get } from '@/utils/request'
import { ElMessage } from 'element-plus'

export default {
  data() {
    return {
      url: require('@/assets/2.jpg'),
      options: [],
      selectedOptions: [],
      data:{},
      componentKey: 0
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    //简直是一个操蛋到不行的设计,实在找不到比el-cascader-panel更合适的组建了,但是选中后不能自动关闭,只能清空双向绑定再刷新组件
    handleChange(value) {
      console.log(value)
      this.resetCascader()
    },
    resetCascader() {
      this.data.id=this.selectedOptions[0]
      this.data.year=this.selectedOptions[1]
      this.data.day=this.selectedOptions[2]
      this.selectedOptions=[]
      this.componentKey++
    },
    loadData() {
      get('/images/getfolders', {}, true).then(res => {
        if (res.data.success === true) {
          this.options = res.data.data.map(item => ({
            value: item.id,
            label: item.name,
            children: item.child.map(yearItem => ({
              value: yearItem.year,
              label: yearItem.year,
              children: yearItem.index.map(indexItem => ({
                value: indexItem,
                label: indexItem
              }))
            }))
          }))
        } else {
          ElMessage({
            message: '请求失败',
            type: 'error'
          })
        }
      })

    }
  }
};
</script>
