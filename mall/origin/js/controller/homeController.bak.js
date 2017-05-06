define(function(){
    return  function(templateUrl,param){
		// console.log("参数打印:"+JSON.stringify(param));
		$("#container").loadPage(templateUrl,["css/home.css","css/slide.css"],function(){
			//点击添加到购物车
			$("#zhuji .addCart,#poster .addCart,#zhoubian .addCart").on("click",function(){
				Cart.addCart({"cartlist":[{"gid":$(this).data("gid"),"g_a_flag":$(this).data("g_a_flag"),"g_num":1}]},function(data){			    
			    	if(data.code == 200){	
			    		var param = {};
					    param.content = $("#addCartPop").tmpl({});
					    param.width = 450;
					    $.setNum(data.data.goods_num);
					    $.alertPop(param,function(){
					    	$(".pop_cancel").on("click",function(){
					    		$.closePop();
					    	});

					    	$(".pop_ok").on("click",function(){
					    		$.closePop();
								$.goPage("#cart");
					    	});
					    });					    		
			    	}else if(data.code == 500310){  //库存不足
			    		$.alertTmpMsg(data.message);
			    	}else{
			    		$.alertTmpMsg(data.message);
			    	} 
			    });
			});

			//立即购买
			$("#zhuji .buynow,#poster .buynow,#zhoubian .buynow").on("click",function(){
				if($.getCookie("username")){
					Cart.addCartFilter({"cartlist":[{"gid":$(this).data("gid"),"g_a_flag":$(this).data("g_a_flag"),"g_num":1}]},function(data){
						if(data.code == 200){
							$.setNum(data.goods_num);
							Order.storeCartIds({"ids":[{"id":data.cart_ids[0]}]},function(data){
								if(data.code == 200){
									$.goPage("#createOrder");
								}else if(data.code == 500310){
									$.alertTmpMsg(data.message);
								}else{
									alert(data.message);
								}
							});
						}else if(data.code == 500310){
							$.alertTmpMsg(data.message);
						}else{
							$.alertTmpMsg(data.message);
						}
				    });
			    }else{
			    	window.location.href = Links.login+"?redirect="+encodeURIComponent(location.href)+"&broker=fuzemall&l=zh-cn";
			    }
			});

			//点击实物商品图片
			$("#poster img,#zhuji img,#zhoubian img").on("click",function(){
				$.goPage("#item/"+$(this).data("gid"));
			});

			Game.getGameRecommend(null,function(data){
				if(data.code == 200){
					$("#youxi").html($("#gameRecomendTemplate").tmpl({"list":data.list}));
					$(window).resize();
					$("#youxi .product").on("click",function(){
						$.goPage("#gameItem/"+$(this).data("gid"));
					});
				}else{
					$.alertTmpMsg(data.message);
				}
			});

			var nodes = $("#home .slides"),dots = $("#home .dot_wrap"),timer;

			var Slider = {
				next: function(){
					var curnode = nodes.find(".active"),curdot = dots.find(".active");
					curnode.removeClass("active");
					curdot.removeClass("active");
					if(curnode.next().length == 0){
						nodes.find("li").first().addClass("active");
						dots.find(".dot").first().addClass("active");
					}else{
						curnode.next().addClass("active");
						curdot.next().addClass("active");
					}
				},

				prev: function(){
					var curnode = nodes.find(".active"),curdot = dots.find(".active");
					curnode.removeClass("active");
					curdot.removeClass("active");
					if(curnode.prev().length == 0){
						nodes.find("li").last().addClass("active");
						dots.find(".dot").last().addClass("active");
					}else{
						curnode.prev().addClass("active");
						curdot.prev().addClass("active");
					}
				},

				autoplay: function(){
					var _this = this;
					timer && clearInterval(timer);
					timer = setInterval(function(){
						_this.next();
					},5000);
				}
			};

			Slider.autoplay();

			$("#home .right").on("click",function(){
				Slider.next();
				Slider.autoplay();
			});

			$("#home .left").on("click",function(){
				Slider.prev();
				Slider.autoplay();
			});

			$("#home .dot").on("click",function(){
				var curnode = nodes.find(".active"),curdot = dots.find(".active");
				if(curdot.data("index") != $(this).data("index")){
					Slider.autoplay();
					curnode.removeClass("active");
					curdot.removeClass("active");

					$(this).addClass("active");
					nodes.find("li").eq($(this).data("index")).addClass("active");
				}
			});

			


		});
    }
});

