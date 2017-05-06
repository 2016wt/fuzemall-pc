define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/activepage.css"],function(){
			
			Activity.getActivePageInfo({"id" : 1},function(data){
				if(data.code == 200){
					//console.log(data)
					$(".rulescon").html(data.data.activity_rule);
					$('.awardcon').html($("#awardset_tmpl").tmpl({'list':data.data.prize}));
					$('.txtcontent').html(data.data.desc);
					$('.activepage-banner').html($("#activebanner_tmpl").tmpl(data.data));
					$('.winlist').html('敬请期待');
					$('.winlist').addClass('wait');
					
				}
			});















		});
	}
});
