define(function(){
	return function(templateUrl,param){
		$("#container").loadPage(templateUrl,["css/newMation.css"],function(){
			var pageSize = 6;
			official.getNewsList({"page_no":0,"page_size":pageSize},function(data){
					require(["http://cdn.fuzeuser.com/plugins/jquery.pagination/jquery.pagination.js"],function(){
						var initPagination = function() {
							// 创建分页
							$("#Pagination").pagination(data.total_page, {
								num_edge_entries: 1, //边缘页数
								num_display_entries: 4, //主体页数
								current_page: 0,
								link_to:'javascript:;',
								callback: PageCallback,
								items_per_page: 1, //每页显示1项
								prev_text:"上一页",
								next_text:"下一页"
							});
						}();

						function PageCallback(index, jq) {
							$('#mationbox').hide();
		                   	$('.newmation_loading').show();     
		                   official.getNewsList({"page_no":index,"page_size":pageSize},function(resp){
		                		if (resp.code==200) {
		                			$('.newmation_loading').hide();
		                   			$('#mationbox').show();
		                			$('#mationbox').html($("#official_list").tmpl({"data":resp.list}));
		                		};
		                	}); 
		                }
		                $("#mationbox").on("click",".newmation_tit,.newmation_readDetail,img",function(){
							location.hash = "#latest/"+$(this).data("id");    
						});  
		                
					});
			});
	
		});
	}
});