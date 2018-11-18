$(function () {
    //  1 -- 判断用户是否登录成功
    $("#form").bootstrapValidator({
        // 指定校验的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //指定校验的字段
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    stringLength:{
                        min:2,
                        max:6,
                        message:"用户名必须在2-6位"
                    },
                    callback:{
                        message:"用户名不存在"
                    }

                }
            },
            password:{
                validators: {
                    notEmpty: {
                        message:"密码不能为空"
                    },
                    callback:{
                        message:"密码错误"
                    }

                }
            }
        }

    });

// 表单校验成功的时候触发
 $("#form").on("success.form.bv",function (e){
 // 阻止表单默认的提交
        e.preventDefault();
 //  发送 ajax 请求，判断用户是登录成功
        $.ajax({
            url:"/employee/employeeLogin",
            type:"post",
            dataType:"json",
            data:$("#form").serialize(),
            success:function (info) {
                if(info.success){
                     location.href="index.html";
                }
                if(info.error === 1000){
                     $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }
                if(info.error === 1001 ){
                     $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
                }
            }
        })

 });


// 2 --  点击重置按钮的时候重置内容以及校验状态
     $('[type="reset"]').click(function () {
          $("#form").data("bootstrapValidator").resetForm();
     })





})