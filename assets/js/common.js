/**
 * Created by 16037 on 2017/7/8.
 */
//������js  ������һЩ  ��Ҫ�ظ� �õ��Ĵ���


//��д����֮ǰ  ������һЩ ����Ҫ�Ķ��� ���� ����

define(['jquery','nprogress','cookie'],function($,NProgress){
    validSignIn();//�ж� �Ƿ��¼
    getInfo();//��ȡ�û���Ϣ
    navToggle();//�����˵���
    signOut();//�˳���¼
    globalAjaxEvent();//����ʱ�Ľ�����



//����1  �ж��û��Ƿ��¼
  function validSignIn(){
  //    ��ȡcookie �е�PHPSESSID ��� cookie  �ж� �Ƿ����
      var sessionID= $.cookie('PHPSESSID');
      console.log(sessionID);
  //    ��� id  ������ �� ��¼���ɹ�   ��ת�� ��½ҳ��
      if(!sessionID){
          window.location.href='/bxg/views/index/login.html'
      }
  }



//���� 2 �� cookie ��  ��ȡ�û��� ����  ��չʾ

function getInfo(){
    var userInfo=JSON.stringify($.cookie('userinfo'));
    console.log(userInfo);
    $('.profile img').attr('src',userInfo.tc_avatar);
    $('.profile h4').text(userInfo.tc_name);
}

//���� 3 �����˵�����(չ��������)
function navToggle(){
    $('.navs li a').on('click',function(e){
        $(this).next('ul').slideToggle();
    })
}

//����4  �˳���¼
function signOut(){
    $('.fa-sign-out').closest('li').on('click',clickHandle);
    function clickHandle(e){
    //    ���� Ajax ����  �˳� ��¼ϵͳ
        var options={
            url:'/api/logout',
            type:'post',
            success:function(data){
                if(data.code==200){
                //    ��Ӧ�ɹ��� ��ת�� ��¼ҳ��
                    window.location.href='/bxg/views/index/login.html'
                }
            }
        }
        $.ajax(options);
    }
}

//����5   ������

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