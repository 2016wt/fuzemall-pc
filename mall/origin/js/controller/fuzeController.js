define(function(){
	return function(templateUrl,param){
		require([],function(){

             $("#container").loadPage(templateUrl,["css/fuze.css"],function(){
                $("body").on("click",".cart_moneybox .btn",function(){
                     window.location.href="index.html#cart";
                });
                if($.ltIE9()){
                    var h = $(window).height();
                    var w = parseInt($(window).width());
                    $('.section').css({"height":h+"px"});
                    var whole=document.getElementById("fullside");
                    var demo1=document.getElementById("fullside_one");
                    var demo2=document.getElementById("fullside_two");
                    demo2.innerHTML=demo1.innerHTML;


                    var demo1_clientWidth=demo1.offsetWidth;

                    var time=30;

                    var t=setInterval(fun,time);
                    function fun(){
                        var whole_scrollLeft=whole.scrollLeft;
                        if (whole_scrollLeft>=demo1_clientWidth) {
                            whole.scrollLeft=0
                        };
                        whole.scrollLeft++;
                    }

                    whole.onmouseover=function(){
                        clearInterval(t);
                    }
                    whole.onmouseout=function(){
                        t=setInterval(fun,time);
                    }
                    if (w<= 1680) {
                        $('#fullpage').addClass('set_titie');
                    };
                    return false;
                }


                var timer, 
                    video;
                var flag    = true;
                function lock(){
                    clearTimeout(timer);
                    flag    = false;
                    timer    = setTimeout(function()
                    {
                        flag= true;
                    }, 200);                
                }
                $(function() {
                    $(window).resize(function(){
                    $(".section").css({"height":$(window).height()});
                    $("#header1").css("height","80px"); 
                    $("#footer1").css("height","354px");  
                    })
                    $(".section").css({"height":$(window).height()});
                    $("#header1").css("height","80px"); 
                    $("#footer1").css("height","354px");  

                    $(window).scroll(function(){
                      var active=Math.floor(($(window).scrollTop()-145)/$(window).height());
                        $('.section').removeClass('active');
                        $('.section:nth-child('+(active+2)+')').addClass('active');
                        if($(window).scrollTop()>=145)
                        {
                          $(".fuzeTop_navbox").css({"position":"fixed","top":"0"});
                        }
                        else
                        {
                          $(".fuzeTop_navbox").css({"position":"relative","top":"0"});  
                        }
                        
                    })
                    $("#fp-nav li").click(function(e) {
                        $.scrollify("move",$(this).find("a").attr("href"));
                         $("#fp-nav li a").removeClass("active");
                         $(this).find("a").addClass("active");
                    });
                });

                    function Hslider(ida,idb,idc){
                        var whole=document.getElementById(ida);
                        var demo1=document.getElementById(idb);
                        var demo2=document.getElementById(idc);
                        demo2.innerHTML=demo1.innerHTML;


                        var demo1_clientWidth=demo1.offsetWidth;

                        var time=40;

                        var t=setInterval(fun,time);
                        function fun(){
                            var whole_scrollLeft=whole.scrollLeft;
                            if (whole_scrollLeft>=demo1_clientWidth) {
                                whole.scrollLeft=0
                            };
                            whole.scrollLeft++;
                        }

                        whole.onmouseover=function(){
                            clearInterval(t);
                        }
                        whole.onmouseout=function(){
                            t=setInterval(fun,time);
                        }
                    }
                    Hslider("fullside","fullside_one","fullside_two");
                    $('body').on('click','#fp-nav li a',function(){
                        $('#pagebox').removeClass('top');
                        $('#pagebox').removeClass('bottom');
                    });
            });
            
            
        });
	}
});