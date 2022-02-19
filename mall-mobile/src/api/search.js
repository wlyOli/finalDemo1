
 /* 
 商品相关请求模块
 */
 import request from '@/utils/request'
 
 // 商品列表数据
export const getSuggestion = searchName =>{
	return request({
		method:'GET',
		url:'search',
		params:{
			searchName
		}
		
	})
}

//搜索结果
export const getResults = data =>{
	return request({
		method:'POST',
		url:'/searchResults',
		data
		
	})
}

//获取用户历史
 export const getHistories = () =>{
 	return request({
 		method:'GET',
 		url:'/histories',
 		
 		
 	})
 }
 
 //删除单个历史记录
 export const deleteItem = key =>{
 	return request({
 		method:'GET',
 		url:'/deleteItems',
 		params:{
			key
		}
 		
 	})
 }
 
 //全部删除
 export const allDelete = () =>{
 	return request({
 		method:'GET',
 		url:'/allDelete'
 	})
 }