define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/gameItem.css","css/video-js.css"],function(){
			var hidLen = 0;

			//获取游戏详情
			Game.getGameDetail({"gid":param.itemId},function(data){
				if(data.code == 200){
					$.setTitle("战斧游戏-"+data.Goods.title);
					$(".gameItem_wrap").css("background-image","url('"+data.Goods.bgImage+"')");
					$(".gc_wrap").html($("#gameDetailTemplate").tmpl(data.Goods));

					//获取游戏视频和图片
					Game.gameResInfo({"gid":param.itemId},function(data){
						$(".gameItem_slide_wrap").html($("#gameResTemplate").tmpl({"list":data.list}));
						var len = data.list.length;
						if(len <= 5){
							$("#gs_next").css("visibility","hidden");
						}

						$(".gs_thumb ul").width(187.6*len+(len+1)*2);
						$(".gs_thumb ul li").on("click",function(){
							$(".gs_big img").attr("src",$(this).data("src"));
							$(".ulwrap ul li.active").removeClass("active");
							$(this).addClass("active");
						});

						$("#gs_prev").on("click",function(){
							slide("prev",len);
						});

						$("#gs_next").on("click",function(){
							slide("next",len);
						});

						//点击缩略图
						$(".ulwrap li").on("click",function(){
							$(".ulwrap li.active").removeClass("active");
							$(this).addClass("active");
							$(".gs_big img").attr("src",$(this).data("src"));
							dealVideo($(this).data("type"));
						});

						$(".video_mask").on("click",function(event){
							if(!$("#video").attr("src")){
								$("#video").show().attr("src",data.list[0].playUrl);
							}else{
								if(navigator.userAgent.indexOf("Firefox")>0){
										
								}else{
									if($("#video")[0].paused){
										$("#video")[0].play();
									}else{
										$("#video")[0].pause();
									}
								}
							}
						});
					});

					//获取DLC和游戏道具
					Game.gameProp({"gid":param.itemId},function(data){
						data.data.gid = param.itemId;
						$(".gameItem_dlc").html(($("#gameDlcTemplate").tmpl({"list":data.data.dlclist})));
					});	
				}else if (data.code == 500401){
					$.go404();
				}else{
					$.alertTmpMsg(data.message);
				}
			});

			//获取推荐游戏
			Game.getGameRecommend(null,function(data){
				if(data.code == 200){
					$(".gt_content").html($("#reGameTemplate").tmpl({"list":data.list.slice(0,4)}));
					$(".gt_content li").on("click",function(){
						$.goPage("#gameItem/"+$(this).data("id"));
					});
				}else{
					$.alertTmpMsg(data.message);
				}
			});

			//购买按钮被点击
			$(".centered").on("click",".goto_money",function(){
				addToGameCart($(this),function(data){
					if(data.exist != 1){
						$.setNum(data.goods_num);
					}
					$.goPage("#cart");
				});
			});	

			//加入购物车
			$(".centered").on("click",".set_cart",function(){
				var _this = $(this);
				if(!_this.hasClass("disable")){
					addToGameCart($(this),function(data){
						$.setNum(data.goods_num);
						
						var param = {};
					    param.content = $("#addCartPop").tmpl({});
					    param.width = 450;
						$.alertPop(param,function(){
					    	$(".pop_cancel").on("click",function(){
					    		$.closePop();
					    	});

					    	$(".pop_ok").on("click",function(){
					    		$.closePop();
								$.goPage("#cart");
					    	});
					    });
					});	
				}
			});	

			//添加到购物车
			function addToGameCart(node,callback){
				Game.addGameCart({"cartList":[{"gid":node.data("gid"),"productCode":node.data("produceid")?node.data("produceid"):0,"type":node.data("type")}]},function(data){
					if(data.code == 200){
						if(data.data.exist == 0){   
							callback && callback(data.data);
						}else{
					        $.alertTmpMsg("该商品已存在购物车。");
					        node.addClass("disable");
						}
						callback && callback(data.data);
					}else{
						$.alertTmpMsg(data.message);
					}				
				});
			}

			function slide(dir,len){
				var nodes= $(".ulwrap li"),
				    currNode = $(".ulwrap li.active");
				var index = $(".ulwrap li.active").data("index");
				if(dir == 'prev'){
					if(index > 0){
						nodes.eq(index-1).addClass("active");
						currNode.removeClass("active");
						$(".gs_big img").attr("src",nodes.eq(index-1).data("src"));
						if(index-1 == 0){
							$("#gs_prev").css("visibility","hidden");
						}else{
							$("#gs_prev").css("visibility","visible");
						}
						_visible(len,index-1);
						_ulMove(len,index,"prev");
						dealVideo(nodes.eq(index-1).data("type"));
					}
				}else if(dir == 'next'){
					if(index < len-1 ){
						nodes.eq(index+1).addClass("active");
						currNode.removeClass("active");
						$(".gs_big img").attr("src",nodes.eq(index+1).data("src"));
						_visible(len,index+1);
						_ulMove(len,index,"next");
						dealVideo(nodes.eq(index+1).data("type"));
					}
				}

				function _visible(len,index){
					if(index == 0){
						$("#gs_prev").css("visibility","hidden");
					}else{
						$("#gs_prev").css("visibility","visible");
					}

					if(len > 5 && index+1 != len){
						$("#gs_next").css("visibility","visible");
					}else{
						$("#gs_next").css("visibility","hidden");
					}
				}

				function _ulMove(len,index,dir){
					if(dir == "next" && hidLen == (index + 1) - 5){
						++hidLen;
						$(".ulwrap ul").css("margin-left",-hidLen*(187.6+2));
					}

					if(dir == "prev" && hidLen == index){
						--hidLen;
						$(".ulwrap ul").css("margin-left",-hidLen*(187.6+2));
					}
				}
			}

			function dealVideo(type){
				$("#video").hide().attr("src","");
				if(type == 1){
					$(".video_mask").hide();
				}else if(type == 2){
					$(".video_mask").show();
				}
			}

			$(".search").on("click",function(){
				search_keyword = $.trim($(".game_toptit input").val());
				window.location.href = "#gameList";
			});
		});
	}
});