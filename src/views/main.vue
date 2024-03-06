<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="imgscard" shadow="always">
          <div class="image-container">
            <el-image :src="icon" fit="cover" class="image-style">
              <template #error>
                <div class="error-content">加载失败</div>
              </template>
            </el-image>
          </div>
          <el-card shadow="always" style="height:33vh">
            <el-row :gutter="5">
              <el-col :span="15">
                <el-table :data="tableData">
                  <el-table-column prop="date" label="类别" width="150">
                  </el-table-column>
                  <el-table-column prop="name" label="数量" width="150">
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="9">
                <div style="color:#FFD04B ;font-family:Arial; font-size:14px; float:left;padding:13px;">
                  当前预警阈值:20%
                </div>
                <div>
                  <el-switch v-model="value1" class="mb-2" inactive-text="是否预警?" style="float:left; padding:13px;" />
                </div>
                <div style="margin-left:10px">
                  <div>
                    <el-button type="success" @click="GoToFirstPage()">全屏</el-button>
                  </div>
                  <div style="margin-top:10px;">
                    <el-button type="primary">展示不合格图片</el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-card>
      </el-col>


      <el-space direction="vertical"></el-space>
      <el-col :span="12">

        <el-card class="imgscard" shadow="always">
          <div class="image-container">
            <el-image :src="icon" fit="cover" class="image-style">
              <template #error>
                <div class="error-content">加载失败</div>
              </template>
            </el-image>
          </div>
          <el-card shadow="always" style="height:33vh">
            <el-row :gutter="5">
              <el-col :span="15">
                <el-table :data="tableData">
                  <el-table-column prop="date" label="类别" width="150">
                  </el-table-column>
                  <el-table-column prop="name" label="数量" width="150">
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="9">
                <div style="color:#FFD04B ;font-family:Arial; font-size:14px; float:left;padding:13px;">
                  当前预警阈值:20%
                </div>
                <div>
                  <el-switch v-model="value1" class="mb-2" inactive-text="是否预警?" style="float:left; padding:13px;" />
                </div>
                <div style="margin-left:10px">
                  <div>
                    <el-button type="success" @click="GoToFirstPage()">全屏</el-button>
                  </div>
                  <div style="margin-top:10px;">
                    <el-button type="primary">展示不合格图片</el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="imgscard" shadow="always">
          <el-row :gutter="5">
            <div v-if="mask3 != ''">
              <el-col :span="15">
                <img :src=mask3 class="cameraImage" alt="服务器异常" />
              </el-col>
            </div>
            <div v-else>
              <el-empty style="width: 432px;" description="已在设置中停用" />
            </div>
            <el-col :span="9">
              <el-card shadow="always">
                <span>
                  <el-table :data="tableData3" style="width: 300px">
                    <el-table-column prop="date" label="类别" width="150">
                    </el-table-column>
                    <el-table-column prop="name" label="数量" width="150">
                    </el-table-column>

                  </el-table>
                </span>
                <el-row>
                  <div style="color:#FFD04B ;font-family:Arial; font-size:14px; float:left;padding:13px;">
                    当前预警阈值:20%
                  </div>
                </el-row>
                <el-row>
                  <div>
                    <el-switch v-model="value1" class="mb-2" inactive-text="是否预警?" style="float:left; padding:13px;" />
                  </div>
                </el-row>
                <el-row>
                  <div style="font-size:14px;padding:13px;">
                    <el-button type="success">全屏</el-button>
                    <el-button type="primary">展示不合格图片</el-button>
                  </div>
                </el-row>


              </el-card>

            </el-col>
          </el-row>

        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="imgscard" shadow="always">
          <el-row :gutter="5">
            <div v-if="mask4 != ''">
              <el-col :span="15">
                <img :src=mask4 class="cameraImage" alt="服务器异常" />
              </el-col>
            </div>
            <div v-else>
              <el-empty style="width: 432px;" description="已在设置中停用" />
            </div>
            <el-col :span="9">
              <el-card shadow="always">
                <span>
                  <el-table :data="tableData4" style="width: 300px">
                    <el-table-column prop="date" label="类别" width="150">
                    </el-table-column>
                    <el-table-column prop="name" label="数量" width="150">
                    </el-table-column>

                  </el-table>
                </span>
                <el-row>
                  <div style="color:#FFD04B ;font-family:Arial; font-size:14px; float:left;padding:13px;">
                    当前预警阈值:20%
                  </div>
                </el-row>
                <el-row>
                  <div>
                    <el-switch v-model="value1" class="mb-2" inactive-text="是否预警?" style="float:left; padding:13px;" />
                  </div>
                </el-row>
                <el-row>
                  <div style="font-size:14px;padding:13px;">
                    <el-button type="success">全屏</el-button>
                    <el-button type="primary">展示不合格图片</el-button>
                  </div>
                </el-row>


              </el-card>

            </el-col>
          </el-row>

        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import HelloWorld from "@/components/HelloWorld.vue";
import axios from 'axios'
import * as echarts from 'echarts';
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default {
  name: "HomeView",
  data() {
    return {
      a: '',
      newDate: new Date(),
      activeIndex: '1',
      activeIndex2: '1',
      timer: null,
      value2: true,
      imgs: [],

      icon: '',
      icon1: '',
      lenok: '',
      lenhalf: '',
      lenn0: '',
      mask2: '',
      mask3: '',
      mask4: '',
      tableData: [
        {
          date: '飞蛾',
          name: '',
        }, {
          date: '印度谷螟',
          name: '',
        }, {
          date: '鹿纹天蚕蛾',
          name: '',
        },
        {
          date: '总数',
          name: '',
        }
      ],
      tableData2: [
        {
          date: '飞蛾',
          name: '',
        }, {
          date: '印度谷螟',
          name: '',
        }, {
          date: '鹿纹天蚕蛾',
          name: '',
        },
        {
          date: '总数',
          name: '',
        }
      ],
      tableData3: [
        {
          date: '飞蛾',
          name: '',
        }, {
          date: '印度谷螟',
          name: '',
        }, {
          date: '鹿纹天蚕蛾',
          name: '',
        },
        {
          date: '总数',
          name: '',
        }
      ],
      tableData4: [
        {
          date: '飞蛾',
          name: '',
        }, {
          date: '印度谷螟',
          name: '',
        }, {
          date: '鹿纹天蚕蛾',
          name: '',
        },
        {
          date: '总数',
          name: '',
        }
      ],
    };
  },

  mounted() {
    this.connectWebSocket();
  },
  methods: {
    connectWebSocket() {
      this.ws = new WebSocket('ws://127.0.0.1:8000/ws?token=eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiMCIsImlkIjoiMiIsInVzZXJuYW1lIjoid3p5MSIsImV4cCI6MTcwODE3NTc1MX0.AWiBpyGKr-39HU0dZ0f8KsQ2tl_5YsyKydNXKtRNd43oHYXYnJNeGiB-7mkURq07ezRaj5RPiYQF_FenRP9MoA');
      this.ws.onopen = () => {
      };
      this.ws.onmessage = (event) => {
        const blob = new Blob([event.data], { type: 'image/jpeg' });
        this.icon = URL.createObjectURL(blob);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };

      this.ws.onclose = () => {
        console.log('服务器关闭连接');
      };
    },
  },
  GoToFirstPage() {
    console.log("跳转到第一详情页面")
    this.$router.push({ path: '/FirstPage' })
  },
  handleSelect(key, keyPath) {
    console.log(key, keyPath);
  },
};
</script> 
<style scoped>
.image-style {
  width: 100%;
  height: 100%;
}

/* 图片容器的样式 */
.image-container {
  width: 450px;
  /* 指定容器宽度，根据需要调整 */
  height: 300px;
  /* 指定容器高度，根据需要调整 */
}

/* 自定义错误消息的样式 */
.error-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  /* 背景颜色 */
  color: #999;
  /* 文字颜色 */
}

.el-divider--horizontal {
  height: 2px !important;
  margin: 10px 0;
}
</style>

  