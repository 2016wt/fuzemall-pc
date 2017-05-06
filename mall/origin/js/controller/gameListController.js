define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/slide.css","css/gameList.css","css/pagination.css"],function(){
			$('.look_all').on('click',function(){
				var page = $(this).data('page');
				page++;
				$(this).data('page',page);
				clickPage(page,"20");
			});

			function clickPage(page,pagesize,flag){
				$('.gamelist_loading').show();
				$('.look_all').hide();
				Game.getGameListByCategory({"page":page,"pagesize":pagesize},function(data){
					$('.gamelist_loading').hide();
					$('.look_all').show();
					if (data.code=200) {
						console.log(data)
						if (data.data.list.length < 20 || data.data.totalNum <= 20) {
							$('.look_all').hide();
						};
						if(flag){
							$("#game_List").html($("#gameListTemplate").tmpl({"list":data.data.list}));
						}else{
							$("#gameListTemplate").tmpl({"list":data.data.list}).appendTo($("#game_List"));
						}					
					}else{
						$.alertTmpMsg(data.message);
					}
				});
			};

			//游戏点击
			$("#game_List").on("click",".gamelist_con",function(){
				window.open("#gameItem/"+$(this).data("gid"));
			});

			//点击搜索
			$(".game_toptit a").on("click",function(){
				$(".game_selectbox .active").removeClass("active");
				$(".game_selectbox .select_span").eq(0).addClass("active");
				var keyword = $.trim($(".game_toptit input[type='text']").val());
				if(keyword){
					$(".keyword").show().find("span").text('"'+keyword+'"');
					$(".game_list").addClass("loading").html("");
					Goods.gameSearch({"keyword":keyword},function(data){
						$('.look_all').hide();
						$('.gamelist_loading').hide();
						if(data.code == 200){
							$(".look_all").hide();
							if(data.data.list && data.data.list.length > 0){
								$("#game_List").html($("#gameListTemplate").tmpl({"list":data.data.list}));
							}else{
								$("#game_List").html('<div class="empty_list">抱歉，没有找到“<span style="color:#23aeb3;">'+keyword+'</span>”的搜索结果。</div>');
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
				$(".game_toptit input[type='text']").val("");
				clickPage("1","20",true);
			};

			//点击游戏图片进入游戏详情页
			$(".game_list").on("click",".gamelist_con img",function(){
				window.open("#gameItem/"+$(this).data("gid"));
			});

			//分页内容
			if(!search_keyword){
				clickPage("1","20",false);  //flag表示是否清楚搜索结果
			}else{  //从游戏详情页点击搜索过来的
				$(".game_toptit input[type='text']").val(search_keyword);
				search_keyword = "";
				$(".game_toptit a").trigger("click");
			}
		});
	}
});