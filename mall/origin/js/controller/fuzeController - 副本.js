define(function(){
	return function(){
		require(["http://cdn.fuzeuser.com/scrollify/jquery.easing.1.3.js","http://cdn.fuzeuser.com/scrollify/scrollify.min.js","http://cdn.fuzeuser.com/plugins/fullpage/jquery.fullpage.js","http://cdn.fuzeuser.com/plugins/jquery-ui.1.9.1.min.js",],function(){

            $("#fullpage").load("pages/fuze.html",function(){
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
                    $("#header1").css("height","145px"); 
                    $("#footer1").css("height","354px");  
                    //    $.scrollify({
                    //     section:".section"
                    // });
                    })
                    $(".section").css({"height":$(window).height()});
                    $("#header1").css("height","145px"); 
                    $("#footer1").css("height","354px");  
                 
                    // $.scrollify({
                    //     section:".section"
                    // });
                    $(window).scroll(function(){
                        if($(window).scrollTop()>=140)
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
                // $('#fullpage').fullpage({
                //     scrollingSpeed:1300,
                //     easing:"linear",
                //     sectionsColor    :            
                //     [
                //         '#fff', '#fff', '#fff', '#fff','#fff','#fff','#fff','#fff','#090909','#fff','#fff','#fff','#040404'
                //     ],    
                //     navigation        : true,        
                //     loopBottom        : true,      
                //     loopTop            : true,       
                //     css3            : true,        
                //     anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8', 'page9','page10','page11','page12'],

                //     onLeave            : function( index, nextIndex, direction )
                //     {
                //         var box    = $("#pagebox");
                //         // 顶部
                //         if ( index===1 && nextIndex===12 )
                //         {//
                //             alert(```)
                //             lock();
                //             box.addClass("top");
                //             $("#topnav").hide();
                //             return false;
                //         }else{
                //             $("#topnav").show();

                //         }
                        
                //         if ( index===1 && nextIndex===2 && box.hasClass("top") )
                //         {
                //             lock();
                //             box.removeClass("top");
                //             return false;
                //         }

                //         // 底部
                //         if ( index===11 && nextIndex===12 )
                //         {
						
                //             box.addClass("bottom");
                //             return false;
                //         }
                //         if ( index===11 && nextIndex===10  && box.hasClass("bottom") )
                //         {
                //             lock();
                //             box.removeClass("bottom");
                //           return false;
                //         }
                     
                //         // 返回事件阻塞
                //         return flag;
                //     },
                //     afterRender : function(index){
                       

                //         var _index = location.hash.split("#page")[1]?location.hash.split("#page")[1]:1;
                //         $(".section").eq(_index -1).addClass("active");
                //         if (_index ==1) {
                //             $('#pagebox').addClass('top');
                //         };
                        
                //         $('#fp-nav').find('li').eq(11).hide();


                //     },
                //     afterLoad:function(index, anchorLink){
                //         if(anchorLink == 8){
                //             $(".fuze_handimg-slider").stop(true,true).animate({ "opacity" : 1 });
                //         }else{
                //             $(".fuze_handimg-slider").css({ "opacity" : 0 });
                //         }

                //         if(anchorLink == 9){
                //             $(".fuzefull_black").stop(true,true).animate({
                //                 "top" : "-20px"
                //             },1500,function(){
                //                 $(".fuzefull_black-slider").stop(true,true).animate({ "opacity" : 1 },1500);
                //             })
                //         }else{
                //             $(".fuzefull_black").css({ "top" : 0 });
                //             $(".fuzefull_black-slider").css({ "opacity" : 0 });
                //         }
                //     }

                // }); 
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