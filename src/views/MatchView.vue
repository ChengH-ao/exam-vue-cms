<template>
  <div class="match">
    <h1>匹配比赛</h1>
  </div>
</template>
<script>

export default {
  created() {
        // 把promise封装成 axios 
    class Axios{
      constructor(){
        
      }
      post(url,parmas){
            return new Promise(function(resolve, reject) {
            ajax({
              url,
              parmas,
              success(res) {
                resolve(res);
              }
            });
          });
      }
    }

    var axios = new Axios();

    function axiosLogin(parmas={}){
      return axios.post('api/user/login',parmas)
    }
    axiosLogin({
       username: "xiaoming",
       password: "99999999"
    }).then(res=>{
      console.log(res);
    })






    // function login(parmas = {}) {
    //   return new Promise(function(resolve, reject) {
    //     ajax({
    //       url: "api/user/login",
    //       parmas,
    //       success(res) {
    //         resolve(res);
    //       }
    //     });
    //   });
    // }

    // login().then(res => {
    //   console.log("-----------is promise sulte---------------");
    //   console.log(res);
    // });

    // ajax({
    //   url: "api/user/login",
    //   parmas: {
    //     username: "xiaoming",
    //     password: "99999999"
    //   },
    //   success(res) {
    //     console.log("-------------普通login--------");
    //     console.log(res);
    //   }
    // });

    function ajax({ type = "POST", url, parmas = {}, success }) {
      var xml = new XMLHttpRequest();
      xml.open(type, url, true);
      xml.onload = function() {
        if (xml.status == 200) {
          success(xml.responseText);
        }
      };
      xml.send(JSON.stringify(parmas));
    }
  }
};
</script>