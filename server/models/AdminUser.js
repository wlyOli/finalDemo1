const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	username:{type:String},
	password:{
		type:String,
		//set方法，自定义怎么修改保存后的数据
		//npm i bcrypt加密，同一个字符都是不一样的加密方式
		//md5加密方式
		//hashSync同步方法，生成散列值，第二个是加密指数
		//默认不显示，防止编辑之后再更改的是加密后的密文
		select:false,
		set(val){
			return require('bcrypt').hashSync(val,10)
		}
	},
	parent:{
		type:mongoose.Schema.Types.ObjectId,	//ObjectId mongoose的id名称
		ref:'Category'							//关联的是本身，关联谁
	}
})
/* 
	第一个参数：传入一个大写名词单词的字符串，表示你的数据库名
				mongoose会自动将大写名词转为小写名词复数的集合名词
	第二个参数：架构
 */
module.exports = mongoose.model('AdminUser',schema)