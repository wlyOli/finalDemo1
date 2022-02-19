<template>	
	<div class='adv-edit'>
		<h1>{{id?'编辑':'新建'}}广告</h1>
		<!-- @submit.native.prevent阻止默认提交，不要跳转页面，进行指定提交 -->
			<el-form 
			:model="model" 
			label-width="80px" 
			@submit.native.prevent='save'>	
		  <el-form-item label="广告名称">
		    <el-input v-model="model.name"></el-input>
		  </el-form-item>
		  <!-- 广告位-->
		  <el-form-item label="广告">
			  <!--<el-button><i class="el-icon-plus"></i>添加广告</el-button>-->
				<el-button icon="el-icon-plus" @click="model.items.push({})">添加广告</el-button>
				<el-row>
				  <el-col :span="18"  class="adRow" v-for="(item,index) in model.items" :key='index'>
				    <el-card shadow="never" class="adForm">
				      <div slot="header" class="clearfix">
				          <span>广告{{index+1}}</span>
				          <el-button style="float: right;" type="text"
									@click="model.items.splice(index,1)">删除</el-button>				  
						</div>
						<el-form label-width='80px'>
							<el-form-item label='跳转链接'>
								<el-input v-model="item.url"></el-input>						  
							</el-form-item>
							<el-form-item label="上传图片">
								  <el-upload
									class="avatar-uploader"
									:headers="getAuthHeader()"
									:action="$http.defaults.baseURL+'/upload'"
									:show-file-list="false"
									:on-success="res=>$set(item,'image',res.url)">
									<img v-if="item.image" :src="item.image" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								  </el-upload>
							</el-form-item>
						</el-form>
				    </el-card>										
				  </el-col>
				</el-row>				
		  </el-form-item>		  
		  <el-form-item>
				<!-- native-type='submit'采用原生提交方式 -->
			    <el-button type="primary" native-type='submit'>保存</el-button>
			  </el-form-item>		
		</el-form>

	</div>
</template>

<script>
	export default{
		name:'AdvEdit',
		   props:{
		   	id:{}
		   },
		     data() {
		          return {
					  model: {
						  items:[]
					  }
		          }
		        },
		   	 methods:{
		   		async save(){
		   			let res
		   			if(this.id){
		   				//更新
		   				//---  /categories/:id
		   				res = await this.$http.put(`rest/advs/${this.id}`,this.model)
		   			}else{
		   				//创建--保存
		   				res = await this.$http.post('rest/advs',this.model)
		   				
		   			}
		   			console.log('1')
		   			//跳转到分类列表页
		   			//router index.js中的path
		   			this.$router.push('/advs/list')
					console.log('2')
		   			//弹出提示框保存成功
		   			 this.$message({
		   			          message: '保存成功',
		   			          type: 'success'
		   			        });
		   		 },
		   			//编辑详情
		   			async fetch(){
		   				//根据id来查询，请求接口
		   				//  /categories/:id
		   				const res = await this.$http.get(`rest/advs/${this.id}`) 
		   				//第一种完全覆盖
						this.model = res.data
						//es6展开运算符：对原有数据不进行改变，只是进行增加新属性
						this.model = {...this.model,...res.data}
						console.log("this.model",this.model)
		   		 },	 
		   	 },
		   	 created(){
		   		 //this.fetchParents()
		   		 //当前面为真的时候，才执行后面
		   		 this.id&&this.fetch()
		   		 // if(this.id){
		   			//  this.fetch()
		   		 // }
		   	 }
		  
		 
		 
	}
</script>

<style scoped>

  /* 清除浮动*/
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
	.adRow {
		margin-top: 30px;
	}
	.adForm .el-car__header{
		padding: 10px 20px;
	}
	.adForm .el-form-item{
	    padding-bottom: 15px;
	  }
	 .adRow .el-col{
	    margin-bottom: 15px;
	  }
</style>
