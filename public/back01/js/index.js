$(function () {


    // 左侧条状图
    var myChart = echarts.init(document.querySelector(".echars_left"));
   // 指定图表的配置项和数据
    var option = {
        // 图表标题
        title: {
            text: '2018年注册人数'
        },
        tooltip: {},
        // 图例
        legend: {
            data:['销量',"人数"]
        },
        // X 轴标题
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        //提示框组件
        series: [{
            name: '销量',
            type: 'bar',
            data: [1005, 1200, 1600, 1210, 1010, 800]
        },
        {
            name: '人数',
            type: 'bar',
            data: [1005, 1200, 1600, 1210, 1010, 800]
        }
        ]
    };
// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);



//右侧饼状图
    var myChart = echarts.init(document.querySelector(".echars_right"));
    option = {
        title : {
            text: '热门品牌销售',
            subtext: '2018年11月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','新百伦','耐克王','匡威']
        },
        series : [
            {
                name: '品牌',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'耐克王'},
                    {value:1548, name:'匡威'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

})