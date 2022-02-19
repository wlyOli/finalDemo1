import Vue from "vue"
import VueRouter from "vue-router"
//import Home from "../views/Main.vue"

Vue.use(VueRouter)

//引入模块懒加载
const Main =()=>import('../views/Main')
const CategoryEdit =()=>import('../views/category/CategoryEdit')
const CategoryList =()=>import('../views/category/CategoryList')
const CategoryTree =()=>import('../views/category/CategoryTree')

const BrandEdit =()=>import('../views/brand/BrandEdit')
const BrandList =()=>import('../views/brand/BrandList')

const ProductEdit =()=>import('../views/product/ProductEdit')
const ProductList =()=>import('../views/product/ProductList')

const AdvEdit =()=>import('../views/adv/AdvEdit')
const AdvList =()=>import('../views/adv/AdvList')

const AdminUserEdit =()=>import('../views/adminUser/AdminUserEdit')
const AdminUserList =()=>import('../views/adminUser/AdminUserList')

const Login =()=>import('../views/Login')


const routes=[
	{
		path:'/login',
		name:'Login',
		component:Login,
		meta:{isPublic:true}
		
	},
	{
		path:'/',
		name:'Main',
		component:Main,		
		children:[
			/* :id需要动态传参，同this.$routes.params搭配。或props:true ，组件中直接写props:{id:{}}*/
			{path:'/categories/create',component:CategoryEdit},
			{path:'/categories/edit/:id',component:CategoryEdit,props:true},			
			{path:'/categories/list',component:CategoryList},
			{path:'/categories/listTree',component:CategoryTree},
			
			{path:'/brands/list',component:BrandList},
			{path:'/brands/edit/:id',component:BrandEdit,props:true},			
			{path:'/brands/create',component:BrandEdit},
			
			{path:'/products/list',component:ProductList},
			{path:'/products/edit/:id',component:ProductEdit,props:true},			
			{path:'/products/create',component:ProductEdit},
			
			{path:'/advs/list',component:AdvList},
			{path:'/advs/edit/:id',component:AdvEdit,props:true},			
			{path:'/advs/create',component:AdvEdit},
			
			{path:'/adminUser/list',component:AdminUserList},
			{path:'/adminUser/edit/:id',component:AdminUserEdit,props:true},			
			{path:'/adminUser/create',component:AdminUserEdit},
			
		]
	}
]

const router =new VueRouter({
	routes,
	mode:'history',
	base:process.env.baseURI,
})

//前置导航守卫
//to:即将要去哪
//from:来自哪
//next:要不要进去，做什么处理
router.beforeEach((to,from,next)=>{
	console.log('to',to)
	
	//没有meta的isPublic 没有token情况下跳转到登录页
	if(!to.meta.isPublic && !localStorage.token){
		return next('/login')
	}
	//下一步
	next()
})

export default router
