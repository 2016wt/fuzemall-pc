/*数量增减注册*/
define(function(){
	var GoodsNum = {
		initEvent: function(maxnum,_subtract,_plus,_input){
			//注册数量减少事件
			$(".subtract").off().on("click",function(){
			    var count_input = $(this).next().find(".count-input");
			    var count = count_input.val();
			    if(count > 1){
			        count_input.val(--count);
			    }
			});

			//注册数量增加事件
			$(".plus").off().on("click",function(){
			    var count_input = $(this).prev().find(".count-input");
			    var count = count_input.val();
			    if(++count > maxnum)
			    	return;
			    count_input.val(count);
			});

			//监听手动输入商品数量
			$(".count-input").off().on("input",function(){
				var count = $(this).val().replace(/[^0-9]/ig,"");
				count = parseInt(count)?parseInt(count):1;
				count = count > maxnum ? maxnum:count;
				$(this).val(count);
			});
		}
	}

	return GoodsNum;
});