import Vue from 'vue'
import Vuex from 'vuex'

import {getItem,setItem} from '@/utils/storage.js'

//定义一个常量,有利于报错信息的弹出，因为变量可以检测
const USER_KEY = 'user'
const USERINFO_KEY = 'userInfo'
const CARTLIST = 'cartList'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  //user:"用户1"  ,//当前登录用户的状态（token等数据）
	  //刷新后没有user，需要初始定义时获取
	  //user:JSON.parse(window.localStorage.getItem('user'))
	  //引入storage.js后写法
	  user:getItem(USER_KEY),
	  userInfo:getItem(USERINFO_KEY),
	  //购物车
	  cartList:getItem(CARTLIST) || [],
  },
  mutations: {
	  //修改用户状态
	  setUser(state,data){
		  state.user = data
		  console.log(typeof(state.uesr))
		  //为了防止页面刷新数据丢失，还需要放到本地存储，为了数据持久化
		  //state.user是一个对象，还需要转换成字符串存储在本地
		  //window.localStorage.setItem('user',JSON.stringify(state.user))
		  //引入storage.js后写法
		  setItem(USER_KEY,state.user)
	  },
	  setUserInfo(state,data){
		  state.userInfo = data
		  setItem(USERINFO_KEY,state.userInfo)		  
	  },
	//加入购物车
	//mutation目的是修改state状态，
	//所以每一个方法尽可能简单
	//有判断逻辑的放action
	addCounter(state,payload){
		payload.count++
		setItem(CARTLIST,state.cartList)
		
	},
	addToCartList(state,payload){
		payload.checked = true//商品选中不选中的状态
		state.cartList.push(payload)
		setItem(CARTLIST,state.cartList)
		
	}
  },
  actions: {
	  //加入购物车
	  addCart(context,payload){
	  		  //判断添加商品是否相同，通过id来判断
	  		  let oldProduct = null
	  		  for(let item of context.state.cartList){
	  			  if(item.id == payload.id){
	  				  oldProduct = item
	  			  }
	  		  }
	  		  
	  		  //let oldProduct = state.cartList.find(item =>item.id ===payload.id)
	  		  //判断是否有值oldProduct
	  		  //思路：如果没有值，则表示新商品，就给他添加新属性count，并且让他=1
	  		  //如果有值，表示添加过的，count+1
	  		  if(oldProduct){
	  			  //有值
	  			  //oldProduct.count += 1
				  context.commit('addCounter',oldProduct)
			  }else{
	  			  //没有
	  			 payload.count = 1
	  			 context.commit('addToCartList',payload)
				 //state.cartList.push(payload)
	  			 
	  		  }
	  		 
	  }
  },
  getters:{
	  cartLength(state){
		  return state.cartList.length
	  },
	  cartList(state){
		  return state.cartList
	  }
  },
  modules: {
  }
})
