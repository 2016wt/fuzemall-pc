define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/aboutUs.css"],function(){
			loadSubPage(param.subPage);
			$("#center_left li").on("click",function(){
				var thsAttr = $(this).attr("data-subpage");
				if(!thsAttr){ return; }
				if($(this).data("openurl")){
					window.open($(this).data("openurl"));
				}else{
					location.hash = "#aboutus/"+$(this).data("subpage");
				}	
			});
		});

		window["loadSubPage"] = function(subPage){
			$("#center_left li").removeClass("active");
			$(".target_"+subPage).addClass("active");
			require(["js/controller/aboutus/"+subPage+"Controller"+_min],function(_call){
				_call && _call("pages/aboutus/"+subPage+".html",param);
			});
		};
	}
});