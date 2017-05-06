define(function(){
	return function(templateUrl,param){
		$("#center_right").loadPage(templateUrl,["css/mycenter/returnDetail.css","css/mycenter/myorder.css","css/webuploader.css"],function(){
			Center.getReturnDetail({"gid_orderid_flag":param.pIndex},function(data){
				if(data.code == 200){
					$(".thh_product").html($("#prdDetailTemplate").tmpl(data.detail));  //1-退货 2-换货 3-维修
					$(".thh_wrap table").html($("#thqdTemplate").tmpl(data.detail));
					$(".thh_fwlx .thh_value").html($("#tmpOptionTemplate").tmpl(data.detail));
					$(".count-input").val(data.detail.apply_num);
					if(data.detail.exchange_status != 0){
						$("#exchange_status").show();
					}else{
						$("#exchange_status").remove();
					}
					if(data.detail.refund_status != 0){
						$("#refund_status").show();
					}else{
						$("#refund_status").remove();
					}
					$(".thh_type input[type='radio']").eq(0)[0].checked = true;
					//注册goods数量加减事件
					require(["js/modules/goods.number"+_min],function(fun){
						fun.initEvent(data.detail.apply_num);
					});

					//选择服务类型
					$(".chosebtn").on("click",function(){
						$(".chosebtn.active").removeClass("active");
						$(this).addClass("active");
					});

					//图片上传
					require(["plugins/webuploader/webuploader.js"],function(WebUploader){

						// 初始化Web Uploader
						var uploader = WebUploader.create({
						    // 选完文件后，是否自动上传。
						    auto: true,
						    // swf文件路径
						    swf: '/js/lib/Uploader.swf',
						    // 文件接收服务端。
						    server: '/front.php?s=/Home/Orderback/backUpload',
						    // 选择文件的按钮。可选。
						    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
						    pick: '#filePicker',
						    // 只允许选择图片文件。
						    accept: {
						        title: 'Images',
						        extensions: 'gif,jpg,jpeg,bmp,png',
						        mimeTypes: 'image/*'
						    }
						});

						$("#fileList").on("click",".file_mask",function(){
							var index = $("#fileList .thumbnail").index($(this).parent());
							var _this = $(this);
							uploader.removeFile( $(this).parent().attr("id"),true);
							Center.delImageOfDetail({"index":index},function(data){
								if(data.code == 200){
									_this.parent().remove();
								}else{
									alert(data.message);
								}
							});						
						});

						// 当有文件添加进来的时候
						uploader.on( 'fileQueued', function( file ) {
							if($("#fileList .thumbnail").length >= 3){
								return false;
							}
						    var $li = $(
						            '<div id="' + file.id + '" class="file-item thumbnail">' +
						            '<div class="file_mask"></div>'+
						                '<img>' +
						                // '<div class="info">' + file.name + '</div>' +
						            '</div>'
						            ),
						        $img = $li.find('img');

						    // $list为容器jQuery实例
						    $(".thh_upimg").before( $li );

						    // 创建缩略图
						    // 如果为非图片文件，可以不用调用此方法。
						    // thumbnailWidth x thumbnailHeight 为 100 x 100
						    uploader.makeThumb( file, function( error, src ) {
						        if ( error ) {
						            $img.replaceWith('<span>不能预览</span>');
						            return;
						        }

						        $img.attr( 'src', src );
						    }, 70, 70 );
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

						// 文件上传成功，给item添加成功class, 用样式标记上传成功。
						uploader.on( 'uploadSuccess', function( file ,data ) {
						    $( '#'+file.id ).addClass('upload-state-done');
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
						uploader.on( 'uploadComplete', function( file ,data ) {
						    $( '#'+file.id ).find('.wp_progress').remove();
						});
					});

					//提交详情
					$("#thh .btn").on("click",function(){
						var subparam = {}
						subparam.gid = param.pIndex.split("_")[0];
						subparam.order_id =  param.pIndex.split("_")[1];
						subparam.g_a_flag = param.pIndex.split("_")[2];
						subparam.g_num = $(".count-input").val();
						subparam.type = $(".thh_type input[type='radio']:checked").data("type");
						subparam.desc = $.trim($(".thh_wtms textarea").val());
						if(!subparam.desc){
							$.alertTmpMsg("请填写问题描述。");
							return false;
						}
						Center.applyStep({"data":subparam},function(data){
							if(data.code == 200){
								$.goPage("#mycenter/schedule?pIndex="+data.back_no);
								// switch (subparam.type) {
								// 	case 1:
								// 	    loadSubPage("return");
								// 	    break;
								// 	case 2:
								// 	    loadSubPage("change");
								// 	    break;
								// 	case 3:
								// 	    loadSubPage("repair");
								// 	    break;
								// }
							}else{
								$.alertTmpMsg(data.message);
							}
						});
					});
				}else if(data.code == 500401){
					$.go404();
				}else{
					$.alertTmpMsg(data.message);
				}
			});
		});
	}
});