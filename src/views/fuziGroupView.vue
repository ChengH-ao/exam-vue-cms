<template>
    <div class="FatherAndSon">
        <h1>子传父</h1>
        <div >
          <el-menu class="el-menu-vertical-demo"  v-for="(item,index) in groupName"  :index="index+''">
       <el-submenu :index="index+'+1' ">
        <template slot="title" >
          <i class="el-icon-location"></i>
          <span>{{item.groupName}}</span>
        </template>
         <el-menu-item-group>
          <el-menu-item v-for="(parme,i) in item.app" :index="i+index+''">{{parme.roleName}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
        </div>
    </div>
</template>
<script>
import { roleGroupList,roleList } from "@/api/api";
export default {
    data(){
        return{
            groupName:[],
            roleName:[],
        }
    },
    methods:{
        // async fuGroup(){
        //     var params = {
        //         pagination:false
        //     }
        //     let res = await roleGroupList(params);
        //     this.groupName = res.data.data.rows;
        //     console.log(this.groupName);
        // },
        // async ziGroup(){
        //     var params={
        //           pagination:false,
        //             pageSize:10,   
        //             pageNum:1
        //     }
        //     let res = await roleList(params);
        //     this.roleName = res.data.data.rows;
        //     console.log(this.roleName);
           
        // },
        async passbyvalue(){
            let res = await Promise.all([roleGroupList({pagination:false}),roleList({pagination:false})]);
            console.log(res[0],res[1]);
            this.groupName = res[0].data.data.rows;
            console.log(this.groupName );
            this.roleName = res[1].data.data.rows;
            console.log(this.roleName);
            this.groupName.forEach((el) => {
                el.app = this.roleName.filter((item)=>item.groupId == el.id);
            }); 
                console.log(this.groupName);
        }
    },
    created(){
        // this.ziGroup();
        // this.fuGroup();
        this.passbyvalue();
    }
}
</script>
