/*
 * @Author: lzm
 * @Date: 2021-11-19 19:42:17
 * @Notes: 使用built命令快速得到一些常用的snippets,右击py文件可以preview代码
 * @LastEditTime: 2021-11-20 13:13:05
 */
//vue
const mapForm = new Vue({
    //
    el: '#app',
    data() {
        return {
            //默认初始化，动态绑定
            input1: '',
            input2: '',
        }
    },
    methods: {
    }
});
// 百度地图API功能 初始化地图
var map = new BMapGL.Map("allmap");
//调用函数
setMap();
//公共控件  封装到getMap函数  var与const的区别，可自行百度查阅
function setMap() {
    //设置地图样式 dark
    function changeThemeDark() { map.setMapStyle({ style: "dark" }); }

    //鼠标滚动缩放
    map.enableScrollWheelZoom(true);

    // 添加比例尺控件
    var scaleCtrl = new BMapGL.ScaleControl();
    map.addControl(scaleCtrl);

    // 添加比例尺控件
    var zoomCtrl = new BMapGL.ZoomControl();
    map.addControl(zoomCtrl);

    // 添加3D控件
    var navi3DCtrl = new BMapGL.NavigationControl3D();
    map.addControl(navi3DCtrl);

    // 创建城市选择控件
    var cityControl = new BMapGL.CityListControl({
        // 控件的停靠位置（可选，默认左上角）
        anchor: BMAP_ANCHOR_TOP_LEFT,
        // 控件基于停靠位置的偏移量（可选）
        offset: new BMapGL.Size(10, 5)
    });
    // 将控件添加到地图上
    map.addControl(cityControl);

    var cr = new BMapGL.CopyrightControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        offset: new BMapGL.Size(10, 25)
    });   //设置版权控件位置
    map.addControl(cr); //添加版权控件
    var bs = map.getBounds();   //返回地图可视区域
    cr.addCopyright({
        id: 1,
        content: "<img src='img/logo.png' width='50px' height='50px'/><a href='index.html' target='_blank' style='font-size:12px;color:gray;text-decoration: none;'>@张家界旅心网</a>",
        bounds: bs
    });

    var menu = new BMapGL.ContextMenu();
    var txtMenuItem = [
        {
            text: '放大一级',
            callback: function () {
                map.zoomIn();
            }
        }, {
            text: '缩小一级',
            callback: function () {
                map.zoomOut();
            }
        }
    ];
    for (var i = 0; i < txtMenuItem.length; i++) {
        menu.addItem(new BMapGL.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));
    }
    map.addContextMenu(menu);

    map.addEventListener('click', function (e) {
        alert('点击位置经纬度：' + e.latlng.lng.toFixed(3) + ',' + e.latlng.lat.toFixed(3));
    });

    // 创建定位控件
    var locationControl = new BMapGL.LocationControl({
        // 控件的停靠位置（可选，默认左上角）
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        // 控件基于停靠位置的偏移量（可选）
        offset: new BMapGL.Size(20, 20)
    });
    // 将控件添加到地图上
    map.addControl(locationControl);

    // 添加定位事件
    locationControl.addEventListener("locationSuccess", function (e) {
        var address = '';
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        alert("当前定位地址为：" + address);
    });
    locationControl.addEventListener("locationError", function (e) {
        alert(e.message);
    });
}
//初始化地图,用城市名设置地图中心点，显示比例级别
var point = new BMapGL.Point(110.469578, 29.144397);
map.centerAndZoom(point, 15);
function showSH() { map.centerAndZoom("张家界", 14); }
function theLocation() {
    var city = document.getElementById("cityName").value;
    if (city != "") {
        map.centerAndZoom(city, 14);      // 用城市名设置地图中心点，显示比例级别
    }
}
//设置版权偏移
// map.setCopyrightOffset();

// 创建添加点标记
var marker = new BMapGL.Marker(new BMapGL.Point(110.46966, 29.144162));
map.addOverlay(marker);

// 创建图文信息窗口
var sContent = `<h4 style='margin:0 0 5px 0;'>吉首大学张家界校区</h4>
    <img style='float:right;margin:0 4px 22px' id='imgDemo' src='img/zjjxq.jpg' width='139' height='104'/>
    <p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>
    坐落于世界旅游知名旅游城市张家界，有着武陵源，天门山，黄龙洞，玻璃桥等世界知名景点，热情张家界欢迎你！
    </p></div>`;
var infoWindow = new BMapGL.InfoWindow(sContent);
// marker添加点击事件
marker.addEventListener('click', function () {
    this.openInfoWindow(infoWindow);
    // 图片加载完毕重绘infoWindow
    document.getElementById('imgDemo').onload = function () {
        infoWindow.redraw(); // 防止在网速较慢时生成的信息框高度比图片总高度小，导致图片部分被隐藏
    };
});

// 自定义中心点，自定义两地的驾车路线
map.centerAndZoom(new BMapGL.Point(110.470, 29.144), 14);

const p1 = new BMapGL.Point(110.471, 29.172);
const p2 = new BMapGL.Point(110.470, 29.144);
const driving = new BMapGL.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true } });
driving.search(p1, p2);

//执行点击事件时，调用get()方法，重新加载map地图，关于setMap函数不能复用的原因，是由于调用外部函数会执行两次,位置放置前后也不能解决
function get() {
    var map = new BMapGL.Map("allmap");
    //已实现外部函数的复用
    // function getMap() {
    // }
    //调用外部函数
    function getMap() {
        //设置地图样式 dark
        function changeThemeDark() { map.setMapStyle({ style: "dark" }); }
    
        //鼠标滚动缩放
        map.enableScrollWheelZoom(true);
    
        // 添加比例尺控件
        var scaleCtrl = new BMapGL.ScaleControl();
        map.addControl(scaleCtrl);
    
        // 添加比例尺控件
        var zoomCtrl = new BMapGL.ZoomControl();
        map.addControl(zoomCtrl);
    
        // 添加3D控件
        var navi3DCtrl = new BMapGL.NavigationControl3D();
        map.addControl(navi3DCtrl);
    
        // 创建城市选择控件
        var cityControl = new BMapGL.CityListControl({
            // 控件的停靠位置（可选，默认左上角）
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // 控件基于停靠位置的偏移量（可选）
            offset: new BMapGL.Size(10, 5)
        });
        // 将控件添加到地图上
        map.addControl(cityControl);
    
        var cr = new BMapGL.CopyrightControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT,
            offset: new BMapGL.Size(10, 25)
        });   //设置版权控件位置
        map.addControl(cr); //添加版权控件
        var bs = map.getBounds();   //返回地图可视区域
        cr.addCopyright({
            id: 1,
            content: "<img src='img/logo.png' width='50px' height='50px'/><a href='index.html' target='_blank' style='font-size:12px;color:gray;text-decoration: none;'>@张家界旅心网</a>",
            bounds: bs
        });
    
        var menu = new BMapGL.ContextMenu();
        var txtMenuItem = [
            {
                text: '放大一级',
                callback: function () {
                    map.zoomIn();
                }
            }, {
                text: '缩小一级',
                callback: function () {
                    map.zoomOut();
                }
            }
        ];
        for (var i = 0; i < txtMenuItem.length; i++) {
            menu.addItem(new BMapGL.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));
        }
        map.addContextMenu(menu);
    
        map.addEventListener('click', function (e) {
            alert('点击位置经纬度：' + e.latlng.lng.toFixed(3) + ',' + e.latlng.lat.toFixed(3));
        });
    
        // 创建定位控件
        var locationControl = new BMapGL.LocationControl({
            // 控件的停靠位置（可选，默认左上角）
            anchor: BMAP_ANCHOR_TOP_RIGHT,
            // 控件基于停靠位置的偏移量（可选）
            offset: new BMapGL.Size(20, 20)
        });
        // 将控件添加到地图上
        map.addControl(locationControl);
    
        // 添加定位事件
        locationControl.addEventListener("locationSuccess", function (e) {
            var address = '';
            address += e.addressComponent.province;
            address += e.addressComponent.city;
            address += e.addressComponent.district;
            address += e.addressComponent.street;
            address += e.addressComponent.streetNumber;
            alert("当前定位地址为：" + address);
        });
        locationControl.addEventListener("locationError", function (e) {
            alert(e.message);
        });
    }
    getMap();

    //根据id获取属性值
    var map1 = document.getElementById("map1").value;
    var map2 = document.getElementById("map2").value;

    //测试数据，得知获取的是 类似 110.458,29.158 格式的数据，中间有逗号，所以是字符串，可以使用split对字符串进行分割成数组
    // console.log(map1, map2);
    //设置路线显示中心点，这段代码不能省略，否则204行的alert会执行两次
    map.centerAndZoom(new BMapGL.Point(map1.split(',')[0] + 0.5, map1.split(',')[1] + 0.5), 12);

    //计算驾车路线时间和距离 由于现在无法实现用户输入两地自动获取其坐标，只能借助百度拾取坐标系统或者通过控件变相实现
    var output = "";
    var searchComplete = function (results) {
        console.log('测试1');
        if (transit.getStatus() != BMAP_STATUS_SUCCESS) {
            return;
        }
        else {
            //将数据传递到html页面
            var jctime = results.getPlan(0).getDuration(true);
            var stime = document.getElementById("time");
            stime.innerHTML = jctime;
            var jcdistance = results.getPlan(0).getDistance(true)
            var sdistance = document.getElementById("distance");
            sdistance.innerHTML = jcdistance;
            //获取时间-获取距离
            output = "此次驾车需要" + jctime + "\n" + "总路程为：" + jcdistance + "\n";
            console.log('测试2');
        }
    }
    //
    var transit = new BMapGL.DrivingRoute(map, {
        renderOptions: { map: map, autoViewport: true },
        onSearchComplete: searchComplete,
        onPolylinesSet() {
            //可以通过alert弹出相应信息，使用settimeout进行延时
            // setTimeout(function () { alert(output) }, "3000");
        }
    });
    //动态获取用户输入的两地坐标
    var start = new BMapGL.Point(map1.split(',')[0], map1.split(',')[1]);
    var end = new BMapGL.Point(map2.split(',')[0], map2.split(',')[1]);
    transit.search(start, end);
}

/*
总结：功能需求，具体实现，问题解决、功能完善
功能需求：
1.调用百度api实现旅游路线的规划，如何调用百度api请参考https://lbsyun.baidu.com/
2.添加自定义控件    https://lbsyun.baidu.com/index.php?title=open/jsdemo    注意区分BMapGL 和 BMap 的区别，前者无法实现点击图标显示百度地图自带的附属信息 详情参考文档 https://www.jianshu.com/p/1b99444f9a70
3.针对驾车路线和时间距离进行动态获取（如果你想从服务器传递数据，那就更加可以完善这个功能了，可惜我不会，也不想）

具体实现：
利用js获取表单信息，然后传递给html；本来想用vue，但是突然发现vue的方法无法被js所调用，就算被调用也要通过js的onclick事件进行操作
本人vue学习的不是很好，不会使用vue的watch方法进行监测，同时百度地图api是基于js迪欧调用的，很难将百度api的代码放到vue的方法里面
对于外部ui，大家可以使用以下element ui (不过这个需要与vue.js对应版本并结合使用)

问题解决：
1.动态数据获取并随时刷新：利用onclick事件监听，每提交一次就重新刷新map地图，这样可以解决外部与get互不冲突，并且不会保留原有的起始点和终点的路线信息
2.对数据的分割和截取处理，利用js的split方法
3.将数据传递到html，使用innerhtml
4.对坐标信息进行小数点截取，利用toFixed()方法
功能完善：
暂无法实现让用户直接输入两地城市名来自动获取坐标，如有大佬看见，给我推荐一个有效的解决办法，或者提供新思路，如何将百度拾取坐标系统调用
或者通过自建json数据，指定24个城市之间的坐标信息，然后间接实现部分功能，关于json数据得获取可以直接用python批量获取，可以去网上找源码

相关资源：
驾车路线模板：https://lbsyun.baidu.com/jsdemo.htm#sLngLatSearchPath
*/

