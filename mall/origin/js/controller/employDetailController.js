define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/employDetail.css"],function(){
			var id=param.id;
			$(".employ_wrap").load("pages/employ/"+id+".html");
		});
	}
});