define(function(){
	return function(templateUrl,param){
		$("#container").load(templateUrl,function(){
			loadSubPage(param.subPage);
			$("#center_left li").on("click",function(){
				if($(this).data("openurl")){
					window.open(Domain.center+$(this).data("openurl"));
				}else{
					// loadSubPage($(this).data("subpage"));
					location.hash = "#mycenter/"+$(this).data("subpage");
				}	
			});
		});

		window["loadSubPage"] = function(subPage){
			if(subPage.indexOf("pIndex") != -1){
				//进入订单详情页面
				param.pIndex = subPage.split("?pIndex=")[1];
				subPage = subPage.split("?")[0];
			}else{
				$("#center_left li").removeClass("active");
				$(".target_"+subPage).addClass("active");
			}
			require(["js/controller/mycenter/"+subPage+"Controller"+_min],function(_call){
				_call && _call("pages/mycenter/"+subPage+".html",param);
			});
		};
	}
});