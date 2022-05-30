<template>
  <div class="userlist">
    <div class="main">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="个人Id" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="sex" label="性别" width="180"></el-table-column>
        <el-table-column prop="avatarName" label="昵称" width="180"></el-table-column>
        <el-table-column prop="phone" label="手机" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="desc" label="介绍" width="180"></el-table-column>
      </el-table>
    <div class="padding-10">
         <div class="block">
            <span class="demonstration">共{{count}}条数</span>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[2, 5, 8, 10]"
            :page-size="100"
            layout="sizes, prev, pager, next"
            :total="pageCount">
            </el-pagination>
        </div>
    </div>
    </div>
  </div>
</template>
<script>
import { getUerList } from "@/api/api";
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        currentPage:2,
        count:0,
        pageNum:1,
        pageSize:10,
        pageCount:0,
      }
    },
    methods:{
        async arrlist(){
            var pagination = true;
            var pageNum=this.pageNum
             var pageSize=this.pageSize
            let res = await getUerList({pagination,pageNum,pageSize});
            this.tableData = res.data.data.data.rows;
            this.count = res.data.data.data.count;
            this.pageCount  = res.data.data.data.pageCount;
            console.log(this.tableData);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.arrlist();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageNum = val;
            this.arrlist();
        }
    },
    created(){
        this.arrlist();
    }
  }
</script>
<style scoped lang='scss'>
.userlist {
  background: #fff;
  height: calc(100vh - 60px);
  & .main {
    height: calc(100vh - 60px);
    & .padding-10{
        padding: 20px;
    }
  }
}
</style>