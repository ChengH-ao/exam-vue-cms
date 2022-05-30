<template>
  <div class="signup">
    <h1>报名系统</h1>
  </div>
</template>
<script>
export default {
  created() {
    // function login() {
    //   return new Promise(function(resolve, reject) {
    //     ajax({
    //       url: "api/user/login",
    //       params: {
    //         username: "xiaoming",
    //         password: "999999"
    //       },
    //       success(res) {
    //         resolve(res);
    //       }
    //     });
    //   }).then(res => {
    //     console.log(res);
    //   });
    // }
    // login()
    // .then(res => {
    //   console.log(res);
    //   return login()
    // })
     


     
    // 通过封装ajax方法调用接口更加方便快捷
    // success 回调函数的应用，让方法的解耦性更强
    // ajax({
    //   url: "api/user/login",
    //   params: {
    //     username: "xiaoming",
    //     password: "999999"
    //   },
    //   success(res) {
    //     console.log('----ajax login responseText');
    //     console.log(res);
    //   }
    // });

    // ajax({
    //   url: "api/user/info",
    //   params: {},
    //   success(res) {
    //     console.log("----ajax info responseText-----");
    //     console.log(res);
    //   }
    // });

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