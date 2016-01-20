require.config({
    urlArgs:"rnd="+(new Date()).getTime(),
    paths:{
        'jquery':'../../lib/jquery/jquery.min',
        'bootstrap':'../../lib/bootstrap/js/bootstrap.min'    
    },
    shim:{
        'bootstrap':{
            deps:['jquery']
        }
    }
});
