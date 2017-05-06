define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/joinIn.css"],function(){

		});
	}
});