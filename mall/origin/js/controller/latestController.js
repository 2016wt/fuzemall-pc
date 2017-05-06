define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/latest.css"],function(){
			console.log(param.id)
			official.getNewsArticleInfo({"article_id":param.id},function(data){
				if (data.code==200) {
					console.log(data);
					$('.latest_left').html($("#lastet_list").tmpl(data));
					$(".latest_bot").on("click","a",function(){
						location.hash = "#latest/"+$(this).data("crctid");
					});	
				};
			})
		});
	}
});