<template>
	<div class="adress">
		<!-- 头部 -->
		<van-nav-bar
			class="app-nav-bar"
		    left-arrow
			@click-left="$router.back()"
		>
			<div slot="title">我的地址</div>
		</van-nav-bar>
		<!-- 地址 -->
		<!-- :search-result="searchResult" -->
		<van-address-edit
		  :area-list="areaList"
		  show-postal
		  show-delete
		  show-set-default
		  show-search-result
		  :area-columns-placeholder="['请选择', '请选择', '请选择']"
		  @save="onSave"
		  @delete="onDelete"
		  @change-detail="onChangeDetail"
		/>

	</div>
</template>

<script>
	import { Toast } from 'vant';
	import { areaList } from '@vant/area-data';

	export default{
		name:"Adress",
		data(){
			return{
				  areaList,
				  searchResult: [],
			}
		},
		methods:{
			  onSave() {
			      Toast('save');
			    },
			    onDelete() {
			      Toast('delete');
			    },
			    onChangeDetail(val) {
			      if (val) {
			        // this.searchResult = [
			        //   {
			        //     name: '黄龙万科中心',
			        //     address: '杭州市西湖区',
			        //   },
			        //];
			      } else {
			        //this.searchResult = [];
			      }
			    },
		}
	}
</script>

<style>
</style>
