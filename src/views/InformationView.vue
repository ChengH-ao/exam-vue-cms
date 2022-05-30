<template>
  <div class="information">
    <div class="global">
      <div class="head-top">
          <div class="alignitem"> 任务列表</div>
          <div class="spacebtn">
              <div class="flex"> 
                <div style="width: 100px;">任务名称: </div>
                 <el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
               <div class="block">
                <div class="demonstration" style="width: 100px;">创建时间</div>
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
              <div class="flex">
                <div style="width: 100px;">任务执行人: </div>
                 <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div><el-button type="primary">搜索</el-button></div>
              <div><el-button>清除</el-button></div>
          </div>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="创建日期" width="200" align="center" >
          <template slot-scope="scope">
          
            <span style="margin-left: 0px" >{{ new Date(scope.row.createdAt).toLocaleString()}}</span>
          </template>
        </el-table-column>
         <el-table-column label="任务ID" width="100" align="center">
          <template slot-scope="scope">
          
            <span style="margin-left: 10px">{{ scope.row. id }}</span>
          </template>
        </el-table-column>
         <el-table-column label="创建任务人的ID" width="100" align="center">
          <template slot-scope="scope">
           
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
         <el-table-column label="任务等级" width="100" align="center">
          <template slot-scope="scope">
            <span style="color:red" v-if="scope.row.level==1">紧急</span>
            <span style="color:purple" v-else>不紧急</span>
          </template>
        </el-table-column>
        <el-table-column label="任务名称" width="100" align="center">
          <template slot-scope="scope">
           
            <span style="margin-left: 10px">{{ scope.row.taskName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所需时间" width="100" align="center">
          <template slot-scope="scope">
         
            <span style="margin-left: 10px">{{ scope.row.duration }}小时</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="150" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.desc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否领取任务"  width="150" align="center">
          <template slot-scope="scope">
            <span style="color:blue" v-if='scope.row.isReceived ==1'>已领取</span>
            <span style="color:red" v-else >未领取</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleClose(scope.row)">发布任务</el-button>
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.isReceived == 0">领取任务</el-button>
            <el-button size="mini" @click="handleDetails(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <span>共{{count}}条</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[2, 5, 10]"
          :page-size="100"
          layout="sizes, prev, pager, next"
          :total="50">
        </el-pagination>
    </div>
    <div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div class="dispgrid">
        <label>发布人员:</label>
        <el-select v-model="value1" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendlsit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    </div>
  </div>
</template>

<script>
import { taskList,getUerList,taskRelease,getUerinfoApi } from "@/api/api";
  export default {
    data() {
      return {
        dialogVisible: false,
        currentPage: 1,
        count:0,
        input:'',
        value:'',
        form:{
            pagination : false,
            pageSize:5,
            pageNum:1,
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }],
        value1: [],
        rowId:0,
        userid:[],
        taskId:''
      }
    },
    methods: {
      // 发布任务
      handleClose(row) {
        console.log(row);
        this.rowId = row.id;
        this.dialogVisible = true;
      },
      // handleEdit(index, row) {
      //   console.log(index,row);
      // },
      // 领取任务
       async handleDelete(index,row) {
        console.log(row);
        let params = {
          userId:  [this.userid],
          taskId:  row.id
        }
        let res = await taskRelease(params);
        console.log(res);
        this.arrlist();
        
      },
      handleDetails(row){
        console.log(row.id);
        sessionStorage.setItem('taskId',row.id);
        this.$router.push({
            name:'Details'
        })
      },
      async Uerinfo(){
        let res = await getUerinfoApi();
        this.userid = res.data.data;
      },
      /* 分页 */
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.form.pageSize = val;
        this.arrlist();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.pageNum = val;
        this.arrlist();
      },
      // 获取数据 渲染列表
    async  arrlist(){  
      let res = await taskList(this.form);
      // console.log(res);
        this.tableData = res.data.data.rows;
        this.count = res.data.data.count;
        },
        async userlist(){
          var  pagination = false;
           let res = await getUerList({pagination});
           this.options = res.data.data.data.rows;
           console.log(this.options);
          //  this.taskid  = res.data.data.data.rows;
          // console.log(taskid);
         },
        async sendlsit(){
          let params = {
            userId: this.value1,
            taskId: this.rowId
          }
          let res = await taskRelease(params);
          console.log(res);
          this.dialogVisible = false;
        }
    },
     created(){
      this.arrlist();
      this.userlist();
      this.Uerinfo();
    }
  }
</script>

<style scoped lang='scss'>
.information {
  height: calc(100vh - 60px);

  & .global {
    height: calc(100vh - 60px);
    background: hsl(0, 100%, 100%);
    & .block{
        padding: 20px 0px;
        display: flex;
        align-items: center;
    }
        
  }
  & .dispgrid{
    display: grid;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    justify-content: center;
  }
  & .el-dialog__body {
    display: flex;
    justify-content: center;
  }
  & .head-top{
    height: 150px;
    background: #fff;
    padding: 20px 60px;
    display: grid;
    grid-template-rows: repeat(2,fr);
    &  .spacebtn{
      gap: 10px;
    }
  }
}
</style>