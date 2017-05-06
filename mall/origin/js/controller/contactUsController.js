define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/contactUs.css"],function(){
			var mapPoint = {
				"bj" : {"x" : "116.495716","y" : "40.00536"},
				"sz" : {"x" : "113.960124","y" : "22.547718"}
			};
			//地图初始化
			function initMap(x,y){
				var map = new BMap.Map("containerbox");
				map.centerAndZoom(new BMap.Point(x,y),22);
				map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
				map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用

				map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
				map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
				var marker = new BMap.Marker(new BMap.Point(x,y));
				map.addOverlay(marker); 
				map.panTo(x,y); 
			}
			initMap(mapPoint.sz.x,mapPoint.sz.y);
			
			/*
			* 深圳北京地图切换
			 */
			$(".contus-region").on("click","a",function(){
				var ths = $(this),
					thsMap = ths.attr("mapFor");
				ths.addClass("active").siblings().removeClass("active");
				initMap(mapPoint[thsMap].x,mapPoint[thsMap].y);
			});

		});

	}
});