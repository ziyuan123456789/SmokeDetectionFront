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
      <div v-if="images.length!==0">
        <el-row :gutter="16">
          <el-col :span="8" v-for="(image, index) in images" :key="index">
            <el-image
              style="width: 100%; height: auto; margin-bottom: 16px; cursor: context-menu;"
              :src="image.url"
              fit="fill"
              @click="handleContextMenu($event, index)"
              @contextmenu.prevent="handleContextMenu($event, index)"
            ></el-image>
          </el-col>
        </el-row>
      </div>
      <div
        v-if="menuVisible"
        class="context-menu"
        @contextmenu.prevent
        :style="{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }"
      >
        <div class="button-wrapper" >

          <el-button size="mini"  type="primary" @click="viewImage">详情</el-button>
          <el-button size="mini" class="wtf" type="danger" @click="deleteImage">删除</el-button>
          <el-button size="mini" class="wtf" type="success" @click="pushImage">推送</el-button>
          <el-button size="mini" class="wtf" type="info" @click="menuVisible=false">关闭</el-button>
        </div>
      </div>
    </el-main>
  </el-container>
  <el-dialog v-model="dialogVisiblePic" title="查看图片详情" width="85%">
    <el-row gutter="20">
      <el-col :span="14">
        <img :src="currentImage.url" alt="查看的图片" style="width: 100%; height: auto;" />
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
      data:{},
      componentKey: 0,
      images: [],
      menuVisible: false,
      menuPosition: { x: 0, y: 0 },
      currentImage: null,
      currentIndex: -1,
      dialogVisiblePic: false,
      territoryId: '',
      confidence: '',
      createTime: '',

    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
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
      this.dialogVisiblePic = true
      console.log(this.currentImage.name)
      const regex = /smoke_face_(\d+)_([0-9]+\.[0-9]{2})[0-9]*_(\d+)\.jpg/

      const matches = this.currentImage.name.match(regex)
      if (matches) {
        this.territoryId = matches[1]
        this.confidence = matches[2]
        this.createTime = new Date(parseInt(matches[3]) * 1000).toLocaleString()
      }
      this.menuVisible = false
      console.log('查看图片：', this.currentImage, ' 索引：', this.currentIndex)

    },
    deleteImage() {
      console.log('删除图片')
      this.menuVisible = false
    },
    pushImage() {
      get('/images/pushImage', { picName: this.currentImage.name }, true).then(res => {
        if (res.data.success === true) {
          ElMessage({
            message: '推送成功',
            type: 'success'
          })
        } else {
          ElMessage({
            message: '推送失败,此图片已经被推送',
            type: 'error'
          })
        }
      })
      this.menuVisible = false
    },
    //xxx:简直是一个操蛋到不行的设计,实在找不到比el-cascader-panel更合适的组件了,但是选中后不能自动关闭,只能清空双向绑定再刷新组件
    handleChange(value) {
      console.log(value)
      this.resetCascader()
    },
    resetCascader() {
      this.data.territoryId = this.selectedOptions[0]
      this.data.year=this.selectedOptions[1]
      this.data.day=this.selectedOptions[2]
      this.selectedOptions=[]
      this.images= []
      this.componentKey++
      get('/images/getPics', this.data, true).then(res => {
        if (res.data.success === true) {
          for (const element of res.data.data) {
            this.images.push({
              name: element,
              url: this.getImageUrl(element)
            })
          }
        } else {
          ElMessage({
            message: '请求失败',
            type: 'error'
          })
        }
      })
    },
    getImageUrl(imageName) {
      return config.serverConfig.baseURL + `/images/images/${this.data.territoryId}/${this.data.year}/${this.data.day}/${imageName}`
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

<style scoped>
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

.wtf{
  /* 只有上帝才知道为什么要margin-left:0px,死马东西 */
  margin-left:0px;
}

</style>
