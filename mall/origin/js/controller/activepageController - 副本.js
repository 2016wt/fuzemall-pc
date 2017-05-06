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
			// $('.winlist .winner').hide();
			// Activity.getActivePageWinners({"page":1,"pagesize":10},function(data){
			// 		if(data.code == 200){
			// 			console.log(data)
			// 			$('.winlist').html($("#activewinner_tmpl").tmpl({'list':data.data.list}));
			// 			$('.winlist .winner:nth-child(1)').show();
			// 			//加省略号
			// 			$.fn.extend({
			// 					displayPart:function () {
			// 						var displayLength = 16;
			// 						displayLength = this.attr("displayLength") || displayLength;
			// 						var text = this.text();
			// 						if (!text) return "";

			// 						var result = "";
			// 						var count = 0;
			// 						for (var i = 0; i < displayLength; i++) {
			// 						var _char = text.charAt(i);
			// 						if (count >= displayLength) break;
			// 						if (/[^x00-xff]/.test(_char)) count++; //双字节字符，//[u4e00-u9fa5]中文

			// 						result += _char;
			// 						count++;
			// 						}
			// 						if (result.length < text.length) {
			// 						result += "...";
			// 						}
			// 						this.text(result);
									

			// 						}
			// 				});
			// 			$(".displayPart").displayPart();
			// 				// var alis=$(".displayPart");
			// 				// for(var i=0;i<alis.length;i++)
			// 				// {
			// 				// 	$(alis[i]).displayPart();
			// 				// }
						
			// 		}
			// 	});
   //         $('.checkago').on('click',function(){
			// 	var page = $(this).attr('data-page');
			// 	var cid=$(this).attr('cid');
			// 	page++;
			// 	$(this).attr('data-page',page);
			//    if(cid)
			// 	{
			// 		clickPage(cid,page,"10");
			// 	}
			// 	else
			// 	{
			// 	   clickPage('',page,"10");
			// 	}
				
			
		 //   });
		 //   function clickPage(page,pagesize,flag){
			// 	$('.checkago').hide();
			//    Activity.getActivePageWinners({"page":page,"pagesize":pagesize},function(data){
			// 		if(data.code == 200){
			// 			console.log(data)
			// 			// if(data.data.list[0].length==0){
							
			// 			// 	$('.winlist').html('敬请期待');
			// 			// 	$('.checkago').hide();
			// 			// }
			// 			$('.winlist .winner').hide();
			// 			$('.winlist').html($("#activewinner_tmpl").tmpl({'list':data.data.list}));
						 
			// 			 $('.winlist .winner:nth-of-type(1)').show();
			// 			if (data.data.list.length < 2) {
			// 				$('.checkago').hide();
			// 			};
			// 			if(flag){
			// 				$('.winlist').html($("#activewinner_tmpl").tmpl({'list':data.data.list}));
							
			// 		    }else{
			// 				$("#activewinner_tmpl").tmpl({"list":data.data.list}).appendTo($('.winlist'));
							
			// 			}
			// 			//加省略号
			// 			$.fn.extend({
			// 					displayPart:function () {
			// 						var displayLength = 16;
			// 						displayLength = this.attr("displayLength") || displayLength;
			// 						var text = this.text();
			// 						if (!text) return "";

			// 						var result = "";
			// 						var count = 0;
			// 						for (var i = 0; i < displayLength; i++) {
			// 						var _char = text.charAt(i);
			// 						if (count >= displayLength) break;
			// 						if (/[^x00-xff]/.test(_char)) count++; //双字节字符，//[u4e00-u9fa5]中文

			// 						result += _char;
			// 						count++;
			// 						}
			// 						if (result.length < text.length) {
			// 						result += "...";
			// 						}
			// 						this.text(result);
									

			// 						}
			// 			});
			// 			$(".displayPart").displayPart();
						
			// 		}
			//    });
				
			// };
        


















		});
	}
});
