//module.exports = function(app){}
//导出一个函数，函数接收一个参数叫app
module.exports = app=>{
	//引入路由
	const express = require('express')
	const router = express.Router({
		mergeParams:true//导入父级参数到子集的配置		
	})
	//调用生成树文档
	const toTreeByRecursion = require('../../plugins/tree.js')
	const jwt = require('jsonwebtoken')
	//const token = jwt.sign({id:user._id},app.get('secret'))
	//引入管理员模块
	const AdminUser = require('../../models/AdminUser')
	
	//抽取共通,验证token中间件
	const authMiddle = require('../../plugins/auth.js')
	
	//分类的创建
	router.post('/',authMiddle(),async (req,res)=>{
		//await
		const model =await req.Model.create(req.body)
		res.send(model)
		
	})
	
	//分类列表
	router.get('/',authMiddle(),async (req,res)=>{
		console.log('req.params',req.params)
		//引入分类模块----req.params{resource:'categories'}
		//npm i inflection进行单复数转换，转换成大写的单数
		
		const modelName = require('inflection').classify(req.params.resource)
		const Model = require(`../../models/${modelName}`)
		/* if(req.Model==''){
			
		} */
		
		//populate关联取什么东西
		const items = await req.Model.find().populate('parent'). limit(10)
		res.send(items)
	})
	
	
	//分类列表树结构
	router.get('/tree',authMiddle(),async (req,res)=>{
		/* 
			var jsonData = [
			    {
			        id: '7',
			        name: '2-2-2',
			        parentId: '6',
			        rank: 1
			    }
			]
		 */
		const items = await req.Model.find().populate('parent'). limit(10)
		
		let jsonData = []
		for (let item of items){
			let jsonItem = {}
			jsonItem.id = item.id
			jsonItem.name = item.name
			
			jsonItem.parentId = null			
			if(item.parent){
				jsonItem.parentId = item.parent._id
			}
			
			jsonData.push(jsonItem)
		}
		
		//toTreeByRecursion(source, 'id', 'parentId', null, 'children')
		const treeData = toTreeByRecursion(jsonData,'id','parentId',null,'children')
		res.send(treeData)
	})
	
	
	//分类编辑的详情
	router.get('/:id',authMiddle(),async (req,res)=>{
		//http://localhost:3000/？name=10 键值 req.query get
		//req.body post
		//http://localhost:3000/10111 get 只有值 req.params
		//一般请求是get,req.params.id就可以获取到前端传过来的参数		
		const model = await req.Model.findById(req.params.id)
		res.send(model)
	})
	
	//分类更新
	router.put('/:id',authMiddle(),async (req,res)=>{
		
		const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
		res.send(model)
	})
	
	//分类删除
	router.delete('/:id',authMiddle(),async(req,res)=>{
		await req.Model.findByIdAndDelete(req.params.id,req.body)
		res.send({
			success:true
		})
	})
	
	
	/*  将子路由挂载到上面去
		当一个路由有好多子路由时用
		app.use(path,router)
		router将子路由categories自动匹配到path后
		app.use('/admin/api',router)
	    相当于app.use('/admin/api/categories') 
	 ----------------------------------------------
		app.use('/admin/api/rest/:resource',router)
		通用增删改查的接口，添加动态请求参数：resource
		resource是前端请求地址的参数
		给通用接口增加rest,是与其他接口进行区别，不会冲突
	*/
	
	app.use('/admin/api/rest/:resource',async (req,res,next)=>{
		
		const modelName = require('inflection').classify(req.params.resource)
		/* 把Model挂载到req上，其他地方访问的时候均为req.Model */
		req.Model = require(`../../models/${modelName}`)
		
		//继续向下执行
		next()
		
	},router)
	
	//图片上传
	//安装处理图片的中间件:npm i multer
	const multer = require('multer')//引入multer
	//__dirname当前文件所在的绝对路径，c盘等，所在文件夹admin从这找
	const upload = multer({dest:__dirname+'/../../uploads'})//定义存储路径
	
	//upload.single('file')提交单独文件，参数名称是file
	app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
		//中间件把file挂载到req上
		const file = req.file
		//挂载静态资源后，将url挂载到file上，可以在浏览器看到url参数
		file.url = `http://localhost:5000/uploads/${file.filename}`
		res.send(file)
	})
	
	
	//登录login接口
	app.post('/admin/api/login',async (req,res)=>{
		//res.send('ok')
		//解构赋值
		const {username,password} = req.body
		//1.根据用户名找用户
		//const AdminUser = require('../../models/AdminUser')
		// “+” 强制取某个值，“-” 是被排除
		const user = await AdminUser.findOne({username}).select('+password')
		console.log('user',user)
		if(!user){
			return res.status(422).send({
				message:"用户名不存在"
			})
		}
		//2.校验密码
		//解密，返回的是布尔值（用户输入密码与数据库密码对比）
		const isValid = require('bcrypt').compareSync(password,user.password)
		console.log('isValid',isValid)
		
		if(!isValid){
			return res.status(400).send({
				message:"密码错误"
			})
		}
		
		//3.返回token
		//生成token: npm i jsonwebtoken
		//jwt.sign(payload,secretOrPrivateKey)
		//payload是对象，一般用用户id传值
		//secretOrPrivateKey密钥
		//const jwt = require('jsonwebtoken')
		const token = jwt.sign({id:user._id},app.get('secret'))
		
		console.log('token',token)
		//发送token，用户名
		res.send({token})	
	})
	
	
	//全局捕获错误
	app.use(async(err,req,res,next)=>{
		console.log('err',err)
		res.status(err.statusCode).send({
			message:err.message
		})
	})
}