define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/createMessage.css","css/webuploader.css","http://cdn.fuzeuser.com/plugins/datetimepicker/jquery.datetimepicker.css"],function(){

			var module = {};

			$.extend(module, {
				/*
				 * 公共参数
				 * */
				data : {
					/**
					 * 提交我的问题 参数
					 * @param type_id 类型ID
					 * @param question 问题
					 * @param happen_time 时间
					 * @param contact 内容
					 * @param pic 上传图片返回的地址
					 */
					IssueParams : {
						type_id : "",
						question : "",
						happen_time : "",
						contact : "",
						pic : []
					},
					/**
					 * 删除图片弹框 参数
					 * @param content 弹框内容
					 * @param width 弹框内容宽度
					 */
					delImgAlertParams : {
						content : "<p class='issueDelInfo'>确定要删除么？</p><p class='issueDelInfo'><a class='btn grey issueImgNoBtn' href='javascript:'>取消</a><a class='btn green issueImgDelBtn' href='javascript:'>确定</a></p>",
						width : 300
					}
				},
				/*
				* 初始化
				* */
				init : {
					initData : function () {

						//获取问题类型
						module.post.postIssueTyle();
						
						//图片上传
						module.post.uploadImgs();

						//日历初始化
						module.func.dateInit();

						//提交我的问题
						$("#submitMyIssue").on("click",module.func.submitMyIssue);
					}
				},
				/*
				 * ajax
				 * */
				post : {
					//获取问题类型
					postIssueTyle : function () {
						Serve.getIssueTypeList("",function (data) {
							if(data.code == 200){
								$("#issueTypeList").html($("#issueTypeTem").tmpl(data));
							}
						});
					},
					//图片上传
					uploadImgs : function () {
						require(["js/lib/webuploader.js"], function(WebUploader){

							// 初始化Web Uploader
							var uploader = WebUploader.create({
								auto: true,
								// swf文件路径
								swf: '/js/lib/Uploader.swf',
								// 文件接收服务端。
								server: '/front.php?s=/Home/Kf/upload',

								// 选择文件的按钮。可选。
								// 内部根据当前运行是创建，可能是input元素，也可能是flash.
								pick: '#filePicker',

								// 只允许选择图片文件。
								accept: {
									title: 'Images',
									extensions: 'jpg,jpeg,bmp,png',
									mimeTypes: 'image/*'
								},
								fileNumLimit : 5 //验证文件总数量, 超出则不允许加入队列。
							});

							// 当有文件添加进来的时候
							uploader.on( 'fileQueued', function( file ) {

								var $li = $(
										'<div id="' + file.id + '" class="file-item thumbnail">' +
										'<img>' +
										'<span class="issueDel">x</span>' +
										'</div>'
									),
									$img = $li.find('img');

								// $list为容器jQuery实例
								$("#fileList").append( $li );

								// 创建缩略图
								// 如果为非图片文件，可以不用调用此方法。
								// thumbnailWidth x thumbnailHeight 为 100 x 100
								uploader.makeThumb( file, function( error, src ) {
									if ( error ) {
										$img.replaceWith('<span>不能预览</span>');
										return;
									}

									$img.attr( 'src', src );
								}, 120, 120 );
							});

							// 文件上传过程中创建进度条实时显示。
							uploader.on( 'uploadProgress', function( file, percentage ) {
								var $li = $( '#'+file.id ),
									$percent = $li.find('.wp_progress span');

								// 避免重复创建
								if ( !$percent.length ) {
									$percent = $('<p class="wp_progress"><span></span></p>')
										.appendTo( $li )
										.find('span');
								}

								$percent.css( 'width', percentage * 100 + '%' );
							});

							// 文件上传成功，
							uploader.on( 'uploadSuccess', function( file , response) {
								//把返回的图片路径存入参数变量中
								module.data.IssueParams.pic.push(response.path);
								//给item添加成功class, 用样式标记上传成功。
								$( '#'+file.id ).addClass('upload-state-done');

								//上传图片超过5张 上传按钮隐藏
								var loadImgNum = $("#fileList").find(".upload-state-done").size();
								if(loadImgNum >= 5){
									$(".cm-img-btn").hide();
								}else{
									$(".cm-img-btn").show();
								}
							});

							// 文件上传失败，显示上传出错。
							// uploader.on( 'uploadError', function( file ) {
							//     var $li = $( '#'+file.id ),
							//         $error = $li.find('div.error');

							//     // 避免重复创建
							//     if ( !$error.length ) {
							//         $error = $('<div class="error"></div>').appendTo( $li );
							//     }

							//     $error.text('上传失败');
							// });

							// 完成上传完了，成功或者失败，先删除进度条。
							uploader.on( 'uploadComplete', function( file ) {
								$( '#'+file.id ).find('.wp_progress').remove();
								//委托删除事件
								$( '#'+file.id ).on("click",".issueDel",function () {
									var ths = $(this),
										$thsImgObj = ths.parent(".upload-state-done"),
										thsIndex = $(".issueDel").index(ths);
									$.alertPop(module.data.delImgAlertParams,function () {
										//取消
										$(".issueImgNoBtn").on("click",function () {
											$(".pop_close").trigger("click")
										});
										//确定
										$(".issueImgDelBtn").on("click",function () {
											module.data.IssueParams.pic.splice(thsIndex,1);
											uploader.removeFile( file );
											$thsImgObj.remove();
											$(".pop_close").trigger("click");
											//上传图片超过5张 上传按钮隐藏
											var loadImgNum = $("#fileList").find(".upload-state-done").size();
											if(loadImgNum >= 5){
												$(".cm-img-btn").hide();
											}else{
												$(".cm-img-btn").show();
											}
										});
									});
								});
							});
						});
					}
				},
				/*
				 * 事件方法
				 * */
				func : {
					//提交我的提问
					submitMyIssue : function () {
						module.data.IssueParams.type_id = $("#issueTypeList").val();
						module.data.IssueParams.question = $("#issueTitle").val();
						module.data.IssueParams.happen_time = $("#issueCreateTime").prop("value");
						module.data.IssueParams.contact = $("#issueContact").val();
						console.log(module.data.IssueParams);

						//判断
						if(module.data.IssueParams.happen_time == ""){ $.alertTmpMsg("请选择问题发生的时间哟！！"); return}
						if(module.data.IssueParams.contact == ""){ $.alertTmpMsg("请输入您的联系方式哟！"); return}
						if(module.data.IssueParams.question == ""){ $.alertTmpMsg("亲，您的问题呢！！"); return}

						if(!$.checkMail(module.data.IssueParams.contact) && !$.checkTel(module.data.IssueParams.contact)){
							$.alertTmpMsg("请填写正确的联系方式哦！");
							return;
						}

						if($.getCookie("username") != null && $.getCookie("username") != ""){
							//提交
							Serve.postIssue(module.data.IssueParams,function (data) {
								console.log(data);
								if(data.code == 200){
									$.goPage("serviceCenter");
								}
							});
						}else{
							$.alertTmpMsg("请先登录哦！");
						}
					},
					//日历初始化
					dateInit : function(){
						require(["http://cdn.fuzeuser.com/plugins/datetimepicker/jquery.datetimepicker.js"],function(){
							$("#issueCreateTime").datetimepicker();
							$(".xdsoft_datetimepicker").hide();
						});
					}
				}
			});

			//页面初始化
			module.init.initData();
		});
	}
});