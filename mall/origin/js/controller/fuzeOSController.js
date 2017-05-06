define(function(){
	return  function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/fuzeOS.css"],function(){
			/**
			 *  判断图片是否加载完成 
			 *	simba
			 *	2016.05.09
			 */
			var isLoad;
			$.fn.imgsLoad = function(callback){
				var ths = this;
				ths.each(function(){
					if(this.height === 0){
						isLoad = false;
						return false;
					}
				});
				if(isLoad){
					clearTimeout(imgsTimeout);
					callback();
				}else{
					isLoad = true;
					imgsTimeout = setTimeout(function(){
						ths.imgsLoad(callback);
					},500);
				}
			}

			function loadStyle(){
				$(".os-m-imgBox img").imgsLoad(function(){
					var imgBox = $(".os-m-imgBox"),
						txtBox = $(".os-m-txtBox"),
						txtCon = $(".os-m-txtCon"),
						imgs = imgBox.find("img");
					for(var i = 0, l = imgBox.size(); i < l; i ++){
						var imgH = imgs.eq(i).height();
						var txtH = txtCon.eq(i).height();
						imgBox.eq(i).height(imgH);
						txtBox.eq(i).height(imgH);
						txtCon.eq(i).css({
							"margin-top" : (imgH - txtH)/2 + "px"
						});
					}
				});
			}
			loadStyle();

			$(window).resize(function(){
				loadStyle();
			});
		});
	}
});

