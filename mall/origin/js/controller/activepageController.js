define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/activepage.css"],function(){
			
			Activity.getActivePageInfo({"id" : 1},function(data){
				if(data.code == 200){
					$(".rulescon").html(data.data.activity_rule);
					$('.awardcon').html($("#awardset_tmpl").tmpl({'list':data.data.prize}));
					$('.txtcontent').html(data.data.desc);
					$('.activepage-banner').html($("#activebanner_tmpl").tmpl(data.data));
				}
			});
	       $('.checkago').on('click',function(){
			  var page = $(this).attr('data-page');
					var cid=$(this).attr('cid');
					page++;
					$(this).attr('data-page',page);
				    clickPage(page,"10",false,"past");
			});
          function clickPage(page,pagesize,flag,stage){
				Activity.getActivePageWinners({"page":page,"pagesize":pagesize,"stage":stage},function(data){
					if(data.code == 200){
						var num=(page-1)*pagesize+1;
						if(num >= data.data.totalRow){
							 $('.checkago').hide();
						}
						if(data.data.list.length<=0){
							$('.winlist').append('<div class="wait">敬请期待</div>');
							$('.checkago').hide();
						}
						else if(data.data.list[0].activityList.length <=0){
							$('.winlist').append('<div class="wait">敬请期待</div>');
						}else{
							if(flag){
							$('.winlist').html($("#activewinner_tmpl").tmpl({'list':data.data.list}));
							}else{
								$("#activewinner_tmpl").tmpl({"list":data.data.list}).appendTo($('.winlist'));
							}
						}
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
						var alis=$(".displayPart");
						for(var i=0;i<alis.length;i++)
						{
							$(alis[i]).displayPart();
						}
					}
			   });
		  };
       
		 clickPage("1","1",true,"");
		  
		});
	}
});
