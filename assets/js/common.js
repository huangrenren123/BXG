/**
 * Created by 16037 on 2017/7/8.
 */
//公共的js  用来放一些  需要重复 用到的代码


//在写功能之前  先引入一些 所需要的东西 别名 引入

define(['jquery','nprogress','cookie'],function($,NProgress){
    validSignIn();//判断 是否登录
    getInfo();//获取用户信息
    navToggle();//交互菜单栏
    signOut();//退出登录
    globalAjaxEvent();//请求时的进度条



//功能1  判断用户是否登录
  function validSignIn(){
  //    获取cookie 中的PHPSESSID 这个 cookie  判断 是否存在
      var sessionID= $.cookie('PHPSESSID');
      console.log(sessionID);
  //    如果 id  不存在 则 登录不成功   跳转到 登陆页面
      if(!sessionID){
          window.location.href='/bxg/views/index/login.html'
      }
  }



//功能 2 从 cookie 中  获取用户的 资料  并展示

function getInfo(){
    var userInfo=JSON.stringify($.cookie('userinfo'));
    console.log(userInfo);
    $('.profile img').attr('src',userInfo.tc_avatar);
    $('.profile h4').text(userInfo.tc_name);
}

//功能 3 导航菜单交互(展开与收起)
function navToggle(){
    $('.navs li a').on('click',function(e){
        $(this).next('ul').slideToggle();
    })
}

//功能4  退出登录
function signOut(){
    $('.fa-sign-out').closest('li').on('click',clickHandle);
    function clickHandle(e){
    //    发送 Ajax 请求  退出 登录系统
        var options={
            url:'/api/logout',
            type:'post',
            success:function(data){
                if(data.code==200){
                //    响应成功后 跳转到 登录页面
                    window.location.href='/bxg/views/index/login.html'
                }
            }
        }
        $.ajax(options);
    }
}

//功能5   进度条

function globalAjaxEvent(){
    $(document).ajaxStart(function () {
        NProgress.start()
    })
    $(document).ajaxStop(function () {
        NProgress.done()
    })
}

//$(function(){
//    NProgress.done();
//})
})