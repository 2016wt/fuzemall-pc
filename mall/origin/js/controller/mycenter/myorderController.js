define(function(){
	return function(templateUrl,param){
		var pageSize = 8;
		param.status = param.pIndex?param.pIndex:0;

		$("#center_right").addClass("r_loading").loadPage(templateUrl,["css/mycenter/myorder.css"],function(){
			$("#myorder .news_contit dd a").eq(param.status).addClass("active");

			var orderList = {};
			function getList(status){
				$("#Pagination").hide();
				Center.getOrderList({"status":status},function(data){
					$("#center_right").removeClass("r_loading");
					$.extend(true,orderList,data);
					var list = data.list;
					var new_list = [];
					while(list.length > 0){
						new_list.push({"sublist":list.splice(0,pageSize)});
					}
					$("#hiddenresult").html($("#orderListTemplate").tmpl({"list":new_list}));

					require(["http://cdn.fuzeuser.com/plugins/jquery.pagination/jquery.pagination.js"],function(){
						var initPagination = function(){
							var num_entries = new_list.length;
							// 创建分页
							$("#Pagination").pagination(num_entries, {
								num_edge_entries: 1, //边缘页数
								num_display_entries: 4, //主体页数
								callback: pageselectCallback,
								items_per_page:1, //每页显示1项
								prev_text:"上一页",
								next_text:"下一页"
							});
						}();
						 
						function pageselectCallback(page_index, jq){
							var new_content = $("#hiddenresult div.pg_result:eq("+page_index+")").clone();
							if(new_content.length==0){
								$(".c_order_content_ul").empty().append('<div class="empty_list">您暂无订单记录,快去<a>选购</a>吧。</div>');
								$("#Pagination").hide();
							}else{
								$("#Pagination").show();
								$(".c_order_content_ul").empty().append(new_content); //装载对应分页的内容
							}
							return false;
						}
					});
				});
			};
			
			getList(param.status);

			//过滤nav点击
			$("#myorder .news_contit dd a").on("click",function(){
				$("#myorder .news_contit dd a.active").removeClass("active");
				$(this).addClass("active");
				$(".c_order_content_ul").html("");
				$("#center_right").addClass("r_loading");
				getList($(this).data("status"));
			});

			//点击缩略图
			$("#center_right").on("click",".c_order_thumbs li",function(){
				$.goPage("item/"+$(this).data("gid"));
			});

			//点击去付款
			$("#center_right").on("click",".c_order_qfk",function(){
				$.goPage("pay/"+$(this).data("id"));
			});	

			//点击取消订单
			$("#center_right").on("click",".c_order_qxdd",function(){
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
						Center.cancelOrder({"order_id":_this.data("id"),"reason":reason,"desc":desc},function(data){
							if(data.code == 200){
								loadSubPage("myorder");
							}else{
								$.alertTmpMsg(data.message);
							}
						});
			    	});
			    });
			});
			

			//点击申请退款
			$("#center_right").on("click",".c_order_sqtk",function(){
				var param = {};
			    param.content = $("#deleteWarnTemplate").tmpl({"msg":"你确定要退款吗？"}); 
			    param.width = 400;
			    var _this = $(this);
			    $.alertPop(param,function(){
			    	$(".dl_cancel").on("click",function(){
			    		$("#global_pop").hide();
			    	});

			    	$(".dl_ok").on("click",function(){
						Center.applyRefund({"order_id": _this.data("id")},function(data){
							if(data.code == 200){
								_this.hide();
								$.alertTmpMsg("已提交退款申请");
								_this.parents("li").find(".sqtk_info").text("退款审核中...");
							}else{	
								$.alertTmpMsg(data.message);
							}
							$("#global_pop").hide();
						});
			    	});
			    });
			});

			//点击订单详情或订单编号
			$("#center_right").on("click",".c_order_no span a,.c_order_ddxq",function(){
				location.hash = "#mycenter/orderDetail?pIndex="+$(this).data("id");
			});	

			//申请售后
			$("#center_right").on("click",".c_order_sqsh",function(){
				//获取对应订单glist
				var orderno = $(this).data("no");
			    var obj = orderList.list[$.getObjIndexByKey(orderList.list,"order_no",orderno)];

				var param = {};
			    param.width = 550;
			    // var _test = obj.glist[0];
			    // for(var i=0;i<4;i++){
			    // 	obj.glist.push(_test);	
			    // }
			    param.content = $("#returnPopTemplate").tmpl(obj);
			    $.alertPop(param,function(){
			        $(".returnPopUl li .ckxq").on("click",function(){
			        	if($(this).hasClass("disable"))
			        		return false;
			        	$.closePop();
			        	location.hash = "#mycenter/returnDetail?pIndex="+$(this).data("gid")+"_"+$(this).data("id")+"_"+$(this).data("flag");
			        });
			    });
			});	

			//确认收货
			$("#center_right").on("click",".c_order_qrsh",function(){
				var _this = $(this);
				Center.orderComplete({"order_id":_this.data("id")},function(data){
					if(data.code == 200){
						_this.hide().parents("li").find(".c_order_status").html("已完成");
						$.alertTmpMsg("已确认成功。");
						$(".c_order_sqsh").parent().show();
						$(".c_order_ckwl").parent().hide();
						// $(".div_sqtk").show();
					}else{
						$.alertTmpMsg(data.message);
					}
				});
			});

			//查看物流
			$("#center_right").on("click",".c_order_ckwl",function(){
				$.goPage("#mycenter/express?pIndex=1_"+$(this).data("id"));
			});
		});
	}
});