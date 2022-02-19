<template>
	<div class='main'>
		<el-container style="height: 100vh;">
		  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
			<!-- 
				1.el-menu 添加router属性，开启路由模式
				2.unique-opened 一次只展开一个
				3. :default-openeds="['1']"默认打开第几个  el-submenuindex的值
				4.:default-active="$route.path" 默认激活的选项 刷新任然存在
			-->
			<el-menu 
				router
				:default-openeds="['3']"
				unique-opened
				:default-active="$route.path">
			  <el-submenu index="1">
				<template slot="title"><i class="el-icon-menu"></i>内容管理</template>
				<el-menu-item-group>
				  <template slot="title">分类管理</template>
				  <el-menu-item index="/categories/create">新建分类</el-menu-item>
				  <el-menu-item index="/categories/list">分类列表</el-menu-item>
				  <el-menu-item index="/categories/listTree">分类列表树</el-menu-item>			  
				</el-menu-item-group>
				<el-menu-item-group>
				  <template slot="title">品牌管理</template>
				  <el-menu-item index="/brands/create">新建品牌</el-menu-item>
				  <el-menu-item index="/brands/list">品牌列表</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group>
				  <template slot="title">商品管理</template>
				  <el-menu-item index="/products/create">新建商品</el-menu-item>
				  <el-menu-item index="/products/list">商品列表</el-menu-item>
				</el-menu-item-group>
				</el-submenu>
			  <el-submenu index="2">
			  	<template slot="title"><i class="el-icon-message"></i>运营管理</template>
			  	<el-menu-item-group>
			  	  <template slot="title">广告管理</template>
			  	  <el-menu-item index="/advs/create">新建广告</el-menu-item>
			  	  <el-menu-item index="/advs/list">广告列表</el-menu-item>
			  	</el-menu-item-group>
			  </el-submenu>
			  <el-submenu index="3">
			  	<template slot="title"><i class="el-icon-setting"></i>系统设置</template>
			  	<el-menu-item-group>
			  	  <template slot="title">管理员</template>
			  	  <el-menu-item index="/adminUser/create">新建管理员</el-menu-item>
			  	  <el-menu-item index="/adminUser/list">管理员列表</el-menu-item>
			  	</el-menu-item-group>
			  </el-submenu>
			</el-menu>
		  </el-aside>
		  
		  <el-container>
			<el-header style="text-align: right; font-size: 12px">
			  <el-dropdown>
				<i class="el-icon-setting" style="margin-right: 15px"></i>
				<el-dropdown-menu slot="dropdown">
				  <el-dropdown-item>查看</el-dropdown-item>
				  <el-dropdown-item>新增</el-dropdown-item>
				  <el-dropdown-item>删除</el-dropdown-item>
				</el-dropdown-menu>
			  </el-dropdown>
			  <span>王小虎</span>
			</el-header>
			
			<el-main>
				<!-- 动态显示区域 -->
				<router-view></router-view>
			</el-main>
		  </el-container>
		</el-container>
	</div>
</template>

<script>
	export default{
		name:'Main',
		 data() {		     
		      return {
		      }
		    }
	}
</script>

<style>
	 .el-header {
	    background-color: #B3C0D1;
	    color: #333;
	    line-height: 60px;
	  }
	  
	  .el-aside {
	    color: #333;
	  }
</style>
