define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/slide.css","css/pagination.css","css/game.css"],function(){
			//获取游戏banner信息
			Goods.getBanner({"pid" : 3},function(data){
				if(data.code == 200){
					$(".game-banner-list").html($("#game-banner-tem").tmpl(data.data));
					$('.game-txt').show();
					$('.game-groups').show();
					$('.look_all').show();

					//home banner 初始化
					setTimeout(function(){
	                    $(".game-banner").bannerSlider({
							"ul" : ".game-banner-list",
							"ulTips" : ".game-banner-tip-list",
							"moveWay" : "roll"
						});
					},100)
					
				}
			});

			//获取游戏分类
			Game.getGameCate("",function(data){
				if (data.code == 200) {
					$('.game-groups').show();
					$('.kindul').html($("#gameCate").tmpl({'list':data.list}));
				}
			}),
			//点击分类切换结果
			$('.kindul').on('click','li',function(){
				$('.txt').val('');
				$('.keyword').hide();
				var index=$(this).index();
				var id=$(this).find('a').attr('id');
				$('.look_all').attr("cid",id);
				$('.look_all').attr("data-page","1");
				$('.look_all').hide();
				$(this).find('a').addClass('hover_bg').parent('li').siblings().find('a').removeClass('hover_bg');
				Game.getGameList({"type":id,"page":"1","pagesize":"20"},function(data){
			
					if (data.code == 200) {
						$('.game-list').html($("#gameList").tmpl({"list":data.data.list}));
						$('.look_all').show();
						if (data.data.list.length <20|| data.data.totalNum <=20) {
							$('.look_all').hide();
						};
						$.fn.extend({
							displayPart:function () {
								var displayLength = 70;
								displayLength = this.attr("displayLength") || displayLength;
								var text = this.text();
								if (!text) return "";

								var result = "";
								var count = 0;
								for (var i = 0; i < displayLength; i++) {
								var _char = text.charAt(i);
								if (count >= displayLength) break;
								if (/[^x00-xff]/.test(_char)) count++; //双字节字符，//[u4e00-u9fa5]中文

								result += _char;
								count++;
								}
								if (result.length < text.length) {
								result += "...";
								}
								this.text(result);
								

								}
						});
						var alis=$(".displayPart");
						for(var i=0;i<alis.length;i++)
						{
							$(alis[i]).displayPart();
						}
					}
				})


			})

			/*--------------------------------------------------------------------------------------*/
			
			
			$('.look_all').on('click',function(){
				var page = $(this).attr('data-page');
				var cid=$(this).attr('cid');
				page++;
				$(this).attr('data-page',page);
			    if(cid)
				{
				
					clickPage(cid,page,"20");
				}
				else
				{
				   clickPage('',page,"20");
				}
			
			});

			function clickPage(type,page,pagesize,flag){
				$('.gamelist_loading').show();
				$('.look_all').hide();

				Game.getGameList({"type":type,"page":page,"pagesize":pagesize},function(data){
					$('.gamelist_loading').hide();
					$('.look_all').show();
					if (data.code=200) {
						if (data.data.list.length < 20 || data.data.totalNum <= 20) {
							$('.look_all').hide();
						};
						if(flag){
							$('.game-list').html($("#gameList").tmpl({"list":data.data.list}));
							
							
						}else{
							$("#gameList").tmpl({"list":data.data.list}).appendTo($(".game-list"));
							
							
							
						}
						$.fn.extend({
							displayPart:function () {
								var displayLength = 70;
								displayLength = this.attr("displayLength") || displayLength;
								var text = this.text();
								if (!text) return "";

								var result = "";
								var count = 0;
								for (var i = 0; i < displayLength; i++) {
								var _char = text.charAt(i);
								if (count >= displayLength) break;
								if (/[^x00-xff]/.test(_char)) count++; //双字节字符，//[u4e00-u9fa5]中文

								result += _char;
								count++;
								}
								if (result.length < text.length) {
								result += "...";
								}
								this.text(result);
								

								}
						});
						var alis=$(".displayPart");
						for(var i=0;i<alis.length;i++)
						{
							$(alis[i]).displayPart();
						}
						
											
					}else{
						$.alertTmpMsg(data.message);
					}
				});
			};
				$(document).keydown(function(e) {
			    	
			    	var e=event.event||window.event;
		             if (e.keyCode ==13) {//keyCode=13是回车键
		                      $(".search button").trigger("click");


		             }
		         });
			
			//点击搜索
			$(".search button").on("click",function(){
				$('.kindul li').find('a').removeClass('hover_bg');
				$('.kindul li').eq(0).find('a').addClass('hover_bg');
				var keyword = $.trim($(".search input[type='text']").val());
			    if(keyword!=""){
						$(".keyword").show().find("span").text('"'+keyword+'"');
						$(".game-list").addClass("loading").html("");
						Goods.gameSearch({"keyword":keyword},function(data){
							$('.look_all').hide();
							$('.gamelist_loading').hide();
							if(data.code == 200){
								$(".look_all").hide();
								if(data.data.list && data.data.list.length > 0){
									$(".game-list").html($("#gameList").tmpl({"list":data.data.list}));
								}else{
									$(".game-list").html('<div class="empty_list">抱歉，没有找到“<span style="color:#23aeb3;">'+keyword+'</span>”的搜索结果。</div>');
								}
								$.fn.extend({
								displayPart:function () {
									var displayLength = 70;
									displayLength = this.attr("displayLength") || displayLength;
									var text = this.text();
									if (!text) return "";

									var result = "";
									var count = 0;
									for (var i = 0; i < displayLength; i++) {
									var _char = text.charAt(i);
									if (count >= displayLength) break;
									if (/[^x00-xff]/.test(_char)) count++; //双字节字符，//[u4e00-u9fa5]中文

									result += _char;
									count++;
									}
									if (result.length < text.length) {
									result += "...";
									}
									this.text(result);
									

									}
							});
							var alis=$(".displayPart");
							for(var i=0;i<alis.length;i++)
							{
								$(alis[i]).displayPart();
							}
							}else{
								$.alertTmpMsg(data.message);
							}
						});
				}

			});
			//搜索结果"x"
			$(".keyword a").on("click",function(){
				closeSearch();
			});

			function closeSearch(){
				$(".keyword").hide();
				$(".search input[type='text']").val("");
				clickPage("0","1","20",true);
			};

			//点击游戏列表进入游戏详情页
			$(".game-list").on("click",".game-intro",function(){
				window.open("#gameItem/"+$(this).attr("id"));
			});

			//分页内容
			if(!search_keyword){
				clickPage("",1,20);  //flag表示是否清楚搜索结果
			}else{  //从游戏详情页点击搜索过来的
				$(".search input[type='text']").val(search_keyword);
				search_keyword = "";
				$(".search a").trigger("click");
			}

		});
	}
});
