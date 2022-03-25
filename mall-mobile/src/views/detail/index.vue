<template>
  <div class="detail-container">
	  <!-- 详情{{id}} -->
	  <!-- detail{{$route.params.id}} -->
	  <!-- 导航 -->
	   <van-nav-bar class="app-nav-bar"
	          title="详情页"
	          left-arrow
	           @click-left="$router.back()"
	          />
		 <!-- 轮播图 -->
		<van-swipe :autoplay="3000" class="swiper-block">
		   <van-swipe-item>
			  <img :src="detailsInfo.icon" style="width:100%"/>
		   </van-swipe-item>
		</van-swipe>
		<!-- 商品介绍 -->
	   <div class="detail-info">
		   <van-row type="flex" justify="space-around">
				<van-col span="22" class="title">{{detailsInfo.title}}</van-col>
				<van-col span="22">
					 <van-col span="11" class="price">¥<span>{{detailsInfo.price}}</span></van-col>
					 <van-col span="11" class="collect">
						 <van-icon name="star-o"
								   :class="isFavour?'isfavour':''"
								   @click="OnFavour"
								   />
					 </van-col>
				</van-col>
			</van-row>
			<!-- 品牌信息-->
		   <van-row type="flex" justify="space-around" class="shop">
			   <van-col span="14" class="title" offset="4">{{detailsInfo.brands.name}}</van-col>
			   <van-col span="6">
					<van-button 
					   :icon="isFollow?'':'plus'" 
					   type="primary" 
					   :class="isFollow?'isfollow':'follow'" 
					   round
					   @click="noFollow"
					   >{{isFollow?'已关注':'关注'}}</van-button>
			   </van-col>
		   </van-row>  
		   <van-row class="detailItem">
			   <!-- 折叠面板 -->
			   
				   <van-collapse :value="activeNames"
								  @change="onChange">
					<van-collapse-item title="参数" name="3" >
						元/千克
					</van-collapse-item>
					 <van-collapse-item title="选择 净含量" name="1" disabled>
					 </van-collapse-item>
					<van-collapse-item 
						title="假一赔四 急速退款 不支持七天无理由退换" 
						name="2" disabled>
					</van-collapse-item>
					 <van-collapse-item title="配送" name="4">
						 平台将根据您的收货地址选择最近的仓库为您配货
					 </van-collapse-item>
						<img :src="imgList[0]" />
						<img :src="imgList[1]" />
						<img :src="imgList[2]" />
						<img :src="imgList[3]" />
						
				   </van-collapse>
			     
		   </van-row>
	   </div>
	   <!-- 底部 -->
		  <van-goods-action>
			   <van-goods-action-icon icon="star" 
					:text="isFavour?'已收藏':'未收藏'" 
					:class="isFavour?'isfavour':''"
					:color="isFavour?'#ff5000':''" />
			   <van-goods-action-button type="warning"
					text="加入购物车"
					 @click="addToCar"/>
			   <van-goods-action-button
				   type="danger"
				   text="立即购买"
				   @click="onClickButton"
			   />
		   </van-goods-action>
  </div>
</template>

<script>
	import { getItemDetails,addFollow,deleteFollow ,addToCartList} from '@/api/details'
	import { setItem,getItem } from '@/utils/storage'
	import { mapState } from 'vuex'
	export default{
		name:'Detail',
		props:{
			id:''
		},
		data(){
			return {
				detailsInfo:{
					 brands:{
						  name:'',
						  _id:'',
						  icon:''
					  },
					  body:{}
				},
				isFollow:'',
				isFavour:'',//是否收藏
				activeNames: ['3'],
				imgList:[]
			}
		},
		created(){
			//this.$route.params.id
			this.getDetails()
		},
		computed:{
			...mapState(['userInfo','user'])
		},
		methods:{
			onChange(event) {
			  this.activeNames = event 
			},
			
			async getDetails(){
				const { data } = await getItemDetails(this.id)
				console.log('详情',data)
				this.detailsInfo = data	
				var imgSrc = this.detailsInfo.body.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
			          this.imgList.push(capture);
			    });
				// console.log('results',imgSrc,this.imgList)
			 
				//判断当前关注状态
				if(this.userInfo){
					//some可以中断循环,找到就跳出循环
					let isHave = this.userInfo.follow.some(function(value,index){
						return value.name === data.brands.name
					})
					if(isHave){
						this.isFollow = true
					}
				}
				
			},
			//关注
			async noFollow(){
				if(this.isFollow){
					//关注了---（删除）
					const res = await deleteFollow({
						brand:this.detailsInfo.brands,
						userInfo:getItem('user'),
						identify:1
						
					})
					console.log('取消',res)
					if(res.data.result == 0 ){
						this.isFollow = false
						this.$store.commit('setUserInfo',res.data.userInfo)
					}
					
				}else{
					//没有关注---()关注
					const { data } = await addFollow({
						brand:this.detailsInfo.brands,
						userInfo:getItem('user'),
						identify:1
						
					})
					console.log('关注',data)
					if( data.result ==0 || data.result ==1 ){
						this.isFollow = true
						this.$store.commit('setUserInfo',data.userInfo)
					}
					
				}	
			},
			
			//收藏
			 OnFavour(){
				console.log('收藏')
				this.isFavour=!this.isFavour
				
				// if(this.isFavour){
				// 	const { data } = await onFavourItem({
				// 		brand:this.detailsInfo.brands,
				// 		userInfo:getItem('user'),
						
						
				// 	})
				// }
				// console.log('data',data)
				// if( data.result ==0 || data.result ==1 ){
				// 	this.isFavour = true
				// 	this.$store.commit('setUserInfo',data.userInfo)
				// }
			},
			
			
			//加入购物车
			async addToCar(){
				//1.选择需要展示的信息，获取
				const product = {}
				product.img = this.detailsInfo.icon
				product.title = this.detailsInfo.title
				product.price = this.detailsInfo.price
				product.id = this.id
				//2.加入购物车
				//vuex来管理购物车商品，临时管理，多界面共享
				//this.$store.commit('addCart',product)
				this.$store.dispatch('addCart',product)
				//请求接口
				const res = await addToCartList({
					username:this.user.username,
					cartList:product
				})
				console.log('添加购物车',res)
			},
			// onClickIcon(){
			//     this.toast('点击图标');
			// },
			onClickButton(){
				//this.$toast('点击按钮');
				this.$router.push('/toSum')
			}
		}
	}
</script>

<style scoped lang="less">
.detailItem{
	height: 400px;
	img{
		margin-top: 16px;
		margin-left: 34px;
		width: 80%;
		
	}
}
	
.swiper-block{
    height: 220px;
    width: 100%;
}
.detail-info{
    .title{
        font-size:16px;
        margin: 10px 0;
    }
    .price{
        color:#f2270c;
        font-size:20px
    }
    .price span{
        font-size:30px
    }
    .collect{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .collect .van-icon-star-o{
        
        //color:#f2270c;
        font-size:20px;
    }
    .collect span{
        font-size: 14px;
        display: inline-block;
        margin-left: 5px;
        margin-top: 4px;
    }
    .shop{
        background-color: #ececec;
        margin: 20px 0;
        padding: 10px 0;
        font-size:16px;
        color: #98484e;
    }
    .follow{
        background-color: #62b9ce;
        border: 0.02667rem solid #62b9ce;
        padding: 15px 20px;
        height: 30px;
        margin-top: 4px;
    }
    .isfollow{
        background-color: #fff;
        border: 0.02667rem solid #fff;
        padding: 15px 20px;
        height: 30px;
        margin-top: 4px;
        color: #62b9ce;
    }
	.isfavour{
		color: #ff5000;
		
	}
}	
</style>