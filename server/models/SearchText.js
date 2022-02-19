const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	keywords:{type:String},
	
})

module.exports = mongoose.model('SearchText',schema)