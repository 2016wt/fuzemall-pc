define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/apply.css"],function(){
			new PCAS("province","city","region");
			var mdxx = $(".mdxx").clone();
			new PCAS("store_province","store_city","store_region");
			//点击提交加盟
			var sub_flag = true;
			$(".subbtn").on("click",function(){
				if(sub_flag == false){
					return false;
				}
				var data = {},stores = [];
				/** 公司信息 **/
				data.company_name = $("#company_name").val();  //公司名称
				data.legal_name = $("#legal_name").val(); //法人姓名
				data.company_province = $("#company_province").val(); //公司地址省
				data.company_city = $("#company_city").val(); //公司地址城市
				data.company_region = $("#company_region").val(); //公司地区域
				data.registered_capital = $("#registered_capital").val(); //注册资金
				data.main_brands = $("#main_brands").val(); //主营品牌
				data.management_person = $("#management_person").val();  //经营人员
				data.service_person = $("#service_person").val(); //售后服务人员数
				data.store_total = $("#store_total").val(); //拥有门店总数
				data.store_num = $("#store_num").val(); //已加盟门店数
				/* 联系信息 */
				data.contact_name = $("#contact_name").val(); //联系人姓名
				data.contact_mobile = $("#contact_mobile").val(); //联系人电话
				data.faxnumber = $("#faxnumber").val(); //传真号
				data.qq = $("#qq").val(); //qq号
				data.webcat =  $("#webcat").val(); //微信号
				data.email =  $("#email").val(); //邮箱

				var store_nodes = $(".mdxx");
				for(var i=0,n=store_nodes.length;i<n;i++){
					var store = {},node = store_nodes.eq(i);
					store.store_name = node.find(".store_name").val(); //门店名称
					store.store_area = node.find(".store_area").val(); //门店面积
					store.is_stock = node.find(".is_stock input[type=radio]:checked").val(); //是否能备货
					store.is_booth = node.find(".is_booth input[type=radio]:checked").val(); //能否提供展位
					store.is_other_brand = node.find(".is_other_brand input[type=radio]:checked").val(); //能否提供展位
					store.jion_type = node.find(".join_type").val(); //加盟店面类型
					store.is_experience = node.find(".is_experience").val(); //游戏行业经验
					store.business_time = []; //营业时间
					store.business_time.push(node.find(".onduty").val());
					store.business_time.push(node.find(".offduty").val());
					store.store_province = node.find(".store_province").val(); //门店省
					store.store_city = node.find(".store_city").val(); //门店城市
					store.store_region = node.find(".store_region").val(); //门店区域
					store.store_street = node.find(".store_street").val(); //门店详细地址
					store.gps = node.find(".gps").val(); //gps
					store.head_pic = node.find(".ll_btn").eq(0).attr("path"); //门头照片
					store.inner_pic = node.find(".ll_btn").eq(1).attr("path");  //门内照片
					store.outer_pic = node.find(".ll_btn").eq(2).attr("path");  //门外全景照片
					store.business_license_pic = node.find(".ll_btn").eq(3).attr("path");  //门外全景照片

					stores.push(store);
				}
				data.stores = stores; //门店信息
				data.node = $("#node").val();
				sub_flag = false;
				JOIN.infoSub(data,function(data){
					sub_flag = true;
					// console.log(data);
					if(data.code == 200){
						var param={"title":"提示","content":"您的申请信息已成功提交","top":240,"width":400};
						$.alertPop(param,function(){
							$(".pop_close").on("click",function(){
								window.location.href="#home";
					    	});
						});
					}else if(data.code == 400003){
						showErrorInfo(data.message);
					}
				});
				// console.log(data);
			});
				
			var _this = null;
			$(".apply_content_wrap").on("click",".ll_btn",function(){
				_this = $(this);
			});

			var WebUploader;
			//图片上传
			require(["http://cdn.fuzeuser.com/plugins/webuploader/webuploader.js"],function(webUploader){
				WebUploader = webUploader;
				upLoadImg();
			});

			function upLoadImg(){
				// 初始化Web Uploader
				var _me = null;
				var uploader = WebUploader.create({
				    // 选完文件后，是否自动上传。
				    auto: true,
				    // swf文件路径
				    swf: '/js/lib/Uploader.swf',
				    // 文件接收服务端。
				    server: '/front.php?s=/Home/Upload/joinUpload',
				    // 选择文件的按钮。可选。
				    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
				    pick: '.ll_btn',
				    // 只允许选择图片文件。
				    accept: {
				        title: 'Images',
				        extensions: 'jpg,png',
				        mimeTypes: 'image/*'
				    }
				});

				// 当有文件添加进来的时候
				uploader.on('fileQueued', function( file ) {
					_me = _this;
				    // 创建缩略图
				    // 如果为非图片文件，可以不用调用此方法。
				    // thumbnailWidth x thumbnailHeight 为 100 x 100
				    var $img = _me.parents(".op_pic_thumb").find("img");
				    // if($img.data("id")){
				    // 	uploader.removeFile($img.data("id"),true);
				    // }
				    uploader.makeThumb( file, function( error, src ) {
				        // if ( error ) {
				        //     $img.replaceWith('<span>不能预览</span>');
				        //     return;
				        // }
				        $img.attr( {'src': src,"data-id":file.id});
				    }, 152, 92);
				    upLoadImg();
				});

				uploader.on( 'uploadSuccess', function( file ,data ) {
					var _progress = _me.parents(".op_pic_thumb").find("._progress");
					try{
						_me.attr("path",data.data.path);
						_progress.remove();
					}catch(e){		
						_progress.text("上传失败，请重试。");
					}
					// console.log("++++++++++++++",_me.data("path"))
				    // $( '#'+file.id ).addClass('upload-state-done');
				});

				// 文件上传过程中创建进度条实时显示。
				uploader.on( 'uploadProgress', function( file, percentage ) {
					var _progress = _me.parents(".op_pic_thumb").find("._progress");
					_progress.text(percentage * 100 + '%').css( 'width', percentage * 100 + '%' );
				});

				// 文件上传成功，给item添加成功class, 用样式标记上传成功。
				uploader.on( 'uploadSuccess', function( file ,data ) {
				    $( '#'+file.id ).addClass('upload-state-done');
				});

				//文件上传失败，显示上传出错。
				uploader.on( 'uploadError', function( file ) {
				    var _progress = _me.parents(".op_pic_thumb").find("._progress");
				    _progress.text("上传失败，请重试。");
				});

				// 完成上传完了，成功或者失败，先删除进度条。
				uploader.on( 'uploadComplete', function( file ,data ) {
				    $( '#'+file.id ).find('.wp_progress').remove();
				});
			}
			
			//添加另一个网站作为加盟点
			$(".add_new").on("click",function(){
				$(this).before($("<a class='del_new'>取消添加新加盟点</a>"));
				_mdxx = mdxx.clone();
				var _len = $(".mdxx").length;
				_mdxx.find(".store_province").attr("name","store_province_"+_len);
				_mdxx.find(".store_city").attr("name","store_city_"+_len);
				_mdxx.find(".store_region").attr("name","store_region_"+_len);

				_mdxx.find(".is_stock input[type='radio']").attr("name","beihuo_"+_len);
				_mdxx.find(".is_booth input[type='radio']").attr("name","zw_"+_len);
				_mdxx.find(".is_other_brand input[type='radio']").attr("name","zj_"+_len);
				$(this).before(_mdxx);
				new PCAS("store_province_"+_len,"store_city_"+_len,"store_region_"+_len);
				upLoadImg();
			});

			//取消新加盟点
			$(".apply_content_wrap").on("click",".del_new",function(){
				$(this).next().remove().end().remove();
			});

            //展示错误信息
            function showErrorInfo(msg){
            	$(".error_info").text(msg).css("visibility","visible");
            }

			//信息校验
			// function verifyInfo(){
			// 	var company_name = $.trim($("company_name"));
			// 	if(!company_name){ //公司名称
			// 		showErrorInfo("请填写公司名称");
			// 	}
			// }
		});
	}
});

