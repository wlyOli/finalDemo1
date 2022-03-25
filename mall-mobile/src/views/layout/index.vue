<template>
  <div class="layout-container">
   <!-- 子路由的出口-->
   <router-view />
   
   <!-- 底部标签导航栏-->
	<van-tabbar route v-model="active">
	  <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
	  <van-tabbar-item v-if="isRelease" icon="add-o" to="/releaseGoods">发布商品</van-tabbar-item>
	  <van-tabbar-item icon="shopping-cart-o" to="/shopCar">购物车</van-tabbar-item>
	  <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
	</van-tabbar>
  </div>
</template>

<script>
	import { mapState } from 'vuex'
	import {getCurrentUser} from '@/api/user'
	
	export default{
		name:'LayoutIndex',
		created(){
			this.loadCurrentUser()
		},
		data(){
			return {
				 active: 0,
				 currentUser:{},
				 isRelease:false
			}
		},
		computed:{
				   //mapState是个方法，将user映射到当前组件
				   ...mapState(['user'])
		},
		methods:{
			//当前用户信息
			async loadCurrentUser(){
		   const { data } = await getCurrentUser(this.user.username)
		   console.log('发布商品data',data)
		   // this.currentUser = data[0]
		   // console.log('this.currentUser',this.currentUser)
		   
		   if(data.length != 0){
				this.currentUser = data[0]
				//if(this.currentUser.)
				
				console.log('this.currentUser11',this.currentUser.username)
				var icon = '+'
				if(this.currentUser.username.includes(icon)){
					this.isRelease = !this.isRelease
				}
		   	}
			
			}
		}
	}
</script>

<style scoped>

</style>