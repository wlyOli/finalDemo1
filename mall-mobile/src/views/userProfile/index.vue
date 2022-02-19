<template>
	<div class="user-profile">
		<!-- 导航 -->
		<van-nav-bar
			title='个人信息'
			class="app-nav-bar"
		    left-arrow
			@click-left="$router.back()"
			/>
			<!-- 点击type="file" 就可以弹出-->
			<!-- accept接收什么类型 accept="image/png,image/jpeg"  accept="image/*"-->
			<input 
			       type="file" 
			       hidden 
			       ref="file"
			       accept="image/*"
			       @change="onFileChange"/>
			<!-- 在vue中操作dom用 ref="file"-->
		<!-- 内容表格 -->
		<van-cell title="头像" is-link center @click="$refs.file.click()">
		    <van-image
		        width="36"
		        height="36"
		        round
		        fit="cover"
		        :src="userProfile.avatar"
		    />
		</van-cell>
		<van-cell title="昵称" 
				  :value='userProfile.nickname' 
				  @click="isEditNameShow = true"
				  is-link 
				  />
		<van-cell title="性别"
				  :value="userProfile.sex === 0?'男':'女'" 
				  is-link 
				  @click="isEditSexShow = true"
				  
				  />
		<van-cell title="生日" 
				  :value="userProfile.birthday"
				  is-link 
				  @click="isEditBirthShow = true"
				  />
				  
	    <!-- 弹出层 -->
		<van-popup 
			   v-model="isEditNameShow" 
			   position="bottom" 
			   :style="{ height:'100%'}" 
				>
				<!-- 1.子组件中通过$emit注册事件，将数据作为参数传入，
					在父组件中通过$event接收
				-->
				<!-- 2.在组件中使用v-model
					当你传递给子组件的数据既要使用，也要修改的时候，
					可以使用v-model简写
					3.原理:	v-model="userProfile.nickname"
							:value="userProfile.nickname",默认传递了一个名字叫value的数据
							@input="userProfile.nickname",默认监听input事件
					起名字就不能随便取了，子组件要换成value,
										子组件事件名，input
					v-model的本质还是父子组件通信，它只是简化了父子组建的使用				
				 -->
				 <!-- 
					原来写法:
					:nickname="userProfile.nickname"
					@updata-nickname="userProfile.nickname = $event"
				  -->
				  <!-- 3.v-model 只能使用一次
						如果多个数据需要保持同步，
						使用 .sync修饰符
						:gender='user.gender'
						@updata-gender="user.gender=$event"
						
						:gender.sync = 'user.gender'
						给子组件传递一个数据gender，
						同时默认监听@updata:属性名="user.gender=$event"
				   -->
				<UpdataName @close="isEditNameShow=false"
							v-model="userProfile.nickname"
							v-if="isEditNameShow"
							></UpdataName>
		</van-popup>
		<!-- 弹出层 性别 -->
		<van-popup
			   v-model="isEditSexShow" 
			   position="bottom" 
			   >
				
				<UpdataSex @close="isEditSexShow=false"
						   v-model="userProfile.sex"
							>
					
				</UpdataSex>
				
		</van-popup>
		<!-- 修改生日 -->
		<van-popup 
		        v-model="isEditBirthShow" 
		        position="bottom" 
		>
		    <update-birthday @close="isEditBirthShow=false"
		                     v-model="userProfile.birthday"
		                     >
			</update-birthday>
		</van-popup>
		<!-- 修改用户头像 -->
		<van-popup 
		        v-model="isEditPhotoShow" 
		        class="photo-pop"
		        position="bottom" 
		        style="height:100%" 
		>
		  <!-- 把你选择的传给子组件 :image="previewImage"-->
		   <update-photo :file="previewImage"
		                 @close="isEditPhotoShow=false"
		                 v-model="userProfile.avatar"
		                >
		                </update-photo>
		</van-popup>
	</div>
</template>

<script>
	import { getCurrentUser } from '@/api/user'
	import { mapState } from 'vuex'
	import UpdataName from './components/UpdataName.vue'
	import UpdataSex from './components/UpdataSex.vue'
	import UpdateBirthday from './components/UpdateBirthday.vue'
	import UpdatePhoto from './components/UpdatePhoto'
	
	export default{
		name:'UserProfile',
		components:{
			UpdataName,
			UpdataSex,
			UpdateBirthday,
			UpdatePhoto
		},
		data(){
			return{
				userProfile:{},
				isEditNameShow:false,//编辑昵称的显示状态
				isEditSexShow:false, //修改性别
				isEditBirthShow:false,//编辑生日的显示状态
				isEditPhotoShow:false, //编辑头像的显示状态
				previewImage:null
			}
		},
		created(){
			this.loadCurrentUser()
		},
		computed:{
			...mapState(['user'])
		},
		methods:{
			//当前用户信息
			async loadCurrentUser(){
				   const { data } = await getCurrentUser(this.user.username)
				   //console.log('data',data)
				   //this.userProfile = data[0]
				  // console.log('this.userProfile',this.userProfile)
				  if(data.length != 0){
				  	                this.currentUser = data[0]
				  					console.log('this.currentUser22',this.currentUser)
				  				}

				   
			},
			//头像改变的时候，同样一个图片不会触发
			onFileChange(){
			    console.log('000')
			    //展示弹出层
			    this.isEditPhotoShow = true
			    //在弹出层预览图片
			    //const blob = window.URL.createObjectURL(this.$refs.file.files[0])
			    //console.log('blob',blob)
			    //this.previewImage = blob
			    this.previewImage = this.$refs.file.files[0]
			    console.log('this.previewImage',this.previewImage)
			    //同样一个图片不会触发,清空它的值
			    //为了解决相同图片不触发
			    this.$refs.file.value=""
			}
		}

	}
</script>

<style scoped lang="less">
	.van-popup{
		background-color: #f5f7f9;
	}
</style>
