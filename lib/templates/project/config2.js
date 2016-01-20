require.config({
    urlArgs:"rnd="+(new Date()).getTime(),
    paths:{
        'jquery':'../../lib/jquery/jquery.min',
        'bootstrap':'../../lib/bootstrap/js/bootstrap.min',
		'angular':'../../lib/angular/angular.min'
    },
    shim:{
        "angular":{
            exports:"angular"  // 因为angular不是amd标准 所以这里要导出
        },
        "angular-route":{
            deps:["angular"]
        },
        'bootstrap':{
            deps:['jquery']
        }	
    }
});
