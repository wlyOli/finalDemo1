<template>
	<div class='category-edit'>
		<h1>{{id?'编辑':'新建'}}分类</h1>
		<!-- @submit.native.prevent阻止默认提交，不要跳转页面，进行指定提交 -->
		<el-form :model="model" label-width="80px" @submit.native.prevent='save'>
		   <el-form-item label="上级分类">
		      <el-select v-model="model.parent">
		        <el-option 
					v-for='item in parents'
					:key='item._id'
					:label="item.name" 
					:value="item._id"></el-option>
		      </el-select>
		    </el-form-item>
		  <el-form-item label="分类名称">
		    <el-input v-model="model.name"></el-input>
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
		name:'CategoryEdit',
		props:{
			id:{}
		},
		  data() {
		       return {
				 parents:[],
		         model: {
		           //name: '',
		          
		         }
		       }
		     },
			 methods:{
				async save(){
					let res
					if(this.id){
						//更新
						//---  /categories/:id
						res = await this.$http.put(`rest/categories/${this.id}`,this.model)
					}else{
						//创建--保存
						res = await this.$http.post('rest/categories',this.model)
						
					}
					
					//跳转到分类列表页
					//router index.js中的path
					this.$router.push('/categories/list')
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
						const res = await this.$http.get(`rest/categories/${this.id}`) 
						this.model = res.data
				 },
				 
				 //获取上级分类
				 async fetchParents(){
					 const res = await this.$http.get('rest/categories')
					 this.parents = res.data
					// console.log('parents',parents)
				 }
				 
			 },
			 created(){
				 this.fetchParents()
				 //当前面为真的时候，才执行后面
				 this.id&&this.fetch()
				 // if(this.id){
					//  this.fetch()
				 // }
			 }
	}
</script>

<style>
	 
</style>
