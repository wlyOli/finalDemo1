<template>
	 <div id="category-listTree">
		 <h1>分类列表树</h1>
		 <div class="tree-style">
			 <el-tree :data="items" :props="defaultProps" @node-click="handleNodeClick">
			 	<span class="custom-tree-node" slot-scope="{ node, data }">
			 	        <span>{{ node.label }}</span>
			 	        <span>
			 	          <el-button
			 	            type="text"
			 	            size="mini"
			 	            @click="$router.push(`/categories/edit/${data.id}`)">
			 	            编辑
			 	          </el-button>
			 	          <el-button
			 	            type="text"
			 	            size="mini"
			 	            @click="() => remove(node, data)">
			 	            删除
			 	          </el-button>
			 	        </span>
			 	      </span>
			 </el-tree>
		 </div>	
	</div> 				
</template>

<script>
	export default{
		name:'CategoryTree',
		data() {
		      return {
		        items: [],
		        defaultProps: {
		          children: 'children',
		          label: 'name'
		        }
		      };
		    },
			methods: {
				//获取分类
				async fetch(){
					const res = await this.$http.get("rest/categories/tree")
					this.items = res.data
					console.log('items',this.items)
				},
				//删除
			   async remove(node, data) {
					this.$confirm(`是否删除分类?${data.name}`, '提示', {
					  confirmButtonText: '确定',
					  cancelButtonText: '取消',
					  type: 'warning'
					}).then(async() => {
						//删除接口  /categories/:id
						const res = await this.$http.delete(`rest/categories/${data.id}`)
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
				  },
				handleNodeClick(data) {
				        console.log(data);
				},
					  
					  
					  
			},
			created(){
				//刚进入页面时获取值
				this.fetch();
			}
		
	}
</script>

<style>
	.tree-style{
		width: 600px;
	}
	.custom-tree-node {
	    flex: 1;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    font-size: 14px;
	    padding-right: 8px;
	  }
</style>
