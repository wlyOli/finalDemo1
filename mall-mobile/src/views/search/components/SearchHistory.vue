<template>
	<div class="search-history">
		<van-cell title="历史记录">
			<!-- 默认插槽  default 右侧-->
			<div v-if="isDeleteShow">
				<!-- 
				 报错：
				 props数据如果是引用类型（数组，对象）可以修改
				 注意修改：user.name='tom',arr.splice(0,1)
				 但是props数据不能重新赋值，xxx = xxx,searchHistories = []
				 
				 如果要改变，让父组件自己修改
				 -->
				<span @click="$emit('updata-histories',[])">全部删除</span>
				&nbsp;&nbsp;
				<span @click="isDeleteShow=false">完成</span>
			</div>
			<van-icon name="delete"
					  v-else
					  @click="isDeleteShow=true"></van-icon>
		</van-cell>
		<!-- 记录 -->
		<van-cell    v-for="(history,index) in searchHistories"
					  :title="history"
					  :key="index"
					  @click="onDelete(index,history)">
			<van-icon name="close" v-if="isDeleteShow"></van-icon>
		</van-cell>
	</div>
</template>

<script>
	import { setItem } from '@/utils/storage'
	
	import { deleteItem } from '@/api/search'
	export default({
		name:'SearchHistory',
		props:{
				searchHistories:{
					type:Array,
					required:true
				}
		},
		created(){
			console.log('搜索记录this.searchHistories',this.searchHistories)
		},
		data(){
			return{
				isDeleteShow:false
			}
		},
		methods:{
			async onDelete(index,history){
				//判断当前是否是删除状态
				if(this.isDeleteShow){
					//数据持久化
					const res  = await deleteItem(history)
					console.log('删除',res)
					//setItem('search-histories',this.searchHistories)
					
					
					this.searchHistories.splice(index,1)
					return
				}
				//非删除状态，展示搜索结果
				//触发父元素点击搜索事件
				//@search
				this.$emit('search',history)
				
			}
		}
	})
</script>

<style>
</style>
