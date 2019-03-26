function render(rawData) {
    var data = splitData(rawData);
    var lang =localStorage.getItem("lang");
    if(lang=="zh-CN"){
        var downColor = '#25d441';// 00da3c 绿
        var upColor = '#ff4465';//  ec0000 红
    }else{
        var downColor = '#ff4465';// 00da3c 红
        var upColor = '#25d441';//  ec0000 绿
    }
    
    function splitData(rawData) {
        // console.log(rawData)
        var categoryData = [];
        var values = [];
        var volumes = [];
        for (var i = 0; i < rawData.length; i++) {
            // console.log(rawData[i].splice(0, 1)[0])
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i]);
            volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
        }

        return {
            categoryData: categoryData,
            values: values,
            volumes: volumes
        };
    }
    // console.log(data.categoryData)

    function calculateMA(dayCount, data) {
        //console.log(dayCount,data);
        var result = [];
        for (var i = 0, len = data.values.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += parseFloat(data.values[i - j][1]);
            }
            result.push(+(sum / dayCount).toFixed(3));
        }
        //console.log(result);
        return result;
    }

    var option = {
        backgroundColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: 'transparent'     // 0% 处的颜色
            }, {
                offset: 1, color: 'transparent'     // 100% 处的颜色
            }],
            global: false                       // 缺省为 false
        },   
        animation: true,
        legend: {
            show: true,     // 是否展示
            top: '1%',     // 上边距
            left: 'left',   // 左边距
            padding: 10,    // 内边距
            itemWidth: 0,   // 图例图片宽度
            itemHeight: 0,  // 图例图片高度
            textStyle : { backgroundColor : 'rgba(0,0,0,0)' },
            selected: {},                       // 设置某项是否展示     //'MA30': false,
            selectedMode: true,                 // 图例选择的模式       true false 'single' 'multiple'
            borderColor : 'rgba(0,0,0,0)',      // 图例描边的颜色
            inactiveColor: '#fff',              // 图例关闭时的颜色
            backgroundColor : 'transparent',    // 图例背景的颜色
            data: [ {name: "MagicCube", textStyle: { color: '#3d80cd' } },{name: 'MA05', textStyle: { color: '#ecd899' } },{name: 'MA10', textStyle: { color: '#7fcec0' } }, {name: 'MA30', textStyle: { color: '#c294f7' } }],// 'MA20',
        },
        brush: {
            xAxisIndex: 'all',
            brushLink: 'all',
            outOfBrush: {
                colorAlpha: 0.1
            }
        },
        toolbox: {
            show: false,
            feature: {
                dataZoom: {
                    yAxisIndex: false
                },
                brush: {
                    type: ['lineX', 'clear']
                }
            }
        },
        tooltip: {
            confine: true,
            trigger: 'axis',
            padding: 10,
            hideDelay : 0,
            triggerOn: 'mousemove',
            textStyle: { color: '#fff' },
            axisPointer: {
                type: 'cross',
                label: {
                    color: '#fff',
                    shadowBlur: 0,
                    borderWidth: 1,
                    borderColor: '#7286a5',
                    backgroundColor: '#0c1723',
                },
            },
            borderWidth: 1,
            borderColor: '#7286a5',
            backgroundColor: 'rgba(12, 23, 35, 1)',

            formatter: function (params) {
                var param = {};
                params.forEach(function(item) {
                    if(item.seriesName.search("series") != -1) {
                        param = item;
                    }
                });
                return [
                    "时间：" + param.name + '<hr size=1 style="margin: 3px 0">',
                    "开盘价：" + param.data[1] + '<br/>',
                    "收盘价：" + param.data[2] + '<br/>',
                    "最低价：" + param.data[3] + '<br/>',
                    "最高价：" + param.data[4] + '<br/>',
                    "交易量："+ param.data[5] + '<br/>',
                ].join('');
            },
            // position: function (pos, params, el, elRect, size) {
            //     var obj = { top: 10 };
            //     obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            //     return obj;
            // }
        },
        axisPointer: {
            link: {xAxisIndex: 'all'},
            label: {
                backgroundColor: '#777'
            }
        },
        visualMap: {
            show: false,
            seriesIndex: 5,
            dimension: 2,
            pieces: [{
                value: 1,
                color: downColor
            }, {
                value: -1,
                color: upColor
            }]
        },
        grid: [{
            left: "1%",
            top: '10%',
            right: '13%',
            height: '65%'
        },
        {
            left: "1%",
            right: '13%',
            top: '75%',
            height: '15%'
        }],

        xAxis: [
            {
                type: 'category',               // k线为 category：类目轴，time： 时间轴，value：数值轴，log：对数轴
                data: data.categoryData,        // 类目数据，在类目轴（type: 'category'）中有效。具体展示数据                 
                min: 'dataMin',                 // 坐标轴刻度最小值。取数据在该轴上的最小值作为最小刻度。
                max: 'dataMax',                 // 坐标轴刻度最大值。取数据在该轴上的最大值作为最大刻度。
                boundaryGap : false,            // true: 刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。

                axisLine: { onZero: false, lineStyle: { color : '#263247', } },     // 坐标轴轴线相关设置。
                axisTick: { show: false, alignWithLabel: true },                    // 坐标轴刻度相关设置。 因我将两个图表放在一起，所以将k线的x轴刻度线隐藏掉。
                axisLabel: { show: false },                                         // 坐标轴刻度标签的相关设置。 因我将两个图表放在一起，所以将k线的x轴刻度标签隐藏掉。
                splitLine: { show: true, lineStyle: { color: '#263247', }, },       // x轴在图表区域展示分割线，x轴为竖线
                axisPointer: { z: 100, label: { show: false, }, },                  // 因为我将两个图表是连在一起的，所以k线的x轴文本展示关闭掉，否则会重复提示。 
            },
            {
                type: 'category',               // 同上
                min: 'dataMin',                 // 同上
                max: 'dataMax',                 // 同上
                data: data.categoryData,        // 同上
                gridIndex: 1,                   // 默认为0时，位列x轴所在索引第一位，此时为第二个表所以索引为1.
                boundaryGap : false,            // 同上

                axisLine: { onZero: false, lineStyle: { color : '#263247', } },     // 同上
                axisTick: { show: true, },                                          // 同上
                axisLabel: { color : '#7286a5', },                                  // 同上
                splitLine: { show: true, lineStyle: { color: '#263247' } },         // 同上
                axisPointer: { z: 100 }                                             // 同上
            }
        ],
        yAxis: [
            {
                scale: true,                    // 默认 type 为 value类型， scale只在 type：‘value’中才有效。 是否是脱离 0 值比例 true：坐标刻度不会强制包含零刻度。
                position: 'right',              // 轴线位置，靠紧某一侧  left  or  right
                boundaryGap : false,            // true: 刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。
                
                axisLine: { onZero: false, lineStyle: { color : '#263247', } },     // 同上
                axisTick: { show: false, },                                         // 同上 刻度不显示
                axisLabel: { color : '#7286a5', },                                  // 刻度线标签文本设置
                splitLine: { show: true, lineStyle: { color: '#263247' } },         // y轴在图表区域展示分割线，y轴为横线
                axisPointer: { z: 100 }                                             // y轴深度，最上层
                
            },
            {
                scale: true,
                position: 'right',
                gridIndex: 1,                   // 默认为0时，位列y轴所在索引第一位，此时为第二个表所以索引为1.
                splitNumber: 1,                 // 区域展示分割数，默认 5 分割五块
                boundaryGap : false,            // true: 刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。

                axisLine: { onZero: false, lineStyle: { color : '#263247', } },     // 坐标轴轴线相关设置。
                axisTick: { show: false },                                          // 同上 刻度不显示
                axisLabel: { show: false, color : '#7286a5', },                     // 刻度线标签文本设置
                splitLine: { show: true, lineStyle: { color: '#263247' } },         // y轴在图表区域展示分割线，y轴为横线
                axisPointer: { z: 100 }                                             // y轴深度，最上层
            }
        ],
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 0,
                end: 100
            },
            {
                show: false,
                xAxisIndex: [0, 1],
                type: 'slider',
                top: '85%',
                start: 98,
                end: 100
            }
        ],
        series: [
            {
                type: 'candlestick',
                data: data.values,
                large: true,
                barMaxWidth: 20,
                itemStyle: {
                    normal: {
                        color: upColor,
                        color0: downColor,
                        borderColor: null,
                        borderColor0: null
                    }
                },
            },
            {
                name: 'MA05',
                type: 'line',
                data: calculateMA(5, data),
                smooth: true,
                symbol: 'none',
                showSymbol: false,      // 展示线性图表中的链接点
                itemStyle: {
                    normal: {
                        color: '#f1dc9c',opacity: 1}
                }
            },
            {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10, data),
                smooth: true,
                symbol: 'none',         // 线性图表中的链接点样式  'emptyCircle' 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                showSymbol: false,      // 展示线性图表中的链接点
                itemStyle: {
                    normal: { color: '#7fcec0', opacity: 1}
                }
            },
            // {
            //     name: 'MA20',
            //     type: 'line',
            //     data: calculateMA(20, data),
            //     symbol: 'none',         // 线性图表中的链接点样式  'emptyCircle' 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            //     showSymbol: false,      // 展示线性图表中的链接点
            //     smooth: true,
            //     itemStyle: {
            //         normal: { color: '#3d80cd', opacity: 1}
            //     }
            // },
            {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30, data),
                symbol: 'none',         // 线性图表中的链接点样式  'emptyCircle' 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                showSymbol: false,      // 展示线性图表中的链接点
                smooth: true,
                itemStyle: {
                    normal: { color: '#c294f7', opacity: 1}
                }
            },
            {
                name: 'Volume',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data.volumes,
                barMaxWidth: 20,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList;
                            if (data.volumes[params.dataIndex][2] < 0) {
                                colorList = upColor;
                            } else {
                                colorList = downColor;
                            }
                            return colorList;
                        },
                    }
                }
            }
        ]
    }


    return option;
}
 
 export default render