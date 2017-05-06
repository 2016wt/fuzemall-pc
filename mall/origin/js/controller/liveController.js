/**
 * 直播
 * 2016-05-08
 * simba
 */

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
	location.href = "m.live.html";
}
$(function(){

	Conference.getServeTime("",function(data){
		var conferenceGet = {};
		if(data.code == 200){
			var _countdown,_buyCountdown;
			var total = data.timestamp; //距离发布会开始的总时间  ps：单位：秒
			var buyTotal = total + 3*60*60; //距离开始预购的时间  ps：单位：秒

			//buyTotal = 3;

			if (buyTotal <= -1) {
				buyStart();

				$("#live-day").text("00");
				$("#live-hour").text("00");
				$("#live-min").text("00");
				$("#live-sec").text("00");

				return;
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
				buyJudgeTime();// 判断倒计时的时间
			};
			buyCountdown();
			// 判断时间，倒计时结束预购开始
			function buyJudgeTime(){
				if(buyTotal > -1){
					_countdown = setTimeout(buyCountdown,1000); //循环倒计时
				}else{
					//停止倒计时
					clearTimeout(_countdown);
					//开始预购
					buyStart();
				}
			}
			// 开始预购
			function buyStart(){
				$(".live-btn-top").hide();
				$(".live-btn-buy").show();
			}

		}
	});
})