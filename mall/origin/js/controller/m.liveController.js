/**
 * 直播
 * 2016-05-08
 * simba
 */
$(function(){
	var win_w = document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth;
	var win_h = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;

	//引导页高度设定
	$(".ml-guide").css({
		"height" : win_h + "px"
	});
	//直播页最小高度设定
	$(".min-container,.ml-video").css({
		"min-height" : win_h + "px"
	});

	// 页面加载 引导页1S小时
	setTimeout(function(){
		$(".ml-guide").fadeOut(1000);
	},300)

	//视频高度设定
	$(".ml-live").height($("#live").height());

	//判断是否是宽屏手机
	if(win_w/win_h > 0.6){
		$(".ml-buyBtn").css({
			"margin-top" : "14%"
		});
	}

	//倒计时
	Conference.getServeTime("",function(data){
		var conferenceGet = {};
		if(data.code == 200){
			var _countdown,_buyCountdown;
			var total = data.timestamp;//距离发布会开始的总时间  ps：单位：秒
			var buyTotal = total + 3*60*60; //距离开始预购的时间  ps：单位：秒

			//total = -6;
			//buyTotal = 2;

			//判断直播是否开始
			// if (total <= -1) {
			// 	liveStart();
			// }

			//判断预购是否开始
			if(buyTotal <= -1){//开始预购
				buyStart();

				$("#live-day").text("00");
				$("#live-hour").text("00");
				$("#live-min").text("00");
				$("#live-sec").text("00");
			}else{
				buyCountdown();
			}

			//预购倒计时
			function buyCountdown(){
				conferenceGet._Date = parseInt(buyTotal / (24*60*60)); //计算整数天数

				var afterDay = buyTotal - conferenceGet._Date*24*60*60; //取得算出天数后剩余的秒数

				conferenceGet._Hours = parseInt(afterDay/(60*60)); //计算整数小时数

				var afterHour = afterDay - conferenceGet._Hours*60*60; //取得算出小时数后剩余的秒数

				conferenceGet._Minutes = parseInt(afterHour/60); //计算整数分
				conferenceGet._Seconds = parseInt(afterHour - conferenceGet._Minutes*60); //取得算出分后剩余的秒数

				for (var i in conferenceGet) {
					if(conferenceGet[i] < 10){
						conferenceGet[i] = "0" + conferenceGet[i];
					}
				}

				//填充时间
				$("#live-day").text(conferenceGet._Date);
				$("#live-hour").text(conferenceGet._Hours);
				$("#live-min").text(conferenceGet._Minutes);
				$("#live-sec").text(conferenceGet._Seconds);

				buyTotal --;
				judgeBuyTime();// 判断倒计时的时间
			};

			// 判断时间，倒计时结束预购开始
			function judgeBuyTime(){
				if(buyTotal > -1){
					_buyCountdown = setTimeout(buyCountdown,1000); //循环倒计时
				}else{
					//停止倒计时
					clearTimeout(_buyCountdown);
					buyStart();
				}
			}
			//
			function buyStart() {
				$(".ml-buy-top").hide();
				$(".ml-buy").show();
			}

			//发布会直播倒计时
			// function countdown(){
			// 	total --;
			// 	judgeTime();
			// }

			// //判断发布会倒计时
			// function judgeTime(){
			// 	if(total > -1){
			// 		_countdown = setTimeout(countdown,1000); //循环倒计时
			// 	}else{
			// 		//停止倒计时
			// 		clearTimeout(_countdown);
			// 		//开始直播
			// 		liveStart();
			// 	}
			// }
			// countdown();

			// // 开始直播
			// function liveStart(){
			// 	$("#live").attr("src",Live.pcSrc);
			// }

		}
	});


	//屏幕大小发生改变
	$(window).resize(function(){
		var win_h = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
		
		//引导页高度设定
		$(".ml-guide").css({
			"height" : win_h + "px"
		});
		//直播页最小高度设定
		$(".min-container,.ml-video").css({
			"min-height" : win_h + "px"
		});
	});

})