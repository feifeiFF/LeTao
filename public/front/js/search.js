$(function () {
// 0 -- 要渲染历史记录，首先读取历史记录，
      //手动存储  localStorge ，约定键名 search_list
    // 将来下面三句话, 可以放在控制台执行, 进行假数据初始化
    // var arr = [ "耐克", "李宁", "新百伦", "耐克王", "阿迪王" ];
    // var jsonStr = JSON.stringify( arr );
    // localStorage.setItem( "search_list", jsonStr );


// 1 -- 历史记录渲染
    // 读取本地历史记录，得到 jsonStr ，
    // 将  jsonStr 转为 复杂数据类型  JSON.parse(jsonStr)
    // 通过数组，进行页面渲染（模版引擎）

    getHistory();
    //  用于获取历史记录
   function  getHistory() {
       var jsonStr=localStorage.getItem("search_list");
       var arr=JSON.parse(jsonStr);
       // console.log(arr);
       return arr;
   }

    render();
   //  渲染历史记录
    function  render() {
      var arr =  getHistory();
      $(".history").html(template("historyTmp",{ list:arr }) );
    }


    // 2 -- 清空历史记录
    $(".history").on("click",".btn-empty",function () {
        mui.confirm ("您确定清空历史记录？","温馨提示",["取消" ,"确认"],function (e) {
            //  事件对象 e 中存储了 取消0  或者  确认1
            // console.log(e);
             if(e.index==1){
                 localStorage.removeItem("search_list");
                 render();
             }
        })
    });


    // 3 -- 删除单条历史记录
       //  a. 事件委托绑定点击事件（ 动态生成的 i   ）
       //  b  为了区分那一条数据，将下标存储在删除按钮中
       //  c  读取本地存储，将其转换为数组，获取索引
       //  d  根据索引删除对应的 历史记录
       //  e  将数组转化为字符串，
       //  f  存储到本地中
       //  g  重新渲染历史记录  ( 如果全部删除完，就是数组的长度为0 ，如果数组长度大于0 ，渲染数据，否则提示用户没有数据 )

      $(".history").on("click",".btn_delete",function () {
           var that = this;
          mui.confirm ("您确定清空历史记录？","温馨提示",["取消" ,"确认"],function (e) {
              //  事件对象 e 中存储了 取消0  或者  确认1
              // console.log(e);
              if(e.index==1){
                  var index=$(that).data("id");               // 获取对应的索引值
                  // alert(index);
                  var arr =  getHistory();                   // 获取历史记录，转换为了数组
                  arr.splice(index,1);                       // 删除从索引开始的一条记录
                  var strJson=JSON.stringify(arr);           // 转为字符串
                  localStorage.setItem("search_list",strJson);    //存储到本地
                  render();                                  //   根据本地存储重新渲染页面
              }
          })

      });


      //4 -- 为搜素按住注册单击事件， 添加搜索记录
        // a 为搜索按钮注册点击事件
        // b  获取搜索框的内容
        // c  读取本地存储，拿到数组，
        // d  将搜索框的获取的内容添加到数组的最前面
        // e 将数组转换为 jsonStr
        // f  将 jsoonStr 存到本地的存储中，重新渲染页面

      $(".btn-search").click(function () {
          var key=$(".ipt-box").val();
          //  如果用户没有输入，阻塞程序执行，提示用户
          if(key.trim()=="") {
              mui.toast("请输入关键字");
              return;

          }
          // 历史记录中如果有重复项，需要将之前的删除，刚输入的添加到最前面
              var arr=getHistory();
              var index=arr.indexOf(key);
             if(  index != -1 ){
                 arr.splice(index,1);  // 删除从  index 开始的一条数据

              }
          // 超过十条历史记录，就删除早期的历史记录
            if(arr.length>10){
                 arr.pop();   // 移除最后一条记录
            }


              arr.unshift(key);
              var  jsonStr=JSON.stringify(arr);
              localStorage.setItem("search_list",jsonStr);
              render();
              $(".ipt-box").val("");


              // 搜索完成，跳转到搜索关键字，需要将 关键字 传递到搜索列表页
               location.href="searchList.html?key="+ key;


      })




})