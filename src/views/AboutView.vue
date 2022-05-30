<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  created() {
    
  
  // (async function(){
  // let res = await axios.post('api/user/register',{
  //       username:'xiaoming',
  //       password:'00000000'
  //     })
  //       if(res.data.status == 1) return
  //       let result = await  axios.post('api/user/login',{
  //           username:'xiaoming',
  //           password:'00000000'
  //         })
  //          console.log(res.data.data);
        
  // })()
  

    
  





    function login() {
      return new Promise(function(resolve, reject) {
        ajax({
          url: "api/user/login",
          params: {
            username: "xiaoming",
            password: "999999"
          },
          success(res) {
            resolve(res);
          }
        });
      })
    }
   

    function ajax({ type = "POST", url, params, success }) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.onload = function() {
        if (xhr.status == 200) {
          console.log("---------result----------");
          success(xhr.responseText);
        }
      };
      xhr.send(JSON.stringify(params));
    }
  }
};
</script>

