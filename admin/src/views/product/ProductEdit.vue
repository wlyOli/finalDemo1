<template>	
	<div class='product-edit'>
		<h1>{{id?'编辑':'新建'}}商品</h1>
		<!-- @submit.native.prevent阻止默认提交，不要跳转页面，进行指定提交 -->
			<el-form 
			:model="model" 
			label-width="80px" 
			@submit.native.prevent='save'>	
		  <el-form-item label="商品名称">
		    <!-- <el-col :span='12'> -->
				<el-input v-model="model.name"></el-input>				
			<!-- </el-col> -->
		  </el-form-item>
		  
		  
		  <el-form-item label="商品标题">
		    <el-input v-model="model.title"></el-input>
		  </el-form-item>
		  <el-form-item label="商品价格">
		    <el-input v-model="model.price"></el-input>
		  </el-form-item>
		 <el-form-item label="商品类型">
		    <el-select v-model="model.categories" multiple>
		      <el-option 
				v-for='item in categories'
				:key='item._id'
				:label="item.name" 
				:value="item._id"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="商品品牌">
		      <el-select v-model="model.brands" placeholder="请选择商品品牌">
		        <el-option
					v-for='item in brands'
					:key='item._id'
					:label="item.name" 
					:value="item._id"></el-option>
		      </el-select>
		  </el-form-item>
			
			
		  <el-form-item label="商品图标">
			  <el-upload
			    class="avatar-uploader"
			    :action="$http.defaults.baseURL+'/upload'"
			    :show-file-list="false"
			    :on-success="afterUpload">
				<!-- v-if="model.icon" 有图片就展示图片，没有icon就显示图标 -->
			    <img v-if="model.icon" :src="model.icon" class="avatar">
			    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			  </el-upload>
			</el-form-item>	
			<!-- 富文本框编辑 -->
			<el-form-item label='商品详情'>				
				 <vue-editor
				  v-model='model.body' 
				  useCustomImageHandler
				  @image-added="handleImageAdded"/>
			</el-form-item>	  
			<el-form-item>
				<!-- native-type='submit'采用原生提交方式 -->
			    <el-button type="primary" native-type='submit'>保存</el-button>
			  </el-form-item>		
		</el-form>

	</div>
</template>

<script>
	//import a from "vue2-editor"; -->a.VueEditor
	import {VueEditor} from "vue2-editor"; 
	export default{
		name:'ProductEdit',
		   props:{
		   	id:{}
		   },
		   components:{VueEditor},
		     data() {
		          return {
		   		 //parents:[],
		            model:{},
					categories:[],
					brands:{}
		          }
		        },
		   	 methods:{
				 //图片上传
				 afterUpload(res){
					 console.log('res',res)
					 //this.model.icon = res.url + model中定义icon:''
					 //或者this.$set(目标，“变量”，值)
					 this.$set(this.model,'icon',res.url)
				 },
		   		async save(){
					//this.$router.push('/products/list')
		   			let res
		   			if(this.id){
		   				//更新
		   				//---  /categories/:id
		   				res = await this.$http.put(`rest/products/${this.id}`,this.model)
		   			}else{
		   				//创建--保存
		   				res = await this.$http.post('rest/products',this.model)
		   				
		   			}
		   			
		   			//跳转到分类列表页
		   			//router index.js中的path
		   			this.$router.push('/products/list')
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
		   				const res = await this.$http.get(`rest/products/${this.id}`) 
		   				this.model = res.data
		   		 },
				 //获取品牌				 
				 async fetchBrands(){
					 const res = await this.$http.get('rest/brands')
					 this.brands = res.data
					// console.log('parents',parents)
				 },
				  async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
				      
				       var formData = new FormData();
				       formData.append("file", file);
						
					   const res =await this.$http.post('upload',formData)
					   console.log('res',res)
					    Editor.insertEmbed(cursorLocation, "image", res.data.url);
						resetUploader();				       
				     },
				 //获取类型
				 async fetchCategories(){
					 const res = await this.$http.get(`rest/categories`)
					 this.categories = res.data
				 },
	 
		   	 },
		   	 created(){
				 this.fetchBrands()
				 this.fetchCategories()
		   		 //当前面为真的时候，才执行后面
		   		 this.id&&this.fetch()
		   		 // if(this.id){
		   			//  this.fetch()
		   		 // }
		   	 }
		  
		 
		 
	}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
