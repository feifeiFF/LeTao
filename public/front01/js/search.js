$(function () {
    // var arr = [ "耐克", "李宁", "新百伦", "耐克王", "阿迪王" ];
    // var jsonStr = JSON.stringify( arr );
    // localStorage.setItem( "search_list", jsonStr );

    // 1 -- 历史记录渲染
    // 读取本地历史记录，得到 jsonStr ，
    // 将  jsonStr 转为 复杂数据类型  JSON.parse(jsonStr)
    // 通过数组，进行页面渲染（模版引擎）
    function  getHistory() {
         var jsonStr=localStorage.getItem("search_list")||"[]";
         var arr=JSON.parse(jsonStr);
         return  arr;
    }
    render();
    function render(){
        var arr=getHistory();
        $(".history").html(template("historyTmp",{ list:arr }));
    }


   //  2 --  清空历史记录
    $(".history").on("click",".btn-empty",function () {
        mui.confirm("您确定清空历史记录？","温馨提示",["取消","确认"],function (e) {
            if(e.index  == 1){
                localStorage.removeItem("search_list");
                render();
            }

        })

    })

    // 3 -- 删除单个记录
    $(".history").on("click",".btn_delete",function () {
        var index= $(this).data("index");    // 获取当前被点击的索引
        var arr=getHistory();                // 获取本地存储的数据，返回的是数组
        arr.splice(index,1);                 // 截取被被点击的这个
        localStorage.setItem("search_list",JSON.stringify(arr));        //将数组转换为 json 字符串，存入本地存储
        render();
    });



    // 功能4: 点击搜索按钮, 添加搜索记录
    // (1) 给 搜索按钮 注册点击事件
    // (2) 获取搜索框的内容
    // (3) 读取本地存储, 拿到数组
    // (4) 将搜索框的内容, unshift 到数组的最前面
    // (5) 将数组转成jsonStr, 存到本地存储中
    // (6) 重新渲染
    $(".btn_search").click(function () {
       var txt = $(".ipt_box").val();
       // 输入框没有内容的话，提示用户输入关键字
       if(txt==""){
           mui.toast("亲输入关键字呦！")
           return;
       }
       var arr = getHistory();
        //  判断是否有重复记录，把当前输入的添加到数组最前面，删除之前的
        var index=arr.indexOf(txt);
        if( index!= -1){
            arr.splice(index,1);  // splice  截取 start开始的 count 个
        }

        //  判断是否大于10条记录，大于的话，删除最早期的
        if(arr.length>=10) {
            arr.pop();
        }

     //  向数组的最前面添加 一条记录
      arr.unshift(txt);
      localStorage.setItem("search_list",JSON.stringify(arr));
      render();

      $(".ipt_box").val("");


    // 跳转到搜索列表页
       location.href="searchList.html?key="+txt;
    })








})