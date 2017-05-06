

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
if(!IsPC()){
	location.href = "m.release.html";
}
$(function(){
	//地图
	var map = new BMap.Map("relese_map");
	map.centerAndZoom(new BMap.Point(116.50768,39.993112),22);
	map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用

	map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
	map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
	var marker = new BMap.Marker(new BMap.Point(116.50768,39.993112));
	map.addOverlay(marker); 
	map.panTo(116.50768,39.993112);

	//全局参数
	var params = {
		//验证码参数
		authCode : {
			phone : ""
		},
		//提交参数
		submit : {
			phone : "",
			name : "",
			code :　""
		}
	}

	// Conference.getServeTime("",function(data){
	// 	var conferenceGet = {};
	// 	if(data.code == 200){
	// 		var _countdown;
	// 		var total = data.timestamp;

	// 		//total = 4;

	// 		//发布会倒计时
	// 		function countdown(){
	// 			conferenceGet._Date = parseInt(total / (24*60*60)); //计算整数天数
				
	// 			var afterDay = total - conferenceGet._Date*24*60*60; //取得算出天数后剩余的秒数

	// 			conferenceGet._Hours = parseInt(afterDay/(60*60)); //计算整数小时数

	// 			var afterHour = afterDay - conferenceGet._Hours*60*60; //取得算出小时数后剩余的秒数

	// 			conferenceGet._Minutes = parseInt(afterHour/60); //计算整数分
	// 			conferenceGet._Seconds = parseInt(afterHour - conferenceGet._Minutes*60); //取得算出分后剩余的秒数


	// 			//填充时间
	// 			$("#rc-day").text(conferenceGet._Date);
	// 			$("#rc-hour").text(conferenceGet._Hours);
	// 			$("#rc-min").text(conferenceGet._Minutes);
	// 			$("#rc-sec").text(conferenceGet._Seconds);

	// 			total --;
	// 			judgeTime();// 判断倒计时的时间
	// 		};

	// 		countdown();

	// 		// 判断时间，倒计时结束直播开始
	// 		function judgeTime(){
	// 			if(total > -2){
	// 				_countdown = setTimeout(countdown,1000); //循环倒计时
	// 			}else{
	// 				//停止倒计时
	// 				clearTimeout(_countdown);
	// 				//开始直播
	// 				liveStart();
	// 			}
	// 		}

	// 		// 开始直播
	// 		function liveStart(){
	// 			//移除倒计时
	// 			$(".release-countdown").remove();
	// 			//加载直播
	// 			$(".live-box").show();
	// 			//$(".live-iframe").html("<iframe id='live' src='http://live.lecloud.com/live/playerPage/getView?activityId=A2016010500713'></iframe>");
				
	// 		}
	// 	}
	// });


	//提交个人信息
	function submitSelfMessage(){
		params.submit.name = $("#rf-name").val();
		params.submit.phone = $("#rf-phone").val();
		params.submit.code = $("#rf-code").val();

		//提交验证
		if(params.submit.name  == ""){$.alertTmpMsg("请填写您的姓名"); return}
		if(params.submit.phone  == ""){$.alertTmpMsg("请填写您的电话号码"); return}
		if(params.submit.code  == ""){$.alertTmpMsg("请填写验证码"); return}
		
		if(!$.checkTel(params.submit.phone)){
			$.alertTmpMsg("请填写正确的联系方式哦！");
			return;
		}

		//信息提交
		Conference.submitSelfMessage(params.submit,function(data){

			if(data.code == 200){
				$(".release-pop").show();
				time = -1;
				$("#rf-name").val("");
				$("#rf-phone").val("");
				$("#rf-code").val("");
			}else{
				$.alertTmpMsg(data.message);
			}
		});
	}
	$("#rf-Send").on("click",submitSelfMessage);

	//获取验证码
	var time = 60;
	function getAuthCode(){
		if($(this).hasClass("rf-authSended")){return}
		time = 60;

		params.authCode.phone = $("#rf-phone").val();

		//提交验证
		if(params.authCode.phone  == ""){
			$.alertTmpMsg("请填写您的电话号码"); 
			return;
		}
		if(!$.checkTel(params.authCode.phone)){
			$.alertTmpMsg("请填写正确的联系方式哦！");
			return;
		}

		//信息提交
		Conference.getAuthCode(params.authCode,function(data){
			if(data.code != 200){
				$.alertTmpMsg(data.message);
			}
		});
		//发送之后倒计时60s
		countdown60s();
	}
	$("#rf-authSend").on("click touchend",getAuthCode);

	//倒计时60s
	function countdown60s(){
		$("#rf-authSend").html(time + " s").addClass("rf-authSended");
		time --;
		if(time < 0){
			$("#rf-authSend").html("发送验证码").removeClass("rf-authSended");
		}else{
			setTimeout(countdown60s,1000);
		}
	}

	//分享表单弹出按钮
	function shareBox(){
		$(".release-form").slideDown(100);
		$(".rele_btn").addClass("release-bottomLine");
	}
	$("#release-shareBtn").on("click",shareBox);

	//关闭分享按钮
	function closeShare(){
		$(".release-share").hide();
	}
	$(".release-share").on("click",".rs-close",closeShare);


	//邀请好友抽取入场券
	function inviteFriends(){
		$(".release-pop").hide();
		$(".release-share").show();
	}
	$(".release-pop").on("click",".rpn-btn",inviteFriends);

	//关闭好友邀请
	function closeInviteFriends(){
		$(".release-pop").hide();
	}
	$(".release-pop").on("click",".rp-close",closeInviteFriends);



})