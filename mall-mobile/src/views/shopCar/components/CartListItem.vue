<template>
	<div class="cartListItem-container">
		<!-- 按钮 -->
		<!-- 给vue组件绑定事件的时候，必须加上@click.native
			不然不会生效(监听根元素的原生事件，使用.native修饰符)-->
		<check-button :is-checked="product.checked"
					  @click.native="checkClick"></check-button>
		<!-- 商品卡片 -->
		<van-card
		  :num="product.count"
		  :price="product.price"
		  :title="product.title"
		  :thumb="product.img"
		/>
		
	</div>
</template>

<script>
	import CheckButton from '@/components/checkButton/CheckButton'
	import { mapGetters } from 'vuex'
	import { setItem } from '@/utils/storage.js'
	
	export default{
		name:'CartListItem',
		props:{
			product:{
				type:Object,
				default(){
					return []
				}
			}
		},
		components:{
			CheckButton,
		},
		computed:{
			...mapGetters(['cartList'])
		},
		data(){
			return{
				
			}
		},
		methods:{
			checkClick(){
				//this.product.checked = !this.product.checked
				for(let item of this.cartList){
					if(item.id === this.product.id){
						item.checked = !item.checked
						setItem('cartList',this.cartList)
						return
					}
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.cartListItem-container{
		position: relative;
		/deep/.van-card__header{
			margin-left: 30px;
		}
	}
</style>
