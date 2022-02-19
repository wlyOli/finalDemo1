<template>
	<div class="car-sum">
		<!-- 头部 -->
		<van-nav-bar
			class="app-nav-bar"
		    left-arrow
			@click-left="$router.back()"
			>
			    <div slot="title">确认订单</div>
		</van-nav-bar>
		<!-- 收货地址 -->
		<van-address-list
			  v-model="chosenAddressId"
			  :list="list"
			  :disabled-list="disabledList"
			  default-tag-text="默认"
			  add-button-text="提交订单"	
			  @add="onPay"
			  @edit="onEdit"
			  >
			<template slot="item-bottom">
				<van-button to="/adress">
					新增地址
				</van-button>
				
			</template>	
		</van-address-list>

		<!-- 商品列表 -->
		<van-list class="items-list"
				  v-model="loading"
				  :finished="finished"
				  finished-text="没有更多了"
				  @load="onLoad"
				  >
			<cart-list-item v-for="(item,index) in cartList"
					:key='index'
					:product='item'
					class="cartItem"></cart-list-item>
		</van-list>
		<!-- 底部导航 -->
		<cart-bottom-sum></cart-bottom-sum>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import { getCartList } from '@/api/details'
	import { mapGetters } from 'vuex'
	import CartListItem from '../shopCar/components/CartListItem.vue'
	import CartBottomSum from '../shopCar/components/CartBottomSum.vue'
	import { getItems  } from '@/api/products'
	
	
	export default{		
		name:"CarSum",
		data(){
			return{
				loading: false,
				finished: false, 
				pageNum:1,
				pageSize:5,
				isRefreshLoading: false,//下拉刷新loading
				refreshSuccess:'',//下拉刷新提示
				
				
				chosenAddressId: '1',
				  list: [
					{
					  id: '1',
					  name: '不干活就没有饭吃',
					  tel: '13566278963',
					  address: '天津市西青区滨水西道399号',
					  isDefault: true,
					},
				  ],
				  disabledList: [],
			}
		},
		components:{
			CartListItem,
			CartBottomSum
		},
		created(){
			this.getCart()
		},
		computed:{
			...mapGetters(['cartList']),
			...mapState(['user'])
			
			
		},
		methods:{
			onLoad(){
				
			},
			// async onLoad() {
			// 	 //1.请求数据
			// 	 const { data } = await getItems({
			// 		 categoryId:this.categories._id,
			// 		 pageNum:this.pageNum,
			// 		 pageSize:this.pageSize
			// 	 })
			// 	 //console.log('data',data)
				 
			// 	 //2.把数据放到list: []再传给组件
				 
			// 	 this.list.push(...data.itemsList)
			// 	 //3.加载状态结束设置，本次加载状态，它才可以判断是否需要加载下一次
			// 	 //否则它就停在那里
			// 	 this.loading = false;
				 
			// 	 //4.数据全部加载完成
			// 	 if(data.itemsList>=this.pageSize){
			// 		 this.pageNum++
			// 	 }else{
			// 		 this.finished = true
			// 	 }
				 
			//     },
			
			
			
			async getCart(){
				const { data } = await getCartList(this.user.username)
				console.log('购物车data',data[0].cartList)
			},
			//支付
			onPay() {
			     this.$toast('支付成功');
			},
			onEdit(item, index) {
			     this.$toast('编辑地址:' + index);
			},
		}
	}
</script>

<style scoped lang="less">
	.cartItem{
		margin: 10px 0;
	}
	.van-address-list{
		padding: 0;
	}
	.van-address-item{
		.van-icon-edit{
			//编辑按钮调到编辑/新增地址那
			display: none;	
		}
		.van-button{
			font-size: 15px;
			color: #4A4A4A;
			padding-left: 240px;
			
		}
	}
	// .items-list{
	// 	position: fixed;
	// 	right:0;
	// 	left: 0;
	// 	bottom: 550px;
	// 	overflow: auto;//滑动
	// 	top: 90px;
	// }
	
</style>
