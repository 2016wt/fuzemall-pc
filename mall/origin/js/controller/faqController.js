define(function(){
	return function(templateUrl,param){
		$("#container").load(templateUrl,function(){
			var articleId = param.page;  //分类Id和文章Id
			Faq.getFaqList({"catgroup":1},function(data){
				data._articleId = articleId?articleId:data.list[0].cats[0].articles[0].article_id;

				if(!articleId){
					getFaqById(data._articleId);
					$.setTitle("常见问题-"+data.list[0].cats[0].articles[0].title);
				}
				$(".faq_left_wrap").html($("#faqListTemplate").tmpl(data));
				// $(".faq_li_t").on("click",function(){
				// 	$(this).toggleClass("shouqi").siblings(".faq_li_list").toggle();
				// });
				$(".faq_li_list li").on("click",function(){
					var _this = $(this);
					$.setTitle("常见问题-"+$.trim(_this.text()));
					Route.trigger = false;
					$.goPage("#faq/"+_this.data("id"));
					$(".faq_li_list li").removeClass("active");
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