var Account = {
	/*登录*/
	login: function(param,callback){
		var url = "/User/login";
		$._ajax(url,param,"post",callback);
	},
	/*注册*/
	register: function(param,callback){
		var url = "/User/register";
		$._ajax(url,param,"post",callback);
	},
	/*登出*/
	logout: function(param,callback){
		var url = "/User/logout";
		// var url = Domain.center+"account/logout.html";
		$._ajax(url,param,"post",callback);
	},
	/*获取账户绑定信息*/
	bindInfo: function(param,callback){ //null 
		var url = "/Member/bindInfo";
		$._ajax(url,param,"post",callback);
	},
	/*获取手机或邮箱验证码*/
	getRegVerify: function(param,callback){
		var url = "/User/getRegVerify";
		$._ajax(url,param,"post",callback);
	},
	/*注册时检查用户名是否重复*/
	checkUserExists: function(param,callback){
		var url = "/User/checkUserExists";
		$._ajax(url,param,"post",callback);
	},
	createAvatar: function(param,callback){
		var url = "/Member/createAvatar";
		$._ajax(url,param,"post",callback);
	},
	/*获取账户平台币*/
	getCost: function(param,callback){
		var url = "/Member/getCost";
		$._ajax(url,param,"post",callback);
	}	
};

var Goods = {
	/*获取商品信息by id*/
	getGoodsById: function(param,callback){
		var url = "/Goods/getById";
        $._ajax(url,param,"post",callback);
	},
	/*获取主机周边*/
	getGoodsAround: function(param,callback){
		var url = "/Goods/around";
        $._ajax(url,param,"post",callback);
	},
	//获取banner 1.pc总商城 2.主机商城 3.游戏商城 4.首页豆腐块导航 5.webapp首页
	getBannerList: function(param,callback){
		var url = "/Goods/gameBanner";
		$._ajax(url,param,"post",callback);
	},
	//banner
 	getBanner : function(param,callback){
		var url = "/Banner/index";
		$._ajax(url,param,"post",callback);
	},
	/*游戏搜索*/
	gameSearch: function(param,callback){ //keyword
		var url = "/Goods/gameSearch";
		$._ajax(url,param,"post",callback);
	}
};

var Cart = {
	/*获取购物车列表*/
	getCartList: function(param,callback){
		var url = "/Cart/getCartList";
		$._ajax(url,param,"post",callback);
	},
	/*添加到购物车*/
	addCart: function(param,callback){
		var url = "/Cart/addCart";
		$._ajax(url,param,"post",callback);
	},
	/*添加到购物车-需要登录*/
	addCartFilter: function(param,callback){
		var url = "/cart/goPay";
		$._ajax(url,param,"post",callback);
	},
	/*获取主机周边本地cookie*/
	getCartLocal: function(param,callback){
		var carts = $.getCookie("carts");
		if(carts && carts != "null"){
			return {"carts":JSON.parse(carts).carts};
		}else{
			return {"carts":[]};
		}
	},
	/*删除购物车*/
	deleteCart: function(param,callback){
		var url = "/Cart/deleteCart";
		$._ajax(url,param,"post",callback);
	},
	/*获取购物车中商品数量*/
	getCartNum: function(param,callback){
		var url = "/Cart/getCartNum";
		$._ajax(url,param,"post",callback);
	}
};

var Order = {
	/*获取本地cookie中订单商品列表*/
	getSelectedCartListLocal: function(){
		var selectedCart = JSON.parse($.getCookie("selectedCart"));
		return selectedCart;
	},
	/*提交选中的商品ids列表*/
	storeCartIds: function(param,callback){
		var url = "/cart/storeCartIds";
		$._ajax(url,param,"post",callback);
	},
	/*提交订单*/
	submitOrder: function(param,callback){
		var url = "/Order/submit";
		$._ajax(url,param,"post",callback);
	},
	/*获取订单详情*/
	getOrderDetailById: function(param,callback){
		var url = "/Order/getDetailByOrderId";
		$._ajax(url,param,"post",callback);
	},
	getSelectCart: function(param,callback){
		var url = "/cart/getSelectCart";
		$._ajax(url,param,"post",callback);
	},
	getExpressInfoByBackNO: function(param,callback){
		var url = "/Orderback/getExpressInfoByBackNO";
		$._ajax(url,param,"post",callback);
	},
	getPcExpressInfoByOrderId: function(param,callback){
		var url = "/Order/getPcExpressInfo";
		$._ajax(url,param,"post",callback);
	},
	/*订单超时取消*/
	invalidByOid: function(param,callback){  //order_id
		var url = "/Order/invalidByOid";
		$._ajax(url,param,"post",callback);
	}
};

var Favorite = {
	/*添加到收藏*/
	addFavor: function(param,callback){
		var url = "/Collection/add";
		$._ajax(url,param,"post",callback);
	},
	/*从收藏中删除*/
	deleteFavor: function(param,callback){
		var url = "/Collection/delete";
		$._ajax(url,param,"post",callback);
	}
};

var Pay={
	pay: function(param){
		var url = "/Checkout/submit&order_no="+param.order_no;
		$.openUrl(url);
	},
	/*获取订单支付信息*/
	getPayDetail: function(param,callback){ //{"order_id":xxx}
		var url = "/Order/getDetailByOId";
		$._ajax(url,param,"post",callback);
	}
};

var Center={
	/*获取个人中心购物车列表*/
	getCartList: function(param,callback){
		var url = "/Cart/cartList";
		$._ajax(url,param,"post",callback);
	},
	/*获取个人中心收藏列表*/
	getFavorList: function(param,callback){
		var url = "/Collection/collectionList";
		$._ajax(url,param,"post",callback);
	},
	/*修改用户密码*/
	changePsw: function(param,callback){
		var url = "/Member/modifyPasswd";
		$._ajax(url,param,"post",callback);
	},
	/*获取订单列表*/
	getOrderList: function(param,callback){
		var url = "/Order/getList";
		$._ajax(url,param,"post",callback);
	},
	/*获取收藏列表"更多"*/
	getCartListMore: function(param,callback){
		var url = "/Collection/getList";
		$._ajax(url,param,"post",callback);
	},
	/*通过地址ID获取地址详情*/
	getAddressById: function(param,callback){
		var url = "/Address/getById";
		$._ajax(url,param,"post",callback);
	},
	/*编辑用户地址*/
	editAddress: function(param,callback){
		var url = "/Address/edit";
		$._ajax(url,param,"post",callback);
	},
	/*新增地址*/
	addAddress: function(param,callback){
		var url = "/Address/add";
		$._ajax(url,param,"post",callback);
	},
	/*删除地址*/
	deleteAddress: function(param,callback){
		var url = "/Address/delete";
		$._ajax(url,param,"post",callback);
	},
	/*获取地址列表*/
	getAddressList: function(param,callback){
		var url = "/Address/getAddressList";
		$._ajax(url,param,"post",callback);
	},
	/*设为默认地址*/
	setDefaultAddress: function(param,callback){
		var url = "/Address/setDefault";
		$._ajax(url,param,"post",callback);
	},
	/*取消订单*/
	cancelOrder: function(param,callback){
		var url = "/Order/cancel";
		$._ajax(url,param,"post",callback);
	},
	/*获取退货列表*/
	getReturnList: function(param,callback){
		var url = "/Orderback/refund";
		$._ajax(url,param,"post",callback);
	},
	/*获取换货列表*/ 
	getChangeList: function(param,callback){
		var url = "/Orderback/exchange";
		$._ajax(url,param,"post",callback);
	},
	/*获取维修列表*/
	getRepairList: function(param,callback){
		var url = "/Orderback/repair";
		$._ajax(url,param,"post",callback);
	},
	/*获取返修/退换*/
	// getAftSaleList: function(param,callback){   
	// 	var url = "/Orderback/getList";
	// 	$._ajax(url,param,"post",callback);
	// },
	/*获取退货详情*/
	getReturnDetail: function(param,callback){
		var url = "/Orderback/detail";
		$._ajax(url,param,"post",callback);
	},
	/*删除退货、维修、换货详情页中的附件图片*/
	delImageOfDetail: function(param,callback){
		var url = "/Orderback/deleteImage";
		$._ajax(url,param,"post",callback);
	},
	/*提交退货、维修、换货详情*/
	applyStep: function(param,callback){
		var url = "/Orderback/applyStep";
		$._ajax(url,param,"post",callback);
	},
	/*获取进度详情*/
	getSchedule: function(param,callback){
		var url = "/Orderback/getDetailByOno";
		$._ajax(url,param,"post",callback);
	},
	/*填写换货单页面*/
	getFillInfo: function(param,callback){
		var url = "/Orderback/fillInfo";
		$._ajax(url,param,"post",callback);
	},
	/*提交换货基本信息*/
	applyBackInfo: function(param,callback){
		var url = "/Orderback/applyStep2";
		$._ajax(url,param,"post",callback);
	},
	/*我的游戏订单*/
	getGameOrder: function(param,callback){
		var url ="/OrderGame/getList";
		$._ajax(url,param,"post",callback);
	},
	/*取消游戏订单*/
	cancelGameOrder: function(param,callback){
		var url ="/OrderGame/cancel";
		$._ajax(url,param,"post",callback);
	},
	/*确认收货*/
	orderComplete: function(param,callback){
		var url ="/Order/orderComplete";
		$._ajax(url,param,"post",callback);
	},
	/*退货单或换单维修单——确认收货*/
	backOrderComplete: function(param,callback){
		var url ="/Orderback/orderComplete";
		$._ajax(url,param,"post",callback);
	},
	/**/
	getWelcomeInfo: function(param,callback){
		var url = "/Member/getOrderNum";
		$._ajax(url,param,"post",callback);
	},
	/*申请退款*/
	applyRefund: function(param,callback){   // {"order_id":xx}
		var url = "/Orderback/applyRefund";
		$._ajax(url,param,"post",callback);
	}
};

var Game={
	//获取推荐游戏
	getGameRecommend: function(param,callback){
		var url = "/goods/gameRecommend";
		$._ajax(url,param,"post",callback);
	},

	//获取游戏分类
	getGameCategory: function(param,callback){
		var url = "/Goods/gameCate";
		$._ajax(url,param,"post",callback);
	},
	//获取游戏分类列表
	getGameListByCategory: function(param,callback){
		var url = "/Goods/gameList";
		$._ajax(url,param,"post",callback);
	},
	//获取游戏详情
	getGameDetail: function(param,callback){
		var url = "/Goods/gameDetail";
		$._ajax(url,param,"post",callback); 
	},
	//获取游戏订单详情
	getGameOrderDetail: function(param,callback){
		var url = "/OrderGame/getDetailByOrderId";
		$._ajax(url,param,"post",callback);
	},
	//获取游戏价格
	getGamePrice: function(param,callback){
		var url = "/Goods/gamePriceInfo";
		$._ajax(url,param,"post",callback);
	},
	//获取游戏视频和图片
	gameResInfo: function(param,callback){
		var url = "/Goods/gameResInfo";
		$._ajax(url,param,"post",callback);
	},
	//获取DLC和道具点卡
	gameProp: function(param,callback){
		var url = "/Goods/gameProp";
		$._ajax(url,param,"post",callback);
	},
	//游戏支付页
	gamePayList: function(param,callback){
		var url = "/Cart/gamePay";
		$._ajax(url,param,"post",callback);
	},
	//将游戏添加到本地cookie
	addCartLocal: function(param,callback){
		var game_carts = $.getCookie("game_carts");
		if(game_carts){
			game_carts = JSON.parse(game_carts);
			if(unique()){
				game_carts.cartlist.push(param);
			}else{
				$.alertTmpMsg("该商品已存在购物车。");
		        return false;
			}
		}else{
			game_carts = {};
			game_carts.cartlist = [];
			game_carts.cartlist.push(param);
		}
		$.setCookie("game_carts",JSON.stringify(game_carts));
		callback && callback();

		//防止重复添加
		function unique(){
			var tmpList = game_carts.cartlist;
			for(var i=0,n=tmpList.length;i<n;i++){
				if(tmpList[i].gid == param.gid && tmpList[i].produceId == param.produceId){
					return false;
				}
			}
			return true;
		}
		return true;
	},
	//从本地cookie中删除游戏
	deleteCartLocal: function(param,callback){
		var game_carts = JSON.parse($.getCookie("game_carts"));
		var tmpList = game_carts.cartlist;
		for(var i=0,n=tmpList.length;i<n;i++){
			if(tmpList[i].gid == param.gid && tmpList[i].produceId == param.produceId){
				tmpList.splice(i,1);
				$.setCookie("game_carts",JSON.stringify({"cartlist":tmpList}));
				callback && callback();
				return;
			}
		}
	},
	//获取本地游戏cookie
	getCartLocal: function(param,callback){
		var game_carts = $.getCookie("game_carts");
		if(game_carts && game_carts !="null"){
			return {"cartlist":JSON.parse(game_carts).cartlist};
		}else{
			return {"cartlist":[]};
		}
	},
	//删除游戏购物车中的内容
	deleteGameCart: function(param,callback){
		var url = "/Cart/deleteGameCart";
		$._ajax(url,param,"post",callback);
	},
	//游戏支付
	payGame: function(param,callback){
		var url = "/OrderGame/submit";
		$._ajax(url,param,"post",callback);
	},
	//添加游戏
	addGameCart: function(param,callback){
		var url = "/Cart/addGameCart";
		$._ajax(url,param,"post",callback);
	},
	//使用平台币支付
	payConins: function(param,callback){
		var url = "/OrderGame/coinsSubmit";
		$._ajax(url,param,"post",callback);
	},
	//游戏角色鉴权
	checkBuy: function(param,callback){
		var url = "/Cart/checkBuy";
		$._ajax(url,param,"post",callback);
	},
	//获取订单状态
	getOrderStatus: function(param,callback){
		var url = "/OrderGame/getOrderStatus";
		$._ajax(url,param,"post",callback);
	},
	//检测订单中是否已购买的游戏或道具
	orderCheck: function(param,callback){
		var url = "/OrderGame/checkBuy";
		$._ajax(url,param,"post",callback);
	},
	//update 2016-05-18
	//获取游戏首页推荐游戏
	getRecommendList : function(param,callback){
		var url = "/front.php?s=/Home/Game/recommend";
		$._ajax(url,param,"post",callback);
	},
	//获取游戏首页首发游戏
	getStartingList : function(param,callback){
		var url = "/front.php?s=/Home/Game/gameList";
		$._ajax(url,param,"post",callback);
	},
	//获取游戏分类列表
	getGameList:function(param,callback){
		var url = "/Goods/gameList";
		$._ajax(url,param,"post",callback);
	},
	//获取游戏内容
	getGameCate:function(param,callback){
		var url = "/Goods/gameCate";
		$._ajax(url,param,"post",callback);
	}
};

var JOIN = {
	infoSub: function(param,callback){
		var url = "/join/submit";
		$._ajax(url,param,"post",callback);
	}
}

var Faq = {
	getFaqList: function(param,callback){  //null
		var url = "/Article/getCat";
		$._ajax(url,param,"post",callback);
	},
	getFaqById: function(param,callback){  //id
		var url = "/Article/getArticleById";
		$._ajax(url,param,"post",callback);
	}
};

var Modules = {
	refreshCount: function(){
		Cart.getCartNum(null,function(data){
			$(".cart_num").text(data.data.goods_num);
		});
	}
};

var official = {
	getNewsList:function(param,callback){
		var url = "/Article/getNewsList";
		$._ajax(url,param,"post",callback);
	},
	getNewsArticleInfo:function(param,callback){
		var url = "/Article/getNewsArticleInfo";
		$._ajax(url,param,"post",callback);
	}
}

/**
 * 客服中心
 * simba
 * 2016-04-12
 * */
var Serve = {
	//获取热门问题
	getHotIssueList : function (param,callback) {
		var url = "/Kf/faqList";
		$._ajax(url,param,"post",callback);
	},
	//获取我的问题
	getMyIssueList : function (param,callback) {
		var url = "/Kf/myThreadList";
		$._ajax(url,param,"post",callback);
	},
	//提交问题
	postIssue :  function (param,callback) {
		var url = "/Kf/addQuestion";
		$._ajax(url,param,"post",callback);
	},
	//添加追问
	addIssue : function (param,callback) {
		var url = "/Kf/addZhuiwen";
		$._ajax(url,param,"post",callback);
	},
	//问题类型列表
	getIssueTypeList : function (param,callback) {
		var url = "/Kf/questionTypeList";
		$._ajax(url,param,"post",callback);
	},
	//问题详情
	getIssueDetails : function (param,callback) {
		var url = "/Kf/questionDetail";
		$._ajax(url,param,"post",callback);
	},
	//给提出的问题打分
	messageScore : function (param,callback) {
		var url = "/Kf/mark";
		$._ajax(url,param,"post",callback);
	},
	//图片上传
	imgsUpload : function (param,callback) {
		var url = "/Kf/upload";
		$._ajax(url,param,"post",callback);
	}
}


/**
 * 发布会
 * simba
 * 2016-05-03
 * */
var Conference = {
	//获取验证码
	getAuthCode : function(param,callback){
		var url = "/Book/getVerfiyCode";
		$._ajax(url,param,"post",callback);
	},
	//提交
	submitSelfMessage : function(param,callback){
		var url = "/Book/submit";
		$._ajax(url,param,"post",callback);
	},
	//获取服务器时间
	getServeTime : function(param,callback){
		var url = "/Book/currentTimestamp";
		$._ajax(url,param,"post",callback);
	}
}

/**
 * 首页
 * simba
 * 2016-06-14
 * */
 var Home = {
 	//首页banner
 	getHomeBanner : function(param,callback){
		var url = "/Banner/index";
		$._ajax(url,param,"post",callback);
	},
	//获取首页产品
	getHomeGoodsList:function(param,callback){
		var url = "/Goods/goodsList";
		$._ajax(url,param,"post",callback);
	},
	//获取最新动态
	getNews:function(param,callback){
		var url = "/Article/getNews";
		$._ajax(url,param,"post",callback);
	},
	getGameHotAndNew:function(param,callback){
		var url = "/Goods/gameHotAndNew";
		$._ajax(url,param,"post",callback);
	}

	


 }

 /**
 * 活动相关
 * simba
 * 2016-06-15
 * */
 var Activity = {
 	//618活动获取相关商品信息
 	get618Item : function(param,callback){
		var url = "/Goods/getActivityGoods";
		$._ajax(url,param,"post",callback);
	},
	//超级星期六
	getActivePageInfo:function(param,callback){
       var url = "/activity/getById";
		$._ajax(url,param,"post",callback);
	},
	getActivePageWinners:function(param,callback){
       var url = "/activity/getWinners";
		$._ajax(url,param,"post",callback);
	}

	
 }

 var Nav={
 	getNav: function(param,callback){
 		var url = "/Nav/getNavList";
        $._ajax(url,param,"post",callback);
 	}
 }