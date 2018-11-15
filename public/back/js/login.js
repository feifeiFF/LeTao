$(function () {
    /*
    * 1. 进行表单校验配置
    *    校验要求:
    *        (1) 用户名不能为空, 长度为2-6位
    *        (2) 密码不能为空, 长度为6-12位
    * */


//  初始化表单校验插件
    $("#form").bootstrapValidator({
        //指定校验时的图标显示，默认是 bootstrap 风格。
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        //校验username  password
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空哦！"
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须在2-6位呦!"
                    },
                    callback:{
                         message: "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空哦！"
                    },
                    stringLength: {
                        min: 4,
                        max: 16,
                        message: "密码为6-16位呦！"
                    },
                    callback:{
                         message: '密码错误'
                    }
                }
            }
        }

    })


    $("#form").on('success.form.bv', function (e) {
        //阻止表单默认的提交事件
        e.preventDefault();
        //发送ajax 请求
        $.ajax(
            {
                type: "post",
                url: "/employee/employeeLogin",
                data: $("#form").serialize(),
                dataType: "json",
                success: function (info) {

                    // console.log(info);
                    if (info.success) {
                        location.href = "index.html";
                    }

                    if (info.error === 1000) {
                        $("#form").data("bootstrapValidator").updateStatus('username',"INVALID","callback");

                    }
                    if (info.error === 1001) {
                        $("#form").data("bootstrapValidator").updateStatus('password',"INVALID", "callback");
                    }

                }

            }
        );

        $('[type="reset"]').click(function () {
            $("#form").data('bootstrapValidator').resetForm();
        })
    })



});