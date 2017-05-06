/*地址管理模块  增、删、编辑*/
define(function(){
	var AddreassManage = {
		//新增收货地址
		addAddress: function(callback){
			var param = {};
		    param.title = "添加新地址";
		    param.content = $("#regionTemplate").tmpl({"address_name":"","address_phone":"","address_detail":""});
		    param.width = 650;
		    var _this = this;
		    $.alertPop(param,function(){
		        new PCAS("province","city","area");
		        $("#address_name").focus();
		        $("#save_addr").off().on("click",function(){
		        	if(_this.checkName() && _this.checkRegion() && _this.checkAddrDetail() && _this.checkTel()){
			        	var param = {};
			        	param.address_name = $("#address_name").val();
			        	param.address_province = $("#address_province").val();
			        	param.address_city = $("#address_city").val();
			        	param.address_region = $("#address_area").val();
			        	param.address_phone = $("#address_phone").val();
			        	param.address_detail = $("#address_detail").val();
			        	param.address_default = $(".region_default p").hasClass("active") & 1;
			        	Center.addAddress({"data":param},function(data){
			        		var code = data.code;
			        		if(code == "200"){
			        			callback && callback(data);
			        		}else{
			        			$.alertTmpMsg(data.message);
			        		}
			        		$.closePop();
			        	});
			        }else{
			        	return false;
			        }
		        });
		    });
			
			$(".region_default p").off().on("click",function(){
				$(this).toggleClass("active");
			});	
		},

		//编辑收货地址
		editAddress: function(obj,callback){
			var param = {};
	    	param.title = "编辑地址";
	    	param.content = $("#regionTemplate").tmpl(obj.data);
	    	param.width = 650;
	    	var _this = this;
	    	$.alertPop(param,function(){
	    		new PCAS("province","city","area",obj.data.address_province,obj.data.address_city,obj.data.address_region);
	    		$("#save_addr").off().on("click",function(){
	    			if(_this.checkName() && _this.checkRegion() && _this.checkAddrDetail() && _this.checkTel()){
		    			var param = {};
			        	param.address_name = $("#address_name").val();
			        	param.address_province = $("#address_province").val();
			        	param.address_city = $("#address_city").val();
			        	param.address_region = $("#address_area").val();
			        	param.address_phone = $("#address_phone").val();
			        	param.address_detail = $("#address_detail").val();
			        	param.address_default = $(".region_default p").hasClass("active") & 1;

			        	Center.editAddress({"id":$(this).data("id"),"data":param},function(data){
			        		if(data.code == "200"){
			        			callback && callback(data);
			        			$.closePop();
			        			//重新生成列表
								// $("#addr_option").html($("#addressTemplate").tmpl({"list":data.list}));
			        		}
			        	});
			        }
	    		});
	    	});

			$(".region_default p").off().on("click",function(){
				$(this).toggleClass("active");
			});	
		},

		//校验收货人姓名
		checkName: function(){
			var name = $.trim($("#address_name").val());
			if(name == ""){
				$("#address_name").parent().find(".errmsg").html("请输入收货人姓名").css("display","inline-block");
				return false;
			}else{
				var reg =/[\?\~\!@#\$%\^&\*-\/\+\\\$\.\;\<\>\"\=\{\}\']/;
				if(reg.test(name)){
					$("#address_name").parent().find(".errmsg").html("收货人姓名不能含有非法字符").css("display","inline-block");
					return false;
				}
			}
			return true;
		},

		//校验收货地区
		checkRegion: function(){
			var province = $("#address_province").val(),
				city = $("#address_city").val(),
				area = $("#address_area").val();

			if(!(province && city && area)){
				$("#address_province").parent().find(".errmsg").html("请选择收货地区").css("display","inline-block");
				return false;
			}
			return true;
		},

		//校验详细地址
		checkAddrDetail: function(){
			var addrDetail = $.trim($("#address_detail").val());
			if(addrDetail == ""){
				$("#address_detail").parent().find(".errmsg").html("请填写详细地址").css("display","inline-block");
				return false;
			}else{
				var reg =/[\?\~\!@#\$%\^&\*-\/\+\\\$\.\;\<\>\"\=\{\}\']/;
				if(reg.test(addrDetail)){
					$("#address_detail").parent().find(".errmsg").html("详细地址不能含有非法字符").css("display","inline-block");
					return false;
				}
			}
			return true;
		},

		//校验手机号
		checkTel: function(){
			var tel = $.trim($("#address_phone").val());
			if(!$.checkTel(tel)){
				$("#address_phone").parent().find(".errmsg").html("请填写有效的手机号").css("display","inline-block");
				return false;
			}
			return true;
		}
	};

	//校验收货人
	$("body").on("blur","#address_name",function(){
		AddreassManage.checkName();
	}).on("input","#address_name",function(){
		$(this).parent().find(".errmsg").hide();
	});

	//校验收货地区
	$("body").on("blur","#address_area",function(){
		AddreassManage.checkRegion();
	}).on("input","#address_area",function(){
		$(this).parent().find(".errmsg").hide();
	});

	//校验详细地址
	$("body").on("blur","#address_detail",function(){
		AddreassManage.checkAddrDetail();			
	}).on("input","#address_detail",function(){
		$(this).parent().find(".errmsg").hide();
	}); 

	//校验手机号
	$("body").on("blur","#address_phone",function(){
		AddreassManage.checkTel();
	}).on("input","#address_phone",function(){
		$(this).parent().find(".errmsg").hide();
	});

	return AddreassManage;
});