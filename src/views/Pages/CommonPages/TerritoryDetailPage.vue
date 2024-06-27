<template>
  <div class="image-container">
    <img :src="icon" class="image-style" />
  </div>
  <el-card shadow="always" class="statistic-card">
    <el-row :gutter="20">
      <el-col :span="15">
        <el-table :data="tableData">
          <el-table-column prop="data" label="类别">
          </el-table-column>
          <el-table-column prop="name" label="数量">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="9">
        <el-row>
          <el-col :span="10">
            <div class="control-item" style="color:#FFD04B ;font-family:Arial;">
              <span>当前预警阈值: {{ territory.confidenceLevel * 100 }}%</span>
            </div>
            <div class="control-item">
              <el-switch v-model="alertEnabled" inactive-text="是否跟随?"></el-switch>
            </div>

          </el-col>
          <el-col :span="14">
            <div style="margin-left: 30px">
              <div style="margin-bottom: 5px">
                <el-button type="success" @click="$router.push('/')">取消全屏</el-button>
              </div>
              <div>
                <el-button type="warning" @click="dialogVisibleChange=true">修改阈值</el-button>
              </div>
              <div style="margin-top: 5px">
                <el-button type="primary">展示预警图片</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
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
import { ElMessage } from 'element-plus'

export default {
  data() {
    return {
      ws: null,
      wsData: null,
      icon: '',
      dialogVisibleChange: false,
      tableData: [],
      territory: {}
    }
  },
  mounted() {
    this.territory = JSON.parse(localStorage.getItem('territory'))
    this.connectWebSocket()
    this.connectWebSocketData()
  },
  beforeDestroy() {
    console.log('页面被销毁')
  },
  watch: {
    '$route': 'closeWebSocket'
  },

  methods: {
    closeWebSocket() {
      if (this.ws) {
        this.ws.close()
      }
      if (this.wsData) {
        this.wsData.close()
      }

    },
    submitchange() {
      get('/territory/changeConfidenceLevel', {
        level: this.territory.confidenceLevel,
        territoryId: this.territory.territoryId
      }, true).then(res => {
        if (res.data.success === true) {
          ElMessage({
            message: '修改成功',
            type: 'success'
          })
        } else {
          ElMessage({
            message: '更新失败',
            type: 'error'
          })
        }
      })
    },
    connectWebSocketData() {
      let tokenData = localStorage.getItem('loginData')
      tokenData = JSON.parse(tokenData)
      const wsUrl = `ws://127.0.0.1:8000/wsGetData?territoryId=${this.territory.territoryId}&token=${tokenData.token}`
      this.wsData = new WebSocket(wsUrl)
      this.wsData.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.tableData = [
            {
              data: '今日预警次数',
              name: data.day.toString()
            },
            {
              data: '本月预警人数',
              name: data.month.toString()
            },
            {
              data: '人脸缓存区大小',
              name: data.cache.toString()
            }
          ]
        } catch (error) {
          console.error('Error parsing message data:', error)
        }
      }

      this.wsData.onerror = (error) => {
        console.log('服务器关闭连接')
      }

      this.wsData.onclose = () => {
        console.log('服务器关闭连接')
      }
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
        console.log('服务器关闭连接')
      }

      this.ws.onclose = () => {
        console.log('服务器关闭连接')
        if (this.icon) {
          URL.revokeObjectURL(this.icon)
          this.icon = null
        }
      }
    }
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
