define(function(){
	return function(templateUrl,param){
		$("#center_right").addClass("r_loading").loadPage(templateUrl,["css/mycenter/express.css"],function(){
			var p_index = param.pIndex.split("_");
			if(p_index[0] == 1){
				Order.getPcExpressInfoByOrderId({"order_id":p_index[1]},function(data){
					expressTmpl(data);
				});
			}else{
				Order.getExpressInfoByBackNO({"back_no":p_index[1]},function(data){
					expressTmpl(data);
				});
			}

			function expressTmpl(data){
				$("#center_right").removeClass("r_loading");
				if(data.code == 200){
					$("#express").html($("#expressTemplate").tmpl(data.data));
				}else if(data.code == 500101){
					$.go404();
				}else{
					$.alertTmpMsg(data.message);
				}
			}
		});
	}
});