$(function () {


// 基于准备好的dom，初始化echarts实例
    var echars_left = echarts.init(document.querySelector(".echars_left"));

// 指定图表的配置项和数据
    var option = {
        //图标标题
        title: {
            text: '2018年注册人数'
        },
        //提示框组件
        tooltip: {
            //数据项触发 适合饼，条状图
            trigger: "item"
            //坐标轴触发 ，适合折线图等
            // trigger:"axis"
        },
        //图例
        legend: {
            data: ['人数', "销量"]
        },
        //X 轴的数据
        xAxis: {
            data: ["一月", "二月", "三月", "四月", "五月", "六月"]
        },
        //y 轴的数据 ，根据数据的多少自己调整
        yAxis: {},
        //数据
        series: [{
            name: '人数',
            type: 'bar',
            data: [1000, 1200, 1500, 1110, 1000, 800]
        },
        {
            name: '销量',
            type: 'bar',
            data: [1000, 1200, 1500, 1110, 1000, 800]
        }
        ]
    };

// 使用刚指定的配置项和数据显示图表。
    echars_left.setOption(option);// 基于准备好的dom，初始化echarts实例


//右边的饼状图
    var echars_right = echarts.init(document.querySelector(".echars_right"));

// 指定图表的配置项和数据
    option = {
        //图表的标题部分
        title: {
            text: '热门品牌销售',
            subtext: '2018年11月',
            //水平向哪个方向
            x: 'center'
        },
        //提示框组件
        tooltip: {
            trigger: 'item',
            //{a} 系列项名称   {b} 数据项名称    {c}数据项数值   {d}百分比
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        //图例
        legend: {
            //图例方向 horizontal 表示水平    vertical 表示垂直
            orient: 'vertical',
            //图例的位置
            left: 'left',
            //图例的数据项
            data: ['耐克', '阿迪', '新百伦', '李宁', '阿迪王']
        },
        //系列项
        series: [
            {
                name: '销量',
                type: 'pie',
                radius: '55%',
                //图标坐标
                center: ['50%', '60%'],
                data: [
                    {value: 335, name: '耐克'},
                    {value: 310, name: '阿迪'},
                    {value: 234, name: '新百伦'},
                    {value: 135, name: '李宁'},
                    {value: 1548, name: '阿迪王'}
                ],
                //hover 上去的样式
                itemStyle: {
                    emphasis: {
                        shadowBlur: 50,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(12, 0, 22, 0.5)'
                    },

                }
            }
        ]
    };


// 使用刚指定的配置项和数据显示图表。
    echars_right.setOption(option);


})