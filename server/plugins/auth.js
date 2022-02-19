module.exports = options =>{
	const jwt = require('jsonwebtoken')
	//引入管理员模块
	const AdminUser = require('../models/AdminUser')
	
	return async(req,res,next)=>{
		//获取前端请求头,前端是大写，后端是小写，自动匹配
		//split(' ')以空格为契机将数组分为两部分;pop()删除数组的最后一个元素并返回最后一项
		//转换了token 去掉了Bearer
		const token = String(req.headers.authorization || '').split(' ').pop() 
		console.log('token',token)
		
		//token不存在的时候，报错
		if(!token){
			return res.status(401).send({
				message:'请先登录1'
			})
		}
		//有token,验证token是不是正确
		const {id} = jwt.verify(token,req.app.get('secret'))
		console.log('id',id)
		//id错误
		if(!id){
			return res.status(401).send({
				//message:'无效的token'
				message:'请先登录2'
			})
		}
		//用户错误
		req.user = await AdminUser.findById(id)
		
		if(!req.user){
			return res.status(401).send({
				message:'用户不存在，请先登录'
			})
		}
		
		
		//向下继续运行
		next()
	}
	
}
