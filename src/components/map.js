import React from 'react';
import '../styles/map.css';

class VisitorMap extends React.Component {

    componentDidMount() {
        var echarts = require('echarts/lib/echarts');
        require('echarts/lib/chart/map');
        require("echarts/lib/chart/scatter");
        require("echarts/lib/component/geo");
        require("echarts/lib/component/title");
        require("echarts/lib/component/visualMap");
        require("echarts/lib/component/toolbox");

        fetch('http://api.wangluyuan.cc/visit/result').then(response => response.json()).then((visitor_records) => {
            fetch('http://share.luyuan.wang/geojson/world-map.json').then(response => response.json()).then((data) => {

                var option = {
                    backgroundColor: '#404a59',
                    title: {
                        text: 'Visitor Map',
                        left: 'right',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        top: 'bottom',
                        left: 'right',
                        data:['pm2.5'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'left',
                        top: 'top',
                        feature: {
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 30,
                        splitNumber: 5,
                        color: ['#d94e5d','#eac736','#50a3ba'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    geo: {
                        map: 'world-map',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#323c48',
                                borderColor: '#111'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        },
                        roam: true,
                        scaleLimit: { //滚轮缩放的极限控制
                            min: 1,
                            max: 4
                        },
                        zoom: 1,
                    },
                    series: [
                        {
                            name: 'Count',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            symbolSize: 12,
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                emphasis: {
                                    borderColor: '#fff',
                                    borderWidth: 1
                                }
                            },
                        }
                    ]
                };
            
                var worldMap = echarts.init(document.getElementById('global-map'));
                echarts.registerMap('world-map', data);
            
                option.series[0].data = visitor_records.data;
                option.title.text = "Visitor Map - World";
                worldMap.setOption(option);
            });

            fetch('http://share.luyuan.wang/geojson/china.json').then(response => response.json()).then((data) => {

                var option = {
                    backgroundColor: '#404a59',
                    title: {
                        text: 'Visitor Map',
                        left: 'right',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        top: 'bottom',
                        left: 'right',
                        data:['pm2.5'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'left',
                        top: 'top',
                        feature: {
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 30,
                        splitNumber: 5,
                        color: ['#d94e5d','#eac736','#50a3ba'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    geo: {
                        map: 'world-map',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#323c48',
                                borderColor: '#111'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        },
                        roam: true,
                        scaleLimit: { //滚轮缩放的极限控制
                            min: 1,
                            max: 4
                        },
                        zoom: 1,
                    },
                    series: [
                        {
                            name: 'Count',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            symbolSize: 12,
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                emphasis: {
                                    borderColor: '#fff',
                                    borderWidth: 1
                                }
                            },
                        }
                    ]
                };

                var chinaMap = echarts.init(document.getElementById('china-map'));
                echarts.registerMap('world-map', data);
            
                option.series[0].data = visitor_records.data;
                option.title.text = "Visitor Map - China";
                chinaMap.setOption(option);
            });
        });
        
    }
    render() {
        return(
            <div className="wrapper">
                <div id="global-map" className="map-world"></div>
                <div id="china-map" className="map-world"></div>
            </div>
        );
    }
}

export default VisitorMap;