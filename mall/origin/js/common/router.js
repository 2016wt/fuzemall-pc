//过滤器配置
var filter = ["cartController", 'createOrderController', "payController", "mycenterController", "weixinController", "messageDetailsController"];
//

var search_keyword = "",timmer;
//路由配置
var Route = {
    trigger: true,
    config: {
        "home": {
            templateUrl: "pages/home.html",
            controller: "homeController",
            title: "FUZE商城-主机游戏、热门游戏、电视游戏、网络游戏"
        },
        // "fuze": {
        // 	templateUrl: "pages/fuze.html",
        // 	controller: "fuzeController",
        // 	title: "斧子游戏主机-战斧一代"
        // },
        "item/:itemId": {
            templateUrl: "pages/item.html",
            controller: "itemController",
            title: "FUZE商城"
        },
        "item/:itemId/:num": { //登录带num返回
            templateUrl: "pages/item.html",
            controller: "itemController",
            title: "FUZE商城"
        },
        "cart": {
            templateUrl: "pages/cart.html",
            controller: "cartController",
            title: "FUZE购物车"
        },
        "createOrder": {
            templateUrl: "pages/createOrder.html",
            controller: "createOrderController",
            title: "FUZE商城-确认订单"
        },
        "pay/:orderId": {
            templateUrl: "pages/pay.html",
            controller: "payController",
            title: "订单支付"
        },
        "mycenter/:subPage": {
            templateUrl: "pages/mycenter.html",
            controller: "mycenterController",
            title: "FUZE商城-个人中心"
        },
        "aboutus/:subPage": {
            templateUrl: "pages/aboutUs.html",
            controller: "aboutUsController",
            title: "FUZE商城-关于我们"
        },
        "employ": {
            templateUrl: "pages/employ.html",
            controller: "employController",
            title: "FUZE商城-诚聘英才"
        },
        "employ/:id": {
            templateUrl: "pages/employDetail.html",
            controller: "employDetailController",
            title: "FUZE商城-诚聘英才"
        },
        "game": {
            templateUrl: "pages/game.html",
            controller: "gameController",
            title: "FUZE-游戏商城"
        },
       "gameList": {
            templateUrl: "pages/gameList.html",
            controller: "gameListController",
            title: "FUZE-游戏列表"
        },
        "gameItem/:itemId": {
            templateUrl: "pages/gameItem.html",
            controller: "gameItemController",
            title: "FUZE-游戏商城"
        },
        "success/:orderId": {
            templateUrl: "pages/success.html",
            controller: "successController",
            title: "支付成功"
        },
        "gamepay": {
            templateUrl: "pages/gamepay.html",
            controller: "gamepayController",
            title: "游戏商城-支付"
        },
        "gamepay/:orderId": {
            templateUrl: "pages/gamepay.html",
            controller: "gamepayController",
            title: "游戏商城-支付"
        },
        "faq": {
            templateUrl: "pages/faq.html",
            controller: "faqController",
            title: "常见问题"
        },
        "faq/:page": { //page页面id
            templateUrl: "pages/faq.html",
            controller: "faqController",
            title: "常见问题"
        },
        "parentsCare": {
            templateUrl: "pages/parentsCare.html",
            controller: "parentsCareController",
            title: "家长监护工程"
        },
        "parentsCare/:page": { //page页面id
            templateUrl: "pages/parentsCare.html",
            controller: "parentsCareController",
            title: "家长监护工程"
        },
        "weixin/:orderId": {
            templateUrl: "pages/weixin.html",
            controller: "weixinController",
            title: "微信支付"
        },
        "404": {
            templateUrl: "pages/404.html",
            controller: "404Controller",
            title: "404-逛逛FUZE的其它商品吧"
        },
        "default": {
            templateUrl: "pages/fuze.html",
            controller: "fuzeController",
            title: "FUZE游戏主机-战斧一代"
        },
        "contactUs": {
            templateUrl: "pages/contactUs.html",
            controller: "contactUsController",
            title: "联系我们"
        },
        "latest/:id": {
            templateUrl: "pages/latest.html",
            controller: "latestController",
            title: "新闻资讯-详细"
        },
        "aboutUs": {
            templateUrl: "pages/aboutUs.html",
            controller: "aboutUsController",
            title: "关于我们"
        },
        "newMation": {
            templateUrl: "pages/newMation.html",
            controller: "newMationController",
            title: "新闻资讯"
        },
        "serve": {
            templateUrl: "pages/serve.html",
            controller: "serveController",
            title: "服务"
        },
        "serviceCenter": {
            templateUrl: "pages/serviceCenter.html",
            controller: "serviceCenterController",
            title: "客服中心"
        },
        "createMessage": {
            templateUrl: "pages/createMessage.html",
            controller: "createMessageController",
            title: "新建问题"
        },
        "messageDetails/:id": {
            templateUrl: "pages/messageDetails.html",
            controller: "messageDetailsController",
            title: "问题详情"
        },
        "conFigure": {
            templateUrl: "pages/conFigure.html",
            controller: "conFigureController",
            title: "配置表"
        },
        "fuze": {
            templateUrl: "pages/fuze.html",
            controller: "fuzeController",
            title: "概述"
        },
        "design": {
            templateUrl: "pages/design.html",
            controller: "designController",
            title: "主机"
        },
        "handle": {
            templateUrl: "pages/handle.html",
            controller: "handleController",
            title: "手柄"
        },
        "partners": {
            templateUrl: "pages/partners.html",
            controller: "partnersController",
            title: "合作伙伴"
        },
        "VR": {
            templateUrl: "pages/VR.html",
            controller: "VRController",
            title: "VR"
        },
        "fuzeOS": {
            templateUrl: "pages/fuzeOS.html",
            controller: "fuzeOSController",
            title: "FUZE OS"
        },
        //北京悠唐活动页
        "fuzefans": {
            id: "fuzefans",
            templateUrl: "pages/fuzefans.html",
            controller: "fuzefansController",
            parent: "home"
        },
        //经销商合作条款
        "joinIn": {
            templateUrl: "pages/joinIn.html",
            controller: "joinInController",
            title: "经销商加盟"
        },
        //经销商合作
        "terms": {
            id: "terms",
            templateUrl: "pages/terms.html",
            controller: "termsController",
            parent: "home"
        },
        //申请经销商合作
        "apply": {
            id: "apply",
            templateUrl: "pages/apply.html",
            controller: "applyController",
            parent: "home"
        },
        //活动页面
        "activepage":{
            templateUrl: "pages/activity/activepage.html",
            controller: "activepageController",
            title: "超级星期六"
        },
        //展示页面
        "grid":{
            templateUrl: "pages/activity/grid.html",
            controller: "gridController",
            title: "GRID"
        }
    },
    //获取route配置
    getRoute: function (route) {
        // var str = route.split("/");
        // var reg = eval("/^" + str[0] + "(\(\/:|\/)[a-z0-9A-Z\-\_]+){"+(str.length-1)+"}$/;");
        // for (var key in this.config){
        // 	if (reg.test(key)){
        // 		this.config[key].routeKey = key;
        // 		return this.config[key];
        // 	}
        // }
        // if(this.config[route]){
        // 	this.config[route].routeKey = route;
        // 	return this.config[route];
        // } 

        // var str = route.split("/");

        for (var key in this.config) {

            var reg = "/^";
            var str = key.split("/");
            for (var idx in str) {
                if (str[idx].indexOf(":") == -1) {
                    if (idx != 0) {
                        reg += "\\/";
                    }
                    reg += str[idx];
                } else {
                    reg += "\\/[a-z0-9A-Z\\-\\_\\=\\?]+";
                }
            }
            reg = eval(reg + "$/");
            if (reg.test(route)) {
                this.config[key].routeKey = key;
                return this.config[key];
            }
        }
        if (this.config[route]) {
            this.config[route].routeKey = route;
            return this.config[route];
        }
    },
    setRoute: function () {
        //TBD
    }
};

window.onhashchange = function () {
	clearInterval(timmer)
    if (!Route.trigger) {
        Route.trigger = true;
        return false;
    }
    if (location.hash != "#gameList") {
        search_keyword = "";
    }

    window.scrollTo(0, 0);
    //page为宣传页的切屏
    // if(location.hash.indexOf('page') != -1){
    // 	return false; 
    // }
    try {
	
        var _route = location.hash.split("#")[1].split("/"),
            routConfig = Route.getRoute(location.hash.split("#")[1]),
            _param = routConfig.routeKey.replace(/(\/:|\/)/g, ",").split(","),
            param = {};
        //生成参数对象
        for (var key in _param) {
            if (_param[key] != _route[key]) {
                param[_param[key]] = _route[key];
            }
        }

        if ($.indexOf(filter, routConfig["controller"]) != -1 && !$.getCookie("username")) {
            //强制登录
            window.location.href = Links.login + "?redirect=" + encodeURIComponent(location.href) + "&broker=fuzemall&l=zh-cn";
        } else {
            //动态设置title
            $.setTitle(routConfig["title"]);
            //调用controller渲染页面
		
            require(["js/controller/" + routConfig["controller"] + _min], function (_call) {
                _call && _call(routConfig.templateUrl, param);
            });
        }
    } catch (error) {
        require(["js/controller/404Controller" + _min], function (_call) {
            _call && _call("/pages/404.html", {});
        });
    }
};