define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/fuzefans.css"],function(){
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
			initMap("116.446985","39.927553");
		});
	}
});