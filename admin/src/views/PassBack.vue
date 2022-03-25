<template>
    <div class="PassBack">
        <p>您的密码是：wly1124</p>
        <button @click="toLogin()">立即登录</button> 
    </div>
</template>

<script>
    export default{
        name:"PassBack",
        data(){
            return{

            }
        },
        methods:{
            toLogin(){
                this.$router.push('/login')
            }
        }
    }
</script>

