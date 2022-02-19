 module.exports = app =>{
	 //引包
	 const mongoose = require('mongoose')
	 mongoose.connect('mongodb://127.0.0.1:27017/nodeVueH5', {
		 useNewUrlParser: true ,
		 useUnifiedTopology: true,
	})
 }