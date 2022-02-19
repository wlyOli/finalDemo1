//请求模块
import axios from 'axios'
//引入vuex
import store from '@/store'
import router from '@/router'
import { Toast } from 'vant'


const request = axios.create({
	baseURL:"http://localhost:5000/web/api"
})

//refresh-token使用它
//不让他走request的拦截器
const refreshToken = axios.create({
    baseURL:'http://localhost:5000/web/api'
})

//请求拦截
//第一个request 是request = axios.create。。
	request.interceptors.request.use(config=>{		
		console.log('config',config)
		const {user} = store.state
		//如果用户已登录，统一给接口设置token
		if(user){
			//'Bearer '半角空格
			//network的request headers 有Authorization显示token信息
			config.headers.Authorization = `Bearer ${user.token}`
			
		}
		//处理完返回config
		return config
	},err=>{
		console.log('err',err)
		
	})


//响应拦截
//拦截器,响应拦截器
request.interceptors.response.use(res=>{
    //正常情况
    return res
},async function(err){
   //失败
   //任何超过2xx的状态码都会进入这里
   console.dir(err)
   const status = err.response.status

    if(status === 400){
       //客户端请求参数错误
        Toast.fail('客户端请求参数错误')
    }else if(status === 401){
      Toast.fail('token无效')
	  redirectoLogin()
	  //token无效
      //1.如果没有user或者user.token直接去登录
      // const { user } = store.state
      // if(!user || user.token){
      //     //直接跳转到登录页面
      //     return redirectoLogin()
      // }
      //refresh.token，则请求获取新的token
      // try{
      //     //它没有拦截器
      //    const { data } = await refreshToken({
      //        method:'',
      //        url:'',
      //        headers:{
      //           Authorization:`Bearer ${user.refresh_token}`
      //        }
      //    })
      //    //成功,拿到新的token之后把它更新到容器中
      //    user.token = data.data.token
      //    store.commit('setUser',user)

      //    //把失败的请求发出去
      //    //err.config是本次请求的相关对象
      //    //这里使用request发请求，走自己的拦截器
      //    //它的请求拦截器中通过store容器访问token数据
      //    return request(err.config)

      // }catch(err){
      //     //单独处理刷新token的处理
      //     //刷新token失败了，直接跳转登录页
      //     redirectoLogin()
      // }
   }else if(status === 403){
        //没有权限一类
        Toast.fail('没有权限')
   }else if(status >= 500){
        //服务端异常
        Toast.fail('服务端异常请稍后重试')
   }

    return Promise.reject(err)
})

//跳转封装
function redirectoLogin(){
    //无历史记录
   //router.replace('/login')
   router.replace({
       name:'login',
       //传递查询参数, 查询参数会以 ？ 分隔符放到url后面
       query:{
           //数据名随意，拿到当前路由路径
           //router.currentRoute和我们在组件中获取的this.$router是一个东西
           redirect:router.currentRoute.fullPath
       }
   })
}



//导出
export default request