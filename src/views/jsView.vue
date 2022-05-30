<template>
  <div class="exercise">
    <div class="header">
      <div class="Subclass juspace">
        <div class="flex-c">
          <div class="mr-10 fontwidth">适用考试:</div>
          <div class="mr-10 font-ss flex">全部(34)</div>
          <div class="mr-10 font-s">期中考试(14)</div>
          <div class="mr-10 font-s">期末考试(18)</div>
          <div class="mr-10 font-s">其他考试(12)</div>
        </div>
        <div class="flex-c">
          <div class="mr-10 fontwidth">试卷形式:</div>
          <div class="mr-10 font-i flex">全部</div>
          <div class="mr-10 font-ss flex">考生同卷</div>
          <div class="mr-10 font-z flex">随机顺序</div>
          <div class="mr-10 font-z flex">考生异卷</div>
        </div>
        <div class="spacebtn">
          <div>
            <el-button type="primary" size="small" @click="openQuection">策略组卷</el-button>
            <el-button type="primary" size="small">手动组卷</el-button>
            <el-button type="primary" size="small">导入试卷</el-button>
          </div>
          <div>
            <el-input class="inp" placeholder="请输入内容" suffix-icon="el-icon-search"></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="middle" v-for="item in questionList" :key="item.id">
      <div class="AnswerQuestions">
        <div class="flex-ju">
          <div class="flexlsp font-text">
            <div class="mr-10">创建时间: {{ getTime(item.createdAt) }}</div>
            <div class="spacebtn">
              <div class="mr-10 textred">{{getuserType(item.type)}}</div>
              <div class="mr-10 textblue">{{getuserTypes(item.level)}}</div>
            </div>
            <div>满分：100</div>
            <div>适用次数: 18次</div>
          </div>
          <div class="space">
            <div class="el-icon-s-order" @click="openQuection(item)"></div>
            <!-- 修改弹窗 -->
            <div class="el-icon-delete" @click="removeQuection(item)"></div>
          </div>
        </div>
        <div class="title">
          <input type="checkbox" name id />
          {{item.title}}
        </div>
        <div class="spaceard">
          <el-radio disabled label="A">{{item.questionA}}</el-radio>
          <el-radio disabled label="B">{{item.questionB}}</el-radio>
          <el-radio disabled label="C" v-if="item.questionC">{{item.questionC}}</el-radio>
          <el-radio disabled label="D" v-if="item.questionD">{{item.questionD}}</el-radio>
        </div>
        <div class="Answer">
          <span class="ml-40">答案: {{item.answer}}</span>
        </div>
        <div>
          <div class="flex-column font-cc">
            <div class="ml-40">所属知识点:</div>
            <div class="ml-40">知识点一</div>
            <div class="ml-40">知识点二</div>
            <div class="ml-40">知识点三</div>
          </div>
          <div class="flex-column font-cc">
            <div class="ml-40">解析:</div>
            <div class="ml-40">这是解析字段</div>
          </div>
        </div>
      </div>
    </div>
    <div class="boottom">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
    <!-- element-ui -->
    <div class="itemtemp">
      <el-dialog
        title="新加题目"
        :visible.sync="dialogVisible"
        width="30%"
        class="dialogPopups"
        :before-close="handleClose"
      >
        <div class="form">
          <div class="temp">
            <label class="biaoTi">
              <span class="coloritem">*</span>题目标题
            </label>
            <el-input v-model="form.title" placeholder="请输入题目标题"></el-input>
          </div>
          <div class="temp" v-for="(option,index) in questionOption" :key="option.id">
            <label class="biaoTi">
              <span class="coloritem">*</span>
              {{option.label}}
            </label>
            <el-input v-model="option.value" placeholder="请输入内容"></el-input>
            <div class="iconitem">
              <span 
                @click="addquestionOption"
                v-if="index == questionOption.length -1 && index < 3"
                class="btn el-icon-circle-plus-outline"
              ></span>
              <span
                @click="removequestionOption"
                v-if="index >  1 && index==questionOption.length -1"
                class="btn el-icon-remove-outline"
              ></span>
            </div>
          </div>
          <div class="temp">
            <label class="biaoTi">
              <span class="coloritem">*</span> 答案
            </label>
            <el-select v-model="answer" placeholder="请选择">
              <el-option
                v-for="item in questionOption"
                :key="item.key"
                :label="item.label"
                :value="item.key"
              ></el-option>
            </el-select>
          </div>
          <div class="temp">
            <label class="biaoTi">
              <span class="coloritem">*</span>难以程度
            </label>
            <el-select v-model="form.level" placeholder="请选择">
              <el-option
                v-for="item in leveloptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="createQuection">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { Questionbanklist, getdelete, createApi, getRevise } from "@/api/api";
import getTime from "@/mixins/getTimeDate";
export default {
  mixins: [getTime],
  data() {
    return {
      selectedData: {},
      questionList: [],
      dialogVisible: false,
      input: "",
      answer: "",
      currentPage: 1,
      totalCount: 0,
      pageSize: 2,
      questionOption: [],
      form: {},
      leveloptions: [
        {
          value: 1,
          label: "简单"
        },
        {
          value: 2,
          label: "普通"
        },
        {
          value: 3,
          label: "困难"
        }
      ],
      option: [],
      optionTemp: [
        {
          id: 1,
          key: "A",
          label: "选项A",
          value: ""
        },
        {
          id: 2,
          key: "B",
          label: "选项B",
          value: ""
        },
        {
          id: 3,
          key: "C",
          label: "选项C",
          value: ""
        },
        {
          id: 4,
          key: "D",
          label: "选项D",
          value: ""
        }
      ]
      // isCreateEvent:true
    };
  },
  methods: {
    initformparams() {
      (this.form = {
        type: 1,
        title: "",
        questionA: "",
        questionB: "",
        questionC: "",
        questionD: "",
        answer: "",
        level: ""
      }),
        (this.questionOption = [
          {
            id: 1,
            key: "A",
            label: "选项A",
            value: ""
          },
          {
            id: 2,
            key: "B",
            label: "选项B",
            value: ""
          }
        ]);
      this.option = this.questionOption.slice(0, 2);
      this.answer = "";
    },

    // 删一条数据
    removequestionOption() {
      this.questionOption.pop();
      this.getQuectionList();
    },
    // 加一条数据
    addquestionOption() {
      if (this.questionOption.length == 4) return;
      let options = [
        {
          id: 1,
          key: "A",
          label: "选项A",
          value: ""
        },
        {
          id: 2,
          key: "B",
          label: "选项B",
          value: ""
        },
        {
          id: 3,
          key: "C",
          label: "选项C",
          value: ""
        },
        {
          id: 4,
          key: "D",
          label: "选项D",
          value: ""
        }
      ];
      let option = JSON.parse(JSON.stringify(this.optionTemp));
      this.questionOption.push(option[this.questionOption.length]);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getQuectionList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getQuectionList();
    },
    //
    formatCreateParams() {
      let res = {};
      res.type = this.form.type;
      res.title = this.form.title;
      this.questionOption.forEach(item => {
        res["question" + item.key] = item.value;
      });
      res.answer = this.answer;
      res.level = this.form.level;
      if (!this.isCreateEvent) res.id = this.selectedData.id;
      return res;
    },
    valideformParams(params) {
      let res = true;
      let rule = {
        title: "题目标题",
        questionA: "选项A",
        questionB: "选项B",
        questionC: "选项C",
        questionD: "选项D",
        answer: "答案",
        level: "难易程度"
      };
      for (let key in params) {
        if (!params[key]) {
          this.$message({
            type: "warning",
            message: rule[key] + "不能为空!"
          });
          res = false;
          break;
        }
      }
      return res;
    },
    // 创建 或者 编辑
    async createQuection() {
      let params = this.formatCreateParams();
      let valideform = this.valideformParams(params);
      if (!params.questionC) {
        params.questionC = "";
      }
      if (!params.questionD) {
        params.questionD = "";
      }
      if (!valideform) return;
      let successMag = "";
      let res;
      if (this.isCreateEvent) {
        res = await createApi(params);
        successMag = "创建成功";
      } else {
        res = await getRevise(params);

        console.log(this.questionOption);
        successMag = "修改成功";
      }
      if (res.data.status == 1) {
        this.getQuectionList();
        this.$message({
          type: "success",
          message: successMag
        });
        this.initformparams();
        this.dialogVisible = false;
      }
    },
    openQuection(data) {
      this.dialogVisible = true;
      this.initformparams();
      let isCreateEvent = data instanceof PointerEvent;

      if (isCreateEvent) {
        this.initformparams();
        this.isCreateEvent = true;
        console.log("创建");
      } else {
        console.log("修改");
        console.log(data);
        this.selectedData = data;
        this.isCreateEvent = false;
        this.form.title = data.title;
        this.answer = data.answer;
        this.form.level = data.level;
        let questionOption = JSON.parse(JSON.stringify(this.optionTemp));
        questionOption[0].value = data.questionA;
        questionOption[1].value = data.questionB;
        questionOption[2].value = data.questionC;
        questionOption[3].value = data.questionD;
        console.log(questionOption);
        this.questionOption = questionOption.filter(item => item.value);
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    //  删除数据
    async setQuection({ id, type }) {
      let res = await getdelete({
        id,
        type
      });
      if (res.data.status == 1) {
        this.getQuectionList();
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      }
    },
    //  删除的点击事件
    removeQuection(data) {
      this.$confirm("此操作将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.setQuection(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getuserType(type) {
      switch (type) {
        case 1:
          return "单";
        case 2:
          return "多";
        case 3:
          return "填";
        case 4:
          return "问";
      }
    },
    getuserTypes(level) {
      switch (level) {
        case 1:
          return "简单";
        case 2:
          return "普通";
        case 3:
          return "困难";
      }
    },
    //  数据查询
    async getQuectionList() {
      const { pageSize, pageNum } = this;
      let res = await Questionbanklist({
        type: 1,
        pageSize,
        pageNum
      });
      this.questionList = res.data.data.rows;
      this.totalCount = res.data.data.count;
    }
  },
  watch: {
    questionOption(newvalue) {
      let res = newvalue.find(item => item.key == this.answer);
      this.answer = !res ? "" : res.key;
    }
  },
  async created() {
    this.getQuectionList();
    this.initformparams();
  }
};
</script>
<style scoped lang='scss'>
.exercise {
  background: #fff;
  padding: 20px;
  height: calc(100vh - 100px);
  & .Subclass {
    height: 150px;
    background: #f9f9f9;
    padding: 0 20px;
    min-width: 700px;
    & .flex-c {
      display: flex;
      & .fontwidth{
        font-weight: bolder;
      }
    }
    & .font-s {
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
    & .font-ss {
      width: 65px;
      height: 20px;
      font-size: 10px;
      border-radius: 10px;
      color: #f0988c;
      border: 1px solid #be7570;
    }
    & .font-i {
      width: 55px;
      height: 20px;
      font-size: 10px;
      border: 1px solid #b4b4b4;
      border-radius: 10px;
      color: #b4b4b4;
    }
    & .font-z {
      width: 65px;
      height: 20px;
      font-size: 10px;
      border-radius: 10px;
      border: 1px solid #b4b4b4;
      color: #b4b4b4;
    }
    & .font {
      width: 70px;
      height: 30px;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 12px;
      background: #026be3;
    }
    & .inp {
      outline: none;
      width: 150px;
      height: 35px;
    }
  }
  .AnswerQuestions {
    margin-top: 20px;
    background: #fff;
    border: 1px solid #f3f3f3;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    min-width: 700px;
    & .flex-ju {
      display: flex;
      justify-content: space-between;
    }
    & .flexlsp {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    & .font-text {
      font-size: 13px;
      color: #ccc;
      display: flex;
      gap: 0 80px;
      align-items: center;
    }
    & .textred {
      background-image: linear-gradient(#f24a38,#fa7d65);
      color: #fff;
      height: 16px;
      padding: 4px;
      border-radius: 4px;
      text-align: center;
    }
    & .textblue {
      background-image: linear-gradient(#72d98f,#72d9cd);
      color: #fff;
      height: 16px;
      padding: 4px;
       border-radius: 4px;
      text-align: center;
    }
    & .space {
      width: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    & .title {
      display: flex;
      align-items: center;
      font-size: 14px;
      padding: 7px 0;
    }
    & .Answer {
      border-bottom: 1px dashed;
      height: 30px;
      color: #000;
      font-size: 14px;
    }
    & .ridous {
      border-radius: 55px;
    }
    & .spaceard {
      color: #000;
      font-size: 14px;
      font-weight: 500;
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 7px 0;
    }
    & .font-cc {
      font-size: 14px;
      color: #b4b4b4;
      padding: 7px 0;
    }
  }

  & .boottom {
    padding: 15px;
  }
  

   & .dialogPopups{
      ::v-deep .el-dialog{
          width: 400px!important;
      }
      & .form{
      display: grid;
      grid-template-columns: column;
      gap: 20px 0;
      min-width: 400px;
          & .temp{
            display: grid;
            gap: 0 10px;
            grid-template-columns: 70px 240px 50px;
            align-items: center;
            justify-content:stretch;
            & .coloritem{
              color: red
            }
            & .btn{
                padding: 5px;
                display: inline-block;
            }
          }
      }
  }
 
   
  
    
}
</style>