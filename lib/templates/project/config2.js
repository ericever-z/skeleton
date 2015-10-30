require.config({
    urlArgs:"rnd="+(new Date()).getTime(),
    paths:{
        'jquery':'../../lib/jquery1.9/jquery.min',
        'bootstrap':'../../lib/bootstrap3/js/bootstrap.min',
        'select2':'../../lib/select2V4/js/select2',
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
        },
        'select2':{
            deps:['jquery']
        }		
    }
});
