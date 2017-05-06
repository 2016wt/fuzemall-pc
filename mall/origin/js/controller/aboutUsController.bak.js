define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/aboutUs.css"],function(){

			var flg = true;
			$('.aboutus_time dl').hover(function(){
				var _this = $(this), 
					ind = _this.index(), 
					wid = $('.aboutus_slide_list').outerWidth(), 
					slid = $('.aboutus_slide_box');
					
				if (flg) {
					flg = false;
					slid.css('margin-left',-(ind*wid));
					setTimeout(function(){
						flg = true;
						_this.addClass('active').siblings().removeClass('active');
					},50);
				};
				
			});

			$('.aboutus_team_list').each(function(){
				var _this = $(this),
					ind = _this.index();
					if (ind ==  4 || ind == 9) {
						_this.addClass('active');
					};
			});
	
		});
	}
});