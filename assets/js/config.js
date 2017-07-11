/**
 * Created by 16037 on 2017/7/8.
 */
//���ñ��� �ͻ���·��

require.config({
    baseUrl:'/bxg/node_modules',
    paths:{
        jquery:'./jquery/dist/jquery',
        cookie:'./jquery.cookie/jquery.cookie',
        nprogress:'./nprogress/nprogress',
        template:'./art-template/lib/template-web',
        bootstrap:'./bootstrap/dist/js/bootstrap',
        //datepicker:'./bootstrapt-datepicker/dist/js/bootstrap-datepicker',
        datepicker: './bootstrap-datepicker/dist/js/bootstrap-datepicker',
        zh: './bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min',
        validate:'./jquery-validation/dist/jquery.validate',
        form:'./jquery-form/dist/jquery.form.min'
    },
    shim:{
        bootstrap:{
            deps:['jquery']
        },
        zh:{
            deps:['jquery','datepicker']
        }
    }
})
