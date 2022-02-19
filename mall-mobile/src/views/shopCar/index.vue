<template>
  <div class="shopCar-container">
	  <!-- 导航 -->
	  <van-nav-bar
	  	  class="app-nav-bar"
	      left-arrow		  @click-left="$router.back()"
		>
		  
		  <!-- 
			()数组的来源是vuex - cartList
			1.$store.state.cartList.length
			2.计算属性:{{cartLehgth}}
			3.getter:{{$store.getters.cartLength}}
			4.mapGetters
		  -->
		  <div slot="title">购物车({{cartLength}})</div>
	  </van-nav-bar>
	  <!-- 商品数据 -->
		<div class="cartList">
			<cart-list></cart-list>
		</div>
		<!-- 底部导航 -->
		<cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
	
	import { mapGetters } from 'vuex'
	import CartList from './components/CartList.vue'
	import CartBottomBar from './components/CartBottomBar.vue'
	
	export default{
		name:'shopCar',
		components:{
			CartList,
			CartBottomBar
			
		},
		data(){
			return {
			}
		},
		computed:{
			//两种写法
			//使用对象展开运算符将getters混入computed对象中
			...mapGetters(['cartLength'])
			// ...mapGetters({
			// 	length:'cartLength'
			// })
			// cartLehgth(){
			// 	return $store.state.cartList.length
			// }
		}
	}
</script>

<style scoped lang="less">
	.carList{
		position: fixed;
		left: 0;
		right: 0;
		top: 52px;
		bottom: 50px;
		overflow-y:auto ;
	}
</style>