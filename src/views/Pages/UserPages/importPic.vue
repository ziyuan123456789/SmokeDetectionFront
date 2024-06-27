<template>
  <div v-if="groupedImages && Object.keys(groupedImages).length !== 0">
    <div v-for="(group, territoryName) in groupedImages" :key="territoryName">
      <div class="territory-header">{{ territoryName }}</div>
      <el-row :gutter="16">
        <el-col :span="8" v-for="(image, index) in group" :key="index">
          <el-image
            style="width: 100%; height: auto; margin-bottom: 16px; cursor: context-menu;"
            :src="changeUrl(image.url)"
            fit="fill"
            @click="handleContextMenu($event, index)"
            @contextmenu.prevent="handleContextMenu($event, index)"
          ></el-image>
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </div>
  </div>
  <div
    v-if="menuVisible"
    class="context-menu"
    @contextmenu.prevent
    :style="{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }"
  >
    <div class="button-wrapper">

      <el-button size="mini" type="primary" @click="viewImage">详情</el-button>
      <el-button size="mini" class="wtf" type="danger" @click="deleteImage">删除</el-button>
      <el-button size="mini" class="wtf" type="info" @click="menuVisible=false">关闭</el-button>
    </div>
  </div>


  <el-dialog v-model="dialogVisiblePic" title="查看图片详情" width="85%">
    <el-row gutter="20">
      <el-col :span="14">
        <img :src="changeUrl(currentImage.url)" alt="查看的图片" style="width: 100%; height: auto;" />
      </el-col>
      <el-col :span="10">
        <h3>图片详情</h3>
        <p>辖区: {{ territoryId }}</p>
        <p>置信度: {{ confidence }}</p>
        <p>创建时间: {{ createTime }}</p>
      </el-col>
    </el-row>

  </el-dialog>
</template>


<script>
import { get } from '@/utils/request'
import { ElMessage } from 'element-plus'
import config from '/config.js'
export default {
  data() {
    return {
      options: [],
      selectedOptions: [],
      data: {},
      componentKey: 0,
      images: [],
      menuVisible: false,
      menuPosition: { x: 0, y: 0 },
      currentImage: null,
      currentIndex: -1,
      territoryId: '',
      confidence: '',
      createTime: '',
      dialogVisiblePic: false

    }
  },
  computed: {
    groupedImages() {
      return this.images.reduce((groups, image) => {
        const groupName = image.territoryName
        if (!groups[groupName]) {
          groups[groupName] = []
        }
        groups[groupName].push(image)
        return groups
      }, {})
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    changeUrl(url){
      return config.serverConfig.baseURL+"\\"+url
    },
    handleContextMenu(event, index) {
      //xxx:简单做了个遮罩层,但是在边缘依然可能导致父层级溢出
      this.currentImage = this.images[index]
      this.currentIndex = index
      const clickX = event.clientX
      const clickY = event.clientY
      const screenW = window.innerWidth
      const screenH = window.innerHeight
      const menuWidth = 80
      const menuHeight = 100
      const overflowX = (clickX + menuWidth) > screenW
      const overflowY = (clickY + menuHeight) > screenH
      const posX = overflowX ? clickX - menuWidth : clickX
      const posY = overflowY ? clickY - menuHeight : clickY
      this.menuVisible = true
      this.menuPosition = { x: posX, y: posY }
    },

    viewImage() {
      this.dialogVisiblePic = true;
      // 正则表达式用于匹配URL中的特定部分，注意转义反斜杠
      const regex = /(\d+)\\(\d+)\\(\d+)-(\d+)\\smoke_face_(\d+)_(\d+\.\d+)_([\d]+)\.jpg/;
      console.log(this.currentImage.url);
      const matches = this.currentImage.url.match(regex);
      if (matches) {
        // 提取辖区ID
        this.territoryId = matches[1];
        // 置信度，保留两位小数
        this.confidence = parseFloat(matches[6]).toFixed(2);
        // 创建时间戳，转换为本地时间字符串
        this.createTime = new Date(parseInt(matches[7]) * 1000).toLocaleString();
      }
      this.menuVisible = false;
    },



    deleteImage() {
      get('/images/deleteImage', {
        territoryId: this.data.territoryId,
        year: this.data.year,
        day: this.data.day,
        name: this.currentImage.name
      }, true).then(res => {
        if (res.data.success === true) {
          ElMessage({
            message: '删除成功',
            type: 'success'
          })
        } else {
          ElMessage({
            message: '删除失败',
            type: 'error'
          })
        }
      })
      this.images.splice(this.currentIndex, 1)
      console.log('删除图片')
      this.menuVisible = false
    },
    loadData() {
      get('/images/getImportantScreenshotsForUser', {}, true).then(res => {
        if (res.data.success === true) {
          this.images=res.data.data
        } else {
          ElMessage({
            message: '请求失败',
            type: 'error'
          })
        }
      })

    }
  }
}
</script>

<style scoped>
.territory-header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.context-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 70px;
  border-radius: 4px;
  padding: 10px;
}

.button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wtf {
  /* 只有上帝才知道为什么要margin-left:0px,死马东西 */
  margin-left: 0px;
}

</style>
