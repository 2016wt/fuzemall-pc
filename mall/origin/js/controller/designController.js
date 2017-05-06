define(function(){
     return function(templateUrl,param){
        require(["http://cdn.fuzeuser.com/plugins/fullpage/jquery.fullpage.js","http://cdn.fuzeuser.com/plugins/jquery-ui.1.9.1.min.js","http://cdn.fuzeuser.com/scrollify/jquery.easing.1.3.js","http://cdn.fuzeuser.com/scrollify/scrollif.min.js"],function(){
             $("#container").loadPage(templateUrl,["css/design.css"],function(){

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
                ////////////////////////////////////////
                $(function() {

                    $(window).resize(function(){
                    // $(".section").css({"height":$(window).height()});
                    $("#header1").css("height","80px"); 
                    $("#footer1").css("height","354px");  
                    //    $.scrollify({
                    //     section:".section"
                    // });
                    })
                    $(".section").css({"height":$(window).height()});
                    $("#header1").css("height","80px"); 
                    $("#footer1").css("height","354px");  
                 
                    // $.scrollify({
                    //     section:".section"
                    // });

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
                    // $("#fp-nav li").click(function(e) {
                    //     $.scrollify("move",$(this).find("a").attr("href"));
                    //      $("#fp-nav li a").removeClass("active");
                    //      $(this).find("a").addClass("active");
                    // });
                });
                
                //  $('body').on('click','#fp-nav li a',function(){
                //     $('#pagebox').removeClass('top');
                //     $('#pagebox').removeClass('bottom');
                // });
            }); 
        });
    }
});
