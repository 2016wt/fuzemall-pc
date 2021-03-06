define(function(){
	return function(templateUrl,param){
		$("#center_right").addClass("r_loading").loadPage(templateUrl,["css/mycenter/schedule.css"],function(){
			Center.getSchedule({"back_no":param.pIndex},function(data){
				if(data.code == 200){
					var text = "",type = data.type;
					$("#center_right").removeClass("r_loading");
					var cur_index = $.getObjIndexByKey(data.list,"flag","current");
					$(".schedule_nodes").html($("#scheduleTemplate").tmpl({"list": data.list,"type": type,"cur_index": cur_index}));
					if(data.list[1].status== 2 && data.list[1].flag == "current"){
						$(".shtg span").text("审核失败");
					}
					switch (type){
						case "1":
							text = "退货进度";
							break;
						case "2":
							text = "换货进度";
							break;
						case "3":
						 	text = "维修进度";
					}
					$(".news_contit dt").text(text);

					//点击填写物流信息
					$("#sch_txwlxx").on("click",function(){
						$.goPage("#mycenter/fillInfoReturn?pIndex="+param.pIndex+"_"+type);
					});

					//点击查看物流
					$("#sch_ckwl").on("click",function(){
						$.goPage("#mycenter/express?pIndex=2_"+param.pIndex);
					});
				}else if(data.code == 500101){
					$.go404();
				}else{
					$.alertTmpMsg(data.message);
				}
			});
		});
	}
});