<template>
	<div class="cartList-container">
		<van-list>
			<cart-list-item v-for="(item,index) in cartList"
					:key='index'
					:product='item'
					class="cartItem"></cart-list-item>
		</van-list>
	</div>
</template>

<script>
	import { getCartList } from '@/api/details'
	import { mapState } from 'vuex'	
	import { mapGetters } from 'vuex'
	import CartListItem from './CartListItem.vue'
	import { setItem } from '@/utils/storage.js'
	export default{
		name:'CartList',
		components:{
			CartListItem
		},
		data(){
			return{
				
			}
		},
		created(){
			this.getCart()
		},
		computed:{
			...mapGetters(['cartList']),
			...mapState(['user'])
		},
		methods:{
			async getCart(){
				const { data } = await getCartList(this.user.username)
				console.log('购物车data',data[0].cartList)
			}
		}
	}
</script>

<style scoped lang="less">
	.cartItem{
		margin: 10px 0;
	}
</style>
