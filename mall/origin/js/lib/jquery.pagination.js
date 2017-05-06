jQuery.fn.pagination=function(A,B){B=jQuery.extend({items_per_page:10,num_display_entries:10,current_page:0,num_edge_entries:0,link_to:"#",prev_text:"Prev",next_text:"Next",ellipse_text:"...",prev_show_always:true,next_show_always:true,callback:function(){return false}},B||{});return this.each(function(){function F(){return Math.ceil(A/B.items_per_page)}function G(){var I=Math.ceil(B.num_display_entries/2);var J=F();var K=J-B.num_display_entries;var M=H>I?Math.max(Math.min(H-I,K),0):0;var L=H>I?Math.min(H+I,J):Math.min(B.num_display_entries,J);return[M,L]}function D(I,J){H=I;E();var K=B.callback(I,C);if(!K){if(J.stopPropagation){J.stopPropagation()}else{J.cancelBubble=true}}return K}function E(){C.empty();var K=G();var L=F();var I=function(P){return function(Q){return D(P,Q)}};var O=function(P,Q){P=P<0?0:(P<L?P:L-1);Q=jQuery.extend({text:P+1,classes:""},Q||{});if(P==H){var R=jQuery("<span class='current'>"+(Q.text)+"</span>")}else{var R=jQuery("<a>"+(Q.text)+"</a>").bind("click",I(P)).attr("href",B.link_to.replace(/__id__/,P))}if(Q.classes){R.addClass(Q.classes)}C.append(R)};if(B.prev_text&&(H>0||B.prev_show_always)){O(H-1,{text:B.prev_text,classes:"prev"})}if(K[0]>0&&B.num_edge_entries>0){var N=Math.min(B.num_edge_entries,K[0]);for(var J=0;J<N;J++){O(J)}if(B.num_edge_entries<K[0]&&B.ellipse_text){jQuery("<span>"+B.ellipse_text+"</span>").appendTo(C)}}for(var J=K[0];J<K[1];J++){O(J)}if(K[1]<L&&B.num_edge_entries>0){if(L-B.num_edge_entries>K[1]&&B.ellipse_text){jQuery("<span>"+B.ellipse_text+"</span>").appendTo(C)}var M=Math.max(L-B.num_edge_entries,K[1]);for(var J=M;J<L;J++){O(J)}}if(B.next_text&&(H<L-1||B.next_show_always)){O(H+1,{text:B.next_text,classes:"next"})}}var H=B.current_page;A=(!A||A<0)?1:A;B.items_per_page=(!B.items_per_page||B.items_per_page<0)?1:B.items_per_page;var C=jQuery(this);this.selectPage=function(I){D(I)};this.prevPage=function(){if(H>0){D(H-1);return true}else{return false}};this.nextPage=function(){if(H<F()-1){D(H+1);return true}else{return false}};E();B.callback(H,this)})};