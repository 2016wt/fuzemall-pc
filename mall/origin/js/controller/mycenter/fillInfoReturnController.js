define(function(){
	return function(templateUrl,param){
		var pIndex = param.pIndex.split("_");
		var type = pIndex[1], back_no = pIndex[0];

		$("#center_right").loadPage(templateUrl,["css/mycenter/fillInfo.css"],function(){
			//type 1.退货  2.换货 3.维修
			if(type == 1){
				$("#txwlxx").show();
			}else{
				$("#txshdz,#txwlxx").show();
			}

			new PCAS("province","city","area");
			Center.getFillInfo(null,function(data){
				$(".myselect").html($("#hhSelectTemplate").tmpl({"list":data.data.express}));
				$("#hh_accept_address").text(data.data.address);
			});

			$("#fillbtn").on("click",function(){
				var data = {};
				if(type == 1){
					data.express_name = $(".myselect").val();
					data.express_no = $("#wldh").val();
					data.back_no = back_no;
					if(checkExpress($(".myselect option:selected")) && checkExpressNo($("#wldh"))){
						Center.applyBackInfo({"data":data},function(data){
							if(data.code == "200"){
								location.hash = "#mycenter/schedule?pIndex="+back_no;
							}else{
								$.alertTmpMsg(data.message);
							}
						});	
					}
				}else{
					data.express_name = $(".myselect").val();
					data.express_no = $("#wldh").val();
					data.address_province = $("#address_province").val();
					data.address_city = $("#address_city").val();
					data.address_region = $("#address_area").val();
					data.address_detail = $("#ssdd").val();
					data.address_name = $("#hh_name").val();
					data.address_phone = $("#hh_tel").val();
					data.back_no = back_no;

					if(checkExpress($(".myselect option:selected")) && checkExpressNo($("#wldh")) && checkContactName($("#hh_name")) && checkPhone($("#hh_tel")) && checkExpressNo($("#wldh")) && checkRegion($("#address_province"),$("#address_city"),$("#address_area")) && checkDetailAddr($("#ssdd"))
						){
						Center.applyBackInfo({"data":data},function(data){
							if(data.code == "200"){
								location.hash = "#mycenter/schedule?pIndex="+back_no;
							}else{
								$.alertTmpMsg(data.message);
							}
						});	
					}
				}
			});

			$("#kddh,#wldh").on("input",function(){
				checkExpressNo($(this));
			});

			$(".myselect").on("change",function(){
				checkExpress($(".myselect option:selected"));
			});

			$("#address_province,#address_city,#address_area").on("change",function(){
				checkRegion($("#address_province"),$("#address_city"),$("#address_area"));
			});

			$("#ssdd").on("input",function(){
				checkDetailAddr($(this));
			});

			$("#hh_name").on("input",function(){
				checkContactName($(this));
			});

			$("#hh_tel").on("input",function(){
				checkPhone($(this));
			});

			//校验快递单号
			function checkExpressNo(obj){
				if(!obj.val()){
					obj.next().html("快递单号不能为空").css("display","inline-block");
					return false;
				}else if(!/^\w+$/.test(obj.val())){
					obj.next().html("请输入正确的快递单号").css("display","inline-block");
					return false;
				}else{
					obj.next().hide();
					return true;
				}
			}

			//校验收货地址
			function checkRegion(obj1,obj2,obj3){
				if(obj1.val() && obj2.val() && obj3.val()){
					obj3.next().hide();
					return true;
				}else{
					obj3.next().html("请选择收货地址").css("display","inline-block");
					return false;
				}
			}

			//校验详细地址
			function checkDetailAddr(obj){
				if(!obj.val()){
					obj.next().html("详细地址不能为空").css("display","inline-block");
					return false;
				}else{
					obj.next().hide();
					return true;
				}
			}

			//校验联系人姓名
			function checkContactName(obj){
				if(!obj.val()){
					obj.next().html("联系人不能为空").css("display","inline-block");
					return false;
				}else if(/[\?\~\!@#\$%\^&\*-\/\+\\\$\.\;\<\>\"\=\{\}\']/.test(obj.val())){
					obj.next().html("收货人姓名不能含有非法字符").css("display","inline-block");
				}else{
					obj.next().hide();
					return true;
				}
			}

			//校验手机号码
			function checkPhone(obj){
				if(!obj.val()){
					obj.next().html("手机号码不能为空").css("display","inline-block");
					return false;
				}else{
					if(!$.checkTel(obj.val())){
						obj.next().html("请填写正确的手机号码").css("display","inline-block");
						return false;
					}else{
						obj.next().hide();
						return true;
					}
				}
			}

			//校验物流公司
			function checkExpress(obj){
				if(!obj.val()){
					obj.parent().next().html("请选择物流公司").css("display","inline-block");
					return false;
				}else{
					obj.parent().next().hide();
					return true;
				}
			} 
		});
	}
});