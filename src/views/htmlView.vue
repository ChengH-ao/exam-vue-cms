<template>
    <div class="htmlQuestion">
        <span>123456</span>
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
                <hr>
                <!--  -->
               
    </div>

</template>
<script>
import { data } from "@/assets/utils/index";
export default {
    data(){
        return{
            form:{
                provinceNo:"",
                cityNo:'',
                areaNo:'',
            },
            province:data,
            city:[],
            area:[]
        }

    },
    created(){
        console.log(data);
    },
    watch:{
        "form.provinceNo" : function(val){
            this.form.cityNo='';
           let res = this.province.find(item => item.code == val);
           this.city = res ? res.children : [];
           console.log(res);
        },
        "form.cityNo" : function(val){
            this.form.areaNo='';
           let res = this.city.find(item => item.code == val);
           this.area = res && res.children ? res.children : [];
           console.log(res);
        }
    }
}
</script>
<style scoped lang='scss'>
   
    
</style>
