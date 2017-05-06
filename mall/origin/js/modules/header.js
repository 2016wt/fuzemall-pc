define(function(){
	function headerInit(){
		$("#header").load("pages/header.html",function(){
			var u_info = {};
			u_info.username = $.getCookie("username");

			Cart.getCartNum(null,function(data){
				
				u_info.goods_num = data.data.goods_num;
				$(".layer2").html($("#headerTemplate").tmpl(u_info));
				//点击去支付，进入购物车
				$(".cart_moneybox .btn").on("click",function(){
					$.goPage("#cart");
				});
			});
			Nav.getNav(null,function(data){
				
				if(data.code==200)
				{
				$(".navmenu").html($("#navTemplate").tmpl(data));
			    } 
			});

			//header 导航选中高亮
			$("#header").on("click","a,.cartBuy",function(){
				var ths = $(this),
					thsPa = ths.parent();

				//非社区
				if(thsPa.attr("data-id") != "#bbs" || thsPa.attr("data-id") != "#home"){

					$("#header li").removeClass("active");

					if(thsPa.is("li")){
						thsPa.addClass("active");
					}
				}
			});

			//页面刷新  header高亮
			var hash = location.hash;
			hash = hash.split("/")[0];
			//F1和配置表
			if(hash == "#conFigure" || hash == "#page1"){$("[data-id = #home]").addClass("active");}
			
			if(hash){
				if($("[data-id = " + hash + "]").size() > 0 && hash != "#home"){
					$("[data-id = " + hash + "]").addClass("active");
				}
			}else if(hash == ""){
				$("[data-id = #home]").addClass("active");
			}else{
				$("[data-id]").removeClass("active");
			}


			$("body").on("mouseout",".buycar",function(){
				dropDownMouseEnter();
			});

			//加载footer
			$("#footer").load("pages/footer.html",function(){
				$(".centered").on("click","a",function(){
					$("li[data-id]").removeClass("active");
				});
			});
		});
	}

	return headerInit;
});