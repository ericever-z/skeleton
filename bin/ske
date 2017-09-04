#! /usr/bin/env node

var cmd    = require("commander"),
    pkg    = require("../package.json"),
    readline     = require("readline"),
	shell         = require("shelljs"),
	help         = require("../lib/help"),
	wizard        = require("../lib/wizard"),
	Project      = require('../lib/project');
	require("shelljs/global"),
    
    cmd
        .allowUnknownOption()
        .version(pkg.version)
        .usage("ske2 <project_name>,ske2 -c <project_name>")
        .description("A tool for create a javascript project")
        .option("-c,--custom <name>","a custom project")//默认是 standard工程
        .option("-a,--angular <name>","an angular based project")//angular 框架下的工程
        .option("-l,--list","lists templates")
        .option("-d,--delete <project_name>","delete project");
    
    cmd.on("--help",function(){
        console.log("   How to use:");
        console.log(new Array(20).join(" ") + "标准输入1：cmd options args");
        console.log(new Array(20).join(" ") + "标准输入2：cmd options");
        console.log(new Array(20).join(" "));
        console.log("   Sample: 创建一个hello_world工程");
        console.log(new Array(20).join(" ") + "ske hello_world");
        
    });


   
    cmd.parse(process.argv);     

  	
    //判断地址栏输入的参数，容过地址栏有输入参数，无参数显示 使用方法。
    if(cmd.rawArgs.length>2){
		if(cmd.angular){
			new Project(cmd.angular,"angular");//创建一个angular 项目
		}else if(cmd.custom){
			new wizard(cmd.custom);//创建一个用户自定义项目
		}else if(cmd.list){
			help.list(cmd.args[0]);  //打印项目目录结构
		}else if(cmd.delete){
			
		}else{
			var option = cmd.rawArgs[2];
			if(/^\-[a-z]/ig.test(option)){
				console.log("非法option ：" +option);
			}else if(cmd.args){
				if(cmd.args[0]=="wizard" || cmd.args[0]=="init"){
					new wizard();
				}else{
					console.log("--------------------------------------------------");
					new Project(cmd.args[0],"angular");////创建一个angular 项目
				}
			}
		}
		//console.log(cmd);
	}else{
		//console.log(cmd);
		//console.log( pwd().stdout);
		exec('ske2 --help');
	} 
