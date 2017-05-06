//判断是否是PC端
function IsPC()  {
	var flag = true;
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
	}
	return flag;
}
if(IsPC()){
	location.href = "release.html";
}

$(function(){
	var win_w = document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth;
	var win_h = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
	$(".min-container").height(win_h);


	//音乐播放
	var bgAudio = new Audio();
    bgAudio.loadStatus = 'unload';
    bgAudio.loop = true;
    function loadAudio(audio, url, callback) {
        audio.src = url;
        audio.load();
        audio.addEventListener('canplay', function () {
            bgAudio.loadStatus = 'loaded';
            callback();
        });
        audio.addEventListener('loadstart', function () {
            bgAudio.loadStatus = 'loading';
        });
    }
    function playAudio(){
        if (bgAudio.loadStatus === 'unload') {
            loadAudio(bgAudio, 'Adventure_Island_II-Overworld_3.mp3', function () {
                playAudio();
            });
            return 1;
        }

        bgAudio.play();
    }
    function stopAudio() {
        bgAudio.pause();
    }
    bgAudio.addEventListener('playing' ,function (e) {
        $('#music').addClass('rotate');
    });
    bgAudio.addEventListener('pause' ,function (e) {
        $('#music').removeClass('rotate');
    });

    $('body').one('touchend', function () {
        playAudio();
        $('#music').on('touchend', function (e) {
            if (bgAudio.paused) {
                playAudio();
                return 0;
            }
            stopAudio();
            return 1;
        });
    });
    window.onload = function() {
        if (bgAudio.loadStatus !== 'unload') {return;}
        playAudio();
    };

	// 宽屏手机兼容
	if(win_w/win_h > 0.6){
		$(".page3 img,.page1 img").css({
			"width" : "90%"
		});
	}
	//屏幕大小发生改变
	$(window).resize(function(){
		console.log(1);
		var win_h = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
		$(".min-container").height(win_h);
		$(".page6-map").height(win_h);
	});


	$(".min-fullpage").fullpage({
		menu: ".min-fullpage",
        page: '.page',
	    start: 0,
	    duration: 500,
	    drag: false,
	    loop: false,
	    dir: 'v',
	    der: '0.25',
        afterChange: function (e) {
            // 添加动画属性
            $('.page').find('.js-animate').each(function () {
                $(this).removeClass($(this).data('animate'));
            });
            $('.page').eq(e.cur).find('.js-animate').each(function () {
                $(this).addClass($(this).data('animate'));
            });
        }
	});

	//全局参数
	var params = {
		//验证码参数
		authCode : {
			phone : "",
			type : 1
		},
		//提交参数
		submit : {
			phone : "",
			name : "",
			code :　""
		}
	}

	/**
	* page4
	* 表单
	*/
	//提交个人信息
	function submitSelfMessage(){
		var _name = $("#rf-name").val(),
			_phone = $("#rf-phone").val(),
			_code = $("#rf-code").val();
		params.submit.name = _name;
		params.submit.phone = _phone;
		params.submit.code = _code;

		//提交验证
		if(params.submit.name  == ""){$(".rf-box").find("input").eq(0).parents(".rf-error-pa").next().text("姓名不能为空"); return false;}
		if(params.submit.phone  == ""){
			$(".rf-box").find("input").eq(1).parents(".rf-error-pa").next().text("手机号码不能为空");  
			return false;
		}else if(!checkTel(params.submit.phone)){
			$(".rf-box").find("input").eq(1).parents(".rf-error-pa").next().text("请填写正确的手机号");  
			return false;
		}
		if(params.submit.code  == ""){$(".rf-box").find("input").eq(2).parents(".rf-error-pa").next().text("验证码不能为空");  return false;}

		//信息提交
		var paramsSubmit = "param=" + JSON.stringify(params.submit);
		$.ajax({
			type : "post",
			url : '/front.php?s=/Home/Book/submit',
			data : paramsSubmit,
			dataType : "json",
			success : function(data){
				if(data.code == 200){
					minPop("提交成功","如果您抽中入场券，我们将在</br>5月10日前电话联系您，请保持手机畅通。");
					$("#rf-name").val("");
			 		$("#rf-phone").val("");
					$("#rf-code").val("");
				}else{
					minPop("提交失败",data.message);
				}
			}
		});
	}
	$("#rf-Send").on("touchend",submitSelfMessage);

	//手机验证
	function checkTel(tel){
        var regstr = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
        return regstr.test(tel);
    }
	//倒计时60s
	var time = 60;
	//获取验证码
	function getAuthCode(){

		if($(this).hasClass("rf-authSended")){return}

		//重置倒计时
		time = 60;

		var phoneCal = $("#rf-phone").val();
		params.authCode.phone = phoneCal;
		params.authCode.type = 1;

		//提交验证
		if(params.authCode.phone  == ""){
			$(".fr-error").eq(1).text("手机号码不能为空");
			return;
		}else if(!checkTel(phoneCal)){
			$(".fr-error").eq(1).text("请填写正确的手机号");
			return;
		}else{
			$(".fr-error").eq(1).text("");
		}

		// 信息提交
		var paramsAuthCode = "param=" + JSON.stringify(params.authCode);
		$.ajax({
			type : "post",
			url : '/front.php?s=/Home/Book/getVerfiyCode',
			data : paramsAuthCode,
			dataType : "json",
			success : function(data){
				if(data.code != 200){
					minPop("提交失败",data.message);
				}
			}
		});
		//发送之后倒计时60s
		countdown60s();
	}
	$("#rf-authSend").on("touchend",getAuthCode);

	function countdown60s(){
		$("#rf-authSend").html(time + " s").addClass("rf-authSended");
		time --;
		if(time < 0){
			$("#rf-authSend").html("发送验证码").removeClass("rf-authSended");
		}else{
			setTimeout(countdown60s,1000);
		}
	}

	/**
	* page5
	* 倒计时
	*/
	$.getJSON('/front.php?s=/Book/currentTimestamp', function(data){
		var conferenceGet = {};
		if(data.code == 200){
			var _countdown;
			var total = data.timestamp;

			//模拟直播
			//total = 3;

			//发布会倒计时
			function countdown(){
				conferenceGet._Date = parseInt(total / (24*60*60)); //计算整数天数

				var afterDay = total - conferenceGet._Date*24*60*60; //取得算出天数后剩余的秒数

				conferenceGet._Hours = parseInt(afterDay/(60*60)); //计算整数小时数

				var afterHour = afterDay - conferenceGet._Hours*60*60; //取得算出小时数后剩余的秒数

				conferenceGet._Minutes = parseInt(afterHour/60); //计算整数分
				conferenceGet._Seconds = parseInt(afterHour - conferenceGet._Minutes*60); //取得算出分后剩余的秒数


				//填充时间
				$("#rc-day").text(conferenceGet._Date);
				$("#rc-hour").text(conferenceGet._Hours);
				$("#rc-min").text(conferenceGet._Minutes);
				$("#rc-sec").text(conferenceGet._Seconds);

				total --;
				judgeTime();//判断倒计时
			};
			countdown();

			// 判断时间，倒计时结束直播开始
			function judgeTime(){
				if(total > -1){
					_countdown = setTimeout(countdown,1000); //循环倒计时
				}else{
					//停止倒计时
					clearTimeout(_countdown);
					//开始直播
					liveStart();
				}
			}

			// 开始直播
			function liveStart(){
				// $(".page5-top").height(0);
				// $(".page-live").height("100%");
				// $(".page-live").find("video").css({
				// 	"height" : "50%",
				// 	"margin-top" : "25%"
				// });
			}
		}
	});


	/**
	* page6
	* map
	*/
	$(".page6-map").height(win_h);

	function mapinit(){
	    var map = new BMap.Map("page-map");            // 创建Map实例
		var point = new BMap.Point(116.50768,39.993112); // 创建点坐标
		map.centerAndZoom(point,17);                 // 初始化地图,设置中心点坐标和地图级别。
		map.addControl(new BMap.ZoomControl());      //添加地图缩放控件
		var marker = new BMap.Marker(new BMap.Point(116.50768,39.993112));
		map.addOverlay(marker); 
		map.panTo(116.50768,39.993112); 
		// map.addEventListener("moveend", function(event){      
	 //      	 event.preventDefault();
		// });
	}
	mapinit();
	//点击初始化地图
	$('#map-click').on('touchend',function(){
		mapinit();
	});

	/**
	* 错误提示
	* 
	*/
	$(".rf-box").find("input").on("blur",function(){
		var flag = true;
		var thsVal = $(this).val();
		var errorTit = $(this).siblings().text();
		if (thsVal == "") {
			$(this).parents(".rf-error-pa").next().text(errorTit + "不能为空");
			flag = false;
		}else{
			$(this).parents(".rf-error-pa").next().text("");
		}
		var thsIndex = $(".rf-box").find("input").index($(this));
		if (thsIndex == 1 && flag) {
			if (!checkTel(thsVal)) {
				$(this).parents(".rf-error-pa").next().text("请填写正确的手机号");
			}
		}
	});

	/**
	* 点击遮罩层消失
	 */ 
	
	$(".page6-cover").on("touchend",function(){
		$(this).hide();
	});

    /**
	* 弹出提示框
	* 
	*/
	function minPop(tit,msg){
		$(".rl-min-pop").show();
		$(".rl-min-pop").find("h1").text(tit);
		$(".rl-min-pop").find("p").html(msg);
	}
	$("body").on("touchend",".rl-min-close,.rl-min-close-btn",function(){
		var pTxt = $(".rl-min-pop").find("h1").text();
		if(pTxt == "提交成功"){
			$.fn.fullpage.moveNext();//提交成功 翻滚到下一屏
			time = -1;
		}
		$(".rl-min-pop").hide();
		$(".rl-min-pop").find("p").text("");
	})

	// //首屏
	// if(win_h > $(".page1 img").height()){
	// 	$(".page1 img").css({
	// 		"margin-top" : (win_h - $(".page1 img").height())/2 + "px"
	// 	});
	// }

	//图片样式调整
	var $imgs = $(".page1").find("img");
	/**
	 *  判断图片是否加载完成
	 *	simba
	 *	2016.04.06
	 */
	var imgsTimeout; // 定时器
	var isLoad = true; // 控制变量

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
	 *  图片大小自适应
	 *  simba
	 *  2016-04-18
	 *  */
	isImgLoad(function(){
		var imgLen = $imgs.size();
		// 加载完成
		for(var i = 0; i < imgLen; i ++){
			var imgW = $imgs.eq(i).width(),
				imgH = $imgs.eq(i).height();

			if(win_h > imgH){
				var mt = (win_h - imgH)/2;
				$imgs.eq(i).css({
					"margin-top" : mt + "px"
				});
			}
		}
	});

})