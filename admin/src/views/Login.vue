<template>
	<div class='login-container'>
		<img src="../assets/egg.jpeg" width="401px" height="386px"/>
		
		<el-card header="登录">
			<!-- native 监听表达原生的事件  ，prevent表示阻止跳转页面 -->
		  <el-form v-model="model" ref="model"
					 @submit.native.prevent="login">
			  <el-form-item label="用户名">
				  <el-input  type="text" v-model="model.username" @blur='checkUser'></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="password">
			  	  <el-input type="password" v-model="model.password" @blur='checkPass'></el-input>
			  </el-form-item>
			  <el-form-item>
			  	  <el-button type="primary" native-type="submit">登录</el-button>
			  </el-form-item>
			  <div class="words">
				  <span @click="forgetPass">忘记密码</span>
			  </div>
		  </el-form>
		</el-card>
	</div>
</template>

<script>
	export default{
		name:'Login',
		data(){
			return{
				model:{
					username:'',
					password:''
				},
			} 
		},
		methods:{
			checkUser(){
				// if(!this.username){
				// 	// alert('请输入用户名')
				// }
			},
			checkPass(){
				// if(!this.password){
				// 	// alert('请输入密码')
				// }
			},
			async login(){
				console.log('model',this.model)
				const res = await this.$http.post('/login',this.model)
				console.log("res.data",res.data)
				//存储token关闭之后还有//关闭之后没有sessionStorage
				localStorage.token = res.data.token
				//页面跳转
				this.$router.push('/')
				this.$message({
					type:'success',
					message:'登录成功'
				})
			},
			forgetPass(){
				this.$router.push('/findPass')
			}
		}
	}
</script>

<style scoped>
	.login-container{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 120px;
		
		/* width: 25rem;
		margin: 6rem auto; */
	}
	.el-button--primary{
		margin: auto;
		width: 360px;
	}
	.words{
		color: #494d53;
		font-size: small;
		margin-left: 300px;
	}
	
</style>
