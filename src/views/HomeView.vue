<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <el-container>
      <el-header>
        <div class="header spacebtn">
          <div class="alignitem">
            <img class="icon" src="../assets/menu.png" alt />
            <span class="ml-10">现代学徒云平台</span>
          </div>
          <div class="spacebtn">
            <span class="sizeWord">临汾市 2022-4-28 16:52 星期四 21~22℃ 晴 风力 1!2级 风力 无持续微风</span>
            <div class="flex">
              <img class="icon ml-20" src="../assets/avatar.png" alt />
              <div class="userphone mr-10 ml-5">hi,某某同学</div>
            </div>
            <div class="flex">
              <img class="icon" src="../assets/shutdown.png" alt />
              <div class="ml-5" @click="getQuit">退出</div>
            </div>
          </div>
        </div>
      </el-header>
      <!--  -->
      <el-container>
        <el-aside width="220px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#0b1b34"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>题库管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="navigator('Question')">题库列表</el-menu-item>
                <el-menu-item index="1-2" @click="navigator('htmlQuestion')">html题库</el-menu-item>
                <el-menu-item index="1-3" @click="navigator('jsQuestion')">js题库</el-menu-item>
                <el-menu-item index="1-4" @click="navigator('cssQuestion')">css题库</el-menu-item>
                <el-menu-item index="1-5" @click="navigator('exercise')">练习布局</el-menu-item>
                <el-menu-item index="1-6" @click="navigator('calendar')">日历表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2" @click="navigator('match')">
              <i class="el-icon-menu"></i>
              <span slot="title">匹配比赛</span>
            </el-menu-item>
            <el-menu-item index="3" @click="navigator('signup')">
              <i class="el-icon-document"></i>
              <span slot="title">报名系统</span>
            </el-menu-item>
            <el-menu-item index="4" @click="navigator('about')">
              <i class="el-icon-setting"></i>
              <span slot="title">刷题系统</span>
            </el-menu-item>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>设置管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="navigator('material')">个人资料</el-menu-item>
                <el-menu-item index="1-2" @click="navigator('CreateAtask')">创建任务</el-menu-item>
                <el-menu-item index="1-3" @click="navigator('information')">任务列表</el-menu-item>
                <el-menu-item index="1-4" @click="navigator('userlist')">用户列表</el-menu-item>
                <el-menu-item index="1-5" @click="navigator('Details')">查看详情</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- <el-menu-item index="6" @click="navigator('management')">
              <i class="el-icon-setting"></i>
              <span slot="title">角色管理</span>
            </el-menu-item> -->

             <!-- 下拉框 -->
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>角色管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="navigator('management')">题库列表</el-menu-item>
                <el-menu-item index="1-2" @click="navigator('CreatingaRole')">新增角色</el-menu-item>
                <el-menu-item index="1-3" @click="navigator('FatherAndSon')">父子插值</el-menu-item>
              </el-menu-item-group>
            </el-submenu>


          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getUerinfoApi,logoutApi } from "@/api/api.js";
export default {
  name: "HomeView",
  data() {
    return {
      activeName: "second"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    navigator(name) {
      if (this.$route.name == name) return;
      this.$router.push({
        name
      });
    },
    async getQuit() {
      // 1.点击按钮，调用服务端接口
      let res = await logoutApi()
        if (res.data.status == 1) {
          // 2.清空token
            sessionStorage.setItem('token','');
            this.$router.push({
              name:'login'
            })
          }else{
            // 3 提示用户错误信息
            this.$message({
              type:'warning',
              message:res.data.msg
             })
          }
      

      
    },
    async confimToken() {
      // 登录主页面渲染头像或手机号
       var res = await getUerinfoApi({})
        if (res.data.status == 1) {
            res.data.data.forEach(el => {
              document.querySelector(".userphone").innerHTML = el.phone;
            });
          }else if(res.data.status == 401){
            this.$router.push({
              name:'login'
            })
            this.$message({
            message: '未登陆或注册',
            type: 'error'
            });
          }
     }
  },
  created() {
    //  提前渲染
    this.confimToken();
  },
  components: {
    // HelloWorld
  }
};
</script>

<style scoped lang='scss'>
.el-header,
.el-footer {
  background-color: #409eff;
  color: #fff;
  min-width: 900px;
  line-height: 60px;
  & .sizeWord {
    font-size: 14px;
  }
}

.el-aside {
  background-color: #0b1b34;
  color: #fff;
  /* text-align: center; */
  /* line-height: 200px; */
  height: calc(100vh - 60px);
}

.el-main {
  background-color: #f4f4f4;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
  height: calc(100vh - 60px);
  padding: 0;
}

body > .el-container {
  margin-bottom: 40px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>