$(function(){
	/*初始化方法*/
	var init = function(){
		//记录密码跳转
		if($.getCookie("fcauth_user_login_info") && !$.getCookie("username")){
			window.location.href = Links.login + "?redirect="+encodeURIComponent(location.href)+"&broker=fuzemall&l=zh-cn";
		}

		//$(document).ready(function(){
			require(["js/modules/header"+_min],function(_call){
				_call && _call();
			});
		//});
	}

	/*初始化*/
	init();
});
