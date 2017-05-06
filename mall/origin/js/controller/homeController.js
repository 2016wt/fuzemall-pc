define(function(){
	return  function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/home.css","css/slide.css"],function(){
    //         var win_w = document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth;
			 // var win_h = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;

           
			
			/**
			 *  home 弹窗视频
			 *	simba
			 *	2016.05.10
			 */
			$(".video_btn").on("click",function(){
				$(".home-video-pop").html($("#vedio_box").tmpl());
				$(".home-video-pop").show();
				var h = $(".home-video-con").height();
				$(".home-video-con").css("margin-top",-(h/2));
			});

			$("body").on("click",".home-video-close",function(){
				$(".home-video-pop").html(" ");
				$(".home-video-pop").hide();
			});
			
			//获取首页banner信息
			Goods.getBanner({"pid":1},function(data){
				if(data.code == 200){
					//console.log(data)
					$(".home-list").html($("#banner-tem").tmpl(data.data));
					$(".home-hotgames").show();
                    	$(".home-newgames").show();
                    	$(".home-recentnews").show();
					//home banner 初始化
						setTimeout(function(){
	                       $(".home-banner").bannerSlider({
							"ul" : ".home-list",
							"ulTips" : ".home-list-tips",
							"moveWay" : "roll"
						   });
						},100)
						
					
					
				}
			});
			
			// $('.home-banner').css({'height':(win_h-80)+'px'});
			// $('.home-list').css({'height':(win_h-80)+'px'});
			//获取热门游戏和最新游戏
			Home.getGameHotAndNew({"pagesize":"4"},function(data){
				if(data.code == 200){
					 $(".hotlist").html($("#hotgame_tmpl").tmpl({"hotlist":data.data.hotList.list}));
					$(".newlist").html($("#newgame_tmpl").tmpl({"newlist":data.data.new.list}));
			
				}
			});
			//取消导航高亮
			$(".layer1 li").removeClass("active");

			//获取首页产品列表
			Home.getHomeGoodsList("",function(data){
				if (data.code == 200) {

					$(".home-gameshow-con").html($("#fuze_product_tmpl").tmpl({"list":data.data}));

					$('.home-gameshow-con .home-fuze').hover(function(){
						$(this).addClass('hover');
						$(this).find('.price').hide();
						$(this).find('.home-fuze-btns').show();
					},function(){
						$(this).removeClass('hover');
						$(this).find('.price').show();
						$(this).find('.home-fuze-btns').hide();
					})


			 	}
			})
			
			//获取最新动态
			Home.getNews({"page_size":"5"} ,function(data){
				if (data.code == 200) {
					$(".news").html($("#news_tmpl").tmpl({"list":data.data}));
					$.fn.extend({
						displayPart:function () {
							var displayLength = 172;
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
					$(".displayPart").displayPart();
					
				}
			})
			
		});
	}
});

