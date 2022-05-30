<template>
  <div class="material">
    <div class="contpout">
      <div class="information">
        <el-container>
          <el-header class="fontwidth">基本信息</el-header>
          <el-main>
            <div class="flexgrid">
              <label>账号昵称</label>
              <el-input v-model="form.avatarName" placeholder="请输入内容"></el-input>
            </div>
            <div class="flexgrid">
              <label>真实姓名</label>
              <el-input v-model="form.name" placeholder="请输入内容"></el-input>
            </div>
            <div class="flexgrid">
              <label>性别</label>
              <div>
                <el-radio v-model="form.sex" :label="0">男</el-radio>
                <el-radio v-model="form.sex" :label="1">女</el-radio>
              </div>
            </div>
            <div class="flexgrid">
              <label for>所在地</label>
              <div class="gridflex">
                <el-select v-model="form.provinceNo"  placeholder="请选择">
                  <el-option
                    v-for="item in province"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
                <el-select v-show="city.length"  v-model="form.cityNo"  placeholder="请选择">
                  <el-option
                    v-for="item in city"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
                <el-select  v-show="area.length"  v-model="form.areaNo" placeholder="请选择">
                  <el-option
                    v-for="item in area"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="flexgrid">
              <label for>手机号</label>
              <el-input v-model="form.phone" placeholder="请输入内容"></el-input>
            </div>
            <div class="flexgrid">
              <label for>邮箱</label>
              <el-input v-model="form.email" placeholder="请输入内容"></el-input>
            </div>
            <div class="flexgrid">
              <label for>简介</label>
              <div>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  class="textitem"
                  v-model="form.desc"
                ></el-input>
              </div>
            </div>
            <div class="flexgrid">
              <label for></label>
              <div>
                <el-button type="primary" round @click="setRevise">保存</el-button>
                <el-button round>取消</el-button>
              </div>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>
<script>
import { getUerinfoApi, setsetion } from "@/api/api";
import { data } from "@/assets/utils/index";
// import { delete } from 'vue/types/umd';
export default {
  data() {
    return {
      textarea: "",
      label:'',
      form: {
        phone:"",
        email:"",
        sex:"",
        avatarName:"",
        provinceNo: "", //省
        cityNo: "",     //市
        areaNo: "",     //区
        townNo:"",
        desc:""
      },
      province: data,   //省市区列表
      city: [],
      area: []
    };
  },
  methods: {

    async getinformation() {
      let res = await getUerinfoApi(this.form);
      this.form = res.data.data[0];
      this.form.sex = res.data.data[0].sex+"";
      console.log(this.form);
    },
    async setRevise() {
     delete this.form.createdAt;
     delete this.form.id;
     delete this.form.updatedAt;

      let res = await setsetion(this.form);
      console.log(res);
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "修改成功"
        });
      }
    }
  },
  created() {
    this.getinformation();
  },
  watch:{
        "form.provinceNo" : function(val){
            this.form.cityNo='';
           let res = this.province.find(item => item.code == val);
           this.city = res ? res.children : [];
        },
        "form.cityNo" : function(val){
            this.form.areaNo='';
           let res = this.city.find(item => item.code == val);
           this.area = res && res.children ? res.children : [];
        }
    }
};
</script>
<style scoped lang='scss'>
.contpout {
  height: calc(100vh - 100px);
  & .el-main {
    padding: 0;
  }
  & .information {
    background: #fff;
    padding: 20px;
    height: 590px;
    & .fontwidth {
      display: flex;
      align-items: center;
      font-weight: 600;
      border-bottom: 1px solid #f7f7f7;
    }
    & .gridflex {
      display: flex;
      gap: 100px;
    }
    & .flexgrid {
      display: grid;
      gap: 20px 0;
      grid-template-columns: 100px auto;
      align-items: center;
      padding: 15px;
      & .btn {
        border-radius: 20px;
        padding: 8px 30px;
        display: flex;
        align-items: center;
      }
      & .btncolor {
        background: #1b79ff;
      }
    }
  }
}
</style>