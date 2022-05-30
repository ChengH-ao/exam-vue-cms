<template>
    <div class="Question">
        <div class="takeAnExam ">
            <div class="Subclass juspace">
                <div class="flex-c">
                    <div class="mr-10">适用考试: </div>
                    <div class="mr-10 font-ss flex">全部(34)</div>
                    <div class="mr-10 font-s">期中考试(14)</div>
                    <div class="mr-10 font-s">期末考试(18)</div>
                    <div class="mr-10 font-s">其他考试(12)</div>
                </div>
                <div class="flex-c">
                    <div class="mr-10">试卷形式:</div>
                    <div class="mr-10 font-i flex">全部</div>
                    <div class="mr-10 font-ss flex">考生同卷</div>
                    <div class="mr-10 font-z flex">随机顺序</div>
                    <div class="mr-10 font-z flex">考生异卷</div>
                </div>
                <div class="spacebtn">
                    <div>
                    <button class="mr-10 font">策略组卷</button>
                    <button class="mr-10 font">手动组卷</button>
                    <button class="mr-10 font">导入试卷</button>
                    </div>
                    <div>
                        <el-input class="inp" placeholder="请输入内容" suffix-icon="el-icon-search"></el-input>
                    </div>
                </div>
            </div>
            <div class="ExamQuestions">
                <div class="flex-ju">
                    <div class="flexlsp font-text">
                        <div class="mr-10">创建时间: 2022-5-9 14:30:33</div>
                        <div class="spacebtn">
                        <div class="mr-10 textred">期中考试</div>
                        <div class="mr-10 textblue">考生同卷</div>
                        </div>
                        <div>满分：100</div>
                        <div>适用次数: 18次</div>
                    </div>
                    <div class="space">
                        <div class="el-icon-upload"></div>
                        <div class="el-icon-s-order"></div>
                        <div class="el-icon-delete"></div>
                    </div>
                    
                </div>
                <div class="title">1. Java程序设计期中考试试题</div>
            </div>
             <div class="ExamQuestions">
                <div class="flex-ju">
                    <div class="flexlsp font-text">
                        <div class="mr-10">创建时间: 2022-5-9 14:30:33</div>
                        <div class="spacebtn">
                        <div class="mr-10 textred">期中考试</div>
                        <div class="mr-10 textblue">考生同卷</div>
                        </div>
                        <div>满分：100</div>
                        <div>适用次数: 18次</div>
                    </div>
                    <div class="space">
                        <div class="el-icon-upload"></div>
                        <div class="el-icon-s-order"></div>
                        <div class="el-icon-delete"></div>
                    </div>
                    
                </div>
                <div class="title">2. Java程序设计期中考试试题</div>
            </div>
             <div class="ExamQuestions">
                <div class="flex-ju">
                    <div class="flexlsp font-text">
                        <div class="mr-10">创建时间: 2022-5-9 14:30:33</div>
                        <div class="spacebtn">
                        <div class="mr-10 textred">期中考试</div>
                        <div class="mr-10 textblue">考生同卷</div>
                        </div>
                        <div>满分：100</div>
                        <div>适用次数: 18次</div>
                    </div>
                    <div class="space">
                        <div class="el-icon-upload"></div>
                        <div class="el-icon-s-order"></div>
                        <div class="el-icon-delete"></div>
                    </div>
                    
                </div>
                <div class="title">3. Java程序设计-随堂检测1</div>
            </div>
             <div class="ExamQuestions">
                <div class="flex-ju">
                    <div class="flexlsp font-text">
                        <div class="mr-10">创建时间: 2022-5-9 14:30:33</div>
                        <div class="spacebtn">
                        <div class="mr-10 textred">期中考试</div>
                        <div class="mr-10 textblue">考生同卷</div>
                        </div>
                        <div>满分：100</div>
                        <div>适用次数: 18次</div>
                    </div>
                    <div class="space">
                        <div class="el-icon-upload"></div>
                        <div class="el-icon-s-order"></div>
                        <div class="el-icon-delete"></div>
                    </div>
                    
                </div>
                <div class="title">4. Java程序设计-随堂检测1</div>
            </div>
             <div class="ExamQuestions">
                <div class="flex-ju">
                    <div class="flexlsp font-text">
                        <div class="mr-10">创建时间: 2022-5-9 14:30:33</div>
                        <div class="spacebtn">
                        <div class="mr-10 textred">期中考试</div>
                        <div class="mr-10 textblue">考生同卷</div>
                        </div>
                        <div>满分：100</div>
                        <div>适用次数: 18次</div>
                    </div>
                    <div class="space">
                        <div class="el-icon-upload"></div>
                        <div class="el-icon-s-order"></div>
                        <div class="el-icon-delete"></div>
                    </div>
                    
                </div>
                <div class="title">5. Java程序设计-随堂检测1</div>
            </div>
            <div class="leftpagination">
                    <div class="block">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage2"
                    :page-sizes="[100, 200]"
                    :page-size="100"
                    layout="sizes, prev, pager, next"
                    :total="1000">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Questionbanklist } from "@/api/api";
export default {
    data() {
      return {
        currentPage2: 5,
      };
    },
     methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    //    async fangfaming(){
    //      let res = await Questionbanklist({
    //         type:1,
    //         pagination:true,
    //         pageSize: 10,
    //         pageNum:1
    //     })
    //     console.log(res);
    //      res.data.data.rows.forEach(item => {
    //          console.log(item);
            
    //      });
    //  }

    },
     created(){
    //   this.fangfaming()

}
}
</script>
<style scoped lang='scss'>
    .takeAnExam{
        background: #fff;
        padding: 20px;
        height: calc( 100vh - 100px);
      & .Subclass{
            height: 150px;
            background: #f9f9f9;   
            padding: 0 20px;
            min-width: 700px;
            & .flex-c{
                display: flex;
            }
            & .font-s{
                font-size: 10px;
                border-radius: 10px;
                border: 1px solid #b4b4b4;
                color: #b4b4b4;
                width: 85px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            & .font-ss{
                width: 65px;
                height: 20px;
                font-size: 10px;
                border-radius: 10px;
                color: #f0988c;
                border: 1px solid #be7570;
            }
            & .font-i{
                width: 55px;
                height: 20px;
                font-size: 10px;
                border: 1px solid #b4b4b4;
                border-radius: 10px;
                color: #b4b4b4;
            }
            & .font-z{
                width: 65px;
                height: 20px;
                font-size: 10px;
                border-radius: 10px;
                border: 1px solid #b4b4b4;
                color: #b4b4b4;
            }
            & .font{
                width: 70px;
                height: 30px;
                color: #fff;
                border: none;
                border-radius: 4px;
                font-size: 12px;
                background: #026be3;
            }
            & .inp{
                outline: none;
                width: 150px;
                height: 35px;
            }
        }
        & .leftpagination{
            height: 65px;
            display: flex;
            justify-content: right;
            align-items: center;
        }
        & .ExamQuestions{
            margin-top: 20px;
            height: 90px;
            background: #fff;
            border: 1px solid #f3f3f3;
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            min-width: 700px;
             & .flex-ju{
                 display: flex;
                 justify-content: space-between;
             }
             & .flexlsp{
                 display: flex;
                 justify-content: space-between;
                 align-items: center;
             }
             & .font-text{
                 font-size: 13px;
                 color: #ccc;
                 width: 550px;
                 & .textred{
                        background: #ed684f;
                        color: #fff;
                        width: 60px;
                        height: 16px;
                        padding: 2px;
                        text-align: center;
                 }
                 & .textblue{
                        background: #73dac9;
                        width: 60px;
                        color: #fff;
                        height: 16px;
                        padding: 2px;
                        text-align: center;
                 }
             }
             & .space{
                 width: 100px;
                 display: flex;
                 justify-content: space-around;
                 align-items: center;
             }
             & .title{
                 font-size: 14px;
             }
        }
    }
</style>