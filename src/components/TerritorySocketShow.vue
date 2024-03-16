<template>
  <el-card class="imgscard" shadow="always">
    <div class="image-container">
      <img :src="icon" class="image-style" />
    </div>
    <el-card shadow="always" class="statistic-card">
      <el-row :gutter="20">
        <el-col :span="15">
          <el-table :data="tableData">
            <el-table-column prop="date" label="类别">
            </el-table-column>
            <el-table-column prop="name" label="数量">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="9">
          <div class="controls-container">
            <div class="control-item" style="color:#FFD04B ;font-family:Arial;">
              <span>当前预警阈值: 20%</span>
            </div>
            <div class="control-item">
              <el-switch v-model="alertEnabled" inactive-text="是否预警?"></el-switch>
            </div>
            <div class="control-item">
              <el-button type="success">全屏</el-button>
            </div>
            <div class="control-item">
              <el-button type="primary">展示不合格图片</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </el-card>
</template>

<script>
export default {
  name: 'TerritoryCard',
  props: {
    icon: String,
    tableData: Array,
    alertEnabled: Boolean
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.image-container {
  width: 100%;
  height: auto;
}

.image-style {
  width: 100%;
  height: 640px;
  object-fit: cover;
}

.controls-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 15px;
}

.control-item {
  margin-top: 5px
}

</style>
