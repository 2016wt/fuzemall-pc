define(function(){
	return function(templateUrl,param){
		$("#center_right").loadPage(templateUrl,["css/mycenter/welcome.css"],function(){
			//获取welcome页面信息
			Center.getWelcomeInfo(null,function(data){
				if(data.code == 200){
					$("#welcome").html($("#welcomeTemplate").tmpl(data.data));
					//获取平台币
					// Account.getCost(null,function(data){
					// 	if(data.code == 200){
					// 		$(".membpeo_top font").text(data.b_price);
					// 	}else{
					// 		$.alertTmpMsg(data.message);
					// 	}
					// });

					//获取绑定信息
					Account.bindInfo(null,function(data){
						if(data.code == 200){
							$("#membpeo_detail").html($("#bindTemplate").tmpl(data.data));
							$(".membpeo_top font").text(data.data.b_price);
							$(".bind_box .bind").on("click",function(){
								// window.location.href = Domain.center;
								window.open(Domain.center);
							});
						}else{
							$.alertTmpMsg(data.message);
						}
					});

					//点击平台币充值
					$(".membpeo_top a").on("click",function(){
						window.open(Domain.center+$(this).data("openurl"));
					});
				}else{
					$.alertTmpMsg(data.message);
				}
			});
		});
	}
});