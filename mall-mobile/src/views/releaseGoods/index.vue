<template>	
	<div class='releaseGoods'>
		<van-nav-bar
			class="app-nav-bar"
		    left-arrow
			@click-left="$router.back()">
			<div slot='title'>发布商品</div>
		</van-nav-bar>		
		<van-form @submit="onSubmit">
		  <van-cell-group inset>
		    <van-field
		      v-model="model.name"
		      name="商品名称"
		      label="商品名称"
		      placeholder="商品名称"
		    /> 
		  </van-cell-group>
		  <van-cell-group inset>
		    <van-field
		      v-model="model.brands"
		      name="商品品牌"
		      label="商品品牌"
		      placeholder="商品品牌"
		    /> 
		  </van-cell-group>
		  <van-cell-group inset>
		    <van-field
		      v-model="model.price"
		      name="商品价格"
		      label="商品价格"
		      placeholder="商品价格"
		    /> 
		  </van-cell-group>
		  <div style="margin: 16px;">
		    <van-button round block type="primary" native-type="submit">
		      发布
		    </van-button>
		  </div>
		</van-form>
	</div>
</template>

<script>
	import { releaseItem } from '../../api/releaseItem.js'
	export default{
		name:'releaseGoods',
		     data() {
		          return {
		            model: {}
		          }
		        },
		   	 methods:{
		   		async onSubmit(){
		   				//创建--保存
		   			//const	res = await this.$http.post('rest/brands',this.model)
					
					const { data } = await releaseItem(this.model)
					console.log('mall-mobile,',data)
		   				
					this.$dialog.confirm({
					  title: '标题',
					  message:
					    '发布商品正在审核中，请耐心等待！',
					})
					  .then(() => {
					    // on confirm
						this.$router.push('/category')
					  })
					  .catch(() => {
					    // on cancel
					  });
						
		   			},
		   		 },
		   			
		 
	}
</script>

<style>
	 .van-cell-group{
		 margin-top: 5px;
	 }
	 .van-button{
		 background-color: #42B983;
	 }
</style>
