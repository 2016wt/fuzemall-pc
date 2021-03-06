define(function(){
	return function(templateUrl,param){
		$("#center_right").addClass("r_loading").loadPage(templateUrl,["css/mycenter/order.css"],function(){
			var _funlist = ["getReturnList","getChangeList","getRepairList"];
			var type = 1; //list中type:1 退货单 type:2 换货单 type:3 维修单

			$("#aftsale .news_contit dd a").on("click",function(){
				$("#aftsale .news_contit dd a.active").removeClass("active");
				$(this).addClass("active");
				$(".td_content").html("");
				$("#center_right").addClass("r_loading");
				getList($(this).data("type"));
			});

			function getList(type){
				Center[_funlist[type-1]](null,function(data){
					$("#center_right").removeClass("r_loading");
					$(".td_content").html($("#aftsaleTemplate").tmpl({"list":data.list})); 
					if(data.list.length==0){
						$(".td_content").empty().append('<div class="empty_list">您暂无相应订单记录。</div>');
					}else{
						$(".td_content").html($("#aftsaleTemplate").tmpl({"list":data.list}));
					}

					//查看详情点击事件
					$("._ckxq").on("click",function(){
						location.hash = "#mycenter/schedule?pIndex="+$(this).data("no");
					});

					$(".qrsh").on("click",function(){
						var _this = $(this),back_no = $(this).data("no");
						if(typeof back_no == "number"){
							back_no = JSON.stringify(back_no);
						}
						Center.backOrderComplete({"back_no":back_no},function(data){
							if(data.code == 200){
								_this.hide().parents(".td_tr").find(".td_status").html("退货完成");
								$.alertTmpMsg("已确认成功。");
							}else{
								$.alertTmpMsg(data.message);
							}
						});
					});

					$(".td_spmc img").on("click",function(){
						// $.goPage("item/"+$(this).data("flag"));
						window.open("index.html#item/"+$(this).data("flag"));
					});
				});
			}

			getList(type);
		});
	}
});