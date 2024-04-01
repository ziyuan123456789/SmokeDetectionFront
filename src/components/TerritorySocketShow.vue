<template>
    <div class="image-container">
      <img :src="icon" class="image-style" />
    </div>
    <el-card shadow="always" class="statistic-card">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-table :data="tableData">
            <el-table-column prop="date" label="类别">
            </el-table-column>
            <el-table-column prop="name" label="数量">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="8">
          <div class="controls-container">
            <div class="control-item" style="color:#FFD04B ;font-family:Arial;">
              <span>当前预警阈值: {{ territory.confidenceLevel * 100 }}%</span>
            </div>
            <div class="control-item">
              <el-switch v-model="alertEnabled" inactive-text="是否跟随?"></el-switch>
            </div>
            <div class="control-item">
              <el-button type="success" size="small">全屏</el-button>
              <el-button type="warning" size="small" @click="dialogVisibleChange=true">修改阈值</el-button>
            </div>
            <div class="control-item">
              <el-button type="primary">展示预警图片</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  <el-dialog v-model="dialogVisibleChange" title="修改报警阈值" width="45%">
    <el-input-number v-model="territory.confidenceLevel" :min="0.1" :precision="2" :step="0.05" :max="0.95" />

    <template #footer>
            <span class="dialog-footer">
                <el-button type="info" @click="dialogVisibleChange = false;">
                    取消
                </el-button>
                <el-button type="primary" @click="submitchange(); dialogVisibleChange = false">
                    确认
                </el-button>
            </span>
    </template>
  </el-dialog>
</template>

<script>
import { get } from '@/utils/request'
export default {
  name: 'TerritoryCard',
  props: {
    territory: Object
  },
  data() {
    return {
      ws: null,
      icon: '',
      dialogVisibleChange:false
    }
  },
  mounted() {
    this.connectWebSocket()
  },
  beforeDestroy() {
    if (this.ws) {
      this.ws.close()
    }
  },
  methods: {
    submitchange(){

    },
    connectWebSocket() {
      let tokenData = localStorage.getItem('loginData')
      tokenData = JSON.parse(tokenData)
      const wsUrl = `ws://127.0.0.1:8000/ws?territoryId=${this.territory.territoryId}&token=${tokenData.token}`
      this.ws = new WebSocket(wsUrl)
      this.ws.onmessage = (event) => {
        if (this.icon) {
          URL.revokeObjectURL(this.icon)
        }

        const blob = new Blob([event.data], { type: 'image/jpeg' })
        this.icon = URL.createObjectURL(blob)
        this.$nextTick(() => {
          let img = document.querySelector('.image-style')
          img.onload = () => {
            URL.revokeObjectURL(this.icon)
          }
        })
      }

      this.ws.onerror = (error) => {
        console.error('WebSocket Error:', error)
      }

      this.ws.onclose = () => {
        console.log('服务器关闭连接')
        if (this.icon) {
          URL.revokeObjectURL(this.icon)
          this.icon = null
        }
      }
    },
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
