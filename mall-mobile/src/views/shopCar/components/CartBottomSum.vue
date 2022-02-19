<template>
	<div class="bottom-bar-sum">
		<div class="check-content">
			<span>共:{{checkLength}}&nbsp;件</span>
			
			<!-- <check-button :is-checked='isSelectAll'
						  @click.native="checkClick"></check-button>
			<span>全选</span> -->
		</div>
		<div class="totalprice">			
			合计:{{totalPrice}}
		</div>
		<!-- <div class="calculate">
			<van-button color="red">
				提交订单
			</van-button>
		</div> -->
		
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import CheckButton from '@/components/checkButton/CheckButton'
	export default{
		name:'CartBottomSum',
		components:{
			CheckButton
		},
		data(){
			return{
			}
		},
		computed:{
			//合计
			totalPrice(){
				return '￥' + this.cartList.filter(item=>{
					return item.checked
				}).reduce((total,item)=>{
					return total + item.price*item.count
				},0).toFixed(2)
				//console.log('newTotal',newTotal)
			},
			checkLength(){
				return  this.cartList.filter(item=>item.checked).length
			},
			...mapGetters(['cartList']),
			//全选
			// isSelectAll(){
			// 	//1.没有数据
			// 	if(this.cartList.length === 0){
			// 		return false
			// 	}
			// 	//2.有数据
			// 	//console.log('!undefined',!undefined)
				
			// 	return !this.cartList.find(item=>!item.checked)
			
			// }
		},
		methods:{
			//全选按钮点击事件
			//如果原来都选中，点击一次全选按钮，全部不选择
			//如果原来都不选择（某些不选），点击一次，全部选中
			checkClick(){
				//console.log('-------')
				if(this.isSelectAll){
					//true   全部选中---->全部不选--item.checked=false
					this.cartList.forEach(item=>item.checked = false)
				}else{
					//false  没有全部选中--item.checked=true
					this.cartList.forEach(item=>item.checked = true)
					
					
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.bottom-bar-sum{
		position: fixed;
		height: 50px;
		bottom: 48px;
		width: 100%;
		font-size: 16px;
		display: flex;
		align-items: center;
		line-height:40px;
		padding-left: 140px;
		.check-content{
			position: relative;
			margin-top: 1px;//30
		   span{
			   margin-left: 40px;
			   display: block;
			   margin-top: 4px;
		   }
		}
		.totalprice{
			//父元素display: flex;中间子元素flex: 1;
			//flex: 1;//当两边元素设置了宽，中间元素flex: 1;两边元素padding到两侧
			margin-left: 20px;
			margin-top: 5px;
			font-size: 15.5px;
			
		}
		// .calculate{
		// 	font-size: 16px;
		// 	width: 100px;
		// 	background: red;
		// 	text-align: center;
		// 	color: black;
			
		// }
	}
</style>
