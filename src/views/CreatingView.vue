<template>
    <div class="CreatingaRole">
        <div class="main">
            <div class="head-top">
                <div>新增角色权限</div>
                <span class="el-icon-s-home"></span>
                <ul class="flexgrid">
                    <li>系统管理</li>
                    <li>角色与权限</li>
                    <li>新增角色权限</li>
                </ul>
            </div>
            <div class="content">
                <div class="son-content">
                    <div class="content-top">
                        <div><span class="">*</span> 角色管理</div>
                        <el-input placeholder="请输入内容"></el-input>
                        
                        <div><span>*</span> 所属部门</div>
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.label"
                            :value="item.groupName">
                            </el-option>
                        </el-select>
                        <el-button type="success">确认新增</el-button>
                    </div>
                    <div class="chooseAll alignitem">
                        <el-checkbox v-model="checked">选择所有权限</el-checkbox>
                    </div>
                    <div class="ClassList1">
                        <div>
                            <el-checkbox >签名管理</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                        </div>
                    </div>
                    <div class="ClassList2">
                        <div>
                             <el-checkbox >提笔管理</el-checkbox>
                        </div>
                        <div>
                             <el-checkbox >消息</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                        </div>
                    </div>
                    <div class="ClassList3">
                        <div>
                            <el-checkbox >系统管理</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                            <el-checkbox >消息</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox >参数配置</el-checkbox>
                        </div>
                        
                    </div>
                    <div class="btn">
                        <el-button type="success">成功按钮</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { roleGroupList,roleGroupCreate } from "@/api/api";
  export default {
    data() {
      return {
        options: [],
        value: '',
        checked:true
      }
    },
    methods:{
        async grouping(){
            let res =await roleGroupList({pagination:false});
            console.log(res);
            this.options = res.data.data.rows;
        },
        async CreatingRole(){
            let res = await roleGroupCreate({proupName:''});
            console.log(res);
        }
    },
    created(){
        this.grouping();
        this.CreatingRole();
    }
  }
</script>
<style scoped lang='scss'>
    .CreatingaRole{
        height: calc(100vh - 60px);
        background: #f2f5fa;
        & .main{
            height: calc(100vh - 60px);
            & .head-top{
                display: flex;
                gap: 15px;
                align-items: center;
                padding: 0 30px;
            & .flexgrid{
                display: flex;
                gap: 20px;
            }
            }
            & .content{
                padding: 0 30px;
                
                & .son-content{
                height: 950px;
                background: #ffffff;
                & .content-top{
                    height: 70px;
                    display: flex;
                    gap: 20px;
                    align-items: center;
                    margin-left: 20px;
                    border-bottom: 1px solid #ccc;
                }
                & .el-input{
                    width: 200px;
                }
                & .chooseAll{
                    height: 50px;
                    padding: 0 30px;
                }
                & .ClassList1{
                    height: 180px;
                    border: 1px solid #e7ecf0;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    padding: 0  30px;
                }
                 & .ClassList2{
                    height: 180px;
                    border: 1px solid #e7ecf0;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    padding: 0  30px;
                    margin-top: 20px;
                }
                & .ClassList3{
                    height: 300px;
                    border: 1px solid #e7ecf0;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    padding: 0  30px;
                    margin-top: 20px;
                }
                & .btn{
                    padding: 0 30px;
                    margin-top: 20px;
                }
                }
            }
        }
    }
</style>