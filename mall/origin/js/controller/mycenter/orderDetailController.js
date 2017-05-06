define(function(){
	return function(templateUrl,param){
		$("#center_right").addClass("r_loading").loadPage(templateUrl,["css/mycenter/orderDetail.css","css/mycenter/schedule.css"],function(){
			pIndex = param.pIndex;
			Order.getOrderDetailById({"order_id":pIndex},function(data){
				if(data.code == 200){
					$("#center_right").removeClass("r_loading");
					$(".orderDetail").html($("#orderDetailTemplate").tmpl(data.data));
					//倒计时(未付款时)
					var intval = data.data.intval; 
					if(intval > 1){
						var timer = setInterval(function(){
							if(location.hash.indexOf("mycenter/orderDetail") != -1){
								var _time = $.timeFormat(intval);
								$("#time_remaining").html(_time);
								intval--;
								if(intval <= 1){
									Order.invalidByOid({"order_id":pIndex},function(data){
										if(data.code == 200){
											location.reload();
										}else{
											$.alertTmpMsg(data.message);
										}
									});
									clearInterval(timer);
								}
							}else{
								clearInterval(timer);
							}
						},1000);
					}else if (data.data.status == 0 && intval == 0) {
						Order.invalidByOid({"order_id":pIndex},function(data){
							if(data.code == 200){
								location.reload();
							}else{
								$.alertTmpMsg(data.message);
							}
						});
					}

					$("#orderDetail .o_d_okbtn").on("click",function(){
						$.goPage("pay/"+$(this).data("id"));
					});

					$("#orderDetail .o_d_cancelbtn").on("click",function(){
					    var param = {};
					    param.content = $("#cancelPopTemplate").tmpl({});
					    param.width = 560;
					    var _this = $(this);
					    $.alertPop(param,function(){
					    	$(".cancle_no").on("click",function(){
					    		$("#global_pop").hide();
					    	});

					    	$(".cancle_ok").on("click",function(){
								$("#global_pop").hide();
								var reason = $(".cancelPopUl .item input[type='radio']:checked").parent().text(),
									desc = $.trim($(".cancel_textarea").val());						
								Center.cancelOrder({"order_id":pIndex,"reason":reason,"desc":desc},function(data){
									if(data.code == 200){
										loadSubPage("myorder");
									}else{
										$.alertTmpMsg(data.message);
									}
								});
					    	});
					    });
					});
				}else{
					$.alertTmpMsg(data.message);
				}
			});
		});
	}
});