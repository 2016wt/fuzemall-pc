define(function(){
	return function(templateUrl,param){
		$("#container").load(templateUrl,function(){
			var empty_flag_1 = false,empty_flag_2 = false,empty_count = 0;
			//获取主机配件
			Cart.getCartList(null,function(data){
				if(data.code == 200){
					if(data.carts && data.carts.length != 0){
						$("#pj_table.cart_table ul").html($("#cartTemplate").tmpl({"list":data.carts}));
						summaryPrice();
					}else{
						//为空
						$("#pj_table").hide();
						empty_flag_1 = true;
						empty_count++;
						_empty();
					}
				}else{
					$.alertTmpMsg(data.message);
				}
			});

			//获取游戏道具
			Game.gamePayList(null,function(data){
				if(data.code == 200){
					if(data.data.cartlist && data.data.cartlist.length != 0){
						$("#yx_table.cart_table ul").html($("#cartTemplate").tmpl({"list":data.data.cartlist,"ulist":data.data.ulist}));
						summaryPrice();
						$("#yx_table select").on("change",function(){
							var _this = $(this);
							if($(this).find("option:selected").val()){
								$(this).siblings(".errmsg").fadeOut(100);	
								Game.checkBuy({"gid":_this.data("gid"),"productCode":_this.data("produceid"),"f_uid":_this.find("option:selected").val()},function(data){
									if(data.code == 200){
										if(data.is_buy == 1){
											_this.siblings(".errmsg").text("该角色已拥有此道具").fadeIn(100);
										}else{
											_this.siblings(".errmsg").fadeOut(100);
										}
									}else{
										_this.siblings(".errmsg").text(data.message).fadeIn(100);
									}
								});
							}
						});
					}else{
						$("#yx_table").hide();
						empty_flag_2 = true;
						empty_count++;
						_empty();
					}
				}else{
					$.alertTmpMsg(data.message);
				}
			});

			function _empty(){
				if(empty_count == 2 && empty_flag_1 && empty_flag_2){
					$(".cart_table_wrap").html($("#emptycartTemplate").tmpl({}));
				}
			}

			//注册全选事件
			$("#pj_table .all.select_span").on("click",function(){
				var _all = $("#pj_table .all.select_span");
				_all.toggleClass("active");
				if(_all.hasClass("active")){
					$("#pj_table.cart_table li .select_span").addClass("active");
				}else{
					$("#pj_table.cart_table li .select_span").removeClass("active");
					$("#all .select_span").removeClass("active");
				}
				checkAll();
				summaryPrice();
			});
			$("#yx_table .all.select_span").on("click",function(){
				var _all = $("#yx_table .all.select_span");
				_all.toggleClass("active");
				if(_all.hasClass("active")){
					$("#yx_table.cart_table li .select_span").addClass("active");
				}else{
					$("#yx_table.cart_table li .select_span").removeClass("active");
				}
				checkAll();
				summaryPrice();
			});

			//总全选被点击
			$("#all.select_span").on("click",function(){
				$(this).toggleClass("active");
				if($(this).hasClass("active")){
					$(".all.select_span,li .select_span").addClass("active");
				}else{
					$(".all.select_span,li .select_span").removeClass("active");
				}
				checkAll();
				summaryPrice();
			});

			//注册单个checkbox点击事件
			$(".cart_table_wrap").on("click",'li .select_span',function(){
				$(this).toggleClass("active");
				if($(this).parents(".cart_table").find("li .select_span.active").length == $(this).parents(".cart_table").find("li .select_span").length){
					$(this).parents(".cart_table").find(".all.select_span").addClass("active");
				}else{
					$(this).parents(".cart_table").find(".all.select_span").removeClass("active");
				}
				checkAll();
				summaryPrice();
			});

			function checkAll(){
				if($(".cart_table li .select_span.active").length == $(".cart_table li .select_span").length){
					$("#all.select_span").addClass("active");
				}else{
					$("#all.select_span").removeClass("active");
				}
			}

			//删除
			$(".cart_table").on("click",".action",function(){
				var param = {};
			    param.content = $("#deleteWarnTemplate").tmpl({"msg":"你确定要删除该商品吗？"});
			    param.width = 450;
			    var _this = $(this);
			    $.alertPop(param,function(){
			    	$(".dl_cancel").on("click",function(){
			    		$("#global_pop").hide();
			    	});

			    	$(".dl_ok").on("click",function(){
						$("#global_pop").hide();
				        var id = _this.data("id");
				        Cart.deleteCart({"ids":id},function(data){
				        	if(data.code == "200"){
								if(_this.parent().find('.select_span').hasClass('active')){
									$(".s_price").text($.sub($(".s_price").text(),$("#count_"+_this.data("id")).text()));
								}

				        		// $(".s_price").text((JSON.parse($(".s_price").text())-JSON.parse($("#count_"+_this.data("id")).text())).toFixed(2));
					        	if(_this.parents("ul").find("li").length == 1){
					        		_this.parents(".cart_table").hide();
					        	}
					        	$("#li_"+id).remove();

					        	$.setNum(data.data.goods_num);
					        	if($(".cart_table li").length == 0){
					        		location.reload();
					        	}
					        	$.closeMsg();
				        	}else{
				        		$.alertTmpMsg(data.message);
				        	}
				        });
			    	});
			    });
			});

			//删除选中的商品
			$("#deleteAll").on("click",function(){
				var param = {};
			    param.content = $("#deleteWarnTemplate").tmpl({"msg":"你确定要删除选中的商品吗？"});
			    param.width = 450;
			    var _this = $(this),ids = [];
			    $(".cart_table_wrap .cart_table ul li .select_span.active").each(function(){
					ids.push($(this).data("id"));
				});
				if(ids.length == 0){
					$.alertTmpMsg("请选择要删除的商品。");
					return false;
				}
			    $.alertPop(param,function(){
			    	$(".dl_cancel").on("click",function(){
			    		$("#global_pop").hide();
			    	});

			    	$(".dl_ok").on("click",function(){
						$("#global_pop").hide();
				        Cart.deleteCart({"ids":ids.join(",")},function(data){
				        	if(data.code == "200"){
				        		var reducePrice = 0;
					        	ids.forEach(function(key){
					        		reducePrice = $.add([$("#count_"+key).text(),reducePrice],2);
					        		$("#li_"+key).remove();
					        	});

					        	$(".s_price").text($.sub($(".s_price").text(),reducePrice));
					        	if($("#pj_table li").length == 0){
					        		$("#pj_table").hide();
					        	}
					        	if($("#yx_table li").length == 0){
					        		$("#yx_table").hide();
					        	}

					        	$.setNum(data.data.goods_num);
					        	if($(".cart_table li").length == 0){
					        		location.reload();
					        	}
					        	$.closeMsg();
				        	}else{
				        		$.alertTmpMsg(data.message);
				        	}
				        });
			    	});
			    });
			});

			//注册数量减少事件
			var sub_flag = true;
			$("#pj_table.cart_table").on("click",".subtract",function(){
				if(!sub_flag){
					return false;
				}
				var _this = $(this);
			    var count_input = $(this).next().find(".count-input");
			    var count = count_input.val();
			    if(count > 1){
			    	sub_flag = false;
			        Cart.addCart({"cartlist":[{"gid":$(this).data("gid"),"g_a_flag":$(this).data("g_a_flag"),"g_num":-1}]},function(data){
			    		sub_flag = true;
			    		if(data.code == 200){
				    		count_input.val(--count);
					        $(".s_price").text($.sub($(".s_price").text(),_this.data("price")));
					        var subSummary = $("#count_"+_this.data("id"));
					        subSummary.text($.sub(subSummary.text(),_this.data("price")));
					        $(".su_total").text(parseInt($(".su_total").text())-1);
				    		$.setNum(data.data.goods_num);
				    	}else{
				    		$.alertTmpMsg(data.message);
				    	}
			    	});
			    }
			});

			//注册数量增加事件
			var plus_flag = true;
			$("#pj_table.cart_table").on("click",".plus",function(){
				if(!plus_flag){
					return false;
				}
				var _this = $(this);
			    var count_input = $(this).prev().find(".count-input");
			    var count = count_input.val();
			    if(checkNum(count) && plus_flag){
			    	plus_flag = false;
				    Cart.addCart({"cartlist":[{"gid":$(this).data("gid"),"g_a_flag":$(this).data("g_a_flag"),"g_num":1}]},function(data){
				    	plus_flag = true;
				    	count = count_input.val();
				    	if(data.code == 200){
					    	count_input.val(++count);
					    	$(".s_price").text($.add([$(".s_price").text(),_this.data("price")],2));				
						    var subSummary = $("#count_"+_this.data("id"));
						    subSummary.text($.add([subSummary.text(),_this.data("price")],2));
						    $(".su_total").text(parseInt($(".su_total").text())+1);

				    		$.setNum(data.data.goods_num);
				    	}else if(data.code == 500310){
				    		$.alertTmpMsg(data.message);
				    	}
				    });
			    }
			});

			//监听手动输入商品数量
			$("#pj_table.cart_table").on("input",".count-input",function(){
				var count = $(this).val().replace(/[^0-9]/ig,"");
				count = parseInt(count)?count:1;
				//检测数量
				if(!checkNum(count)){
					count = 10;
				}
				$(this).val(count);
				var subSummary = $("#count_"+$(this).data("id"));
			    subSummary.text((JSON.parse($(this).data("price"))*count).toFixed(2));
			    //计算总金额
			    var totalCount = 0,subConuts=$(".count span");
			    for(var i=0,n=subConuts.length;i<n;i++){
			    	totalCount += JSON.parse(subConuts.eq(i).text());
			    }
			    $(".s_price").text(totalCount.toFixed(2));
			    Cart.addCart({"cartlist":[{"gid":$(this).data("gid"),"g_a_flag":$(this).data("g_a_flag"),"g_num":count,"type":2}]},function(data){
			    	// $.setCookie("goods_num",data.data.goods_num);
			    	// $(".cart_num").html(data.data.goods_num);
			    	$.setNum(data.data.goods_num);
			    });
			});

			//检测商品数量
			function checkNum(num){
				if(num >= 10){
					$.alertTmpMsg("单次购买商品数量不能超过10件。");
					return false;
				}
				return true;
			}

			//动态生成底部价格区域
			function summaryPrice(){
				var pj_nodes = $("#pj_table.cart_table ul li .select_span.active");
				var yx_nodes = $("#yx_table.cart_table ul li .select_span.active");
				var su_price = "0.00";

				for(var i=0,n=pj_nodes.length;i<n;i++){
					var _count = pj_nodes.eq(i).parents("li").find(".count-value input[type='text']").val();
					su_price = $.add([su_price,$.mul(pj_nodes.eq(i).data("price"),_count)],2);
					// su_price += parseFloat(pj_nodes.eq(i).data("price"))*_count;
					// su_count += _count;
				}

				for(var i=0,n=yx_nodes.length;i<n;i++){
					// var _count = yx_nodes.eq(i).parents(".cart_table").find(".count-value").val();
					su_price = $.add([su_price,yx_nodes.eq(i).data("price")],2);
					// su_price += parseFloat(yx_nodes.eq(i).data("price"));
					// su_count += 1;
				}
				$(".summary .myprice").text(su_price);
			}

			//"去结算"按钮事件
			$(".gw_btn .btn").off().on("click","",function(){
				var flag = true; //游戏鉴权flag
				var ids =  new Array(), ids_g = new Array();
				$("#pj_table.cart_table ul li .select_span.active").each(function(){
					ids.push({"id":$(this).data("id")});
				});
				$("#yx_table.cart_table ul li .select_span.active").each(function(){
					if($(this).data("type") == 3){
						var f_uid = $(this).parents("li").find("option:selected").val(),
						    f_name = $(this).parents("li").find("option:selected").text();
						if(f_uid == 0){
							flag = false;
							$(this).parents("li").find("select").siblings(".errmsg").text("请为角色选择道具").fadeIn(100);
						}
						ids_g.push({"id":$(this).data("id"),"f_uid":f_uid,"f_name":f_name});
					}else{
						ids_g.push({"id":$(this).data("id")});
					}
				});

				if(!flag){
					return false;
				}
				if(ids.length == 0 && ids_g.length == 0){
					$.alertTmpMsg("您未选择商品。");
					return false;
				}else{
					if($.getCookie("username")){
						// cart_ids[{"di":xx},{"ids"},{"f_id f_name id}]
						// "ids" "ids_g"
						Order.storeCartIds({"ids":ids,"ids_g":ids_g},function(data){
							if(data.code == 200){
								$.goPage("createOrder");
							}else if(data.code == 500310){
								var param = {};
							    param.title = "库存不足";
							    param.content = $("#deleteWarnTemplate").tmpl({"msg":data.message+",请您修改商品数量后，重新提交订单"});
							    param.width = 500;
							    $.alertPop(param,function(){
							    	$(".dl_cancel,.dl_ok").on("click",function(){
							    		$("#global_pop").hide();
							    	});
							    });
							}else{
								$.alertTmpMsg(data.message);
							}
						});
					}else{
						window.location.href = Links.login+"?redirect="+encodeURIComponent(location.href)+"&broker=fuzemall&l=zh-cn";
					}
				}
			});

		});
	}
});