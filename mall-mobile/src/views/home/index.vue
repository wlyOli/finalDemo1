<template>
  <div class="home-container">
	<!-- 导航 -->
	<van-nav-bar class="app-nav-bar">
		<!-- @focus="isResultShow = false" -->
		<van-button 
		slot="title"
		icon="search"
		round
		type="info"
		size="small"
		class="search-btn"
		to="/search">搜索</van-button>
	</van-nav-bar>
	<!-- 标签页 -->
	<van-tabs v-model="active">
	 <van-tab 
		v-for="item in categories"
		:title="item.name" 
		:key="item._id">
		<!-- 列表内容 创建 引入 注册component 写入items-list -->
		<items-list :categories="item"></items-list>
		<!-- :子组件接收定义的名称=父组件内容 -->
		<!-- 列表内容 -->
	</van-tab>
	 
	</van-tabs>
	
  </div>
</template>

<script>
	import { getCategories } from '@/api/user'
	import  ItemsList  from './components/ItemsList.vue'
	
	export default{
		name:'HomeIndex',
		components:{
			ItemsList
		},
		data(){
			return {
				 active: 0,
				 categories:[],//分类列表
			}
		},
		created(){
			this.loadCategories()
		},
		methods:{
			async loadCategories(){
				 
				const { data } = await getCategories()
				//console.log('data',data)
				this.categories = data
			}
		}
	}
</script>

<style scoped lang="less">
	.home-container{
		/deep/.van-nav-bar__title{
			max-width: none;
		}
		.search-btn{
			width: 270px;
			background-color: gainsboro;
			border: none;
			.van-button__icon{
				font-size: 16px;
			} 
			.van-button__text{
				font-size: 16px;
			}
			
		}
	}
	

</style>