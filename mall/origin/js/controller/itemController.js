define(function(){
	return function(templateUrl,param){
		// console.log("参数打印:"+JSON.stringify(param));
		$("#container").load(templateUrl,function(){

			$("body").on("click",".prd_zixun",function(){
				$("#zhichiBtn img").trigger("click");
			});
			var productDetail = {
				"hd" : {
					"html" : "pages/productDetail-hd.html",
					"css" : ["css/productDetail-hd.css"]
				},
				"f1" : {
					"html" : "pages/productDetail-f1.html",
					"css" : ["css/productDetail-f1.css"]
				},
				"f618" : {
					"html" : "pages/productDetail-f1.html",
					"css" : ["css/productDetail-f1.css"]
				}
			}
			//获取商品信息
			Goods.getGoodsById({"gid":param.itemId},function(data){
				console.log(data);
				if(data.code == 200){
					global_product = data;
					tmplImages();
					tmplProduct();
					//tmplAttrs();
					
					//引入相对应产品详情
					$("#pdCon").load(eval("productDetail." + global_product.Goods.alias + ".html"),function(){
						$.asynCss(eval("productDetail." + global_product.Goods.alias + ".css"));
					});

                   if(data.Goods.is_promotion==1)
                   {
                    var interval = 1000; 
						function ShowCountDown(timeend,divname) 
						{ 

						var now = new Date(data.Goods.now_time); 
						var endDate = new Date(timeend); 
						var leftTime=endDate.getTime()-now.getTime(); 
						var leftsecond = parseInt(leftTime/1000); 
						var day1=Math.floor(leftsecond/(60*60*24)); 
						var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
						var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
						var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60); 
						var cc = document.getElementById(divname); 
						cc.innerHTML = day1+"天"+hour+":"+minute+":"+second; 
						if(leftTime==0){
							clearInterval(timmer);
							$('.activity').hide();
							$('.yuanshi').show();
						}
						data.Goods.now_time=new Date(data.Goods.now_time).getTime()+1000;
						} 
						 timmer=setInterval(function(){ShowCountDown(data.Goods.promotion_etime,'time');}, interval); 
						}
				}else if(data.code == 500401){
					$.go404();
				}else{
					$.alertTmpMsg(data.message);
				}
			});
            //动态生成商品详情
			function tmplProduct(obj){
				obj = obj?obj:global_product;
				if(obj.Goods){
					//生成标题，数量等
					$.setTitle("战斧-"+obj.Goods.title);
					$(".product-info").html($("#productInfoTemplate").tmpl(obj));
					tmplProduct(obj.Goods);
				}else{
					//生成颜色、规格、手柄数量等控件
					var type = obj.type;
					var tmplate = "";
					switch (type){
						case "color":
							tmplate = "#productColorTemplate";
							break;
						case "volume":
							tmplate = "#productVolumeTemplate";
							break;
						case "handle":
							tmplate = "#productHandleTemplate";
							break;
						default:
							tmplate = "#productVolumeTemplate";
							break;
					}
					var index = obj.index = window["global_"+obj.type] = obj.data[window["global_"+obj.type]]?window["global_"+obj.type]:0;
					$(".prd_number").before($(tmplate).tmpl(obj));
					var currObj = obj.data[index]?obj.data[index]:obj.data[0];
					if(currObj.son){   
						tmplProduct(currObj.son);
					}else{
						//如果没有son对象，则为最底层，终止递归。

						//注册不同属性点击事件
						$(".picker").on("click",function(){
						    window["global_"+$(this).data("type")] = $(this).data("index");
						    tmplProduct(global_product);
						    tmplImages();
						});

						//显示价格
						window["g_a_obj"] = currObj;
						$(".origin_price span").text(currObj.price);
						$(".prd_price .price span").text(currObj.pre_price?currObj.pre_price:currObj.price);

						//商品数量减少
						var price = currObj.pre_price?currObj.pre_price:currObj.price;
						$(".subtract").on("click",function(){
						    var count_input = $(this).next().find(".count-input");
						    var count = count_input.val();
						    if(count > 1){
						        count_input.val(--count);
						        $(".prd_price .price span").text((count*price).toFixed(2));
						    }
						});

						//商品数量增加
						$(".plus").on("click",function(){
						    var count_input = $(this).prev().find(".count-input");
						    var count = count_input.val();
						    if(checkNum(count)){
						    	count_input.val(++count);
						    	$(".prd_price .price span").text((count*price).toFixed(2));
						    }
						});

						//监听手动输入商品数量
						$(".count-input").on("input",function(){
							var count = $(this).val().replace(/[^0-9]/ig,"");
							count = parseInt(count)?count:1;
							if(!checkNum(count)){
								count = 10;
							}
							$(this).val(count);
							$(".prd_price .price span").text((count*price).toFixed(2));
						});

						//检测商品数量
						function checkNum(num){
							if(num >= 10){
								$.alertTmpMsg("单次购买商品数量不能超过10件。");
								return false;
							}
							return true;
						}

						//监听"立即购买"
						$(".operate .buy_btn.ljgm").on("click",function(){
							var _num = parseInt($(".prd_number .count-input").val());
							if($.getCookie("username")){
								Cart.addCartFilter({"cartlist":[{"gid":global_product.Goods.gid,"g_a_flag":g_a_obj.g_a_flag,"g_num":_num,"flag":global_product.Goods.data[window["global_"+global_product.Goods.type]].flag}]},function(data){
									if(data.code == 200){
										$.setNum(data.goods_num);
										Order.storeCartIds({"ids":[{"id":data.cart_ids[0]}]},function(data){
											if(data.code == 200){
												$.goPage("#createOrder");
											}else if(data.code == 500310){
												$.alertTmpMsg(data.message);
											}else{
												$.alertTmpMsg(data.message);
											}
										});
									}else if(data.code == 500310){
										$.alertTmpMsg(data.message);
									}else{
										$.alertTmpMsg(data.message);
									}
							    });
						    }else{
						    	window.location.href = Links.login+"?redirect="+encodeURIComponent(location.href+"/"+_num)+"&broker=fuzemall&l=zh-cn";
						    }
						});

						//监听"加入到购物车"
						$(".operate .buy_btn.jrdgwc").on("click",function(){
							// $(".operate").append("<div class='plus1'>+1</div>");

							//+1效果移动到购物车
							// var cart_div = {"x":$(".buycar").offset().left,"y":$(".buycar").offset().top};
							// var cart_div_s = {"x":$(".cart_num").position().left,"y":$(".cart_num").position().top};
							// var buy_div = {"x":$(".operate").offset().left,"y":$(".operate").offset().top};
							// var buy_div_s = {"x":$(".plus1").position().left,"y":$(".plus1").position().top};

							var _num = parseInt($(".prd_number .count-input").val());
							
							// setTimeout(function(){
							// 	$(".plus1").remove();
							// 	Modules.refreshCount();
							// },500);

						    Cart.addCart({"cartlist":[{"gid":global_product.Goods.gid,"g_a_flag":g_a_obj.g_a_flag,"g_num":_num,"flag":global_product.Goods.data[window["global_"+global_product.Goods.type]].flag}]},function(data){
						    	if(data.code == 200){	
						    		var param = {};
								    param.content = $("#addCartPop").tmpl({});
								    param.width = 450;
								    $.setNum(data.data.goods_num);
								    // var _this = $(this);
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
					}
				}
			};

			//生成商品展示图片
			function tmplImages(){
				//判断第一层的索引，如果undefined则为初始化，置为0 
				var index = window["global_"+global_product.Goods.type]?window["global_"+global_product.Goods.type]:0; 
				var images = global_product.Goods.data[index];
				//var img = global_product;
				$(".large ul").html($("#largeTemplate").tmpl(images));
				$(".thumbnail ul").html($("#thumbTemplate").tmpl(images));

				// $("body").on("click",".thumbnail li",function(){
				// 	var _this = $(this),ind = _this.index(),sile= $('#thumbPt'),wid = 92,inte = 148;
				//     $(this).siblings().removeClass("active").end().addClass("active");
				//     $($(this).data("target")).siblings().removeClass("active").end().addClass("active");
				//     sile.css('left',(ind*wid)+inte);
				// });
			};	
			
			//生成产品详细介绍，规格参数，常见问题
			// var tmplAttrs = function(){
			// 	$("#pro_content").html($("#attrsTemplate").tmpl(global_product.Goods.detail));
			// 	//属性介绍nav切换
			// 	$(".product-detail .nav-i").on("click",function(){
			// 		$($(this).data("target")).siblings().hide().end().show();
			// 		$(".nav-i.active").removeClass("active");
			// 		$(this).addClass("active");
			// 	});
			// };
		
		});
	}
});