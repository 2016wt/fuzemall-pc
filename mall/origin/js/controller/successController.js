define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/success.css"],function(){
			Pay.getPayDetail({"order_id":param.orderId},function(data){
				if(data.code == 200){
					$(".success_box").html($("#successTemplate").tmpl(data.data));
				}else{
					$.alertTmpMsg(data.message);
				}
			});
		});
	}
});