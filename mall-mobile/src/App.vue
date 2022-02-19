<template>
  <div id="app">
    <!-- 视图显示-->
	 <keep-alive exclude="Detail">
		 <!-- 
			exclude="Detail"(name),除去详情页
		  -->
		 <router-view/>
	 </keep-alive>
  </div>
</template>

<script>
	export default{
		name:'App',
		data(){
			return{
				
			}
		}
	}
</script>

<style>

</style>
