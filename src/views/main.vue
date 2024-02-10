<template>
 
  <el-card :body-style="{ padding: '5px' }" class="box-card">
    <el-row :gutter="20">
      <el-col :span="12">

        <el-card class="imgscard" shadow="always" :body-style="{ padding: '5px' }">
          <el-row :gutter="5">
            <el-col :span="15">
              <img :src=icon class="image1" alt="服务器异常" />
            </el-col>
            <el-col :span="9">
              <el-card shadow="always" :body-style="{ padding: '5px' }" style="height:390px">
                <span>
                  <el-table :data="tableData" style="width: 300px">
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
                    <el-button type="success" @click="GoToFirstPage()">全屏</el-button>
                    <el-button type="primary">展示不合格图片</el-button>
                  </div>
                </el-row>


              </el-card>

            </el-col>
          </el-row>

        </el-card>

      </el-col>


      <el-space direction="vertical"></el-space>
      <el-col :span="12">

        <el-card class="imgscard" shadow="always" :body-style="{ padding: '5px' }" style="height:390px">

          <el-row :gutter="5">
            <div v-if="mask2!=''">
            <el-col :span="15">
              <img :src=mask2 class="image1" alt="服务器异常" />
            </el-col>
            </div>
            <div v-else>
                <el-empty style="width: 432px;" description="已在设置中停用" />
              </div>
            <el-col :span="9">
              <el-card shadow="always" :body-style="{ padding: '5px' }">
                <span>
                  <el-table :data="tableData2" style="width: 300px">
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
    <!-- <div style="float:left;height: 500px;width: 1px"></div> -->
    <el-divider />
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="imgscard" shadow="always" :body-style="{ padding: '5px' }" style="height:390px">
          <el-row :gutter="5">
            <div v-if="mask3!=''">
            <el-col :span="15">
              <img :src=mask3 class="image1" alt="服务器异常" />
            </el-col>
            </div>
            <div v-else>
            <el-empty style="width: 432px;" description="已在设置中停用" />
            </div>
            <el-col :span="9">
              <el-card shadow="always" :body-style="{ padding: '5px' }" style="height:390px">
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
        <el-card class="imgscard" shadow="always" :body-style="{ padding: '5px' }" style="height:390px">
          <el-row :gutter="5">
            <div v-if="mask4!=''">
            <el-col :span="15">
              <img :src=mask4 class="image1" alt="服务器异常" />
            </el-col>
            </div>
            <div v-else>
                <el-empty style="width: 432px;" description="已在设置中停用" />
              </div>
            <el-col :span="9">
              <el-card shadow="always" :body-style="{ padding: '5px' }">
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
// @ is an alias to /src
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
      this.ws = new WebSocket('ws://localhost:8000/ws/'+localStorage.getItem("token"));
      this.ws.onopen = () => {
        console.log("WebSocket connection opened");

        this.ws.send("Hello, server!");
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
  startTimer() {
    this.timer = setInterval(() => {
      this.test1()
      this.test2()
      this.test3()
      this.test4()
    }, 2000);
  },
  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  },
  test1() {
    axios({
      url: 'http://127.0.0.1:8000/masktest/',
      method: 'get',
    }).then(res => {
      console.log("===========")
      this.icon = 'data:image/png;base64,'
      this.icon = this.icon + res.data.code
      this.tableData[0].name = res.data.ok
      this.tableData[1].name = res.data.half
      this.tableData[2].name = res.data.no
      this.tableData[3].name = res.data.ok + res.data.half + res.data.no
    })
  },
  test2() {
    axios({
      url: 'http://127.0.0.1:8000/masktest2/',

      method: 'get',
    }).then(res => {
      this.mask2 = 'data:image/png;base64,'
      this.mask2 = this.mask2 + res.data.code
      this.tableData2[0].name = res.data.ok
      this.tableData2[1].name = res.data.half
      this.tableData2[2].name = res.data.no
      this.tableData2[3].name = res.data.ok + res.data.half + res.data.no
    })
  },
  test3() {
    axios({
      url: 'http://127.0.0.1:8000/masktest3/',
      method: 'get',
    }).then(res => {
      this.mask3 = 'data:image/png;base64,'
      this.mask3 = this.mask3 + res.data.code
      this.tableData3[0].name = res.data.ok
      this.tableData3[1].name = res.data.half
      this.tableData3[2].name = res.data.no
      this.tableData3[3].name = res.data.ok + res.data.half + res.data.no
    })
  },
  test4() {
    axios({
      url: 'http://127.0.0.1:8000/masktest4/',

      method: 'get',
    }).then(res => {
      this.mask4 = 'data:image/png;base64,'
      this.mask4 = this.mask4 + res.data.code
      this.tableData4[0].name = res.data.ok
      this.tableData4[1].name = res.data.half
      this.tableData4[2].name = res.data.no
      this.tableData4[3].name = res.data.ok + res.data.half + res.data.no
    })
  },






components: {

  HelloWorld,
  },
};
</script> 
<style scoped>
.el-divider--horizontal {
  height: 2px !important;
  margin: 5px
}

.box-card {
  width: 100%;
  height: 100%;
}

.sub {
  width: 100px;
  min-width: 50%;
  max-width: 100%;
}

.imgscard {
  width: 100%;
  height: 380%;
}

.el-divider {
  height: 100%;
  width: auto;
}

.el-table {

  height: 200px !important
}

.image1 {
  width: 100%;
  height: 390px;
  display: inherit;
}

.el-menu-vertical-demo {
  height: 1040px;

}

.asv1 {
  position: absolute;
  margin-top: 25px;
  margin-left: 85%;
  cursor: pointer
}

.h1label {
  position: absolute;
  margin-top: 30px;
  margin-left: 15%;
  cursor: pointer
}

.asv {
  position: absolute;
  margin-left: 94%;
  margin-top: 20px;
}

.time1 {
  position: absolute;
  height: 5%;
  margin-left: 70%;
  margin-top: 22px;
}

.demo-image__placeholder .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: top;
}

.demo-image__placeholder .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 15px;
  margin-bottom: 20px;
}

.demo-image__placeholder .doorname {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 20px;
  margin-bottom: 20px;
}

.demo-image__placeholder .el-image {
  padding: 0 5px;
  max-width: 500px;
  max-height: 400px;
}

.demo-image__placeholder.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

.demo-image__placeholder .dot {
  animation: dot 2s infinite steps(3, start);
  overflow: hidden;
}
</style>
  