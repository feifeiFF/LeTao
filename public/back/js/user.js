$(function () {
    var currentPage=1;
    var pageSize=5;
    var total=0;

    //首次渲染
    render();
    //发送 ajax 请求，请求每一页的数据
    function render(){
        $.ajax({
            data: {
                page:currentPage ,
                pageSize: pageSize
            },
            url: "/user/queryUser",
            type: "get",
            dataType: "json",
            success: function (info) {
                console.log(info);
                $("tbody").html(template("tmp", info));
                total=info.total;
                currentPage=info.page;


                // 设置分页，使用分页插件
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,  //这个分页插件基于bootstrap ，对应的 bootstrp  的版本。
                    currentPage: currentPage,            //当前页
                    totalPages: Math.ceil(total/pageSize),              //总页数
                    size: "small",              //分页组件的大小
                    onPageClicked: function (event, originalEvent, type,page) {
                        //  点击page时候触发,page中存储了当前的页码
                        currentPage=page;
                        render();
                    }
                })

            }
        });
    }


//  点击启用 或者 禁用按钮，让后台处理，前端渲染结果
        //   1--点击的是哪个用户的需要存储id值
        //   2--点击的时候弹出模态框，确认修改吗？
        //   3--事件委托，动态生成的而且是很多个，每个都注册很麻烦，委托给父元素比较方便。
        $("tbody").on("click",".btn",function () {
            $('#user_modal').modal('show');
            var  id=$(this).parent().data("id");
            //判断禁用还是启用
            var isDelete= $(this).hasClass("btn-danger") ? 0:1;
            //发送 ajax 请求 ，
            $(".btn_update").click(function () {
                 $.ajax({
                    type:"post",
                    url:"/user/updateUser",
                     data:{
                        id:id,
                         isDelete:isDelete
                     },
                     dataType: "json",
                     success:function (info) {
                         // 更新成功，重新渲染用户数据
                         if(info.success){
                             $('#user_modal').modal('hide');
                              render();
                         }
                         if(info.error){
                             $('#user_modal').modal('hide');
                         }
                     }

                 })
            })

        })

});