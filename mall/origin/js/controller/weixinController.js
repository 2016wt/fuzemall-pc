define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/weixin.css"],function(){
			var order_id = param.orderId;

			Pay.getPayDetail({"order_id":order_id},function(data){
				if(data.code == 200){
					// status 0=>未付款 1=>已付款 2=>已发货 3=>已完成 4=>已取消 5=>已失效
					if(data.data.status == 4){  //已取消支付
						$.goPage("#mycenter/orderDetail?pIndex="+order_id);
					}else if(data.data.status != 0){  //支付已完成
						$.goPage("#success/"+order_id);
					}
				}else if(data.code == 500401){
					$.go404();
				}else{
					$.alertTmpMsg(data.message);
				}

				$(".weixin_wrap").html($("#weixin_pay").tmpl({"order_no":data.data.order_no,"order_id":order_id,"total_price":data.data.total_price}));
			});
			
			var timer = setInterval(function(){
				if(location.hash != "#weixin/"+order_id){
					clearInterval(timer);
					return false;	
				}
				Pay.getPayDetail({"order_id":order_id},function(data){
					if(data.code == 200){
						if(data.data.status == 4){	
							$.goPage("#mycenter/orderDetail?pIndex="+order_id);
						}else if(data.data.status != 0){
							$.goPage("#success/"+order_id);
						}
					}else if(data.code == 500401){
						$.go404();
					}else{
						clearInterval(timer);
						return false;
					} 
				});
			},3000);
		});
	}
});