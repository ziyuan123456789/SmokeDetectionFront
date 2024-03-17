<template>
  <el-container>
    <el-aside width="auto">
      <el-cascader-panel
        :key="componentKey"
        v-model="selectedOptions"
        :options="options"
        style="height: 100vh;"
        @change="handleChange"
      />
    </el-aside>
    <el-main>
      <div v-if="!selectedOptions.length==0">

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
      componentKey: 0
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    handleChange(value) {
      console.log(value)
      this.resetCascader()
    },
    resetCascader() {

      this.componentKey++
    },
    loadData() {
      get('/images/folders', {}, true).then(res => {
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
