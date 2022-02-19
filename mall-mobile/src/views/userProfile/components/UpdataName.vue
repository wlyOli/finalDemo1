<template>
	<div class="updata-name">
		<!-- 导航 -->
		<van-nav-bar
			title="修改昵称"
			left-text="取消"
			right-text="完成"
			@click-left="$emit('close')"
			@click-right="onConfirm"
			/>
			<!-- props绑定的值不能修改  v-model="nickname"
				 var a=1 (nickname)
				 var b=a (localName)
				 var b=123
				 a=? - 1 普通数据类型
			-->
			<div class="name-field-wrap">
				<van-field
				  v-model="localName"
				  rows="2"
				  autosize
				  type="textarea"
				  maxlength="10"
				  placeholder="请输入昵称"
				  show-word-limit
				/>
			</div>
			
	</div>
</template>

<script>
	import { editUser } from '@/api/user'
	import{ mapState } from 'vuex'
	export default{
		name:'UpdataName',
		props:{
			// nickname:{
			// 	type:String,
			// 	default:''
			// }
			value:{
				type:String,
				default:''
			}
		},
		computed:{
			...mapState(['user'])
		},
		data(){
			return{
				// localName:'this.nickname'
				localName:'this.value'
			}
		},
		methods:{
			async onConfirm(){
				console.log('-----')
				//请求提交更新用户昵称
				this.$toast.loading({
					message:'保存中',
					forbidClick:true //禁止背景点击
				})
				const res = await editUser({
					username:this.user.username,
					 nickname:this.localName
					//nickname:this.value
				})
				console.log('res11',res)
				
				//传递最新昵称给父组件
				//this.$emit('updata-nickname',this.localName)
				this.$emit('input',this.localName)
				this.$toast.success({
					message:'保存成功'
				})
				//更新成功---关闭弹出层
				this.$emit('close')
				
			},
		}
	}
</script>

<style scoped lang="less">
	/deep/.van-nav-bar__title{
		color: #000000;
	}
	.name-field-wrap{
		padding: 10px;
	}
</style>
