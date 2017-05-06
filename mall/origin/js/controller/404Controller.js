define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/404.css"],function(){
			$(".e404 .home").on("click",function(){
				$.goPage("home");
			});

			$(".e404 .prepage").on("click",function(){
				history.back();
			});
		});
	}
});