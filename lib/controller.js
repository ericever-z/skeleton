var std = require("./std"),
    main  = require("./main")
    wizard = require("./wizard");
module.exports.decide = function(inf){
    var cmd = inf.cmd;
    var opts = inf.opts||[];
    switch(cmd){
        case "wizard":
        case "wiz":
            wizard.init(opts);
            break;
        case "temp":
        case "template":
            temp.init(opts);
            break;
        case "standard":
        case "std":
            std.init(opts);
            break;
    }
}

module.exports.plain = function(name){
    //创建一个 普通项目
    main.create({'name':name,'type':0});
}

module.exports.stand = function(name){
    //创建一个标砖项目
    main.create({'name':name,'type':1});   
}

module.exports.delete = function(){
    //删除一个项目
}
/***
**构建一个带框架的 普通项目或者标准项目
**/
module.exports.angular = function(cmd){
    if(cmd.plain){
        main.create({'name':cmd.angular,'type':0,'frame':"angular"});
    }else{
        main.create({'name':cmd.angular,'type':1,'frame':"angular"});        
    }
}