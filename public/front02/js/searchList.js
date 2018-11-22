$(function () {
     // 1  --  获取本地历史记录
     function  getHisetory() {
         var jsonStr=localStorage.getItem("search_list")||"[]";
         var arr= JSON.parse(jsonStr);
         return arr;
     }

     // 2--  渲染历史记录
    renderHistory();
      function  renderHistory() {
          var arr  = getHisetory();
          $(".history").html(template("historyTmp",{ list:arr }));

      }

  // 3--清空历史记录
   $(".btn_empty").click(function () {
      var jsonStr = localStorage.removeItem("search_list");  //移除历史记录
      var arr=getHisetory();                           // 把历史记录取出，存入数组
      renderHistory()

   })

})