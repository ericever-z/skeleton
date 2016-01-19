/***
** skeleton 的kernel
**/
var fs = require("fs"),
    ph = require("./utils/physical"),
    paint = require("./utils/paint"),
    Project = require("./config/project"),
    color = require("colors"),
    kit = require("./utils/kit"),
	shell = require("shelljs");
	
	require('shelljs/global');//全局编写模式


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
	console.log("如果发现下载很慢可以使用镜像 npm install -g cnpm --registry=https://registry.npm.taobao.org");//指向taobao npm 镜像");
    console.log("☞ ① 进入项目文件夹： " + project.name);
	cd(project.name);
    console.log("☞ ② 执行命令 npm install &&  bower install构建项目 ....");
	shell.exec("bower install && npm install");
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