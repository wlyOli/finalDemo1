/* 
 本地存储模块  
*/

//获取token
export const getItem = (name,value) =>{
	//未经处理
	const data = window.localStorage.getItem(name)
	//为什么使用try catch
	//data可能不是json格式字符串，所以对他进行转换
	try{
		//尝试转为json对象
		return JSON.parse(data) 
	}catch(err){
		//data不是json格式就原样返回
		return data
	}
	
}
//设置
export const setItem = (name,value) =>{
	
	//如果value是对象，就把value转换为json格式再存储
	if(typeof value === 'object'){
		value = JSON.stringify(value)
	}
	window.localStorage.setItem(name,value)
	
}
//删除
export const removeItem = name =>{
	window.localStorage.removeItem(name)
}