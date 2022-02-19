const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name:{type:String},
	items:[
		{
			image:{type:String},
			url:{type:String}
		},
	],
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
module.exports = mongoose.model('Adv',schema)