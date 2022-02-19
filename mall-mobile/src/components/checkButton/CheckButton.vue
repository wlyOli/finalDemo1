<template>
	<div class="check-button" :class="{check:isChecked}">
		<img src="@/assets/bingo.svg" />
	</div>
</template>

<script>
	 export default{
		 name:'CheckButton',
		 props:{
			 isChecked:{
				 type:Boolean,
				 default:false
			 }
		 }
	 }
</script>

<style scoped lang="less">
	.check-button{
		border-radius: 50%;
		border: 2px solid #aaa;
		width: 16px;
		height: 16px;
		position: absolute;
		z-index: 100;
		top: 50%;
		margin-top: -8px;
		left: 9px;
		img{
			position: absolute;
			top: -1px;
			left: -1px;
		}
	}
	.check{
		background-color: red;
		border: 2px solid red;
		
	}
</style>
