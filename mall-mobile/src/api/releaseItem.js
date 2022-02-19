// 发布商品模块
import request from '@/utils/request';

//发布商品
export const releaseItem = data =>{
 	return request({
 		method:'POST',
		url:'/releaseItem',
		data
 	})
 }
