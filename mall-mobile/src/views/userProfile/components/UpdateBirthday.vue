<template>
    <div class="update-birthday">
       <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="$emit('close')"
            @confirm="onConfirm"
            />
    </div>
</template>
<script>
  import { editUser } from '@/api/user'
  import { mapState } from 'vuex'
   export default{
       name:'UpdateBirthday',
       props:{
          value:{
              type:String,
              default:''
          }
       },
       data(){
           return{
                minDate: new Date(2020, 0, 1),
                maxDate: new Date(),
                currentDate: new Date(this.value),
           }
       },
       computed:{
             ...mapState(['user'])
       },
       methods:{
          async onConfirm(){
               console.log("----")
              //请求提交更新用户昵称       
               this.$toast.loading({
                   message:'保存中',
                   forbidClick:true //禁止背景点击
               })
               //this.currentDate是一个日期对象
               //需要2016-01-01的日期
               const dateTime = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth()+1}-${this.currentDate.getDate()}`
               console.log('dateTime',dateTime)
               const res = await editUser({
                   username:this.user.username,
                   birthday:dateTime
               })
               //console.log('res111',res)
               //传递最新的昵称给父组件
               //this.$emit('update-nickname',this.value) 
               //发布input事件，更新 父组件的事件
               this.$emit('input',dateTime) 
               this.$toast.success('保存成功')
               //更新成功--修改父组件name---关闭弹出层
               this.$emit('close')
          }
       }
   }
</script>
<style scoped lang="less">

</style>