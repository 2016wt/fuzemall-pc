define(function(){
	return function(templateUrl,param){
		$("#container").load(templateUrl,function(){
			var order_id = param.orderId;
			//获取支付页面信息
			Pay.getPayDetail({"order_id":order_id},function(data){
				console.log(data);
				if(data.code == 200){
					$("#order_pay").html($("#payDetailTemplate").tmpl(data.data));

					if(data.data.has_material != 1){
						$(".pingtaibi").show();
					}

					var intval = data.data.intval; 
					if(intval > 1){
						var timer = setInterval(function(){
							if(location.hash.indexOf("pay") != -1){
								var _time = $.timeFormat(intval);
								$(".order_succ_bh span").html(_time);
								intval--;
								if(intval <= 1) {
									Order.invalidByOid({"order_id":order_id},function(data){
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
					}else{
						$(".zhifu").hide();
					}
				}else{
					$.alertTmpMsg(data.message);
				}

				//点击选择支付方式
				$(".payment_list").on("click",function(){
					if(!$(this).hasClass("active")){
						$(".payment_list.active").removeClass("active");
						$(this).addClass("active");
					}
					if($(this).data("type") == 5) {
						$(".order_bank").show();
					}else {
						$(".order_bank").hide();
					}
				});

				//点击选择银行支付
				$(".bank_list").on("click",function(){
					if(!$(this).hasClass("active")){
						$(".bank_list.active").removeClass("active");
						$(this).addClass("active");
					}else{
						$(this).removeClass("active");
					}
				});

				// 
				function payPop(){
					var param = {};
				    param.title = "请在新打开的页面上完成付款";
				    param.width = 600;
				    param.content = $("#payWarnTemplate").tmpl({});
				    var _this = this;
				    $.alertPop(param,function(){
				    	$(".pay_btn .change").on("click",function(){
				    		$.closePop();
				    	});

				    	$(".pay_btn .cancel").on("click",function(){
				    		$.goPage("#mycenter/myorder");
				    		$.closePop();
				    	});
				    });
				}

				window["paynow"] = function(){
					//统计按钮点击数
					$.get("front.php?s=/Home/Stat/stat", { type: "pay_btn"} );
					//end
					var type = $(".payment_list.active").data("type"),url;
					if(type == 1){
						url = "/front.php?s=/Home/Checkout/submit&order_id="+order_id;
						window.open(url);
						payPop();
					}else if(type == 3){
						url = "#weixin/"+order_id;
						window.open(url);
						payPop();
					}else if(type == 4){  //平台币支付
						Game.payConins({"order_id":order_id},function(data){
							if(data.code == 200){
								$.alertTmpMsg("购买成功");
								setTimeout(function(){
									$.goPage("#success/"+order_id);
								},1000);
							}else if(data.code == 500120){  //平台币不足
								var param = {};
							    param.content = $("#ptbczPop").tmpl({});
							    param.width = 450;
							    $.alertPop(param,function(){
							    	$(".pop_cancel").on("click",function(){
							    		$.closePop();
							    	});

							    	$(".pop_ok").on("click",function(){
							    		$.closePop();				
										window.location.href = Links.recharge + "?redirect="+encodeURIComponent(location.href)+"&broker=fuzemall&l=zh-cn";
							    	});
							    });
							}else{
								$.alertTmpMsg(data.message);
							}
						});
					}else if(type == 5) {
						var banktype = $(".bank_list.active").data("type");
						if(typeof(banktype) == 'undefined'){
							banktype = '';
						}
						url = "/front.php?s=/Home/Checkout/unionpay&order_id="+order_id+"&issInsCode="+banktype;
						window.open(url);
						payPop();
					}
				};
			});

			$(".order_info .selectBox").on("click",function(){
				$(".order_info .selectBox.active").removeClass("active");
				$(this).addClass("active");
			});
		});
	}
});