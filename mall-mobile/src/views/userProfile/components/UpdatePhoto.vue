<template>
    <div class="update-photo">
      <img :src="image" ref="image" class="img">
      <van-nav-bar 
         class="toolbar"
         left-text="取消"
         right-text="确认"
         @click-left="$emit('close')"
         @click-right="onConfirm"
        />
    </div>
</template>
<script>
  import { editUser,updateUserPhoto } from '@/api/user'
  import { mapState } from 'vuex'
  import axios from 'axios'
  import 'cropperjs/dist/cropper.css';//样式
  import Cropper from 'cropperjs';//核心库

   export default{
       name:'UpdatePhoto',
       props:{
        //  image:{
        //      type:String,
        //      required:true
        //  }
         file:{
            //  type:Object,
             required:true
         }
       },
       mounted(){
           //获取需要裁切的图片，操作dom要在mounted中进行
            //const image = document.getElementById('image');
            //在vue中操作dom
            const image = this.$refs.image 
            this.cropper = new Cropper(image, {
                viewMode:1,
                dragMode:'move',
                aspectRatio:1,
                autoCropArea:1,
                cropBoxMovable:false,
                cropBoxResizable:false,
                background:false, //背景
                movable:true  //图片可移动
                //配置
                // aspectRatio: 16 / 9, 
                // crop(event) {
                //     console.log(event.detail.x);
                //     console.log(event.detail.y);
                //     console.log(event.detail.width);
                //     console.log(event.detail.height);
                //     console.log(event.detail.rotate);
                //     console.log(event.detail.scaleX);
                //     console.log(event.detail.scaleY);
                // },
           });
           //console.log(cropper)
       },
       data(){
           return{
               image:window.URL.createObjectURL(this.file),
               cropper:null
           }
       },
       computed:{
             ...mapState(['user'])
       },
       methods:{
         getCroppedCanvas(){
            return new Promise(resolve=>{
                this.cropper.getCroppedCanvas().toBlob((blob) => {
                    //需要cropper，将它放到data实例里面
                    resolve(blob)
                })
            })
         },
           //如果要求Content-Type是multipart/form-data, 则一定要提交FormData数据对象
           //专门用于文件上传，不能提交{}对象       
         async onConfirm(){          
             //fd.append('photo','文件对象')
             //fd.append("avatar",document.getElementById('upload_file').files[0]);
            // console.log('fd',fd.get("file"))
            //  const res = await updateUserPhoto({
            //        //username:this.user.username,
            //        file:fd
            //  })
            //console.log('1',res)
            //请求提交更新用户昵称       
            this.$toast.loading({
                   message:'保存中',
                   forbidClick:true //禁止背景点击
           })
           const file = await this.getCroppedCanvas()
           const fd =  new FormData(); //自己new出来
           //fd.append('file',this.file)
           fd.append('file',file) //裁切器的file
           fd.append('username',this.user.username)
           let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
                }
            };
           axios.post('http://localhost:5000/web/api/userPhoto', fd, config).then(res=> {
            //做处理
                 console.log('1',res)
                 const avatar = res.data.avatar
                 this.$emit('input',avatar) 
                 this.$toast.success('保存成功')
                 //更新成功--修改父组件name---关闭弹出层
                 this.$emit('close')
            }).catch(error=>{
                 console.log('2',error)
            });

             //现在是blob数据，不是文件对象
             //所以做一些修改
          }
     }
   }
</script>
<style scoped lang="less">
.img {
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
.toolbar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>