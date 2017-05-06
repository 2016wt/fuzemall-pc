define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/grid.css"],function(){
		var flag=true;
		 $('.vid,.controllbtn').click(function(){
		  	if(flag){
               $('#video').get(0).play();
               $('.controllbtn').hide();
		  		flag=false;
		  	}else{
               $('#video').get(0).pause();
		  	   $('.controllbtn').show();
		  	   flag=true;
		  	}
		  	
		  })
		  $(window).scroll(function(){
		  	var H=$('.specialPage-content').offset().top;
		  	//console.log($('.text-intro').height())
		  	
	         var active=Math.round(($(window).scrollTop()-H)/$('.content').height());
	         //console.log(active)
	       // $('.text-intro').removeClass('active');
	        $('.content:nth-of-type('+(active+1)+')').find('.text-intro').addClass('active');
		 })

           $(".content").on("mouseover","img",function(){
				$(this).css({
					"transform": "translate(-1%, 0)"
				});
			}).on("mouseout","img",function(){
				$(this).css({
					"transform": "translate(0, 0)"
				});
			});
			//赛事介绍
			$('.grid-btns li').click(function(){
				var index=$(this).index();
				$('.list li').eq(index).fadeIn(400).siblings().fadeOut(400);
				$(this).find('img').addClass('btnhover').parent().siblings().find('.btnhover').removeClass('btnhover');
				$(this).addClass('colo').siblings().removeClass('colo');
				//$(this).find('.mask').hide().parent().siblings().find('.mask').show();
				$(this).find('.unline').show().parent().siblings().find('.unline').hide();
			})
			var i=1;
			var len=$('.grid-btns ol li').length;
			
            // var parentdiv=$('.grid-btns').width();
            // $(".right").on('click',function(){
            // 	if(i==0){
            // 		$('.grid-btns ol').animate({marginLeft:"-366px"});
            // 	}else if(i==1){
            // 		return false;
            // 	}else{
            //         $('.grid-btns ol').animate({marginLeft:i*188+"px"});
            // 	}
            // 	i++;
            // })
            // $(".left").on('click',function(){
            // 	if(i==0){
            // 	    $('.grid-btns ol').animate({marginLeft:"0px"});
            // 	}else if(i==-1){
            // 		return false;
            // 	}
            // 	else{
            // 		$('.grid-btns ol').animate({marginLeft:i*188+"px"});
            // 	}
            // 	i--;
            // })
          
			////////////////////////////////////////////
			 function DY_scroll(prev,next,img,speed,or)
		    {
		        
		        var prev = $(prev);
		        var next = $(next);
		        var img = $(img).find('ol');
		        var w = img.find('li').outerWidth(true);
		        var s = speed;
		        console.log(w)
		        next.click(function()
		        {
		            img.animate({'margin-left':-w},function()
		            {
		                img.find('li').eq(0).appendTo(img);
		                img.css({'margin-left':'-188px'});
		            });
		            
		        });
		        prev.click(function()
		        {
		            img.find('li:last').prependTo(img);
		            img.css({'margin-left':-w});
		            img.animate({'margin-left':'-188px'});
		        });
		        
		    }
		    DY_scroll('.left','.right','.grid-btns');// true为自动播放，不加此参数或false就默认不自动

		});
	}
});
