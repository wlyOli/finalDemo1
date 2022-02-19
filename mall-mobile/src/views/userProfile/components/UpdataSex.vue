<template>
	<div class="updata-sex">
		<van-picker
		  show-toolbar
		  :columns="columns"
		  :default-index="defaultValue"
		  @confirm="onConfirm"
		  @cancel="$emit('close')"
		  @change="onSexChange"
		/>
			
	</div>
</template>

<script>
	import { editUser } from '@/api/user'
	import{ mapState } from 'vuex'
	export default{
		name:'UpdataSex',
		props:{
			value:{
			    type:Number,
			    default:1
			}
		},
		computed:{
			...mapState(['user'])
		},
		data(){
			return{
				  columns:['男','女'] ,
				  defaultValue:this.value,
				  
			}
		},
		methods:{
			onSexChange(picker,value,index){
			   console.log('index',index)
			   this.defaultValue = index
			},
			async onConfirm(){
				console.log('---------')
				//请求提交更新用户昵称
				 this.$toast.loading({
				     message:'保存中',
				     forbidClick:true //禁止背景点击
				 })
				 const res = await editUser({
				     username:this.user.username,
				     sex:this.defaultValue
				 })
				 console.log('res111',res)
				 //传递最新的昵称给父组件
				 //this.$emit('update-nickname',this.value) 
				 //发布input事件，更新 父组件的事件
				 this.$emit('input',this.defaultValue) 
				 this.$toast.success('保存成功')
				 //更新成功--修改父组件name---关闭弹出层
				 this.$emit('close')
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
