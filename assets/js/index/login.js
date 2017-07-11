// 定义模块
define(['jquery','cookie'],function($){
    var $sub=$('#sub');
    $sub.on('click',function(e){
         e.preventDefault();
         // 获取用户名和密码
        var username=$('#name').val();
         var password=$('#pass').val();
      if(!username.trim()||!password.trim()){
                 return
       }
      var option={
          url:'/api/login',
          type:'post',
          data:{
               tc_name:username,
             tc_pass:password
          },
          success:function(data){
              console.log(data);
              if(data.code===200){
                 //alert('登陆成功');

                  $.cookie('userinfo',JSON.stringify(data.result),{expires:7,path:'/'});
                  window.location.href='/bxg/views/index/dashboard.html';
              }
              
          }
      }

     $.ajax(option);

    })
})

  




    