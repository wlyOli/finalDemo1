const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    username:{type:String},
    cartList:[
        {
            id:{type:String},
            image:{type:String},
            title:{type:String},
            price:{type:Number},
            count:{type:Number}
        }
    ]
   
})

module.exports = mongoose.model('CartList',schema)