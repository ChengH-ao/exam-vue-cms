<template>
    <div class="CreateAtask">
        <div class="main">
            <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="任务名称">
                <el-input v-model="form.name" placeholder="请填写任务名称"></el-input>
            </el-form-item>
            <el-form-item label="任务时长">
                <el-input v-model="form.duration" placeholder="请填写任务名称"></el-input>
            </el-form-item>
             <el-form-item label="任务说明">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="执行人">
                 <el-select v-model="value1" multiple placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="紧急任务">
                <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
            </el-form>
            <div>
                <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <el-button type="primary" @click="continuetoCreate">继续创建</el-button>
                <el-button type="success" @click="ViewList">查看列表</el-button>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
import { taskCreate,getUerList,tasRelease } from "@/api/api";
export default {
     data() {
      return {
        form: {
            name: '',
            type: [],
            resource: '',
            desc: '',
            executor:'',
            duration:'',
            level: '',
            delivery: false,
            },
            options: [],
            value1: [],
            dialogVisible: false
      }
    },
    methods: {
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      async onSubmit() {
 
          var params = {
            name:this.form.name,
            desc:this.form.desc,
            duration: this.form.duration,
            level:this.form.delivery == false ? 0 : 1
        }
          
          let res = await taskCreate(params);
          if(res.data.status == 1){
           console.log(this.value1);
              this.$message({
                  type:'success',
                  message:'创建成功'
              })

              //   这个是 发布任务接口
               console.log();
               var taskId=res.data.data[0].id
               var userId=this.value1
                tasRelease({taskId,userId});
          }
          this.dialogVisible = true
        console.log('submit!');
         
        

      },
        continuetoCreate(){
            this.dialogVisible = false;
            this.form = {};
            this.value1='';
        },
        ViewList(){
            /* 查看列表跳转 */
        },

    },
    async created(){
        var  pagination = false
        let res = await getUerList({pagination});
        console.log(res);
        this.options = res.data.data.data.rows
        console.log(this.options);
       
    }
}
</script>
<style scoped lang=scss>
.CreateAtask{
    background: #fff;
    height: calc(100vh - 60px);
    & .main{
        width: 60%;
        & .el-form{
            padding: 50px;
        }
        & .el-dialog__body{
            display: flex;
            justify-content: space-around;
        }
    }
}
</style>