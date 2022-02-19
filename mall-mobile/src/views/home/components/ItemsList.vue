<template>
	<div class="items-list">
		<van-pull-refresh 
			v-model="isRefreshLoading"
			@refresh="onRefresh"
			:success-text="refreshSuccess"
			success-duration="1500">
			
			<!-- 轮播图 -->
			<van-swipe :autoplay="3000" class="swiper-block"
						v-if="categories.name=='蔬菜'">
			  <van-swipe-item v-for="(item, index) in images" :key="index">
			    <img v-lazy="item.image" style="width: 100%;"/>
			  </van-swipe-item>
			</van-swipe>
			
			<van-list
			  v-model="loading"
			  :finished="finished"
			  finished-text="没有更多了"
			  @load="onLoad"
			>
			 <!-- 列表项 -->
			 <goods-item 
				v-for="(item,index) in list"
				:key="index"
				:goods="item"></goods-item>
			  <!-- <van-cell v-for="item in list" :key="item._id" :title="item.title " /> -->
			 <!-- 列表项 -->
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
	import { getItems , getSwiper } from '@/api/products'
	import GoodsItem from '@/components/goodsItem'
	
	export default{
		name:'ItemsIndex',
		props:{
			categories:{
				type:Object,
				required:true,
				
			}
		},
		components:{
			GoodsItem
		},
		data(){
			return {
				list: [],
			    loading: false,
				finished: false, 
				pageNum:1,
				pageSize:5,
				isRefreshLoading: false,//下拉刷新loading
				refreshSuccess:'',//下拉刷新提示
				images: [],
			}
		},
		created(){
			this.getSwiperBlock()
		},
		methods:{
			async onLoad() {
				 //1.请求数据
				 const { data } = await getItems({
					 categoryId:this.categories._id,
					 pageNum:this.pageNum,
					 pageSize:this.pageSize
				 })
				 //console.log('data',data)
				 
				 //2.把数据放到list: []再传给组件
				 
				 this.list.push(...data.itemsList)
				 //3.加载状态结束设置，本次加载状态，它才可以判断是否需要加载下一次
				 //否则它就停在那里
				 this.loading = false;
				 
				 //4.数据全部加载完成
				 if(data.itemsList>=this.pageSize){
					 this.pageNum++
				 }else{
					 this.finished = true
				 }
				 
			    },
			async onRefresh() {
				  //1.请求数据
				  const { data } = await getItems({
						 categoryId:this.categories._id,
						 pageNum:this.pageNum,
						 pageSize:this.pageSize
				  })
				  //2.把数据放到数据列表中(向上添加)
				  this.list.unshift(...data.itemsList)
				  
				  //3.关闭刷新状态
				  this.isRefreshLoading = false
				  this.refreshSuccess=`更新了${data.itemsList.length}`
				  
				},
			async getSwiperBlock(){
				const { data } = await getSwiper()
				this.images = data[0].items
				console.log('this.images',this.images)
				},
				
					
		}
	}
</script>

<style scoped lang="less">
	.items-list{
		position: fixed;
		right:0;
		left: 0;
		bottom: 50px;
		overflow: auto;//滑动
		top: 90px;
	}
	.swiper-block{
		height: 160px;
		width: 100%;
	}
</style>
