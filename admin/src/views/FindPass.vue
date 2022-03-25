<template>
	<div class="findPass">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
		  <el-form-item label="请输入用户名" prop="username">
		    <el-input v-model="ruleForm.username"></el-input>
		  </el-form-item>
		  回答密保问题：
		  <el-form-item label="我的小学班主任名字" prop="name">
		    <el-input v-model="ruleForm.name"></el-input>
		  </el-form-item>
		  <el-form-item label="我最喜欢的人" prop="person">
		    <el-input v-model="ruleForm.person"></el-input>
		  </el-form-item>
		  <el-form-item label="我养的第一支宠物名字" prop="animal">
		    <el-input v-model="ruleForm.animal"></el-input>
		  </el-form-item>
		  <el-form-item>
			<el-button type="primary" @click="findBack()">立即找回</el-button>
			<span :style="{'display':isShowError ? '':'none'}">找回密码失败</span>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default{
		name:'FindPass',
		data(){
			return{
				 ruleForm: {},
					rules: {
					 username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
					 ],
					  name: [
						{ required: true, message: '请输入答案', trigger: 'blur' },
						{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					  ],
					  person: [
						{ required: true, message: '请输入答案', trigger: 'blur' },
						{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					  ],
					  animal: [
						{ required: true, message: '请输入答案', trigger: 'blur' },
						{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					  ],
					},
					isShowError:false
			}
		},
		methods:{
			 findBack(){
				//const res = await this.$http.post('/findPass',this.ruleForm)
				//console.log('mima',res.data)

				if(this.ruleForm.username=="wly1124"&&this.ruleForm.name=="徐老师"&&this.ruleForm.person=="你猜"&&this.ruleForm.animal=="狗"){
					this.$router.push('/passBack')
				}else{
					this.isShowError = true
				}
				
			}
		}
	}
</script>

<style>
	.demo-ruleForm{
		width: 550px;
		height: 400px;
	}
</style>
