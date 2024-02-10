import axios from "axios";

//创建一个axios的对象
const instance =axios.create({
    baseURL:'http://localhost:8088/demo',//会在发送请求的时候发送到url前面
    timeout:5000,//链接超时   
})
// 请求拦截
// 所有的网络请求都会先走这个方法，我们可以在他里面为请求添加一些自定制的内容
instance.interceptors.request.use(
    function(config){
        // console.group('全局请求拦截')
        // console.log(config)
        // console.groupEnd();
        return config;      
    },
    function(err){
        return Promise.reject(err);
    }
);

// 响应拦截
// 所有的网络请求返回数据后都都会执行此方法，可以根据服务器返回的状态码，做相应的数据
instance.interceptors.request.use(
    function(response){
        // console.group('全局响应拦截')
        // console.log(response)
        // console.groupEnd();
        return response;
    },
    function(err){
        return Promise.reject(err);
    }
);

export function get(url,params){
      return instance.get(url,{
          params
      });
}

export function post(url,data){
    return instance.post(url,
        data,{
            headers: {'Content-Type': 'application/json; charset=utf-8'},
          }
    );
}

export function del(url){
    return instance.post(url);
}

export function put(url,data){
    return instance.post(url,data);
}





