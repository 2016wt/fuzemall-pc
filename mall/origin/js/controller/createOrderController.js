define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/createOrder.css"],function(){
			//获取已选择商品列表
			Order.getSelectCart(null,function(data){
				if(data.data.list.length == 0 && data.g_data.list.length == 0){
					$.goPage("#cart");
					return false;
				}

				var total_price = 0;  //合计金额
				var shipping_price = 0; //运费合计金额
				var addressId;   //地址ID

				var cartAddress,cartName; //选择的收获地址和收货人信息

				//主机配件为0 则不显示收货人信息
				data.data.list.length == 0 ? $(".cart-consignee").hide() : $(".cart-consignee").show();
				
				//地址判断
				function adderssJudge(list) {
					if(list.length == 0){
						$(".cart-address-more").hide();
						$(".cart-address-no").show();
					}else if(list.length == 1){
						$(".cart-address-more").hide();
						$(".cart-address-no").hide();
					}else{
						$(".cart-address-more").show();
						$(".cart-address-no").hide();
					}
				}
				// 主机配件列表
				if(data.data.list.length){
					total_price = (total_price*100+data.data.total_price*100+data.data.shipping_price*100)/100;
					shipping_price = (shipping_price*100+data.data.shipping_price*100)/100;
					$("#_zjpj").html($("#zjpjTemplate").tmpl(data.data));
					var addr_index = 0;
					var cartMoreAddress = {
						"down" : "更多地址	&or;",
						"up" : "收起地址	&and;"
					}
					//获取地址列表
					Center.getAddressList(null,function(data){
						if(data.list.length == 0){
							addressId = "";
						}else{
							addressId = data.list[0].id;
						}
						adderssJudge(data.list);

						var cartAddressData = data.list;

						for(var i = 0; i < cartAddressData.length; i ++){
							if(cartAddressData[i].address_default == 1){
								cartAddress = cartAddressData[i].address_province + " " + cartAddressData[i].address_city + " " +
									cartAddressData[i].address_region + " " + cartAddressData[i].address_detail;
								cartName = cartAddressData[i].address_name + " " + cartAddressData[i].address_phone;
							}
						}
						//渲染选择的地址
						$(".cart-total-address").text(cartAddress);
						$(".cart-total-name").text(cartName);

						$(".tab_trueaddress").html($("#addressTemplate").tmpl(data));

						//选择地址
						$(".centered").on("click",".cart-address-tit",function(){
							var _this = $(this),
								thisAddress = _this.parent().find(".cad-detail").html(),
								thisName = _this.parent().find(".cad-name").html() + " " + _this.parent().find(".cad-tel").html();

							$(".cart-total-address").text(thisAddress);
							$(".cart-total-name").text(thisName);
							$(".cart-address-tit.active").removeClass("active");
							$(this).addClass("active");
						});

						//如果没有默认地址  则默认选择第一个
						if($(".cart-address-tit.active").size() == 0){
							$(".cart-address-tit").eq(0).parent().show();
							$(".cart-address-tit").eq(0).trigger("click");
						}

						//地址编辑
						$(".centered").on("click",".cart-address-edit",function(){
							$.cancelBubble();
							var _this = $(this);
							var thsTit = _this.siblings(".cart-address-tit");

							var thsId = $(".cart-address-tit.active").attr("data-id");

							addr_index = _this.data("index");
							require(["js/modules/address.manage"+_min],function(fun){
								Center.getAddressById({"id":_this.data("id")},function(obj){
									if(obj.code == 200){
										fun.editAddress(obj,function(data){

											//function回调为成功后执行的函数
											$(".tab_trueaddress").html($("#addressTemplate").tmpl(data));

											var $addressLi = $("#cart-address-" + data.list[0].id).find(".cart-address-tit");

											//同步信息
											if($addressLi.hasClass("active")){
												$addressLi.trigger("click");
											}

											//地址列表跟按钮同步
											if($(".cart-address-more a").attr("cart-data") == "up"){
												$(".tab_trueaddress li").show();
											}

											//编辑之后仍然选中以前的地址
											$(".cart-address-tit[data-id=" + thsId + "]").trigger("click");
											
										});
									}else{
										$.alertTmpMsg(obj.message);
									}
								});
							});
						});

						//设为默认地址
						$(".centered").on("click",".cart-address-set",function(){
							var _this = $(this),
								_thisSiblings = _this.siblings(".cart-address-detail"),
								thisName = _thisSiblings.find(".cad-name").html(),
								thisDetailArr = _thisSiblings.find(".cad-detail").html().split(" "),
								thisTel = _thisSiblings.find(".cad-tel").html();

							var param = {};
							param.address_name = thisName;
							param.address_province = thisDetailArr[0];
							param.address_city = thisDetailArr[1];
							param.address_region = thisDetailArr[2];
							param.address_detail = thisDetailArr[3];
							param.address_phone = thisTel;
							param.address_default = 1;

							Center.editAddress({"id":$(this).data("id"),"data":param},function(data){
									if(data.code == "200"){
									//样式修改
									$(".cart-address-default").addClass("hidden");
									$(".cart-address-set").removeClass("hidden");
									_this.siblings(".cart-address-default").removeClass("hidden");
									_this.addClass("hidden");
									_this.siblings(".cart-address-tit").trigger("click");
								}
							});
						});

						// 更多地址&收起地址
						$(".cart-address-more").on("click","a",function(){
							var _this = $(this),
								thisData = _this.attr("cart-data");
							if(thisData == "down"){
								$(".cart-address-list li").show();
								_this.html(cartMoreAddress["up"]).attr("cart-data","up");
							}else{
								$(".cart-address-list li").hide();
								$(".cart-address-list .cart-address-tit.active").parent().show();
								_this.html(cartMoreAddress["down"]).attr("cart-data","down");
							}
						});

						// 新增地址
						$(".address_btn a.cart-add-address").on("click",function(){
							//判断地址数量
							if($(".tab_trueaddress li").length>8){
								$.alertTmpMsg("最多可以有8个收货地址。");
								return;
							}
							//统计pv数
							$.get("front.php?s=/Home/Stat/stat", { type: "address_pv"} );
							//引入模块
							require(["js/modules/address.manage"+_min],function(fun){
								fun.addAddress(function(data){  //function回调为成功后执行的函数
									$(".tab_trueaddress").html($("#addressTemplate").tmpl(data));
									$(".cart-address-tit.active").removeClass("active");

									if(addressId == data.list[0].id){
										$(".cart-address-tit").eq(1).trigger("click");
									}else{
										$(".cart-address-tit").eq(0).trigger("click");
										addressId = data.list[0].id;
									}
									adderssJudge(data.list);
									if($(".cart-address-more a").attr("cart-data") == "down"){
										$(".cart-address-more a").trigger("click");
									}else{
										$(".tab_trueaddress li").show();
									}
								});
							});
						});

						//删除地址
						$(".centered").on("click",".cart-address-del",function(){
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
											$("#cart-address-" + _this.data("id")).remove();
											if($(".cart-address-tit.active").size() < 1){
												$(".cart-address-tit").first().addClass("active");
											}
											adderssJudge(data.list);
											//如果没有默认地址  则默认选择第一个
											if($(".cart-address-tit.active").size() == 0){
												$(".cart-address-tit").eq(0).parent().show();
												$(".cart-address-tit").eq(0).trigger("click");
											}
											//如果只剩下一个地址

											$(".cart-address-list li").eq(0).show();
											if($(".cart-address-tit").size() == 1){
												$(".cart-address-more").hide();
												$(".cart-address-list li").show();
											}
										}else{
											$.alertTmpMsg(data.message);
										}
									});
								});
							});
						});
					});

					//发票类型选择
					$("body").on('click',".fp_type input[type=radio]",function(){
						$(".order_textbox").val("");
						if($(this).data("type") == 2){
							var cat_node = $(".cate_type input[type=radio]:checked");
							if(cat_node.data("type") == 1){
								$(".order_inptext").show();
							}
						}else{
							$(".order_inptext").hide();
						}
					});

					//发票内容选择
					$("body").on('click',".cate_type input[type=radio]",function(){
						$(".order_textbox").val("");
						if($(this).data("type") == 4){
							$(".order_inptext").hide();
						}else{
							var type_node = $(".fp_type input[type=radio]:checked");
							if(type_node.data("type") == 2){
								$(".order_inptext").show();
							}
						}
					});

					//修改发票信息
					$(".cart-add-bill").on("click",function(){
						
						//统计pv数
						$.get("front.php?s=/Home/Stat/stat", { type: "invoice_pv"} );
						
						var param = {};
						param.title = "发票信息";
						param.content = $("#billTemplate").tmpl();
						param.width = 400;

						$.alertPop(param,function(){
							var flag = true;
							$(".bill-error").hide();
							$(".dl_cancel").on("click",function(){
								$("#global_pop").hide();
							});

							$(".order-save").on("click","a",function(){
								var billNews = "普通发票（纸质） ";
								var billTypeBtn = $(".fp_type").find("input[type=radio]"),
									cateTypeBtn = $(".cate_type").find("input[type=radio]");
								for(var i = 0; i < billTypeBtn.length; i ++){
									if(billTypeBtn.eq(i).prop("checked")){
										if(i == 1){
											var _value = $.trim($(".order_textbox").val());
											if(_value == "" && $(".cate_type").find("input[type=radio]:checked").data("type") != 4){
												$(".bill-error").html("请填写公司抬头").show();
												flag = false;
											}else if(!$.checkIllegalChar(_value)){
												$(".bill-error").html("公司抬头不能含有非法字符").show();
												flag = false;
											}else{
												flag = true;
												var billCompany = $(".order_textbox").val();
												billNews += billCompany;
											}
										}else{
											flag = true;
											billNews += billTypeBtn.eq(i).val();
										}
									}
								};
								if(!flag){
									return;
								}
								for(var i = 0; i < cateTypeBtn.length; i ++){
									if(cateTypeBtn.eq(i).prop("checked")){
										billNews += " " + cateTypeBtn.eq(i).val();
									}
								};
								$(".cart-bill-detail").html(billNews).attr("invoice-type",1);
								$("#global_pop").hide();
							});
						});
					});

				}

				//游戏道具列表
				if(data.g_data.list.length){shipping_price
					total_price = (total_price*100+data.g_data.total_price*100)/100;
					shipping_price = (shipping_price*100+data.g_data.shipping_price*100)/100;
					$("#_yxdj").html($("#yxdjTemplate").tmpl(data.g_data));
				}


				//运费&总价&收货人地址 信息
				$(".cart-freight").text(shipping_price.toFixed(2));
				$(".cart-total-cost").text(total_price.toFixed(2));

				$(".sum_cart .btn").on("click",function(){
					//点击确认订单
					var address_id = "",_param = {};
					if(data.data.list.length){
						if($(".cart-address-tit.active").length != 0){
							address_id = $(".cart-address-tit.active").data("id");
							_param.address_id = address_id;
						}else{
							$.alertTmpMsg("请选择收货地址");
							return false;
						}
					}
					_param.is_invoice = 0;
					if($(".cart-bill-detail").attr("invoice-type") == 1){
						_param.is_invoice = 1;
					 	_param.invoice_notice = $(".order_textbox").val();
					 	_param.invoice_type = $(".fp_type input[type='radio']:checked").data("type");
					 	_param.invoice_content = $(".cate_type input[type='radio']:checked").data("type");
					}
					Order.submitOrder(_param,function(data){
						if(data.code == 200){
							$.setNum(data.data.goods_num);
							$.goPage("#pay/"+data.data.order_id);
						}else{
							$.alertTmpMsg(data.message);
						}	
					});
				});
				
			});
		});
	}
});