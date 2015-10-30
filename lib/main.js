/***
** skeleton 的kernel
**/
var fs = require("fs"),
    ph = require("./utils/physical"),
    paint = require("./utils/paint"),
    Project = require("./config/project"),
    color = require("colors"),
    kit = require("./utils/kit");



module.exports.create = function(info){
	var project = new Project(info);
	
    if(fs.existsSync(info.name)){//项目存在
        console.log();
        console.log((" ♨ 同名(" +info.name + ")项目已经存在于当前目录下,信息如下:").bgRed.white);
        paint.report(ph.readCofFile(info.name));
        process.exit(0);
        return;
    }
    
    console.log();
    console.log("即将为您创建以下"+((project.type==0)?"普通":"标准")+"项目");
    kit.splitLine();
    ph.carve(project);//创建项目 
    kit.splitLine();
    console.log("项目创建完毕， 下面会执行以下步骤：");
    console.log("☞ ① 在下面命令行处输入 cd " + project.name);
    console.log("☞ ② 运行命令 bower install && npm install && node skeleton.js");
    //process.chdir(project.name + "/");
    
//    var exec = require('child_process').exec;
//    exec("npm install & bower install",{cwd:project.name},function(err,stdout,stderr){
//        if(err){
//            console.log(err);
//        }else{
//            console.log(stdout);
//        }
//         console.log("☞ ① 项目初始化完毕，运行下面命令 cd " + project.name + "进入目标文件夹");
//    });
    
    process.exit(0);
}