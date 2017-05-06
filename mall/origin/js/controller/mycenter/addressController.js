define(function(){
	return function(templateUrl,param){
		$("#center_right").addClass("r_loading").loadPage(templateUrl,["css/mycenter/address.css"],function(){
			//记录地址个数，上限为5
			var count = 0;

			Center.getAddressList(null,function(data){
				$("#center_right").removeClass("r_loading");
				$(".c_addr_detail_wrap").html($("#addressListTemplate").tmpl({"list":data.list}));
				count = data.list.length;
				$(".curr_count").html(count);

				//删除地址
				$("#center_right").on("click",".c_addr_del",function(){
					var param = {};
				    param.title = "删除";
				    param.content = $("#deleteWarnTemplate").tmpl({"msg":"您确认要删除这个地址吗？","ok":"删除"});
				    param.width = 500;
				    var _this = $(this);
				    $.alertPop(param,function(){
				    	$(".dl_cancel").on("click",function(){
				    		$("#global_pop").hide();
				    	});

				    	$(".dl_ok").on("click",function(){
							Center.deleteAddress({"id":_this.data("id")},function(data){
								$("#global_pop").hide();
								if(data.code == 200){
									$("#target_addr_"+_this.data("id")).remove();
									$(".curr_count").html(--count);
								}else{
									$.alertTmpMsg(data.message);
								}
							});
				    	});
				    });
				});

				//设为默认地址
				$("#center_right").on("click",".c_addr_swmr",function(){
					var _this = $(this);
					Center.setDefaultAddress({"id":_this.data("id")},function(data){
						if(data.code == 200){
							$(".c_addr_detail.active").removeClass("active");
							var tempNode = $("#target_addr_"+_this.data("id")).addClass("active").clone();
							$("#target_addr_"+_this.data("id")).remove();
							$(".c_addr_detail_wrap").prepend(tempNode);
							$.closeMsg();
						}else{
							$.alertTmpMsg(data.message);
						}
					});
				});	

				//新增地址
				$(".c_addr_btn .btn").on("click",function(){
					if(count >= 8){
						$.alertTmpMsg("最多可以有8个收货地址。");
						return;
					}
					//引入模块

					require(["js/modules/address.manage"+_min],function(fun){
						fun.addAddress(function(data){       //function回调为成功后执行的函数
							$(".curr_count").html(++count);
							$.goPage("mycenter/address");
						});
					});
				});	

				//编辑地址
				$("#center_right").on("click",".c_addr_set",function(){
					var _this = $(this);
					require(["js/modules/address.manage"+_min],function(fun){
						Center.getAddressById({"id":_this.data("id")},function(obj){
							if(obj.code == 200){
								fun.editAddress(obj,function(data){      //function回调为成功后执行的函数
									$.goPage("mycenter/address");
								});
							}else{
								$.alertTmpMsg(obj.message);
							}
						});
					});
				});
			});
		});
	}
});