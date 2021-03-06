// 工具、方法定义*/
_$=$;
$.extend(_$, {
	getFileContent: function(url) {

        var o = new XMLHttpRequest();
        o.open('get', url, false);
        o.send(null);
        return o.responseText;
    },
    getQueryStringJson: function(name){
        var ret = {};  
        window.location.search.substr(1).replace(/(\w+)=(\w+)/ig, function(a, b, c){ret[b] = unescape(c);});  
        return ret;
    },
    //初始化指定页面
    goPage: function(url){
        if(location.hash != "#"+url && location.hash != url){
            location.hash = url;
        }else{
            $(window).trigger('hashchange');
        }
    },
    //设置cookie
    setCookie: function(name, value, time){
        var cookie = name + "=" + encodeURIComponent( value );
        if( typeof time === "number" ){
            cookie += "; max-age=" + time;
        }
        document.cookie = cookie;
    },
    //获取cookie
    getCookie: function(key){
        var cookie = {};
        var all = document.cookie;
        if( all === "" ){
            return null;
        }
        var list = all.split("; ");
        for( var i=0; i<list.length; i++ ){
            var singleCookie = list[i];
            var p = singleCookie.indexOf("=");
            var name = singleCookie.substring(0,p);
            var value = singleCookie.substring(p+1);
            value = decodeURIComponent(value);
            if(key && key == name){
                return value;
            }
        }
        return null;
    },
    //js浮点数加法
    add: function(args,ac){   //params为参数数组 ;ac精确度 int 精确到几位小数
        if(args.length == 1){
            return args[0].toFixed(ac);
        }else{
            var a = args.shift(), b = args.shift();
            var c, d, e;
            try {
                c = a.toString().split(".")[1].length;
            } catch (f) {
                c = 0;
            }
            try {
                d = b.toString().split(".")[1].length;
            } catch (f) {
                d = 0;
            }
            e = Math.pow(10, Math.max(c, d));
            args.unshift(($.mul(a, e) + $.mul(b, e)) / e);
            return this.add(args,ac);
        }
    },
    //浮点数减法
    sub: function(a,b){
        var c, d, e;
        try {
            c = a.toString().split(".")[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), ((a * e - b * e) / e).toFixed(2);
    },
    mul: function(a,b){
        var c = 0,
            d = a.toString(),
            e = b.toString();
        try {
            c += d.split(".")[1].length;
        } catch (f) {}
        try {
            c += e.split(".")[1].length;
        } catch (f) {}
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    },
    /*通过key/value值获取objec在数组中的索引*/
    getObjIndexByKey: function(arr,key,value){
        for(var k in arr){
            if(arr[k][key] == value){
                return k;
            }
        }
        return -1;
    },
    //参数说明 param ={"title":"窗口标题","content":"窗口body","top":40,"width":700}
    alertPop: function(_param,callback){
        var param={"title":"默认标题","content":"内容为空","top":240,"width":700,"close":true};
        $.extend(param,_param);
        var doc = document.documentElement, body = document.body;
        param.top = (doc.scrollTop?doc.scrollTop:body.scrollTop)+param.top;
        if(param._class){
            $("#global_pop .pop_content").addClass(param._class);
        }
        if(param.close){
            $("#global_pop .pop_close").show();
        }else{
            $("#global_pop .pop_close").hide();
        }

        $("#global_pop .pop_title_text").text(param.title);
        $("#global_pop .pop_content").html(param.content);

        $("#global_pop .pop_box").width(param.width).css("margin-top",param.top+"px");
        $("#global_pop").height($("body").height());
        $("#global_pop").show();
        callback && callback();
    },
    closePop: function(callback){
        $("#global_pop").hide();
    },
    //消息提示弹出窗
    alertMsg: function(_param,callback){
        var param={"title":"默认标题","content":"内容为空","top":240};
        $.extend(param,_param);
        var doc = document.documentElement, body = document.body;
        param.top = (doc.scrollTop?doc.scrollTop:body.scrollTop)+param.top;
        $("#global_msg .ensure_del").text(param.title);
        $("#global_msg .message_del").html(param.subTitle);
        $("#global_msg .msg_box").css("margin-top",param.top+"px");
        $("#global_msg").height($("body").height());
        $("#global_msg").show();
        $(".msg_action_wrap .btn.grey").off().on("click",function(){
            $.closeMsg();
        });

        $(".msg_action_wrap .btn.ok").off().on("click",function(){
            callback && callback();
        });
    },
    //临时消息
    alertTmpMsg: function(text){
        var doc = document.documentElement, body = document.body;
        var top = (doc.scrollTop?doc.scrollTop:body.scrollTop)+350;
        $("#global_temp_msg").text(text).fadeIn(100).css({"margin-left":-$("#global_temp_msg").width()/2,"top":top});
        setTimeout(function(){
            $("#global_temp_msg").fadeOut(1500);
        },1500);
    },
    closeMsg: function(){
        $("#global_msg").hide();
    },
    checkMail: function(mail){
        var regstr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regstr.test(mail);
    },
    checkTel: function(tel){
        var regstr = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
        return regstr.test(tel);
    },
    //检测非法字符
    checkIllegalChar: function(str){
        var reg =/[\?\~\!@#\$%\^&\*-\/\+\\\$\.\;\<\>\"\=\{\}\']/;
        if(reg.test(str)){
            return false;
        }
        return true;
    },
    //将秒为单位的时间格式化为xx:xx:xx
    timeFormat: function(timestamp){
        var timeStr = "";
        var hour,minute,second;
        hour = Math.floor(timestamp/(60*60));
        // hour = hour>9?hour:"0"+hour;
        minute = Math.floor(timestamp%(60*60)/60);
        // minute = minute>9?minute:"0"+minute;
        second = Math.floor(timestamp%(60*60)%60);
        // second = second>9?second:"0"+second;
        // return hour+":"+minute+":"+second;
        if(hour > 0){
          //  timeStr += "<span>"+hour+"</span>"+"小时";
          timeStr += "<span class='timeColor_red'>"+hour+"</span>"+"小时"+"";
        }
        if(minute > 0){
            timeStr += "<span class='timeColor_red'>"+minute+"</span>"+"分钟"
        }
        timeStr += "<span class='timeColor_red'>"+second+"</span>"+"秒";
        return timeStr;
    },
    //注册windows事件
    addEventListener: function(event,fun){
        if(window.addEventListener){
            window.addEventListener(event,fun);
        }else{
            //attachEvent兼容IE8以下
            window.attachEvent(event,fun);
        }
    },
    //返回IE版本，非IE返回999
    ieVersion: function(){
        var version = navigator.appVersion.split(";")[1].replace(/[ ]/g,"").split("MSIE")[1];
        if(version){
            return version;
        }else{
            return 999;
        }
    },
    //IE8不支持array.indexOf
    indexOf: function(arr,value){
        for(var key in arr){    
            if(arr[key] == value){
                return key;
            }
        }
        return -1;
    },
    //弹出登录窗
    alertLoginPop: function(){
        var param = {};
        param.title = "登录";
        param.width = 495;
        param.content = $("#loginPopTemplate").tmpl({});
        $.alertPop(param,function(){
            $("#login_name").focus();
        });
    },
    //高亮导航
    navHighlight: function(node){
        $(".layer1 ul li.active").removeClass("active");
        $("#target_"+node).addClass("active");
    },
    //打开不会被拦截的新页面
    openUrl: function(url){
        var f=document.createElement("form");
        f.setAttribute("action" , url );
        f.setAttribute("method" , 'post' );
        f.setAttribute("target" , '_blank' );
        document.body.appendChild(f)
        f.submit();
    },
    //阻止冒泡事件
    cancelBubble: function(event){
        event = event?event:window.event;
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    },
    //go404页面
    go404: function(){
        require(["js/controller/404Controller"+_min],function(_call){
            _call && _call("pages/404.html",{});
        });
    },
    thumbImg: function(url,size){
        var arr = url.split(".");
        var flag = "."+arr[arr.length-1];
        var newArr = url.split(flag);
        return newArr[0]+"_"+size+flag+newArr[1];
    },
    //动态更新title
    setTitle: function(title){
        try{
            $("title").html(title);
        }catch(e){
            return true;
        }
    },
    getBt: function(str){
        var char = str.match(/[^\x00-\xff]/ig);
        return str.length + (char == null ? 0 : char.length);
    },
    cutString: function(content,size){
        var str = "";
        if(content){
            var len = content.gblen(),len_count = 0;
            for(var i=0,n=content.length;i<n;i++){
                len_count = len_count + $.getBt(content[i]);
                str = str + content[i];
                if(len_count>size){
                    str = str + "...";
                    break;
                }   
            }
        }
        return str;
    },
    isPC: function(){  
           var userAgentInfo = navigator.userAgent;  
           var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
           var flag = true;  
           for (var v = 0; v < Agents.length; v++) {  
               if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
           }  
           return flag;  
    },
    asynCss: function(css_arr,callback){
        var count = 0;

        if(css_arr.length == 0){
            callback && callback();
        }
        for(var i=0,n= css_arr.length;i<n;i++){
            var link = document.createElement(                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     "link" );
            link.type = "text/css"; 
            link.rel = "stylesheet"; 
            link.href = css_arr[i]+"?v="+(_version?_version:$.getVersion())
            ; 
            $("#container")[0].appendChild( link );
            // document.getElementsByTagName("head")[0].appendChild( link );
            link.onload = function(){
                ++count;
                if(count == css_arr.length){
                    callback && callback();
                }
            };
        } 
    },
    loadImgError: function(_me){
        _me.src = $(_me).data("errorsrc");
    },
    ltIE9: function(){  //判断是否是IE9一下的浏览器
        var browser = navigator.appName;
        var b_version = navigator.appVersion;
        var version = b_version.split(";");
        if (version.length > 1) {
            var trim_Version = parseInt(version[1].replace(/[ ]/g, "").replace(/MSIE/g, ""));
            if (trim_Version <= 9) {
                return true;
            }
        }
        return false;
    },
    thumbImg: function(url,size){
        var arr = url.split(".");
        var flag = "."+arr[arr.length-1];
        var newArr = url.split(flag);
        return newArr[0]+"_"+size+flag+newArr[1];
    },
    setNum: function(num){
        $(".red_mid").text(num);
    },
    //读取package版本号
    getVersion: function(){
				//console.log(_$);
        $.ajaxSettings.async = false;
        $.getJSON("package.json",function(data){
			//console.log(data);
            _version = data.version;
			
        });
        $.ajaxSettings.async = true;
        return _version;
    },
    _ajax: function(url,data,method,callback){
        if(data){  //统一传递参数格式 
            data = "param="+JSON.stringify(data);
        }
        $.ajax({
            url: url,
            type: method,
            dataType:'json',
            data: data,
            async: true,
            success: function(data){
                if(data.code == 511000){
                    alert(data.message);
                    return;
                }
                //未登录或者登录已过期
                if(data.code == 400002){
                    $.setCookie("username","");
                    // $.setCookie("goods_num",0);
                    location.reload();
                }
                callback && callback(data);
            },
            error: function (a,b,c){
                // alert(a.status+"--"+c);
               // console.error(a.status+"--"+c);
            }
        });
    },
    //H5存储缓存
    setCache : function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    //获取缓存
    getCache : function(key) {
        var newkey = localStorage.getItem(key) ? localStorage.getItem(key) : "null";
        return JSON.parse(newkey);
        //return JSON.parse(localStorage.getItem(key));
    },
    //删除缓存
    removeCache : function(key) {
        localStorage.removeItem(key);
    }
    
});
 
$.fn.loadImg = function(size){
    var imgs = this.find(".img_loading");
    imgs.each(function(){
        if($.ltIE9()){
            var _this = $(this),url = $(this).data("src");
            var img = new Image();
            var tag = url.indexOf("?") == -1? "?":"&";
            var img_src = url+tag+new Date().getTime();
            img.src = img_src;
            if(img.complete){
                _this.attr("src",img_src);
            }else{
                img.onload = function(){
                    _this.attr("src",img_src);
                };

                img.onerror = function(){
                    _this.attr("src","/img/"+size+".png");
                };
            }
        }else{
            var _this = $(this),url = $(this).data("src");
            var img = new Image();
            img.src = url;

            img.onload = function(){
                _this.attr("src",url);
            };

            img.onerror = function(){
                _this.attr("src","/img/"+size+".png");
            };
        }
    }); 
};

$.fn.loadPage = function(page_url,css_arr,callback){

    $(this).load(page_url,function(){
         $(".game_toptit").hide();
        $.asynCss(css_arr,callback);
    });

};

String.prototype.gblen = function(){  
    var len = 0;  
    for (var i=0; i<this.length; i++) {  
        if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {  
            len += 2;  
        } else {  
            len ++;  
        }  
     }  
    return len;  
}

/*============注册全局事件===============*/
$("body").on("click","#next",function(){
    var nodes =$(".thumbnail li"),
        len =nodes.length;
        _index = nodes.index($(".thumbnail .active"));
    if (_index<len-1){
        nodes.eq(_index+1).trigger('click');
    }else{
        return;
    }
});

$("body").on("click","#prev",function(){
    var nodes =$(".thumbnail li"),
        len =nodes.length;
        _index = nodes.index($(".thumbnail .active"));
    if (_index>0){
        nodes.eq(_index-1).trigger('click');
    }else{
        return;
    }
});

$("#global_pop").on("click",".pop_close",function(){
    $.closePop();
});

$("body").on("click",".send_option input[type='checkbox']",function(){
    $(".invoice_o").toggle();
});

$("body").on("click",".register",function(){
   window.location.href = Links.register + "?broker=fuzemall&l=zh-cn";
});

$("body").on("click",".img_verify",function(){
    $(".img_verify").attr("src",$(".img_verify").attr("src").split("?tag=")[0]+"?tag="+new Date().getTime());
});

$("body").on("click","#login_btn",function(){
    var param = {};
    param.account = $("#login_name").val();
    param.password = $("#login_psw").val();
    param.code = $("#login_code").val();
    Account.login(param,function(data){
        if(data.code == "200"){
            location.reload();
            $.closePop();
            $.setCookie("username",data.u_info.username);
            $.setCookie("avatar",data.u_info.avatar);
        }else{
           $("#"+data.code).html(data.message).show();
           $(".img_verify").attr("src",$(".img_verify").attr("src")+"?tag="+new Date().getTime()); 
        }
    }); 
});

$("body").on("input",".login_pop input[type='text']",function(){
    var node = $(this).parent().find(".errmsg");
    if(node.css("display") != 0){
        node.hide();
    }
});

$("body").on("click","#rgster_btn",function(){
    $(".register").trigger('click');
});

$("body").on("click","#logout",function(){
    Account.logout(null,function(data){
        // if(data.code == "200"){
        $.setCookie("username","");
        $.setNum(0);
        // $.setCookie("goods_num",0);
        $(".cart_num").html(0);
        $(".salutation").hide();
        $(".un_login").show();
        $.goPage('home');
        // }
    });
});

dropDownMouseEnter();
 var carnum, gamenum, znum;
function dropDownMouseEnter(){
    //mouseover获取游戏购物车内容
    var merge_price = 0;
    if($(".red_mid").text() > 0){
        $(".cart_moneybox").show();
    }else{
        $(".cart_moneybox").hide();
    }
    

    $("body").off("mouseenter").one("mouseenter",".buycar",function(){
       // carnum = parseInt($(".red_mid").text());
       
        $(".cart_panel").removeClass("hide");
        //获取主机购物车内容
        if(true){
            function cart_list(cartList){
                var total_price = 0,content="";
                for(var i=0,n=cartList.length;i<n;i++){
                    total_price = total_price + JSON.parse(cartList[i].price)*cartList[i].num;
                }
                merge_price = (merge_price*100 + total_price*100)/100;
                $(".cart_panel_ze span").text(merge_price.toFixed(2));
               
                $("#cart_panel_zjzb .panel_btn span").text("￥"+total_price.toFixed(2));
                $("#cart_panel_zjzb").removeClass("p_loading");
                if(cartList.length == 0){
                    content = "<div class='no_goods'>您还没挑选商品哦~</div>";
                    $("#cart_panel_zjzb .panel_btn").hide();
                }else{
                    content = $("#cartPanelTemplate").tmpl({"cartlist":cartList,"_type":""});
                    $("#cart_panel_zjzb .panel_btn").show();
                }
                $("#cart_panel_zjzb .cart_panel_list ul").html(content);

                $("#cart_panel_zjzb .cart_panel_del").off().on("click",function(){
                    var _this = $(this);
                    Cart.deleteCart({"ids":$(this).data("id")},function(data){
                        if(data.code == 200){
                            console.log(data)
                            $(".red_mid").text(data.data.goods_num);
                            dropDownMouseEnter();
                            $(".buycar").mouseenter();
                            carnum--;
                        }
                    });
                });
            }

            $("#cart_panel_zjzb").addClass("p_loading");
            $("#cart_panel_zjzb .cart_panel_list ul").html("");
            Cart.getCartList(null,function(data){
                var cartList = data.carts;
                cart_list(cartList);
                carnum = cartList.length;
            });
        }

        // 获取游戏购物车内容
        if(true){
            function game_cart_list(cartList){
                var total_price = 0,content="";
                for(var i=0,n=cartList.length;i<n;i++){
                    total_price = total_price + JSON.parse(cartList[i].price);
                }
                merge_price = (merge_price*100 + total_price*100)/100;
                $(".cart_panel_ze span").text(merge_price.toFixed(2));
                $("#cart_panel_yxdj .panel_btn span").text("￥"+total_price.toFixed(2));
                $("#cart_panel_yxdj").removeClass("p_loading");
               
                if(cartList.length == 0){
                    content = "<div class='no_goods'>您还没挑选游戏，赶紧去挑选哦~</div>";
                    $("#cart_panel_yxdj .panel_btn").hide();
                }else{
                    content = $("#cartPanelTemplate").tmpl({"cartlist":cartList,"_type":"game"});
                    $("#cart_panel_yxdj .panel_btn").show();
                }
                $("#cart_panel_yxdj .cart_panel_list ul").html(content);

                $("#cart_panel_yxdj .cart_panel_del").off().on("click",function(){
                    var _this = $(this);
                    Game.deleteGameCart({"ids":$(this).data("id")},function(data){
                        if(data.code == 200){
                            $(".red_mid").text(data.goods_num);
                            dropDownMouseEnter();
                            $(".buycar").mouseenter();
                           gamenum--;
                        }else{
                            alert(data.message);
                        }
                    });
                });
            }
            
            $("#cart_panel_yxdj").addClass("p_loading");
            $("#cart_panel_yxdj .cart_panel_list ul").html("");
            Game.gamePayList(null,function(data){
                var cartList = data.data.cartlist;
                game_cart_list(cartList);
                gamenum = cartList.length;
                //更新购物车数量
                Cart.getCartNum(null,function(data){

                    $(".cart_num").text(data.data.goods_num);
                });
            });
        }
        
    });
        znum = carnum + gamenum;
        if(znum < 1 ) {
            $(".cart_moneybox").hide();
        }
}

//实物去结算
$("body").on("click","#cart_panel_zjzb .btn",function(){
    $(".cart_panel").addClass("hide");
    location.href = "index.html#cart";
});

//游戏去结算
$("body").on("click","#cart_panel_yxdj .btn",function(){
    $(".cart_panel").addClass("hide");
    location.href = "index.html#gamepay";
});

// $("body").on("click","#aboutus",function(){
//     window.open(Links.about);
// });

// $("body").on("click","#joinus",function(){
//     window.open(Links.joinus);
// });

/*全局事件 end*/

//回车键被按下
$.addEventListener("keydown",function(event){
    event = event || window.event; 
    if (event.keyCode == 13){
        if($(".enterflag").length > 0){
            $(".enterflag").trigger("click");
        }

        if($(".game_toptit a").length > 0){
            $(".game_toptit a").trigger("click");
        }
    }
});

$('body').on("selectstart",".button,#home .left,#home .right,#r_pointer,.plus,.subtract,.picker,.addr_edit,.addr_delete,span,label,#category li,.faq_li_t,.faq_li_list ul li", function () { return false; });

// /*windows事件 end

//tab切换//
;(function($){
    $.fn.extend({
        tabSlide:function(options){
            //默认参数
            var defaults = {
                tabshown:'active',
                autoHeight:true
            };

            var options = $.extend(defaults, options);

            var tabli = $('.tab_menu ul li',this);

            var tabdiv = $('.tab_box .tab_switch',this);

            //单击选项卡
            tabli.click(function() {
                $(this).addClass(options.tabshown).siblings().removeClass(options.tabshown);
                var curIndex = tabli.index(this);
                tabdiv.eq(curIndex).show().siblings().hide();
            });

            return this;
        }
    });
})(jQuery);


/**
*   game banner 轮播
*   simba
*   2016-06-02
**/
var bannerTimer = "";
$.fn.bannerSlider = function(opts){

    //可定义参数
    opts = $.extend({
        timeout : 5000, //轮播间隔时间 ps：最小值为1500
        anTime : 800, //动画时间 ps：最小值为500
        autoSlider : true, //是否自动轮播 ps：只能是boolean类型，不是的会默认为true
        ul : ".game-banner-list", //图片容器
        eq : 0,   //默认显示第几个li  ps: 0表示第一个
        isTips : true, //是否显示tips
        ulTips : ".game-banner-tip-list", //tips的ul容器
        moveWay : "roll" //轮播方式 roll：滚动式轮播  hide：隐藏式轮播
    }, opts || {});

    //基本参数的默认设置
    opts.timeout = opts.timeout < 1500 ? 1500 : opts.timeout;
    opts.anTime = opts.anTime < 500 ? 500 : opts.anTime;
    opts.autoSlider = typeof opts.autoSlider != "boolean" ? true : opts.autoSlider;
    opts.eq = typeof opts.eq != "number" ? 0 : opts.eq;

    //全局参数
    var ths = this,
        $ul = ths.find(opts.ul),
        $li = $ul.find("li"),
        $imgs = $li.find("img"),
        liSize = $li.size(),
        $ulTips = this.find(opts.ulTips);

    var init = function(){
        //样式调整
        styleInit();
        //是否轮播
        isAutoSlider();
    },
    //样式调整
    styleInit = function(){
        //默认显示第eq个图片
        switch (opts.moveWay){
            case "roll" :
                $li.css({"left": "100%"}).eq(opts.eq).css({"left": 0}).addClass("active");
                break;
            case "hide" :
                $li.hide().eq(opts.eq).show().addClass("active");
                break;
        }
        //是否显示tips
        opts.isTips && (function(){
            for (var i = 0, l = liSize; i < liSize; i++) {
                $ulTips.append("<li>");
            }
            //默认第 opts.eq 被选中
            $ulTips.find("li").eq(opts.eq).addClass("active");

            //tips绑定事件
            $ulTips.on("click","li",function(){
                var ths = $(this);
                if (ths.hasClass("active")) { return; }
                bannerTimer && clearInterval(bannerTimer);
                opts.eq = $ulTips.find("li").index(ths);
                startSlider();
                isAutoSlider();
            });
        })();
        opts.eq ++;
    },
    //是否自动轮播
    isAutoSlider = function(){
        opts.autoSlider && (bannerTimer = setInterval(startSlider,opts.timeout));
    },
    //轮播动画
    startSlider = function(){
        var $activeLi = $ul.find("li.active");
        opts.eq = opts.eq > (liSize - 1) ? 0 : opts.eq;

        //不同的轮播方式  展示不同的动画效果
        switch (opts.moveWay){
            case "roll" :
                //滚动轮播动画
                $activeLi.stop(true,true).animate({"left" : "-100%"}, opts.anTime, function(){
                    $activeLi.css("left" , "100%");
                    opts.eq ++;
                });
                $li.removeClass("active").eq(opts.eq).addClass("active");
                $li.eq(opts.eq).stop(true,true).animate({"left" : "0"}, opts.anTime);
                //tips 状态转换
                $ulTips.find("li").removeClass("active").eq(opts.eq).addClass("active");
                break;
            case "hide" :
                //tips 状态转换
                $ulTips.find("li").removeClass("active").eq(opts.eq).addClass("active");
                //隐藏式轮播动画
                $li.stop(true,true).fadeOut(opts.anTime).eq(opts.eq).stop(true,true).fadeIn(opts.anTime).addClass("active");
                opts.eq ++;
                break;
        }
    },
    // 检测图片是否加载完成
    isImgLoad = function(imgObj,callback){
        var isLoad = true;
        var imgsTimeout = "";
        imgObj.eq(0).each(function(){
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
                isImgLoad(imgObj,callback);
            },500);
        }
    };

    //图片加载完成之后 init()
    isImgLoad($imgs,function(){
        var imgH = $imgs.eq(0).height();
        $ul.css({"height" : imgH + "px"});
        init();
    });

    //容器高度相应图片的高度
    $(window).resize(function(){
        var imgH = $imgs.eq(0).height();
        $ul.css({"height" : imgH + "px"});
    });
}