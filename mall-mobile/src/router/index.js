import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//路由表
const routes = [
  {
	path:'/login',
	name:'login',
	component:()=>import('@/views/login/')
  },
  {
  	path:'/merchant',
  	name:'merchant',
  	component:()=>import('@/views/merchant/')
  },
  {
  	path:'/releaseGoods',
  	name:'releaseGoods',
  	component:()=>import('@/views/releaseGoods/')
  },
  {
	  path:'/',
	  component:()=>import('@/views/layout/'),
	  children:[
		  {
			  path:'',//默认子路由，只有一个
			  name:'home',
			  component:()=>import('@/views/home/')
		  },
		  {
			  path:'/category',
			  name:'category',
			  component:()=>import('@/views/category/')
		  },
		  {
			  path:'/shopCar',
			  name:'shopCar',
			  component:()=>import('@/views/shopCar/')
		  },
		  {
			  path:'/my',
			  name:'my',
			  component:()=>import('@/views/my/')
		  },
		 
	  ]
  },
  {
	  path:'/search',
	  name:'search',
	  component:()=>import('@/views/search')
  },
  {
  	  path:'/detail/:id',
  	  name:'detail',
	  props:true,
  	  component:()=>import('@/views/detail')
  },
  {
  	  path:'/user/profile',
  	  name:'UserProfile',
  	  component:()=>import('@/views/userProfile')
  },
  {
  	  path:'/toSum',
  	  name:'CarSum',
  	  component:()=>import('@/views/carSum')
  },
  {
  	  path:'/adress',
  	  name:'Adress',
  	  component:()=>import('@/views/adress')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
