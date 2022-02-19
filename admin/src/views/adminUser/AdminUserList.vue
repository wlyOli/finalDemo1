<template>	
	<div class="adv-list">
		<h1>管理员列表</h1>
		  <el-table :data="items" style="width: 100%">
		    <!-- prop是绑定的数据字段，label是显示的名称-->
			<el-table-column			
		      label="ID"
		      prop="_id">
		    </el-table-column>								
		    <el-table-column
		      label="管理员名称"
		      prop="username">
		    </el-table-column>	
		    <el-table-column
		      align="right" 
			  label="操作"
			  prop="methods">	
			<!-- 操作 -->			 
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="$router.push(`/adminUser/edit/${scope.row._id}`)">编辑</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="remove(scope.row) ">删除</el-button>									  
			  </template>
		    </el-table-column>
		  </el-table>
	</div>
</template>

<script>
	export default{
		name:'AdminUserList',
		   data() {
		        return {
					items: []
		        }
		      },
			  methods: {
					//获取分类
					async fetch(){
						const res = await this.$http.get("rest/adminUser")
						this.items = res.data
						console.log('items',this.items)
					},
					//删除
					   async remove(row) {
							console.log("删除row",row)
							this.$confirm(`是否删除管理员?${row.username}`, '提示', {
							  confirmButtonText: '确定',
							  cancelButtonText: '取消',
							  type: 'warning'
							}).then(async() => {
								//删除接口  /categories/:id
								const res = await this.$http.delete(`rest/adminUser/${row._id}`)
								console.log(res)
								//弹框
							  this.$message({
								type: 'success',
								message: '删除成功!'
							  });
							  
							  //更新数据
							  this.fetch();
							  
							}).catch(() => {
							  this.$message({
								type: 'info',
								message: '已取消删除'
							  });          
							});
						  }
			  		   				
			  },
			  //页面刚刚初进入的时候需要做什么  获取接口，地址栏参数在create获取
			  created(){
			  	this.fetch();
			  }
				 
	}
</script>

<style>
 
</style>
