<template>
	<div class="goods-item">
		<van-card
		  :price="goods.price"
		  :desc="goods.title"
		  :title="goods.name"
		  :thumb="goods.icon"
		  @click="itemClick"
		/>
	</div>
</template>

<script>
	import { getItems } from '@/api/products'
	//import GoodsItem from '@/components/goodsItem'
	
	export default({
		name:'GoodsItem',
		props:{
			goods:{
				type:Object,
				required:true
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			itemClick(){
				// detail/111
				this.$router.push('/detail/'+this.goods._id)
				
				//query
				//detail?id=111
				// this.$router.push({
				// 	path:'/detail',
				// 	query:{
				// 		id:this.goods._id
				// 	}
				// })
			}
		}
	})
</script>

<style lang="less" scoped>
	.goods-item{
		margin-top: 2px;
	}
</style>
