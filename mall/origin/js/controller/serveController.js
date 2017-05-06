define(function(){
	return  function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/serve.css"],function(){

		});
	}
});

