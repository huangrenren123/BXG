/**
 * Created by 16037 on 2017/7/10.
 */

//��� ���� ҳ��
require(['/bxg/assets/js/config.js'],function(){
    require(['jquery','/bxg/assets/js/common.js','datepicker','validate','form','zh'],function($){
        //alert(1)
    //    ���ڲ����ʼ��
        $('input[name="tc_join_date"]').datepicker({
            format: 'yyyy/mm/dd',
            language: 'zh-CN'
        })
    //    ���ؼ� ��֤
        $('form').validate({
            //    �����е���֤ͨ��֮�� ִ���������
            submitHandler:function(){
                $('form').ajaxSubmit({
                    url:'/api/teacher/add',
                    type:'post',
                    success:function(data){
                        if(data.code===200){
                            alert('��ӳɹ�');
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
                    require:'��������Ϊ��',
                    rangelength:'����Ҫ��2��4֮��'
                },
                tc_pass:{
                    required:'���벻��Ϊ��'
                }
            },

        })


    })
})