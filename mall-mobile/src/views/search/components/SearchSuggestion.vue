<template>
	<div class="search-suggestion">
		<!-- <van-cell v-for="(item,index) in suggestions" :title="item.title" icon="search" :key="index"/> -->
		<van-cell 
					v-for="(item,index) in suggestions" 
					icon="search" 
					:key="index"
					@click="$emit('search',item.title)">
					 <!-- 想要高亮，v-html进行 -->
			<div slot="title" v-html="highlight(item.title)"></div>
		</van-cell>
	</div>
</template>

<script>
	import {getSuggestion} from '@/api/search'
	//import _ from 'lodash'//常用下划线引用它(全部引)
	import { debounce } from 'lodash' //引部分
	
	// const fn = _.debounce(function(){
	// 	console.log('hello')
	// },1000)
	
	// fn()
	
	
	// setTimeout(()=>{
	// 	fn()
	// },1200)
	
	export default {
		
		name: 'SearchSuggestion',
		props:{
			searchText:{
				type:String,
				require:true
			}
		},
		data() {
			return {
				suggestions:[]
			};
		},
		methods: {
			highlight(item){
				return item.replace(
					new RegExp(this.searchText,'gi'),
					`<span style="color:red">${this.searchText}</span>`
				)
				
			}
		},
		//watch监听的变量必须是已经存在的，可以异步操作
		//computed监听时间是没有的，事件当中的值是data存在的
		
		watch:{
			// 第一种写法:简写方式,属性名:要监视的数据的名称
			// 第一次不会触发,渲染后才触发 
			// searchText(){
			// 	console.log('watch!!')
			// }
			
			// 第二种:完整的写法
			 searchText:{
			 	//当数据发生变化,则会执行handler处理函数
				handler:debounce(async function(){
						console.log('watch2')
						
						// 1.找到数据接口
						// 2.请求获取数据
						const { data } = await getSuggestion(this.searchText)
						console.log('data',data)
						// 3.模板绑定数据
						this.suggestions = data.list
					},200),
				//该回调会在侦听开始之后被立即调用
								immediate: true
				}	
					
				// async handler(){
				// 	console.log('watch2')
					
				// 	// 1.找到数据接口
				// 	// 2.请求获取数据
				// 	const { data } = await getSuggestion(this.searchText)
				// 	console.log('data',data)
				// 	// 3.模板绑定数据
				// 	this.suggestions = data.list
				// },
				// //该回调会在侦听开始之后被立即调用
				// immediate: true
			 // }
			 
			 
		}
	}
</script>

<style>
</style>
