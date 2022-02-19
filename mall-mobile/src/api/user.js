/* 
  用户相关请求模块
  @指src
 */
import request from '@/utils/request';
//引入vuex
//import store from '@/store'

//登录
export const login = data =>{
	return request({
		method:'POST',
		url:'/login',
		data 	//data:data
	})
}

//获取登录用户信息
export const getCurrentUser = username =>{
	return request({
		method:'GET',
		url:'/userInfo',
		params:{
			username
		}
		//headers:{
		//	Authorization:`Bear ${store.state.user.token}`
		//}
	})
}

//获取用户分类
export const getCategories = () =>{
	return request({
		method:'GET',
		url:'/rest/categories'
	})
}

//编辑用户信息userInfo
export const editUser = data =>{
	return request({
		method:'POST',
		url:'/userInfo',
		data
	})
}

/* 
 修改用户头像
*/
//在模块中，不能直接获取token
// import qs from 'qs' // axios自带的工具不需要安装npm依赖
export const updateUserPhoto = data =>{
    return instance({
        method:'POST',
        url:'/userPhoto',
        data
    })
}