/* 
商品详情请求模块 
 */
import request from '@/utils/request';

//商品列表数据
export const getItemDetails = id =>{
	return request({
		method:'GET',
		url:`rest/products/${id}`,
		
	})
}

//关注品牌 addFollow
export const addFollow = data =>{
 	return request({
 		method:'POST',
		url:'/follow',
		data
 	})
 }

//删除关注 deleteFollow
export const deleteFollow = data =>{
	return request({
		method:'POST',
		url:'/noFollow',
		data
 	})
 }
 
 //收藏
 // export const onFavourItem = data =>{
 // 	return request({
 // 		method:'POST',
 // 		url:'/favour',
 // 		data
 //  	})
 //  }
 
 
 //加入购物车addToCartList
 export const addToCartList = data =>{
 	return request({
 		method:'POST',
 		url:'/addToCartList',
 		data
  	})
  }
  
 //获取购物车列表
 export const getCartList = username =>{
 	return request({
 		method:'GET',
 		url:'/addToCartList',
 		params:{
			username
		}
  	})
  }