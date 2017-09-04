require(['./config'],function(){
    require(['jquery','angular'],function($,angular){
        angular.module("app",[]);
		
		
		
		$(function(){
			angular.bootstrap(document,['app']);	
		});
		
    });
});
