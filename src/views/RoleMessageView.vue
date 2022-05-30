<template>
    <div class="management">
        <div class="main">
            <el-container>
            <el-header class="alignitem">
                <span class="iconSize el-icon-user mr-10"></span>
                <span class="fontSize">角色管理</span>
            </el-header>
            <el-container>
                <el-aside width="230px">
                    <div class="spaceard">
                        <div><span class="el-icon-user "></span> <span>新增角色</span></div>
                        <div><span class="el-icon-user "></span> <span>新建分组</span></div>
                    </div>
                <!--  -->
                    <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                     v-for="(item,index) in stuList" :key="index">
                    <el-submenu :index="index+1+''">
                        <template slot="title" >
                            <i class="el-icon-location"></i>
                        <span>{{item.groupName}}</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item :index="(index+1)+'-'+(i+1)" v-for="(target,i) in item.child" :key="target.id">{{target.roleName}}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <div class="felxSpace">
                        <div class="suoyouzhe">所有者</div>
                        <span>系统默认角色，默认具有企业所以功能权限和全部数据可见范围</span>
                    </div>
                    <!--  -->
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="角色成员" name="first"></el-tab-pane>
                        <el-tab-pane label="功能权限" name="second"></el-tab-pane>
                        <el-tab-pane label="数据范围" name="third"></el-tab-pane>
                    </el-tabs>
                    <!--  -->
                    <div class="Authorize spacebtn">
                        <div class="corlraaa">设置角色对应的功能操作、应用管理、后台管理权限</div>
                        <el-checkbox v-model="checked">全选</el-checkbox>
                    </div>
                    <!--  -->
                    <div class="sheetList">
                        <div class="list1">
                            <div class="flex borsolide"><el-checkbox class="flex">消息</el-checkbox></div>      
                            <div class="flexgrid">
                                <div class="gridrows1">
                                    <el-checkbox class="">消息</el-checkbox>
                                    <el-checkbox class="">消息</el-checkbox>
                                    <el-checkbox class="">消息</el-checkbox>
                                </div>   
                                <div class="gridrows2">
                                    <el-checkbox class="flex">消息</el-checkbox>
                                    <el-checkbox class="flex">消息</el-checkbox>
                                </div>   
                                <div class="gridrows2">
                                    <el-checkbox class="flex">消息</el-checkbox>
                                    <el-checkbox class="flex">消息</el-checkbox>
                                </div>    
                            </div>      
                        </div>  
                          <div class="list2">
                            <div class="flex borsolide"><el-checkbox class="flex">项目</el-checkbox></div>      
                            <div class="flexgrid">
                                <div class="gridrows1">
                                    <el-checkbox class="">消息</el-checkbox>
                                    <el-checkbox class="">消息</el-checkbox>
                                </div>   
                                <div class="gridrows2">
                                    <el-checkbox class="flex">消息</el-checkbox>
                                    <el-checkbox class="flex">消息</el-checkbox>
                                </div>   
                                <div class="gridrows2">
                                    <el-checkbox class="flex">消息</el-checkbox>
                                    <el-checkbox class="flex">消息</el-checkbox>
                                </div> 
                                </div>     
                            </div>  
                          <div class="list2">
                             <div class="flex borsolide"><el-checkbox class="flex">日历</el-checkbox></div>      
                             <div class="flexgrid">
                                     <div class="gridrows1">
                                    <el-checkbox class="">消息</el-checkbox>
                                    <el-checkbox class="">消息</el-checkbox>
                                </div>   
                                <div class="gridrows2">
                                    <el-checkbox class="flex">消息</el-checkbox>
                                </div>   
                                <div class="gridrows2">
                                    <el-checkbox class="flex">消息</el-checkbox>
                                </div> 
                                 
                                 </div>       
                            </div>  
                          <div class="list2 borsolide">
                             <div class="flex borsolide"><el-checkbox class="flex">网盘</el-checkbox></div>      
                            <div class="flexgrid">
                                     <div class="gridrows1">
                                    <el-checkbox class="">消息</el-checkbox>
                                    <el-checkbox class="">消息</el-checkbox>
                                </div>   
                                <div class="gridrows2">
                                    <el-checkbox class="flex">消息</el-checkbox>
                                    <el-checkbox class="flex">消息</el-checkbox>
                                </div>   
                                <div class="gridrows2">
                             
                                </div> 

                                </div>       
                            </div>  
                    </div>
                </el-main>
            </el-container>
            </el-container>
        </div>
    </div>
</template>
<script>
import { roleGroupList,roleList } from "@/api/api";
export default {
      data() {
      return {
        activeName: 'second',
        checked: true,
        // pagination:false,
        // pageSize: 10,
        // pageNum:1,
        groupName:[],
        roleName:[],
        stuList:[],
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      async menuList(){
        var params={
            pagination:false,
        }
        let res =await roleGroupList(params);
        this.groupName = res.data.data.rows;
        this.groupName.forEach(el => {
            el.child = [];
        });
      },
      async sublistlist(){
          var params = {
              pagination:false,
              pageSize: 10,
              pageNum:1,
          }
          let res = await roleList(params);
          console.log('我是所有组');
          console.log(this.groupName);
            this.roleName = res.data.data.rows;
            for(let i = 0; i < this.groupName.length; i ++){
                this.roleName.forEach(item => {
                    if(item.groupId == this.groupName[i].id){
                        this.groupName[i].child.push(item);
                    }
                });
            }
            this.stuList = this.groupName;
      }

    },
    created(){
        this.menuList();
        this.sublistlist();
        
    }
}
</script>
<style scoped lang='scss'>
    .management{
        background: #fff;
        height: calc(100vh - 60px);
        & .main{
            width: 95%;
            height: calc(100vh - 60px);
            margin: 0 auto;
            & .alignitem{
                border-bottom: 1px solid #ccc;
                & .iconSize{
                    font-size: 25px;
                }
                & .fontSize{
                    font-size: 25px;
                    font-weight: 500;
                    color: #cfcfcf;
                }
            }
            .el-aside{
                height: calc(100vh - 120px);
                background: #fff;
                & .spaceard{
                    color: #4c8edd;
                    height: 60px;
                }
                & .el-menu{
                    border: none;
                }
            }
            .el-main{
                height: calc(100vh - 120px);
                padding: 0;
                padding: 0 20px;
                & .felxSpace{
                    height: 40px;
                    display: flex;
                    align-items: center;
                    gap: 0 10px;
                    & .suoyouzhe{
                        font-size: 18px;
                        color: #727f90;
                    }
                    span{
                        color: #aaaaaa;
                    }
                }
                & .Authorize{
                    padding: 5px 0;
                    & .corlraaa{
                        color: #aaaaaa;
                        font-size: 14px;
                    }
                }
                & .sheetList{
                    background: #fafbfc;
                    height: calc(100vh - 250px);
                    & .list1{
                        display: grid;
                        grid-template-columns: 1fr 5fr;
                        height: 28%;
                        & .borsolide{
                            border-right: 1px solid #e7e5e5;
                        }
                        & .flexgrid{
                            display: grid;
                            grid-template-columns: repeat(3,1fr);
                             border-bottom: 1px solid #e7e5e5;
                            & .gridrows1{
                                display: grid;
                                grid-template-rows: 1fr 1fr 1fr;
                                align-items: center;
                                justify-content: center;
                            }
                            & .gridrows2{
                                display: grid;
                                grid-template-rows: 1fr 1fr;
                                align-items: center;
                                justify-items: baseline;
                            }
                        }
                    }
                     & .list2{
                        display: grid;
                        grid-template-columns: 1fr 5fr;
                        height: 24%;
                        & .borsolide{
                            border-right: 1px solid #e7e5e5;
                        }
                        & .flexgrid{
                            display: grid;
                            grid-template-columns: repeat(3,1fr);
                            border-bottom: 1px solid #e7e5e5;
                            & .gridrows1{
                                display: grid;
                                grid-template-rows: repeat(2,fr);
                                align-items: center;
                                justify-content: center;
                            }
                            & .gridrows2{
                                display: grid;
                                grid-template-rows: 1fr 1fr;
                                align-items: center;
                                justify-items: baseline;
                            }
                        }
                    }
                }
            }
        }
    }
</style>