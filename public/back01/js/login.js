$(function () {
   // 校验表单
   $("#form").bootstrapValidator({
       //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
       excluded: [':disabled', ':hidden', ':not(:visible)'],

       //2. 指定校验时的图标显示，默认是bootstrap风格
       feedbackIcons: {
           valid: 'glyphicon glyphicon-ok',
           invalid: 'glyphicon glyphicon-remove',
           validating: 'glyphicon glyphicon-refresh'
       },

       //3. 指定校验字段
       fields: {
           //校验用户名，对应name表单的name属性
           username: {
               validators: {
                   //不能为空
                   notEmpty: {
                       message: '用户名不能为空'
                   },
                   //长度校验
                   stringLength: {
                       min: 2,
                       max: 6,
                       message: '用户名长度必须在2到6之间'
                   },
                   callback:{
                        message:"用户名不存在"
                   }
               }
           },
           //校验用户密码，对应name表单的name属性
           password: {
               validators: {
                   //不能为空
                   notEmpty: {
                       message: '密码不能为空'
                   },
                   //长度校验
                   stringLength: {
                       min: 6,
                       max: 12,
                       message: '密码长度必须在6到12之间'
                   },
                  //回调函数
                   callback:{
                       message:"密码错误！"
                   }
               }
           }
       }
   } );

//当表单校验成功时，会触发success.form.bv事件，此时会提交表单
    $("#form").on('success.form.bv', function (e) {
        // 阻止表单默认的提交事件
        e.preventDefault();

        //使用ajax提交逻辑
        $.ajax({
            data:$("#form").serialize(),
            dataType:"json",
            url:"/employee/employeeLogin",
            type:"post",
            success:function (info) {
                if(info.success){
                     location.href="index.html";
                }
                if(info.error===1000){
                  // 用户名错误
                  //   alert("用户名错误");
                    $("#form").data('bootstrapValidator').updateStatus("username","INVALID","callback");
                }
                if(info.error===1001){
                  //密码错误
                  //   alert("密码错误");
                    $("#form").data('bootstrapValidator').updateStatus("password","INVALID","callback");
                }

            }

        })
    });


//  点击重置按钮，重置表单以及校验结果
$('[type="reset"]').click(function () {
    $("#form").data('bootstrapValidator').resetForm();
})


});