<template>

新页面
</template>
<script>
// @ is an alias to /src

import axios from 'axios'



export default {
    name: "HomeView",

    data() {
        return {

        };
    },
    methods: {

}}
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
   