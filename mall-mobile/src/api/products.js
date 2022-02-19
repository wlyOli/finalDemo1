/* 
商品相关请求模块 
 */

import request from '@/utils/request';

//商品列表数据
export const getItems = data =>{
	return request({
		method:'POST',
		url:'/rest/products/List',
		data
	})
}
//轮播图
export const getSwiper =()=>{
	return request({
		method:'GET',
		url:'/rest/advs'
	})
}