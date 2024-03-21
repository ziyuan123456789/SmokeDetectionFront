import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIconModules from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'




const app = createApp(App)
for(let iconName in ElIconModules){
    app.component(iconName,ElIconModules[iconName])
}

app.use(ElementPlus, {
    locale: zhCn,
  })
app.use(store)
app.use(router)
app.use(ElIconModules)
app.use(ElementPlus)
app.use(VueVideoPlayer)
app.mount('#app')


