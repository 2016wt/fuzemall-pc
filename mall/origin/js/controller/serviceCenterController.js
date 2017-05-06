define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/serviceCenter.css"],function(){

			var module = {};

			$.extend(module, {

				/*
				 * 公共参数
				 * */
				data : {
					/**
					 * 获取热门问题 参数
					 * @param len 不传或传0拉取全部，传几条，拉取几条
					 */
					getHotIssueParams : {
						len : 6
					},
					/**
					 * 获取我的问题 参数
					 * @param page 分页
					 * @param len   分页的条数   //可选
					 * @param status 问题状态 0：全部  1：已解决 2：待解决
					 */
					getMyIssueParams : {
						page : 1,
						len : 5,
						status : 0
					}

				},
				/*
				 * 初始化
				 * */
				init : {
					initData : function () {

						//获取热门问题
						module.post.postHotIssue();

						//判断是否登陆 决定 是否加载 我的问题 列表
						module.post.postMyIssue();

						//委托 我的问题类型切换 事件
						$(".sc-con").on("click",".sc-question-state a",module.func.cutMyIssueState);

						//委托 我的问题查看详情 事件
						$("#myIssueList").on("click","a",module.func.goMyIssueDetails);

						//委托 热门问题查看答案
						$("#hotIssueList").on("click","a",module.func.postHotIssueResult);

						//点击留言服务
						$("#goToMessage").on("click",module.func.goToCreateMessage);
					}
				},
				/*
				 * ajax
				 * */
				post : {
					//获取热门数据
					postHotIssue : function () {
						Serve.getHotIssueList(module.data.getHotIssueParams, function (data) {
							if(data.code == 200){
								$(".sc-hotIssue-load").hide();
								$("#hotIssueList").html($("#hotIssueTem").tmpl(data));
							}
						});
					},
					//获取我的问题
					postMyIssue : function () {
						if($.getCookie("username") != null && $.getCookie("username") != ""){
							$(".sc-myIssue-noneLogin").hide();
							$(".sc-myIssue-doneLogin").show();
							//获取我的问题
							Serve.getMyIssueList(module.data.getMyIssueParams, function (data) {
								if(data.code == 200){
									//创建分页并渲染数据
									module.func.initPagination(data.total);
								}
							});
						}else{
							$(".sc-myIssue-noneLogin").show();
							$(".sc-myIssue-doneLogin").hide();
						}
					}
				},
				/*
				 * 事件方法
				 * */
				func : {
					/**
					 * 我的问题  类型切换
					 * simba
					 * 2016-04-12
					 * */
					cutMyIssueState : function () {
						var ths = $(this),
							thsStatus = ths.attr("issue-status"),
							$allState = ths.parents("ul").find("a");

						$allState.removeClass("choo");
						ths.addClass("choo");

						$(".sc-myIssue-load").show()
						$("#myIssueList").hide();
						module.data.getMyIssueParams.status = thsStatus;
						module.data.getMyIssueParams.page = 1;
						module.post.postMyIssue();
					},
					/**
					 * 我的问题  查看详情
					 * simba
					 * 2016-04-13
					 * */
					goMyIssueDetails : function () {
						var ths = $(this),
							thsId = ths.parent().attr("id");
						location.hash = "#messageDetails/" + thsId;
					},
					/**
					 * 创建分页  查看详情
					 * simba
					 * 2016-04-14
					 * */
					initPagination : function (totalPage) {

						require(["http://cdn.fuzeuser.com/plugins/jquery.pagination.js"],function(){
							// 创建分页
							$("#pagination").pagination(totalPage, {
								num_edge_entries: 1, //边缘页数
								num_display_entries: 4, //主体页数
								current_page : module.data.getMyIssueParams.page - 1,//当前选中的页数
								link_to : "javascript:",
								callback: PageCallback,
								items_per_page: module.data.getMyIssueParams.len, //每页显示5项
								prev_text:"上一页",
								next_text:"下一页"
							});

							function PageCallback(index) {
								var indexPage = $("span[class = 'current'][class != 'prev'][class != 'next']").text();

								module.data.getMyIssueParams.page = indexPage;

								Serve.getMyIssueList(module.data.getMyIssueParams, function (data) {
									if(data.code == 200){
										$("#pagination").show();
										$(".sc-myIssue-load").hide();
										$("#myIssueList").show();
										$("#myIssueList").html($("#myIssueTem").tmpl(data));
										if(data.list.length == 0){
											$("#pagination").hide();
										}
									}
								});

							}

						});
					},
					/**
					 * 热门问题查看答案
					 * simba
					 * 2016-04-15
					 * */
					postHotIssueResult : function () {
						var ths = $(this),
							thsSta = ths.attr("data-state"),
							thsA = ths.next(),
							allA = $("#hotIssueList").find(".sc-hotIssue-result");
						
						ths.parent().siblings().find("a").attr("data-state","0").next().slideUp(100);
						if(thsSta == 0){
							thsA.slideDown(100);
							ths.attr("data-state","1");
						}else{
							thsA.slideUp(100);
							ths.attr("data-state","0");
						}
					},
					/**
					 * 点击留言
					 * simba
					 * 2016-04-03
					 * */
					 goToCreateMessage : function(){
					 	if($.getCookie("username") != null && $.getCookie("username") != ""){
							//跳转
							location.href = "index.html#createMessage"
						}else{
							$.alertTmpMsg("请先登录哦！");
						}
					 }
				}
			});

			//页面初始化
			module.init.initData();
		});
	}
});