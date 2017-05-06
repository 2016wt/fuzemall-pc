define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/game.css"],function(){
			var win_w = document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth;
			var win_h = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;

			/**
			*  	推荐游戏文字内容居中
			*	simba
			* 	2016-04-11
			**/
			var $imgs = $(".game-example-list img"), //推荐游戏图片
				$imgsNew = $(".game-example-news"), //文字容器
				imgsNum = $imgs.size(); // 图片数量
			var imgsTimeout; // 定时器
			var isLoad = true; // 控制变量

			function imgNewsStyle(winW) {
				// 判断图片加载状况，加载完成后回调
				isImgLoad(function(){
					// 加载完成
					for(var i = 0; i < imgsNum; i ++){
						var imgsMtH = $imgsNew.eq(i).height()/2;

						var imgW = winW*1.1 < 1230 ? 1230 : winW*1.1;
						$imgs.eq(i).width(imgW);
						$imgs.eq(i).parent().height($imgs.eq(i).height());
						$imgsNew.eq(i).css({
							"margin-top" : (-1)*imgsMtH + "px"
						});
					}
				});
			}

			// 检测图片是否加载完成的方法
			function isImgLoad(callback){
				$imgs.each(function(){
					if(this.height === 0){
						isLoad = false;
						return false;
					}
				});
				if(isLoad){
					clearTimeout(imgsTimeout);
					callback();
				}else{
					isLoad = true;
					imgsTimeout = setTimeout(function(){
						isImgLoad(callback);
					},500);
				}
			}

			/**
			 *  窗口大小发生改变  图片大小相应改变
			 *	simba
			 * 	2016-04-13
			 **/
			$(window).resize(function(){

				//重新计算窗口的大小
				var win_w = document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth;
				var win_h = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;

				//重新计算图片内容的位置
				imgNewsStyle(win_w);
			});

			/**
			 *  屏幕滚动  图片左移
			 *	simba
			 * 	2016-04-11
			 **/
			// $(window).scroll(function(){
			// 	var scroll = $(document).scrollTop();
            
			// 	for(var i = 0; i < imgsNum; i ++){
			// 		var imgTop = getTop($imgs.eq(i)[0]) - win_h*3/5;
			// 		var imgsOffsetW = ($imgs.eq(i).width() - win_w);
			// 		if(scroll > imgTop){
			// 			$imgs.eq(i).addClass("active");
			// 		}
			// 	}
			// });
			

			//图片动画效果
			$(".game-example-con").on("mouseover","img",function(){
				$(this).css({
					"transform": "translate(-1.2%, 0)"
				});
			}).on("mouseout","img",function(){
				$(this).css({
					"transform": "translate(0, 0)"
				});
			});
			//获取元素的纵坐标（相对于窗口）
			function getTop(e){
				var offset = e.offsetTop;
				if(e.offsetParent != null){offset += getTop(e.offsetParent)};
				return offset;
			}

			imgNewsStyle(win_w);
		});
	}
});