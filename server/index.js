const express = require('express')

const app = express()

//静态资源的暴露
app.use('/uploads',express.static(__dirname+'/uploads'))

//配置模板引擎
//app.use(bodyParser.json())
app.use(express.json())


//跨域  ----引入cors+使用
app.use(require('cors')())



//admin路由导入   (app)立即执行
require('./routes/admin/index')(app)
//web路由导入   (app)立即执行
require('./routes/web/index')(app)


//导入数据库
require('./db/db')(app)

//设置密钥
app.set('secret','miyao')

app.listen(5000,()=>{
	console.log('http://localhost:5000')
})