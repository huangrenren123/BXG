/**
 * Created by 16037 on 2017/7/10.
 */

//添加 数据 页面
require(['/bxg/assets/js/config.js'],function(){
    require(['jquery','/bxg/assets/js/common.js','datepicker','validate','form','zh'],function($){
        //alert(1)
    //    日期插件初始化
        $('input[name="tc_join_date"]').datepicker({
            format: 'yyyy/mm/dd',
            language: 'zh-CN'
        })
    //    表单控件 验证
        $('form').validate({
            //    在所有的验证通过之后 执行这个方法
            submitHandler:function(){
                $('form').ajaxSubmit({
                    url:'/api/teacher/add',
                    type:'post',
                    success:function(data){
                        if(data.code===200){
                            alert('添加成功');
                        }
                    }
                })
            },
            rules:{
                tc_name:{
                    required:true,
                    rangelength:[2,4]
                },
                tc_pass:{
                    required:true
                },
                tc_join_datad:{
                    require:true
                }
            },
            message:{
                tc_namme:{
                    require:'姓名不能为空',
                    rangelength:'长度要在2到4之间'
                },
                tc_pass:{
                    required:'密码不能为空'
                }
            },

        })


    })
})