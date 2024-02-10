<template>
    <!-- <div v-if="icon!=''"> -->
    <el-card :body-style="{ padding: '5px' }" class="box-card">
        <el-card class="imgscard" shadow="always" :body-style="{ padding: '5px' }">
            <el-row :gutter="5">
                <el-col :span="19">
                    <!-- <img :src=icon class="image1" alt="服务器异常" /> -->
                    <img  class="image1" style="display: block; -webkit-user-select: none;margin: auto;
                    background-color: hsl(0, 0%, 25%);" 
                    src="http://127.0.0.1:8000/video_feed/">
                </el-col>
                <el-col :span="5">
                    <el-card shadow="always" :body-style="{ padding: '5px' }" style="height:100%">
                        <span style="margin-top:100px">
                            <el-table :data="tableData" style="width: 300px">
                                <el-table-column prop="date" label="类别" width="150">
                                </el-table-column>
                                <el-table-column prop="name" label="数量" width="150">
                                </el-table-column>
                            </el-table>
                        </span>
                        <el-row>
                            <div
                                style="color:#FFD04B ;font-family:Arial;margin-top:50px; font-size:14px; float:left;padding:13px;">
                                当前预警阈值:20%
                            </div>
                        </el-row>
                        <el-row style="">
                            <div>
                                <el-switch v-model="value1" class="mb-2" inactive-text="是否预警?"
                                    style="float:left; padding:13px;margin-top:50px;" />
                            </div>
                        </el-row>
                        <el-row style="">
                            <div style="font-size:14px;padding:13px;margin-top:50px;">
                                <el-button type="success" @click="BackToMainPage()">返回</el-button>
                                <el-button type="primary">展示不合格图片</el-button>
                            </div>
                        </el-row>


                    </el-card>

                </el-col>
            </el-row>

        </el-card>
    </el-card>
    <!-- </div>
    <div v-else>
        <el-empty description="加载第一机位,稍后" />
    </div> -->
</template>
<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from 'axios'

import LayoutMain from '../Layout/Main/Main.vue'
import LayoutNav from '../Layout/Nav/Nav.vue'


import DPlayer from 'dplayer'
export default {
    name: "HomeView",
    components: { LayoutMain, LayoutNav },
    setup() {

    },
    data() {
        return {
            text: '123',
            a: '',
            newDate: new Date(),
            activeIndex: '1',
            activeIndex2: '1',
            timer: null,
            value2: true,
            imgs: [],
            joke: '',
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
                    date: '蝗虫',
                    name: '1',
                }, {
                    date: '印度谷螟',
                    name: '0',
                }, {
                    date: '鹿纹天蚕蛾',
                    name: '0',
                },
                {
                    date: '总数',
                    name: '1',
                }
            ],
        };
    },
    mounted() {
    }
    ,
    methods: {
        BackToMainPage() {
            this.$router.push({ path: '/' })
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },

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
    width: 1110px;
    height: 750px;
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
    