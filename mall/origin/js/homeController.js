define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/home.css"],function(){
			var win_w = document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth;
			var win_h = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;

			/**
			*  	game 轮播
			*	simba
			* 	2016-05-16
			**/
			var timer = null;
			$.fn.slider = function(opts){
				//基本参数
				opts = $.extend({
					timeout : 3000,	//轮播间隔时间 ps：最小值为1500
					moveTime : 800, //动画时间 ps：最小值为500
					autoSlider : false, //是否自动轮播 ps：只能是boolean类型，不是的会默认为true
					imgNum : 4 //每屏显示的图片数
				}, opts || {});

				//基本参数的默认设置
				opts.timeout = opts.timeout < 1500 ? 1500 : opts.timeout;
				opts.moveTime = opts.moveTime < 500 ? 500 : opts.moveTime;
				opts.autoSlider = typeof opts.autoSlider != "boolean" ? true : opts.autoSlider;

				//获取元素
				var ths = this,
					thsSliderBox = ths.find(".js_slider"),//轮播的内容容器
					thsSliders = thsSliderBox.find("a"), //轮播内小容器
					thsSlidersWidth = thsSliders[0].clientWidth || thsSliders[0].scrollWidth, //轮播内小容器的宽度
					thsSlidersSize = Math.ceil(thsSliders.size()/opts.imgNum), //轮播的屏数
					thsTipsBox = ths.find(".js_slider_tips"), //tips容器
					thsHandle = ths.find(".js_slider_handle"); //左右箭头


				//全局变量
				var count = 0, //轮播计数
					flag = true; //轮播方向  true ==> 左 false ==> 右

				var init = function () {
					//样式初始化
					styleInit();
					stopSlider();
					//动画循环开始
					startSlider();

					//左右按钮事件绑定
					thsHandle.on("click",function(){
						stopSlider();
						var thsIndex = thsHandle.index($(this));
						flag = thsIndex == 0 ? false : true;
						animateInit();
					});

					//tips按钮事件绑定
					thsTipsBox.on("click","li",function(){
						stopSlider();
						var thsIndex = thsTipsBox.find("li").index($(this));
						count = thsIndex;
						moveInit(count);
						startSlider();
					});
				},
				//样式初始化
				styleInit = function(){
					//外容器宽度赋给轮播容器  30px为每屏的最后一个图片的margin-left值 让动画移动的时候有固定的间隙
					thsSliderBox.width(thsSlidersWidth*thsSliders.size());

					//生成tips 并默认选中第一个
					for(var i = 0; i < thsSlidersSize; i ++){
						thsTipsBox.append("<li>");
						if(i == 0){
							thsTipsBox.find("li").eq(i).addClass("active");
						}
					}
				},
				//动画逻辑
				animateInit = function(){
					if(flag){
						count ++;
						count = count == thsSlidersSize ? 0 : count;
					}else{
						count --;
						count = count == -1 ? thsSlidersSize - 1 : count;
					}
					moveInit(count);
					startSlider();
				},
				//动画移动效果
				moveInit = function(i){
					thsSliderBox.stop(true,true).animate({
						"left" : (-1)*i*(thsSlidersWidth*opts.imgNum)
					},opts.moveTime);
					thsTipsBox.find("li").removeClass("active").eq(i).addClass("active");
				},
				//开始轮播
				startSlider = function(){
					flag = true;

					if(opts.autoSlider == true){
						timer && clearTimeout(timer);
						timer = setTimeout(animateInit, opts.timeout);
						// window.data('autoSli', window.setTimeout(animateInit, opts.timeout));
					}
				},
				//暂停轮播
				stopSlider = function(){
					// window.clearTimeout(window.data('autoSli'));
					timer && clearTimeout(timer);
				}
				//初始化
				init();
			}

			//获取首页3A游戏列表
			Game.getRecommendList("",function(data){

				if (data.code == 200) {

					$("#gameRecommend").html($("#gameRecommendTem").tmpl(data));

					//轮播初始化
					$(".game-slider").slider();

				}
			});

			//获取首页首发游戏列表
			Game.getStartingList("",function(data){

				if (data.code == 200) {

					$("#gameStarting").html($("#gameStartingTem").tmpl(data));

				}
			});

			//查看游戏详情
			$(".JS_gameItem").on("click","a",function(){
				var ths = $(this),
					thsId = ths.attr("id");
				//timer && clearTimeout(timer);
				//window.location.href = "#gameItem/" + thsId;
				window.open("#gameItem/" + thsId);
			});

			//查看游戏列表
			$("#gameMore").on("click",function(){
				timer && clearTimeout(timer);
				bannerTimer && clearInterval(bannerTimer);
				window.location.href = "#gameList";
			});

			$(".game-banner").bannerSlider();

		});
	}
});