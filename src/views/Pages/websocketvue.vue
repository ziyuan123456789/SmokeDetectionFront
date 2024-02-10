<template>
    <div>
      <!-- 你的Vue组件内容 -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        websocket: null,
      };
    },
    mounted() {
      this.connectWebSocket();
      
    },
    methods: {
      connectWebSocket() {
        const token = "your_jwt_token_here";  // 从某处获取JWT令牌
        const wsUrl = `ws://localhost:8000/ws?token=${token}`;
        this.websocket = new WebSocket(wsUrl);
  
        this.websocket.onopen = function(event) {
          console.log("WebSocket连接已打开", event);
        };
  
        this.websocket.onmessage = function(event) {
          console.log("收到消息", event.data);
        };
  
        this.websocket.onerror = function(event) {
          console.error("WebSocket发生错误", event);
        };
  
        this.websocket.onclose = function(event) {
          console.log("WebSocket连接已关闭", event);
        };
      },
    },
  };
  </script>
  