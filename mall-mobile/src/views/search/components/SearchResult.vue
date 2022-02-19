<template>
	<div class="search-result">
		<van-list
		  v-model="loading"
		  :finished="finished"
		  finished-text="没有更多了"
		  @load="onLoad"
		>
		  <van-cell v-for="(item,index) in list" 
					:key="index" 
					:title="item.title" />
		</van-list>
	</div>
</template>

<script>
	import { getResults } from '@/api/search'
	
	export default({
		name:'SearchResult',
		props:{
			searchText:{
				type:String,
				required:true
			}
		},
		data(){
			return{
				list: [],
				loading: false,
				finished: false,
				pageNum:1,
				pageSize:10
			}
		},
		methods:{
			 async onLoad() {
				 //1.请求获取数据
				 const { data } = await getResults({
					 pageNum:this.pageNum,
					 pageSize:this.pageSize,
					 q:this.searchText
				 })
				 console.log('搜索结果',data)
				 //2.将数据放到数据列表中
				 //this.list = data.list
				 this.list.push(...data.list)
				 //3.关闭本次loading
				 this.loading = false;
				 //4.判断是否还有数据
				 if(data.list.length){
					 //如果有
					 this.pageNum++
				 }else{
					 //5.如果有数据更新下一页，没有finished设为true
					 
					 this.finished = true
				 }
				 
			    },
		}
	})
</script>

<style lang="less" scoped>
	.search-result{
		position: fixed;
		right:0;
		left: 0;
		bottom:0px;
		overflow: auto;//滑动
		top: 54px;
	}
</style>
