define(function(){
   return function(templateUrl,param){
        require(["http://cdn.fuzeuser.com/scrollify/jquery.easing.1.3.js","http://cdn.fuzeuser.com/scrollify/scrollif.min.js"],function(){
            // $("#container").height(document.documentElement.clientHeight);
            $("#container").loadPage(templateUrl,["css/handle.css"],function(){

                 $("body").on("click",".cart_moneybox .btn",function(){
                     window.location.href="index.html#cart";
                });

                if($.ltIE9()){
                    var h = $(window).height()
                    $('.section').css({"height":h+"px"});
                    
                    return false;
                }

                var timer;
                var flag    = true;
                function lock()
                {
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
                // $('#fullpage').fullpage(
                // {
                //     scrollingSpeed:1500,
                //     sectionsColor    :            // 背景色
                //     [
                //         '#0e0e0e', '#0e0e0e', '#0e0e0e', '#0e0e0e'
                //     ],    
                //     navigation        : true,        // 显示导航
                //     loopBottom        : true,        // 顶部轮滚
                //     loopTop            : true,        // 顶部轮滚
                //     css3            : true,        // 开启CSS3动画
                //     anchors: ['page1', 'page2', 'page3', 'page4','page5'],
                //     onLeave            : function( index, nextIndex, direction )
                //     {
                //         var box    = $("#pagebox");

                //         // 顶部
                //         if ( index===1 && nextIndex===5 )
                //         {
                //             box.addClass("top");
                //             $("#topnav").hide();
                //             return false;
                //         }else{
                //             $("#topnav").show();
                //             // setTimeout(function(){
                //             //     $("#topnav").fadeIn(1000);
                //             // },1000);
                //         }
                //         if ( index===1 && nextIndex===2 && box.hasClass("top") )
                //         {
                //             lock();
                //             box.removeClass("top");
                //             return false;
                //         }

                //         // 底部
                //         if ( index===4 && nextIndex===5 )
                //         {
                //             box.addClass("bottom");
                //             return false;
                //         }
                //         if ( index===4 && nextIndex===3 && box.hasClass("bottom") )
                //         {
                //             lock();
                //             box.removeClass("bottom");
                //             return false;
                //         }

                //         // 返回事件阻塞
                //         return flag
                //     },
                //     afterLoad:function(index, anchorLink){
                //         if(anchorLink == 3){
                //             $(".halds2_de2").find("img").animate({
                //                 "opacity" : 1
                //             },2000);
                           
                //         }else {
                //             $(".halds2_de2").find("img").css({"opacity":0});
                //         }
                //     },
                //     afterRender : function(){
                //         // $('#section0').addClass('active');
                //         var _index = location.hash.split("#page")[1]?location.hash.split("#page")[1]:1;
                //         $(".section").eq(_index -1).addClass("active");
                //          if (_index ==1) {
                //             $('#pagebox').addClass('top');
                //          };
                //         $('#fp-nav').find('li').eq(4).hide();
                //     }
                // }); 
                $('body').on('click','#fp-nav li a',function(){
                    $('#pagebox').removeClass('top');
                    $('#pagebox').removeClass('bottom');
                });
            });
        });
    }
});