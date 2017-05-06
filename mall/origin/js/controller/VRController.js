define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/VR.css"],function(){
			//图片动画效果
			$(".vr-game-top,.vr-game-bottom").on("mouseover","img",function(){
				$(this).css({
					"transform": "translate(-1%, 0)"
				});
			}).on("mouseout","img",function(){
				$(this).css({
					"transform": "translate(0, 0)"
				});
			});
			
		});
	}
});