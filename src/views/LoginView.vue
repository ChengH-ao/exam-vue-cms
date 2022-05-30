<template>
    <div class="login">
        <div class="popup flex">
            <div class="logo aligen-center">
                <div class="font-s shadow flex">m</div>
                <div class="font mt-10">mobldeo</div>
                <div class="font-z">DIGITIZING INDUSTRIAL SERVICES</div>
            </div>
            <div class="form">
                <div class="borbox">
                    <div>
                    <div class="pad">USERNAME</div>
                    <el-input  v-model="username" placeholder="请输入用户名"></el-input>
                    </div>
                    <div class="mt-10">
                    <div class="pad">PASSWORD</div>
                    <el-input  v-model="password" show-password placeholder="请输入密码"></el-input>
                    </div>
                     <div class="mt-10 spacebtn">
                    <el-input  v-model="captcha" maxlength="4" placeholder="请输入验证码"></el-input>
                    <img  @click="getCaptchaSrc" :src="captchasrc" alt="">
                    </div>
                    <div class="spacebtn mt-5">
                        <div @click="Forgotpassword">忘记密码</div>
                        <div @click="Userregistration">用户注册</div>
                    </div>
                    <el-button class="mt-20" type="primary" @click="submit">主要按钮</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//  @代表的是
import { loginApi,getCaptchaApi } from "@/api/api.js";
import { encrypt } from "@/assets/utils/index.js";
// 两个方法 post get;
export default {
    name:'Login',
    data(){
        return{
            username:'难搞欧了xx',
            password:'999999',
            captcha:'',
            captchasrc:'/api/captcha'
        }
    },
    methods:{
        // 校验用户名 密码
          getCaptchaSrc(){
            this.captchasrc = getCaptchaApi();
        },
        getValidateResult(){
            var res = {result:true};
            if(this.username == ''){
                //   this.$message();
                  res.result = false;
                  this.getCaptchaSrc();
                  res.message ={type:'error',message:'用户名不能为空'}
            }else if(this.password == ''){
                //   this.$message()
                  res.result = false;
                  this.getCaptchaSrc();
                  res.message ={type:'error',message:'密码不能为空'}
            }else if(this.captcha == ''){
                //   this.$message();
                  res.result = false;
                  res.message = {type:'error',message:'验证码不能为空'}
                  this.getCaptchaSrc()
            }
            if(!res.result) this.$message(res.message);
            return res.result;
        },
        Userregistration(){
            this.$router.push({
                name:'register'
            })
        },
        Forgotpassword(){
            this.$router.push({
                name:'register'
            })
        },
        async submit(){
            // 校验 
            var isValidate = this.getValidateResult();
            if(!isValidate) return;
            // 校验通过创建值
            const {username,password,captcha} = this;
               var res = await loginApi({
                    username,
                    password:encrypt(password),
                    captcha
                })
                // 登录成功
                if(res.data.status == 1){
                    sessionStorage.setItem('token',res.data.data)
                    this.$router.push({
                        name:'home'
                    })
                    this.$message({
                    message: '登录成功',
                    type: 'success'
                    });
                    }else{
                        // 登录失败
                    this.$message({
                    message: res.data.status,
                    type: 'error'
                    });
                    }
        },
         
       
    },
    created(){
        window.addEventListener(
      "keydown",
      (event) => {
        if (event.code == "Enter") {
            this.submit();
          //使用KeyboardEvent.keyCode处理事件并将handled设置为true。
          event.preventDefault();
        }
      },
      true
    );
    }
}
</script>
<style scoped lang="scss">
    .login{
        height: 100vh;
        background: #f5f8fd;
      & .popup{
          width: 800px;
          height: 600px;
          border: 10px solid hsl(218, 69%, 59%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2.5fr 3fr;
          padding: 30px;
          box-sizing: border-box;
          color: #ffffff;
          & .logo{
              height: 100%;
              background: #4d89f0;
              transform: skewX(-10deg) translateX(45px);
              & .font-s{
                  font-size: 60px;
                  padding: 30px;
                  width: 60px;
                  height: 60px;
                  transform: skewX(10deg)
              }
              & .font{
                  font-size: 45px;
              }
              & .font-z{
                  font-size: 12px;
              }
          }
          & .form{
              & .borbox{
                  height: 350px;
                  background: #ffffff;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                    padding-left: 80px;
                    padding-right: 30px;
                    color: #4d89f0;
              }
          }
      }
    }

</style>