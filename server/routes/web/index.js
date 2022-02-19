module.exports = app =>{
	//引入路由
	const express = require('express')
	const router = express.Router({
		mergeParams:true//导入父级参数到子集的配置		
	})
	const jwt = require('jsonwebtoken')
	//const token = jwt.sign({id:user._id},app.get('secret'))
	//引入用户模块
	const User = require('../../models/User')
	//用户信息表
	const UserInfo = require('../../models/UserInfo')
	//商品
	const Product = require('../../models/Product')
	const Brand = require('../../models/Brand')
	const Category = require('../../models/Category')
	
	//SearchText
	const SearchText = require('../../models/SearchText')
	//购物车
	const CartList = require('../../models/CartList')
	//发布商品
	const ReleaseGoods = require('../../models/ReleaseGoods')
	
	
	
	
	//中间件
	const authMiddleware = require('../../plugins/authUser.js')
	
	app.post('/web/api/releaseItem',authMiddleware(),async (req,res)=>{
		//await
		console.log('req.body',req.body)
		const model =await ReleaseGoods.create(req.body)
		console.log('....',model)
		res.send(model)
		
	})
	
	//登录login接口
	app.post('/web/api/login',async (req,res)=>{
		//res.send('ok')
		//解构赋值
		console.log("req.body",req.body)
		const {username,password} = req.body
		//1.根据用户名找用户
		const user = await User.findOne({username}).select('+password')
		//用户不存在则创建用户
		if(!user){
			await User.create(req.body)
			const userId = await User.findOne({username})
			const token = jwt.sign({id:userId._id},app.get('secret'))
			res.send({token,username})
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
		res.send({token,username})	
		
	})
	
	//编辑用户信息
	app.post('/web/api/userInfo',authMiddleware(),async(req,res)=>{
		const model = await UserInfo.create(req.body)
		res.send(model)
	})
	
	//查看用户信息  //待修改
	app.get('/web/api/userInfo',authMiddleware(),async(req,res)=>{
		// const items = await UserInfo.find().populate('username')
		// res.send(items)
		const username = req.query.username
		const items = await UserInfo.find({username})
		res.send(items)
	})
	
	// 模糊查询
	app.get('/web/api/search', authMiddleware(), async (req,res) => {
		let query = {}
		if(req.query.searchName){
			query['title'] = new RegExp(req.query.searchName)
			//相当于`/${req.query.searchName}/g`，但是正则里面不能放变量
		} 
		Product.find(query,function(err,list){
			res.send({list})
		})
	})
	
	//搜索结果
	    app.post('/web/api/searchResults',authMiddleware(),async (req,res)=>{
	        let pageNum = req.body.pageNum
	        let pageSize = req.body.pageSize || 10
	        let limitNum = parseInt(pageSize)
	        let query = {}
	        query['title']=new RegExp(req.body.q);//模糊查询参数
	       
		   //记录到搜索记录里面
		   SearchText.find({keywords:req.body.q},function(err,data){
			   console.log('key',data)
			   if(data.length === 0){          
				   SearchText.create({
					   keywords:req.body.q
				   })
			   }
		   })
		   
		   
	        //关键字
	        Product.find(query,function(err, list){
	            if(err) return res.status(500).json({
	                result: 1,
	                error_info: '请求失败！'
	            })
	            let count = list.length
	            //console.log('list',list)
	            Product.find(query).populate('brands categories','name').skip((pageNum - 1)*limitNum).limit(limitNum).exec(function (err, list) {
	                if(err) return res.status(500).json({
	                    result: 1,
	                    error_info: '服务器繁忙，请稍后重试！'
	                })
	                return res.status(200).json({
	                    result:0,
	                    message:'请求成功',
	                    total: count,
	                    list: list
	                })
	            })
	        });
	
	    })
		
		//返回历史记录
		app.get('/web/api/histories', authMiddleware(), async (req,res) => {
			const keywordList = await SearchText.find()
			const keywords = keywordList.splice(-5).reverse()
			//forEach
			let newkeywords = []
			keywords.forEach(item =>{
				newkeywords.push(item.keywords)
			})
			
			//map
			// let arrNew = keywords.map(item=>{
			// 	return item.keywords
			// })
			
			
			res.send(newkeywords)
			
		})
	
	//删除单个历史记录
	  app.get('/web/api/deleteItems',authMiddleware(),async (req,res)=>{
	        console.log('req.query.key',req.query.key)
	        SearchText.findOne({keywords:req.query.key}, function (err, data) {
	            console.log('data',data)
	            data.remove(function (err) { 
	              if(err){
	                return res.status(500).json({
	                    result:1,
	                    message:'删除失败',
	                })
	              }
	              res.send({
	                result:0,
	                message:'删除成功',
	            })
	            }); 
	        }); 
	   })
	   
	   //全部删除
	     app.get('/web/api/allDelete',authMiddleware(),async (req,res)=>{
	           SearchText.remove({}, function (err) { // 筛选条件为空即是表示所有
	               if(err){
	                   return res.status(500).json({
	                       result:1,
	                       message:'删除失败',
	                   })
	               }
	               res.send({
	                   result:0,
	                   message:'删除成功',
	               })
	           });
	       })
	   
	
	
	//获取用户分类
	//分类列表
	router.get('/',authMiddleware(),async (req,res)=>{
		console.log('req.params',req.params)
		const items = await req.Model.find().populate('parent'). limit(10)
		res.send(items)
	})
	
	
	//首页查询分类是美妆的数据
	//分页处理
	router.post('/list',authMiddleware(),async (req,res)=>{
		// const Brand = require('../../models/Brand')
		// const Category = require('../../models/Category')
		let pageNum = req.body.pageNum
		let pageSize = req.body.pageSize || 5
		let limitNum = parseInt(pageSize)
		//console.log('pageNum',pageNum)
		//console.log('limitNum',limitNum)
		//获取数据
		req.Model.find({"categories":req.body.categoryId},(err,data)=>{
			if(err) return res.status(500).json({
				result: 1,
				error_info: '请求失败！'
			})
			let count = data.length
			//console.log(count)
			//console.log('data',data)
			req.Model.find({"categories":req.body.categoryId}).populate('brands categories','name').skip((pageNum - 1)*limitNum).limit(limitNum).exec(function (err, data) {
				if(err) return res.status(500).json({
					result: 1,
					error_info: '服务器繁忙，请稍后重试！'
				})
				return res.status(200).json({
					result:0,
					message:'请求成功',
					total: count,
					itemsList: data
				})
			})
		})     
   })
	
	//商品编辑的详情
	router.get('/:id',authMiddleware(),async (req,res)=>{
		const model = await req.Model.findById(req.params.id).populate('brands categories','icon name')

		res.send(model)
	})
	
	 //关注的创建
	    app.post('/web/api/follow',authMiddleware(),async (req,res)=>{
	        let userInfo= req.body.userInfo
	        //let identify = req.body.identify
	       
	        //去用户表找用户
	        UserInfo.find({username:userInfo.username},function(err,data){
	            console.log('req.body',req.body)
	            console.log('data1',data)
	            //如果没有该用户
	            if(data.length === 0){
	                UserInfo.create({
	                    username:userInfo.username
	                })       
	            }         
	            //如果有
	            UserInfo.find({username:userInfo.username,'follow.name':req.body.brand.name},(err,data)=>{
	                console.log(0,data)
	                //如果有关注提示
	                if(data.length != 0){
	                    return res.status(200).json({
	                        result:1,
	                        message:'已关注',
	                        userInfo:data[0]
	                    })
	                }
	                //没有就增加
	                UserInfo.findOneAndUpdate({username:userInfo.username},
	                {               
	                    $push: {
	                        follow:[{
	                        name:req.body.brand.name,
	                        icon:req.body.brand.icon,
	                        isActive:1                
	                     }]
	                 }
	                },
	                { new: true },//返回更新后的数据
	                function(err,data){
	                    if(err){
	                        return res.status(500).json({
	                            result:2,
	                            message:'关注失败',
	                            userInfo:''
	                        })
	                    }
	                    console.log('add1',data)
	                    res.send({
	                        result:0,
	                        message:'关注成功',
	                        userInfo:data
	                    })
	               })
	            })
	           
	        }) 
	       
	    })
	    
	     //收藏删除
	    app.post('/web/api/noFollow',authMiddleware(),async (req,res)=>{
	        console.log('req.body',req.body)
	            UserInfo.updateOne({username:req.body.userInfo.username},
	                {$pull:{follow:{name:req.body.brand.name}}},             
	                function(err){
	                    if(err){
	                        return res.status(500).json({
	                            result:2,
	                            message:'取消关注失败',
	                        })
	                    }
	                    UserInfo.find({username:req.body.userInfo.username},function(err,data){
	                        console.log('cancel',data)
	                        res.send({
	                            result:0,
	                            message:'取消关注成功',
	                            userInfo:data[0]
	                        })
	                    })                  
	              })   
	      
	       })
	
	
	
	
	
	
	//收藏的创建
	   // app.post('/web/api/favour',authMiddleware(),async (req,res)=>{
	   //     let userInfo= req.body.userInfo
	   //     //let identify = req.body.identify
	      
	   //     //去用户表找用户
	   //     UserInfo.find({username:userInfo.username},function(err,data){
	   //         console.log('req.body',req.body)
	   //         console.log('data1',data)
	   //         //如果没有该用户
	   //         if(data.length === 0){
	   //             UserInfo.create({
	   //                 username:userInfo.username
	   //             })       
	   //         }         
	   //         //如果有
	   //         UserInfo.find({username:userInfo.username,'favour.name':req.body.brand.name},(err,data)=>{
	   //             console.log(0,data)
	   //             //如果有关注提示
	   //             if(data.length != 0){
	   //                 return res.status(200).json({
	   //                     result:1,
	   //                     message:'已关注',
	   //                     userInfo:data[0]
	   //                 })
	   //             }
	   //             //没有就增加
	   //             UserInfo.findOneAndUpdate({username:userInfo.username},
	   //             {               
	   //                 $push: {
	   //                     favour:[{
	   //                     name:req.body.brand.name,
	   //                     icon:req.body.brand.icon,
	   //                     isActive:1                
	   //                  }]
	   //              }
	   //             },
	   //             { new: true },//返回更新后的数据
	   //             function(err,data){
	   //                 if(err){
	   //                     return res.status(500).json({
	   //                         result:2,
	   //                         message:'收藏失败',
	   //                         userInfo:''
	   //                     })
	   //                 }
	   //                 console.log('add1',data)
	   //                 res.send({
	   //                     result:0,
	   //                     message:'收藏成功',
	   //                     userInfo:data
	   //                 })
	   //            })
	   //         })
	          
	   //     }) 
	      
	   // })
	
	
	
	
	    //添加购物车
	    app.post('/web/api/addToCartList',authMiddleware(),async (req,res)=>{       
	        console.log('req.body',req.body)
	        let product = req.body.carList
	        //找用户
	        let user =  await CartList.findOne({username:req.body.username})
	        //如果没有
	        if(!user){
	            const model = await CartList.create(req.body)
	            return res.status(200).json({
	                status:0,
	                message:'添加成功',
	            })     
	        }
	
	        //如果有
	        CartList.find({username:req.body.username,"cartList.id":req.body.cartList.id},
	        {"cartList.id.$":1},
	        (err,data)=>{                
	            //如果有
	            if(data.length != 0){                 
	                CartList.findOneAndUpdate({username:req.body.username,'cartList.id':req.body.cartList.id},
	                    {$set:{'cartList.$.count':data[0].cartList[0].count + 1,}},function(err,data){            
	                    if(err){
	                        return res.status(200).json({
	                            status:1,
	                            message:'添加失败1'
	                        })   
	                    }
	                    
	                })
	                return res.status(200).json({
	                    status:0,
	                    message:'添加成功',
	                })  
	            }
	              //用户我有，但是我添加的商品没有  
	            CartList.findOneAndUpdate({username:req.body.username},
	            {               
	                $push: {
	                    cartList:req.body.cartList
	                }
	            },
	            function(err,data){
	                if(err){
	                    res.send({
	                        status:1,
	                        message:err
	                    })
	                }
	                res.send({
	                    status:0,
	                    message:'添加成功2'
	                })
	            })
	       
	        })
	       
	    })
	
		//获取购物车列表
		 app.get('/web/api/addToCartList',authMiddleware(),async (req,res)=>{
		         CartList.find({username:req.query.username},async (err,data)=>{
		             res.send(data)
		         })
		   })

		//编辑用户信息
		   app.post('/web/api/userInfo',authMiddleware(),async (req,res)=>{
		       console.log('req.body',req.body)
		       let user =  await UserInfo.findOne({username:req.body.username})
		      if(!user){
		        const model = await UserInfo.create(req.body)
		        res.send(model)
		      }
			  //用户昵称
		      if(req.body.nickname){
		        console.log('111112')
		        UserInfo.findOneAndUpdate({username:req.body.username},
		            {
		                $set:{
		                   nickname:req.body.nickname,
		                }
		            },function(err,data){            
		               if(err){
		                   return res.status(500).json({
		                       status:1,
		                       message:'修改失败'
		                   })   
		               }
		               return res.status(200).json({
		                   status:0,
		                   message:'修改成功'
		               })     
		         })
		      }
			  //性别
		      if(req.body.sex != null){
		          //console.log('111')
		        UserInfo.findOneAndUpdate({username:req.body.username},
		            {
		                $set:{
		                   sex:req.body.sex,
		                }
		            },function(err,data){            
		               if(err){
		                   return res.status(500).json({
		                       status:1,
		                       message:'修改失败'
		                   })   
		               }
		               return res.status(200).json({
		                   status:0,
		                   message:'修改成功'
		               })     
		         })
		      }
			  //生日
			    if(req.body.birthday != null){
			      //console.log('111')
			     UserInfo.findOneAndUpdate({username:req.body.username},
			        {
			            $set:{
			              birthday:req.body.birthday,
			            }
			        },function(err,data){            
			           if(err){
			               return res.status(500).json({
			                   status:1,
			                   message:'修改失败'
			               })   
			           }
			           return res.status(200).json({
			               status:0,
			               message:'修改成功'
			           })     
			     })
			  }
		     
		   })
		
		//修改用户头像
		const multer = require('multer')
		const upload = multer({dest:__dirname + '/../../uploads'})
		 //upload.single('file') 提交单个参数，参数名是file
		app.post('/web/api/userPhoto',upload.single('file'),async(req,res)=>{
		    console.log('req',req.body.username)
		  //中间件把file挂载上去
		   const file = req.file
		   //console.log('file',file)
		   //挂载静态资源后
		   //将url挂载到file上，之后在浏览器接口中可以看到url参数
		   //之后在前端展示出来
		   file.url = `http://localhost:5000/uploads/${file.filename}`
		   //更新头像
		   UserInfo.findOneAndUpdate({username:req.body.username},
		     {
		         $set:{
		             avatar:file.url,
		         }
		     },function(err,data){            
		        if(err){
		            return res.status(500).json({
		                status:1,
		                message:'修改失败'
		            })   
		        }
		        return res.status(200).json({
		            status:0,
		            message:'修改成功',
		            avatar:file.url
		        })     
		  })
		   //console.log('file',file)
		   //res.send(file)
		})
	
	
	//统一接口
	app.use('/web/api/rest/:resource',async (req,res,next)=>{
		
		const modelName = require('inflection').classify(req.params.resource)
		/* 把Model挂载到req上，其他地方访问的时候均为req.Model */
		req.Model = require(`../../models/${modelName}`)
		
		//继续向下执行
		next()
		
	},router)
	
	
	
	
	//全局捕获错误
	// app.use(async(err,req,res,next)=>{
	// 	console.log('err',err)
	// 	res.status(err.statusCode).send({
	// 		message:err.message
	// 	})
	// })
	
	
	
}