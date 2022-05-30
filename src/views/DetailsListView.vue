<template>
  <div class="Details">
    <div class="main">
      <div class="left">
        <div class="left-top">
          <div class="font-size">任务测试</div>
          <div>
            <el-button size="medium" class="el-icon-edit">编辑描述</el-button>
            <el-button size="medium" class="el-icon-upload2">上传附件</el-button>
            <el-button size="medium" class="el-icon-sort">关联代码仓库</el-button>
            <el-button size="medium" class="el-icon-s-operation">阻塞关系</el-button>
            <el-button size="medium">引用资源</el-button>
          </div>
        </div>
        <h3>任务名称: {{data.taskName}}</h3>
        <div class="left-content">
          <p>创建任务人的名称: {{data.userName}}</p>
          <div>创建任务事件: {{ new Date(data.createdAt).toLocaleString()}}</div>
          <br />
          <div class="flex-gap" >
              <div>全部领取过任务的人:</div>
            <div v-for="(item,index) in dataName" :key="index">
              <div>{{item.userName}}</div>
            </div>
          </div><br>
           <div class="flex-gap">
            <div>全部</div>
            <div>只看日志</div>
            <div>只看评论</div>
           </div>
          <div class="left-Group">
            <el-timeline :reverse="reverse">
                <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                  >
                {{activity.content}}
                </el-timeline-item>
            </el-timeline>
          </div>

          <div>
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea1"></el-input>
          </div>
          <div class="pad">
            <el-button type="info">信息按钮</el-button>
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>
<script>
import { taskDetail } from "@/api/api";
export default {
  data() {
    return {
      reverse: false,
      activities: [],
      textarea1: "",
      taskId: "",
      data: [],
      dataName: [],
      receiveConfession:[]
    };
  },

  methods: {
      userName() {
        // console.log(this.data);
          let res = this.data.receivedData;
            res.forEach(e => {
                this.receiveConfession.push(e.userName)
            });
           
      },
    async InquiryDetails() {
      const taskId = sessionStorage.getItem("taskId");
      let res = await taskDetail({ taskId });
      console.log(res);
      this.data = res.data.data;
      this.dataName = this.data.receivedData;
      console.log(this.data);
      this.userName();
      console.log(this.dataName);
      console.log(res);
      this.activities.push(
          {
                content: this.data.userName +':'+  new Date(this.data.createdAt).toLocaleString(),
              
          },
            {
                content: this.data.userName + '任务发布给了'+  this. receiveConfession,
            },
              {
                content: '创建成功',
              },
      )
    }
  },
  created() {
    this.InquiryDetails();
   
  }
};
</script>
<style scoped lang='scss'>
.Details {
  height: calc(100vh - 60px);
  & .main {
    height: calc(100vh - 100px);
    padding: 20px;
    display: grid;
    grid-template-columns: 3fr 1fr;
    & .left {
      & .left-top {
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        border-bottom: 1px solid #ccc;
      }
      & .left-content {
        & .flex-gap {
          display: flex;
          gap: 10px;
        }
      }
      & .left-Group {
        & .block {
          display: flex;
          gap: 10px;
        }
        & .el-timeline {
          margin: 10px;
          font-size: 14px;
          list-style: none;
          position: relative;
          padding: 20px 0px;
        }
      }
      & .pad {
        padding: 20px 0;
      }
    }
  }
}
</style>