define(function(){
	return function(templateUrl,param){
		$("#container").load(templateUrl,function(){
			var articleId = param.page;  //分类Id和文章Id
			var newdata={};
			Faq.getFaqList({"catgroup":2},function(data){
				data._articleId = articleId?articleId:data.list[0].cats[0].articles[0].article_id;
				if(!articleId){
					getFaqById(67);
					$.setTitle("家长监护工程-"+data.list[0].cats[0].cat_name);
				}			    
				$(".faq_left_wrap").html($("#faqListTemplate").tmpl(data));
				// $(".faq_li_t").on("click",function(){
				// 	$(this).toggleClass("shouqi").siblings(".faq_li_list").toggle();
				// });
                if(!articleId){
					$(".faq_li_t").eq(0).addClass("active");
					$(".faq_li_list li").removeClass("active");
				}
				$(".faq_li_list li").on("click",function(){
					var _this = $(this);
					$.setTitle("家长监护工程-"+$.trim(_this.text()));
					Route.trigger = false;
					$.goPage("#parentsCare/"+_this.data("id"));
					$(".faq_ul li").removeClass("active");
					$(".faq_li_t").removeClass("active");
					_this.addClass("active");
					getFaqById(_this.data("id"));
				});
				$(".faq_li_t").on("click",function(){
					var _this = $(this);
					$.setTitle("家长监护工程-"+$.trim(_this.text()));
					Route.trigger = false;
					$.goPage("#parentsCare/"+_this.data("id"));
					$(".faq_ul li").removeClass("active");
					$(".faq_li_t").removeClass("active");
					_this.addClass("active");
					getFaqById(_this.data("id"));
				});
			}); 

			function getFaqById(id){
				Faq.getFaqById({"id":id},function(data){
					if(data.code==200){
						$("#center_right").html($("#faqTemplate").tmpl(data));
					}else{
						$.go404();
					}
				});
			}

			articleId && getFaqById(articleId);
		});
	}
});