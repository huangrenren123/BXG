/**
 * Created by 16037 on 2017/7/8.
 */
//讲师列表 页面

require(['/bxg/assets/js/config.js'], function () {
    //再次 调用一个 require 函数 加载其他的js
    require(['jquery', 'template', 'bootstrap', '/bxg/assets/js/common.js'], function ($, template) {
        getTeacherList();//获取老师列表
        getDetailInfo();//查看详细信息
        stopOrStart();//启用还是 注销状态

        //   1 获取 老师的列表
        function getTeacherList() {
            var options = {
                url: '/api/teacher',
                success: function (data) {
                    if (data.code === 200) {
                        //请求成功   将数据 渲染到页面上 组装数据和模板
                        var result = template('tmpl-list', {list: data.result})
                        $('#list').html(result);
                    } else {
                        alert('没有数据')
                    }
                }
            }
            $.ajax(options);
        }

        //  2  查看 老师的详细 信息
        function getDetailInfo() {
            $('#list').on('click', '.preview', function () {
                //alert(1)
                $('#teacherModal').modal();//调用modal() 这个 方法 就可以 弹出模态框
                var tcId = $(this).closest('tr').attr('tc-id');//获取 每一行数据 的id

                var options = {
                    url: '/api/teacher/view',
                    type: 'get',
                    data: {
                        tc_id: tcId
                    },
                    success: function (data) {
                        if (data.code === 200) {
                            //    获取数据后  使用es6中的模板字符串 拼接
                            var obj = data.result;
                            var result = `
                        <tr>
                            <th>姓名:</th>
                            <td>${obj.tc_name}</td>
                            <th>职位:</th>
                            <td colspan="3">讲师</td>
                                <td rowspan="4" width="128">
                                <div class="avatar">
                                <img src="${obj.tc_avatar}" alt="">
                                </div>
                                </td>
                                </tr>
                                <tr>
                                <th>花名:</th>
                            <td>${obj.tc_roster}</td>
                            <th>年龄:</th>
                            <td colspan="3">${getAge(obj.tc_birthday)}</td>
                                </tr>
                                <tr>
                                <th>性别:</th>
                            <td>${obj.tc_gender==='0'?'男':'女'}</td>
                            <th>出生日期:</th>
                            <td colspan="3">${obj.tc_join_data}</td>
                                </tr>
                                <tr>
                                <th>手机号码:</th>
                            <td colspan="2">${obj.tc_cellphone}</td>
                                <th>邮箱:</th>
                            <td colspan="2">${obj.tc_email}</td>
                            </tr>
                            <tr>
                            <th>籍贯:</th>
                            <td colspan="6">${obj.tc_hometown}</td>
                            </tr>
                            <tr>
                            <td colspan="7">
                                <div class="introduce">
                               ${obj.tc_instroduce}
                            </div>
                            </td>
                            </tr>
                            `
                            console.log( result);
                            $('#modal-list').html(result);

                        }
                    },
                    error:function(){
                        console.log('有错误');
                    }
                }
                //    发送请求
                $.ajax(options);

            })
        }

        //   4  注销或者启用
        function stopOrStart(){
            $('#list').on('click','.start-stop',function(){
                //alert(1)
                var $this=$(this);
                //console.log($this);
                var $tr=$this.closest('tr');
                var tcId=$tr.attr('tc-id'); //获取 点击当前 老师的 id
                //console.log(tcId);
                var tcStatus=$tr.attr('tc-status');//获取 点击当前老师的 状态
                //console.log(tcStatus);
                var option={
                    url: '/api/teacher/handle',
                    type:'post',
                    data:{
                        tc_id:tcId,
                        tc_status:tcStatus
                    },
                    success:function(data){
                        if(data.code===200){
                            //data.result.tc_status 就是后端 修改后讲师的状态 根据这个状态 来显示 是注销还是 启用
                            var str=data.result.tc_status===0?'注销':'启用';
                            //把每次 点击后的 讲师的新状态 保存到 $tr 中  下次 点击 a 标签时 再次要用到
                            $tr.attr('tc-status',data.result.tc_status)
                            $this.text(str);
                        }
                    }

                }
                $.ajax(option)


            })
        }

        //    传入 出生日期 获取年龄
        function getAge(birth) {
            var birthYear = new Date(birth).getFullYear();
            var nowYear = new Date().getFullYear();
            return nowYear - birthYear;
        }

        //    使用过滤器 让所有的模板 都可以使用 getTecAge 这个方法
        template.defaults.imports.getTecAge = getAge;
    })
})