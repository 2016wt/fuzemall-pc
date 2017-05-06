define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/messageDetails.css"],function(){

			var ReplyTem = $("#issueReplyIptTem").html();
			/**
			 *  显示问题详情
			 *  simba
			 *  2016-04-14
			 *  */
			Serve.getIssueDetails({"question_id" : param.id},function(data){
				if (data.code == 200) {
					$(".md-details-load").hide();
					for(var i = 0; i < data.list.length; i ++){
						var picArr = data.list[i].pic;
						var picNewArr = [];
						for(var j = 0; j < picArr.length; j ++){
							var picPath = {
								"path" : ""
							};
							picPath.path = picArr[j];
							picNewArr[j] = picPath;
						}
						data.list[i].pic = picNewArr;
					}
					//标签
					$("#issueTag").html($("#issueTagTem").tmpl(data.list[0]));
					//问题详情
					$("#issueDetails").html($("#issueDetailsTem").tmpl(data.list[0]));
					//追问&回复
					$("#issueReply").html($("#issueReplyTem").tmpl(data));
					//添加追问
					if(data.list[0].is_solve == 2){
						$("#issueReply").find(".md-reply").last().append(ReplyTem);
					}
					//图片样式调整
					var $imgs = $(".md-imgID").find("img");
					/**
					 *  判断图片是否加载完成
					 *	simba
					 *	2016.04.06
					 */
					var imgsTimeout; // 定时器
					var isLoad = true; // 控制变量

					function isImgLoad(callback){
						$imgs.each(function(){
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
								isImgLoad(callback);
							},500);
						}
					}
					/**
					 *  图片大小自适应
					 *  simba
					 *  2016-04-18
					 *  */
					isImgLoad(function(){
						var imgLen = $imgs.size();
						// 加载完成
						for(var i = 0; i < imgLen; i ++){
							var imgW = $imgs.eq(i).width(),
								imgH = $imgs.eq(i).height();

							if(imgW > imgH){
								$imgs.eq(i).width("100%");
								var mt = ($imgs.eq(i).parent().height() - $imgs.eq(i).height())/2;
								$imgs.eq(i).css({
									"margin-top" : mt + "px"
								});
							}else{
								$imgs.eq(i).height("100%");
							}
						}
					});
				};
			})

			/**
			 *  追问提交
			 *  simba
			 *  2016-04-14
			 *  */
			$(".md-details-con").on("click","#askPost",function () {
				var thsIssue = $(this).siblings(".md-ask-con").find("input").val();
				Serve.addIssue({"question_id" : param.id, "question" : thsIssue},function (data) {
					if(data.code == 200){
						var askTem = '<!-- 追问 -->' +
									'<div class="md-message-con">' +
									'<p class="md-message-tit">追问：</p>' +
									'<div class="md-message-text">' +
									'<p>' + data.question + '</p>' +
									'</div>';
						$("#issueReply").append(askTem);
						$("#askCancel").trigger("click");
					}
				});
			});

			/**
			 *  确认评分
			 *  simba
			 *  2016-04-14
			 *  */
			$("#messageScore").on("click","#md-score-ok",function () {
				var scoreNum = $("#messageScore").find(".star").size();
				Serve.messageScore({"question_id" : param.id, "score" : scoreNum},function (data) {
					if(data.code == 200){
						$.alertTmpMsg("评分成功！");
						$("#messageScore,#md-reply-box").hide();
						//location.reload();	
						window.location.reload();
					}
				});
			});

			/**
			 *  点击查看大图
			 *  simba
			 *  2016-04-18
			 *  */
			$(".md-imgID").on("click",".imgBox",function () {
				var ths = $(this),
					thsImg = ths.find("img"),
					thsImgSrc = thsImg.attr("src"),
					thsImgW = thsImg.width(),
					thsImgH = thsImg.height();
				var win_w = document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth;
				var win_h = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
				
				$(".imgFixed").show();
				$(".imgFixed").find("img").attr("src",thsImgSrc);
				if(thsImgW > thsImgH){
					$(".imgFixed").find("img").css({
						"height" : "auto",
						"width" : win_w*0.8
					});
					var mt = (win_h - $(".imgFixed").find("img").height())/2;
					$(".imgFixed").find("img").css({
						"margin-top" : mt + "px"
					});
				}else{
					$(".imgFixed").find("img").css({
						"width" : "auto",
						"height" : win_h*0.8,
						"margin-top" : win_h*0.1
					});
				}
			});

			/**
			 *  关闭查看大图
			 *  simba
			 *  2016-04-18
			 *  */
			$(".imgFixed").on("click",".imgFixedClose",function () {
				$(".imgFixed").hide();
				$(".imgFixed").find("img").attr("src","");
			});

			/**
			 *  追问
			 *  simba
			 *  2016-04-12
			 *  */
			$(".md-details-con").on("click","#askAgain",function () {
				var ths = $(this),
					$btn = ths.parent().find(".JS_btn"),
					$askObj = ths.next();
				$btn.hide(20,function () {
					$askObj.slideDown(300);
				});
			});

			/**
			 *  取消追问
			 *  simba
			 *  2016-04-12
			 *  */
			$(".md-details-con").on("click","#askCancel",function () {
				var ths = $(this),
					$btn = ths.parents(".md-btnBox").find(".JS_btn"),
					$askObj = ths.parent(".md-askBox");
				$askObj.slideUp(300, function () {
					$btn.show(20);
				});
			});

			/**
			 *  已解决
			 *  simba
			 *  2016-04-12
			 *  */
			$(".md-details-con").on("click","#askResolved",function () {
				var $score = $("#messageScore");
				$score.show();
				$('html,body').animate({ scrollTop : 0 }, 300);
			});

			/**
			 *  评分
			 *  simba
			 *  2016-04-12
			 *  */
			$("#messageScore").on("click","img",function () {
				var ths = $(this),
					$imgs = $("#messageScore").find("img"),
					thsIndex = $imgs.index(ths),
					imgSrc = "./img/score-star.png",
					imgSrced = "./img/score-star-choo.png";
				$imgs.attr("src",imgSrc).removeClass("star");

				for(var i = 0; i <= thsIndex; i ++){
					$imgs.eq(i).attr("src",imgSrced).addClass("star");
				}
			});

			/**
			 *  取消评分
			 *  simba
			 *  2016-04-12
			 *  */
			$("#messageScore").on("click","#md-score-cancel",function () {
				var $score = $("#messageScore"),
					$imgs = $score.find("img"),
					imgSrc = "./img/score-star.png",
					imgSrced = "./img/score-star-choo.png";

				$imgs.attr("src",imgSrc);
				$imgs.eq(0).attr("src",imgSrced).addClass("star");
				$score.hide();
			});

			/**
			 *  点击屏幕除了评分框以外的部分 评分框隐藏
			 *  simba
			 *  2016-04-12
			 *  */
			$(document).on("click",function (event) {
				var eo = $(event.target);
				var $score = $("#messageScore");
				if( $score.is(":visible") && !eo.parents().hasClass("md-score") && !eo.hasClass("md-score") && !eo.is("#askResolved")){
					$("#md-score-cancel").trigger("click");
				};

			});
		});
	}
});