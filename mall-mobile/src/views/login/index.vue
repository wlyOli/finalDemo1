<template>
  <div class="login-container">
	 
	<!-- 导航-->
    <van-nav-bar
	class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
	
	<!-- 基于vant表单验证
		1.使用vant-form组件包裹所有表单项vant-field
		2.vant-form绑定onSubmit=onLogin，表单提交会触发
		  只有验证通过才会调用submit
		3.使用field的rules属性定义校验规则
		4.show-error,show-error-message不显示默认提示框
		5.validate-first  :validate-first="true"两种生效方式
	 -->
	<van-form :show-error="false"
			  :show-error-message="false"
			  :validate-first="true"
			  @submit="onLogin"
			  @failed="onFailed">
		<!-- 登录表单 -->
		<!-- <van-cell-group> -->
		  <van-field
		    v-model="user.username"
			icon-prefix="iconfont"
		    left-icon="icon-shouji"
		    placeholder="请输入手机号"
			name="mobile"
			:rules="formRules.username"
			@keyup='getValue'
			>
			<!-- icon-shouji -->
			<van-icon class="iconfont" slot="left-icon" class-prefix="icon" name="shouji"></van-icon>	
		  </van-field>
		  <van-field
		    v-model="user.password"
		    clearable
			icon-prefix="iconfont"
		    left-icon="icon-24gl-lock2"
		    placeholder="请输入密码"
			name="password"
			:rules="formRules.password"
			@keyup='getValue'
			@clear='getValue'
			>
		  <!--  iocn-24gl-lock2  icon->class-prefix   24gl-lock2->name   -->
		  <van-icon class="iconfont" slot="left-icon" class-prefix="icon" name="24gl-lock2"></van-icon>
		  </van-field>
		<!-- </van-cell-group> -->
		
		<!-- 登录按钮 -->
		<div class="login-btn-warp">
			<van-button type="info" 
			block 
			:class="['login-btn',{'active':isActive}]"
			:disabled='!isActive'
			native-type="submit"
			>登录注册</van-button>		
		</div>
	</van-form>
	
  </div>
</template>

<script>
	//引入登录模块
	import { login,getCurrentUser } from '@/api/user.js'
	
	
	export default{
		name:'LoginIndex',
		data(){
			return {
				isActive:false,
				user:{
					username:'',
					password:''
				},
				formRules:{
					username:[
						{ required: true, message: '请填写手机号' },
						//\+?可选包不包含+
						{ pattern:/^\+?1[3|5|6|7|8]\d{9}$/, message: '手机号格式错误'}
					],
					password:[
						{ required: true, message: '请填写密码' },
						{ pattern:/^\d{6}$/, message: '密码错误'}	
					],
				}
				
			}
		},
		methods:{
			//触发按钮激活
			getValue(){
				if(this.user.username.length>=1&&this.user.password>=1){
					this.isActive = true
				}else{
					this.isActive = false
				}
			},
			
			//登录请求
			async onLogin(){
				// 加载框
				 this.$toast.loading({
				   message: '登录中...',
				   forbidClick: true,
				   duration:0	//为0不会消失
				 });
				//1.找到数据接口
				//2.封装请求方法
				//3.请求调用登录
				//4.处理响应结果
				try{
					const res = await login(this.user)
					//console.log('res',res)
					this.$toast.success('登录成功');
					
					//将登录成功的状态放入vuex
					this.$store.commit('setUser',res.data)
					//加载用户状态
					const { data } = await getCurrentUser(this.user.username)
					console.log('login-userinfo',data)
					this.$store.commit('setUserInfo',data[0])
					
					//登录成功返回到原来的页面,
					//this.$router.back()
					this.$router.push(this.$route.query.redirect || '/')
					
				}catch(err){
					console.log('登陆失败',err)
					this.$toast.fail('登录失败');
					
				}	
			},
			//错误信息提示
			onFailed(err){
				//console.log('err',err)
				//返回数组第一项就可以
				if(err.errors[0]){
					this.$toast({
						message:err.errors[0].message,
						position: 'top',
					})
				}
				
			}
		}  
	}
</script>

<style scoped>
	.login-btn-warp{
		padding: 26px 16px;
	}
	.login-btn{
		background-color: #93b5cf;
		border: none;
	}
	.van-button__content{
		font-size: 20px;
	}
	.active{
		background-color: #42B983!important;
	}
</style>