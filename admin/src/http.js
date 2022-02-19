//--下载 npm i axios
//--新建http.js
//1.引入axios
import axios from 'axios'
import Vue from 'vue'
import router from './router'


//2.创建axios实例
const http = axios.create({
	baseURL:'http://localhost:5000/admin/api'
})

//--响应拦截 response
	http.interceptors.response.use(res=>{
		//正常情况
		console.log('res11',res)
		//会发现响应结果找不到，其实返回data就可以
		
		return res
	},err=>{
		
		//错误情况下，一般返回400以后的码
		console.log(err.response)
		//严谨写法，如果有错误就弹出
		if(err.response.data.message){
			//(引入了vue)当你加入element ui，它就被挂载到vue原型链上了
			//引入vue，vue加入element ui的时候就已经把message挂载到$message上了
			Vue.prototype.$message({
				type:'error',
				message:err.response.data.message
			})
			
			//错误码401跳转到登录页
			if(err.response.status===401){
				router.push('/login')
			}
		}
		
		return Promise.reject(err)
	})
	
	
	//请求拦截
	http.interceptors.request.use(config=>{
		
		console.log('config',config)
		if(localStorage.token){
			//'Bearer '半角空格
			//network的request headers 有Authorization显示token信息
			config.headers.Authorization = 'Bearer '+localStorage.token
			
		}
		
		return config
	},err=>{
		
		
	})

//3.导出http

export default http