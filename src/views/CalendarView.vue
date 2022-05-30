<template>
  <div class="calendar">
    <div class="main">
      <div class="left">
        <div class="cadar">
          <div class="calendarSize">
            <el-calendar v-model="value"></el-calendar>
          </div>
        </div>
        <div class="task">
          <div class="taskflex">
            <b>
              Today Task
              <span>(3)</span>
            </b>
            <span class="taskspan el-icon-plus"></span>
          </div>
          <div class="taskheight">
            <div class="tasktemp">
              <el-checkbox></el-checkbox>
              <p class="fontSize">Working on Asla Project</p>
              <p class="fontColor">08.00-10.00AM</p>
            </div>
           
          </div>
        </div>
      </div>
      <div class="right">
        <div class="aligen-content">
          <div class="space-btn mt-5">
            <span>Notification</span>
            <span>view all</span>
          </div>
          <div class="space-ail">
            <div class="borcolor flex">
              <span class="clcs el-icon-edit-outline"></span>
            </div>
            <div class="dispgrid">
              <div class="afont">Emily just sent you task to assign</div>
              <div class="bfont">18 Aug 2020-10.00 AM</div>
              <button class="widthSize">Assign Now</button>
            </div>
            <div class="dispbottom">
              <img src="../assets/未标题-1.jpg" alt />
            </div>
          </div>
          <div class="space-btn">
            <div >
              <span class="mr-5">Team Chat</span>
              <span class="mr-5 spansize el-icon-platform-eleme"></span>
              <span class="mr-5 spansize el-icon-platform-eleme"></span>
              <span class="mr-5 spansize el-icon-platform-eleme"></span>
              <span class="numbersize">{{num}}</span>
            </div>
            <!-- <div class="middle-content"></div> -->
            <div>
                <button class="leftbtn">invite People</button>
            </div>
          </div>
        </div>
        <div class="information">
          <div class="contariner" ref='record'>
             <template v-for="(item,index) in textArr" >
            <div class="item-left mr-5" v-if="item.avatarName !== obj.avatarName " :key="index">
              <div class="flexnewline">
                 <span v-if="item.avatarName" class="postionrre mr-5 icon-size">
                  {{ item.avatarName }}
                  <span >:</span>
                </span>
                <div>{{item.name}}</div>
              </div>
              <span v-if="item.msg" class="resinfo mr-5">{{ item.msg }}</span>
            </div>
            <div class="item-right" v-if="item.avatarName == obj.avatarName " :key="index"> 
              <div class="gridfen">
                <div class="flexnewline">
                <span class="postionrre" v-if="item.avatarName">
                    <span class="icon-size">{{iconavatar(item.avatarName)}}</span>:
                </span>
                  <div class="touxiang mr-5">{{nameavatar(item.name)}}</div>
                </div>
                <span class="resinfo mr-5">
                <span v-if="item.msg">{{ item.msg }}</span>
                </span>
              </div>
            </div>
            </template>
          </div>

          <div class="send">
            <el-input placeholder="请输入内容" v-model="obj.msg">
              <template slot="append">
                <span @click="sendSocketMsg">
                  <i class="el-icon-s-promotion">发送</i>
                </span>
              </template>
            </el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUerinfoApi } from "@/api/api";
  export default {
  data() {
    return {
      num:'',
      value: new Date(),
      checked: false,
      textArr: [],
      onpeople:0,
      data:{},
      obj: {
        userId:'',
        type:1,
        avatarName:'',
        name:'',
        msg:'',
      },
      enter:{
        userId:'',
        avatarName:''
      },
      leave:{
        userId:'',
        avatarName:''
      }
    };
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.record.scrollTop = this.$refs.record.scrollHeight;
    });
  },
  methods: {
    sendSocketMsg() {
      // //向服务端发送消息 点击发送信息
     
        this.$socket.emit("sendMsg",this.obj);
      this.obj.msg = null;
      
      //接收服务端相对应的webdata数据
    },
    iconavatar(){
      let name =this.obj.avatarName.slice(0,2);
      return name;
    },
    nameavatar(){
      let name = this.obj.name.slice(0,1);
      return name; 
    },
  },
  async created(){
    let res = await getUerinfoApi();
    if(res.data.status == 1){
      this.data = res.data.data[0];
      console.log(this.data);
      this.obj.avatarName = res.data.data[0].avatarName;
      this.obj.name = res.data.data[0].name;
      this.obj.userId = res.data.data[0].id;
      this.enter.userId = res.data.data[0].id;
      this.leave.userId = res.data.data[0].id;
      this.$message({
        type:'success',
        message: '欢迎进入聊天室'
      })
    }
  },
  sockets: {
    connect: function() {
      //建立连接后调用的函数
      this.$socket.emit('addUser',this.enter);
      console.log("socket connected...");
        this.$message({
          type:'success',
          message:'欢迎进去聊天室'
        })
      
    },
    userCount: function(message){
      console.log(message);
      this.num=message
    },
    // message 是服务端返回的信息  接收信息
    receiveMsg: function(message) {
      console.log("服务的返回的信息", message);
      this.textArr.push(message);
    },
    // 断开时调用的函数
    disconnect: function() {
       this.$socket.emit('removeUser',this.leave);
      console.log("disconnect!");
    },
  }
};
</script>
<style scoped lang='scss'>
.calendar {
  background: #ffffff;
  & .el-main {
    height: 0;
    background: #fff;
  }
  & .main {
    min-width: 700px;
    width: 90%;
    height: 100vh;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: calc(100vh - 60px);
  }
  & .left {
    display: grid;
    grid-template-rows: 3fr 2fr;
    margin-right: 10px;
    height: calc(100vh - 60px);
    & .cadar {
      margin-bottom: 10px;
      & .calendarSize {
        // border: 1px solid;
        height: 378px;
        ::v-deep .el-calendar-day {
          box-sizing: border-box;
          padding: 20px;
          height: 50px;
        }
        ::v-deep .el-calendar__header {
          padding: 30px 20px;
        }
        ::vdeep .el-calendar-table {
          height: 330px;
          width: 100%;
        }
        ::v-deep .el-calendar__body {
          margin: 0 auto;
          width: 85%;
        }
        ::v-deep .el-calendar-day {
          height: 40px;
        }
      }
    }
    & .task {
      margin-top: 40px;
      // border: 1px solid;

      & .taskflex {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        & .taskspan {
          font-size: 22px;
          font-weight: 600;
        }
      }
    }
    ::-webkit-scrollbar {
      width: 0;
    }
    & .taskheight {
      background: #fafafc;
      border-radius: 10px;
      height: 159px;
      & .tasktemp {
        align-items: center;
        display: grid;
        grid-template-columns: 50px auto auto;
        gap: 0 40px;
        justify-content: center;
        ::v-deep .el-checkbox__inner {
          width: 22px;
          height: 22px;
        }
        & .fontSize {
          font-size: 15px;
          color: #8e8e90;
        }
      }
    }
  }
  & .right {
    // border: 1px solid;
    margin-left: 10px;
    height: calc(100vh - 60px);
    background: #ffffff;
    display: grid;
    grid-template-rows: 1fr 1.5fr;
    box-sizing: border-box;
    & .information {
      background: #fafafc;
      height: 100%;
      overflow: hidden;
      & .contariner {
        height: calc(100% - 50px);
        overflow: scroll;
        & .item-right{
            display: flex;
            justify-content: flex-end;
            padding: 2px;
            width: 98%;
            & .gridfen{
                & .resinfo{
                    display: inline-block;
                    max-width: 215px;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    padding: 10px 10px;
                    background: #95ec69;
                    border-radius: 6px;
                    margin-left: 70px;
                }
            }
            & .postionrre{
                display: flex;
                align-items: center;
                width: 65px;
                height: 30px;
                background: #fcfcfc;
                border-radius: 20px;
                justify-content: space-around;
            }
            & .flexnewline{
              display: flex;
              padding: 5px;
              align-items: center;
              justify-content: end;
              & .touxiang{
                    width: 30px;
                    height: 30px;
                    border: 1px solid;
                    background: #d7d75b;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 99px;

              }
            }

        }
        & .item-left{
            display: flex;
            justify-content: flex-start;
            padding: 2px;
            align-items: center;
            & .resinfo{
              display: inline-block;
              max-width: 215px;
              white-space: pre-wrap;
              word-wrap: break-word;
              padding: 10px 10px;
              background: #95ec69;
              border-radius: 6px;
            }
            & .postionrre{
                display: flex;
                align-items: center;
                width: 80px;
                height: 30px;
                background: #fcfcfc;
                border-radius: 20px;
                justify-content: center;
            }
        }
      }
      ::-webkit-scrollbar {
        height: 0;
        width: 0;
      }
      & .send {
        height: 50px;
        display: flex;
        align-items: center;
      }
      & .spansize {
        font-size: 23px;
      }
    }

    & .space-ail {
      padding: 20px;
      background: #58419c;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      // display: grid;
      // grid-template-columns: 0.7fr 4.5fr;
      & .dispgrid {
        display: grid;
        gap: 10px;
      }

      & .dispbottom {
        display: grid;
        gap: 20px;
        img {
          margin-top: 85px;
          border-radius: 10px;
        }
        
      }
      
      & .borcolor {
        background: #8e8e90;
        width: 45px;
        height: 45px;
        & .clcs {
          font-size: 35px;
        }
      }
      & .widthSize {
        height: 40px;
        width: 110px;
        border: none;
        border-radius: 5px;
        background: #d7d75b;
      }
      & .afont {
        font-size: 16px;
        color: #fff;
      }
      & .bfont {
        font-size: 12px;
        color: #8e8e90;
      }
    }
    & .leftbtn{
        padding: 5px;
        background: darkslateblue;
        border: none;
        border-radius: 5px;
      }
    .spansize {
      font-size: 23px;
    }
    .numbersize {
      width: 20px;
      height: 22px;
      border-radius: 55px;
      font-size: 12px;
    }
  }
}
</style>