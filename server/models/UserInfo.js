const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	userId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	username:{type:String},
	nickname:{type:String},
	avatar:{type:String},
	age:{type:Number},
	birthday:{type:String},
	sex:{type:Number},
	follow:[{
	        name:{type:String},
	        icon:{type:String},
	        isActive:{type:String}
	    }],

})
module.exports = mongoose.model('UserInfo',schema)