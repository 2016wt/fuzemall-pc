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
					// $('.winlist').html('敬请期待');
					// $('.winlist').addClass('wait');
					
				}
			});

          function clickShow(page,pagesize,flag){
				$('.checkago').hide();
			   Activity.getActivePageWinners({"page":page,"pagesize":pagesize},function(data){
					if(data.code == 200){
						console.log(data)
						if(data.data.list.length <= 1){
							$('.checkago').hide();	
							
						}else{
							$('.checkago').show();
						}
						if (data.data.list.length < 2) {
							$('.checkago').hide();
						};
						if(flag){
							$('.winlist').html($("#activewinner_tmpl").tmpl({'list':data.data.list}));
							
					    }else{
							$("#activewinner_tmpl").tmpl({"list":data.data.list}).appendTo($('.winlist'));
							
						}
							$('.winlist .winner').hide();
			                 $('.winlist .winner:nth-child(1)').show();
						//加省略号
						$.fn.extend({
								displayPart:function () {
									var displayLength = 16;
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
						// $(".displayPart").displayPart();
						var alis=$(".displayPart");
						for(var i=0;i<alis.length;i++)
						{
							$(alis[i]).displayPart();
						}
					}
			   });
		  };
         clickShow("1","",true);
		 $('.checkago').on('click',function(){
		   $('.winlist .winner:not(1)').show();
		   $('.checkago').hide();
		 });
		   
















		});
	}
});
