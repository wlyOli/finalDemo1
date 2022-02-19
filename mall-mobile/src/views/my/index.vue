<template>
    <div class="my-container">
		<!-- 第一部分 -->
		<van-cell-group class="my-info" v-if="user">
           <van-cell 
             center
             class="base-info"
             :border="false">
             <van-image
               class="avatar"
               slot="icon"
               round
               fit="cover"
			   :src="currentUser.avatar"
               />
             <div slot="title" class="name">昵称:{{currentUser.username}}</div>
             <van-button
                 class="update-btn" 
                 size="small"
                 round
				 to='/user/profile'
				 >
				 编辑资料
				 </van-button>
           </van-cell>
		   
		   <!-- 第一部分第二小块-->
           <van-grid :column-num="2" :border="false">
             <van-grid-item class="data-info-item">
                  <div slot="text" class="text-wrap">
                      <div class="count">0</div>
                      <div class="text">关注</div>
                  </div>
             </van-grid-item>
              <van-grid-item class="data-info-item">
                  <div slot="text" class="text-wrap">
                      <div class="count">0</div>
                      <div class="text">店铺</div>
                  </div>
             </van-grid-item>             
            </van-grid>
        </van-cell-group>
        
		<!-- 未登录状态 -->
		<div class="not-login" v-else>
			<!--  @click="$router.push('/login')" -->
			<div class="text" 
				 @click="$router.push({
					 name:'login',
					 query:{
						 redirect:'/my'
					 }
				 })">用户/商家 登录注册
				 
				 </div>
			
		</div>
        
        <!--  第二部分 -->
        <van-grid :column-num="2" class="nav-grid mb-4">
             <van-grid-item icon="star-o" text="收藏" class="nav-grid-item"/>  
             <van-grid-item icon="browsing-history-o" text="喜欢" class="nav-grid-item"/>        
        </van-grid>
        <!-- 第三部分 页面导航-->
        <van-cell title="帮助" is-link000000 to="" />
        <van-cell class="mb-4" title="关于我们" is-link to=""/>
        
        <van-cell 
            v-if="user"
            class="logout-cell" 
            title="退出登录"
            @click="onLogout"
            />
    </div>
</template>
<script>
   import { mapState } from 'vuex'
   import {getCurrentUser} from '@/api/user'
   export default{
       name:'myIndex',
       data(){
           return{
			   //data里的名称不能和mapState（vuex）重名
              currentUser:{}
           }
       },
       computed:{
		   //mapState是个方法，将user映射到当前组件
		   ...mapState(['user'])
	   },
	   created(){
		   this.loadCurrentUser()
	   },
	   methods:{
		   onLogout(){
				this.$dialog.confirm({
				  title: '退出提示',
				  message: '确认退出？',
				})   
				  .then(() => {
					// 清楚用户登录状态
					//vuex 调用
					this.$store.commit('setUser',null)
					this.$store.commit('setUserInfo',null)
					
				  })
				  .catch(() => {
					// on cancel
				  });   
		   },
		   //当前用户信息
		   async loadCurrentUser(){
			   const { data } = await getCurrentUser(this.user.username)
			   //console.log('data。。',data)
			   // this.currentUser = data[0]
			   // console.log('this.currentUser',this.currentUser)
			   
			   if(data.length != 0){
					this.currentUser = data[0]
					console.log('this.currentUser22',this.currentUser)
				}

		   }
	   }
   }
</script>
<style scoped lang="less">
.my-container{
   .my-info{
     // background-color: #62b9ce;
	 background-color: #42B983;
     .base-info{
         box-sizing: border-box;
         height: 115px;
         background-color: unset;
         padding-top:38px;
         padding-bottom: 11px; 
         .avatar{
             box-sizing: border-box;
             height: 66px;
             width: 66px;
             border: 1px solid #fff;
             margin-right: 11px;
         }
         .name{
             font-size:14px;
             color: #fff;
         }
         .update-btn{
            height: 20px;
            font-size: 10px;
            color:#666666;
			background-color: lightpink;
         }
     }
     .data-info-item{
         height: 65px;
         color: #ffffff;
         .text-wrap{
             display: flex;
             flex-direction: column;
             justify-content: center;
             align-items: center;
            .count{
                font-size:18px;
            }
            .text{
                font-size:11px;
            }
         }
        
     }
     /deep/ .van-grid-item__content{
         background-color: unset;
     }
   }
   .nav-grid{
         .nav-grid-item{
             height: 70px;
             .van-icon{
                 font-size: 22px;
             }
             /deep/ .van-icon-star-o{               
                 color:#eb5253;
             }
             /deep/ .van-icon-browsing-history-o{
                 color:#ff9d1d;
             }
             /deep/ .van-grid-item__text{
                 font-size:14px;
                 color:#333333;
             }
         }
     }
   .logout-cell{
       text-align: center;
       color:#d86262;
   }
   .mb-4{
       margin-bottom: 4px;
   }
   .not-login{
       width: 100%;
       height: 180px;
       background-color: #62b9ce; 
       display: flex;
       align-items: center;
       justify-content: center;
       

       .text{
           color: #fff;
           font-size:18px;
       }     
   }
}
</style>