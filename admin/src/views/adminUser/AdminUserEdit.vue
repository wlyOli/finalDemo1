<template>	
	<div class='adminuser-edit'>
		<h1>{{id?'编辑':'新建'}}管理员</h1>
		<!-- @submit.native.prevent阻止默认提交，不要跳转页面，进行指定提交 -->
			<el-form 
			:model="model" 
			label-width="80px" 
			@submit.native.prevent='save'>	
		  <el-form-item label="用户名">
		    <el-input v-model="model.username"></el-input>
		  </el-form-item>
		  <el-form-item label="密码" >
		    <el-input v-model="model.password"></el-input>
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
	   name:'AdminUserEdit',
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
					res = await this.$http.put(`rest/adminUser/${this.id}`,this.model)
				}else{
					//创建--保存
					res = await this.$http.post('rest/adminUser',this.model)
					
				}
				console.log('1')
				//跳转到分类列表页
				//router index.js中的path
				this.$router.push('/adminUser/list')
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
					const res = await this.$http.get(`rest/adminUser/${this.id}`) 
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

<style >

</style>
