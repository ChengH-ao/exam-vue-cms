<template>
    <div class="register flex">
        <div class="popup shadow">
            <el-container class="content">
                <el-header class="backColor">
                    <div>LOGO 用户注册</div>
                </el-header>
                <el-main class="main shadow direction ">
                    
                   <el-steps class="stepos" align-center :active="active" finish-status="success">
                        <el-step  title="步骤 1"></el-step>
                        <el-step  title="注册成功"></el-step>
                    </el-steps>
                    <div v-if="textel" class="dispNone">
                    <div class="flexitem"><span class="mt-10 redcol">*</span>
                        <el-input class="mt-10" v-model="username" prefix-icon="el-icon-platform-eleme"  placeholder="请输入用户名"></el-input>
                    </div>
                    <div class="flexitem"><span class="mt-10 redcol">*</span>
                    <el-input class="mt-10" v-model="password" prefix-icon="el-icon-key"  show-password placeholder="请输入密码"></el-input>
                    </div>
                    <div class="flexitem"><span class="mt-10 redcol">*</span>
                    <el-input class="mt-10" v-model="passwords" prefix-icon="el-icon-key"  show-password placeholder="请再次输入密码"></el-input>
                    </div>
                     <div class="flexitem"><span class="mt-10 redcol">*</span>
                    <el-input class="mt-10" v-model="email" prefix-icon="el-icon-message"  placeholder="请输入邮箱"></el-input>
                    </div>
                    <div class="flexitem"><span class="mt-10 redcol">*</span>
                    <el-input class="mt-10" v-model="phone" prefix-icon="el-icon-message"  placeholder="请输入手机"></el-input>
                    </div>
                    <div class="flexitem"><span class="mt-10 redcol">*</span>
                    <div class="flex mt-10">
                    <el-input  v-model="captcha" maxlength="4" prefix-icon="el-icon-postcard" class="mr-5"  placeholder="请输入验证码"></el-input>
                    <img :src="getcaptcha"  @click="getrefresh" alt="">
                    
                    </div>
                    </div>
                    <el-button  class="mt-20 btn" type="primary" @click="submit">注册</el-button>
                    </div>
                    <div v-if="textNode" class="regsucc">
                        <i class="el-icon-circle-check iconmark"></i>
                        <div>恭喜您注册成功！,倒计时：{{count}}跳转到首页 </div>
                        <el-button class="confirm" type="primary" @click="getwait">确认</el-button>
                    </div>
                </el-main>
            </el-container>
        </div>
    </div>
</template>
<script>
import { encrypt } from "@/assets/utils/index.js";
import { getCaptchaApi,loginApi,getRegister } from "@/api/api.js";
export default {
    data(){
        return{
            username:'',
            password:'999999',
            passwords:'999999',
            email:'2022@com.cn',
            phone:'15935076640',
            captcha:'',
            getcaptcha:'/api/captcha',
            textel:true,    
            textNode:false, 
            count:3,    
            time:null,
            active:1
        };
    },
    methods:{
        getwait(){
            this.$router.push('/')
        },
        // 刷新验证码接口
        getrefresh(){
            this.getcaptcha = getCaptchaApi();
        },
        getvaldate(){
            // 校验input框不能为空
            var res={result:true};
            if(this.username == ''){
            res.result =false;
            res.message ={message: '用户名不能为空',type: 'warning'}
            }else if(this.password == ''){
            res.result =false;
            res.message ={message: '密码不能为空',type: 'warning'}
            }else if(this.passwords == ''){
            res.result =false;
            res.message ={message: '密码不能为空',type: 'warning'}
            }else if(this.email == ''){
            res.result =false;
            res.message ={message: '信箱不能为空',type: 'warning'}
            }else if(this.phone == ''){
            res.result =false;
            res.message ={message: '手机号不能为空',type: 'warning'}
            }else if(this.captcha == ''){
            res.result =false;
            res.message ={message: '验证码不能为空',type: 'warning'}
            }
             if(!res.result) this.$message(res.message);
            return res.result
        },
        setToken(){
            loginApi({
                username:this.username,
                password:encrypt(this.password),
                captcha:this.captcha,
            }).then(res=>{
                console.log(res.data.data);
                this.token=res.data.data;
                sessionStorage.setItem('token',res.data.data)
            })
        },
        async submit(){
            var isvaltate = this.getvaldate();
            if(!isvaltate) return
            const {username,password,email,phone,captcha} = this;
            var res = await getRegister({
                    username,
                    password,
                    email,
                    phone,
                    captcha,
                })
                if(res.data.status == 1){
                    console.log(res.data.data);
                    this.textel = false;
                    this.textNode = true;
                    this.active=2;
                    this.setToken();
                    this.time=setInterval(() => {
                    this.count--;
                    if(this.count == 0){
                        this.$router.push({
                            name:'home'
                        })
                    }
                   
               }, 1000);
                }else{
                    // 返回错误信息
                    this.$message({
                        type:'warning',
                        message:res.data.msg
                    })
                }
        }
    },  
    // 钩子函数  当页面关闭时做的操作
    destroyed(){
           clearInterval(this.time);
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
<style scoped lang='scss'>
   .register{
       height: 100vh;
       background-color: #fefefe;
       padding: 0 60px;
    & .popup{
        background-color: #f4f4f4;
        height: 600px;
        width: 800px;
        border-radius: 4px;
        box-sizing: border-box;
        padding:0 60px;
        border: 10px solid;
        padding-bottom: 60px;
        min-width: 700px;
        & .stepos{
            width: 100%;
            font-size: 16px;
        }
        & .content{
            height: 100%;
        }
        & .main{
            height: 100%;
            background-color: #f9f9fb;
            box-sizing: border-box;
            padding: 10px 25%;
        }
        & .btn{
            font-size: 16px;
            font-weight: 600;
            width: 100%;
        }
        & .flexitem{
            display: flex;
            align-items: center;
            justify-content: center;
            & .redcol{
                color: #ff4400;
                font-size: 18px;
            }
        }
    }
    & .backColor{
        background-color: #f4f4f4;
        color: #000;
    }
   .regsucc{
       height: 75%;
       display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
       & .iconmark{
        font-size: 50px;
    }
        & .confirm{
            width: 85%;
        }
   }
   }
</style>