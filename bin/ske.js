#! /usr/bin/env node

var cmd    = require("commander"),
    pkg    = require("../package.json"),
    readline     = require("readline")
    ctrl = require("../lib/controller")
    greeting = require("../lib/config/greeting");
    
    cmd
        .allowUnknownOption()
        .version(pkg.version)
        .usage("<dir>,ske -w,ske -c")
        .description("a tool for create a skeleton")
        .option("-p,--plain <name>","plain project name")
        .option("-s,--standard <name>","standard project name")//默认是 standard工程
        .option("-a,--angular <name>","angular project name")//angular 框架下的工程
        .option("-l,--list","lists templates")
        .option("-d,--delete <project_name>","delete project");
    
    cmd.on("--help",function(){
        console.log("   How to use:");
        console.log(new Array(20).join(" ") + "标准输入1：cmd options args");
        console.log(new Array(20).join(" ") + "标准输入2：cmd options");
        console.log(new Array(20).join(" ") + "标准输入3：cmd subcmd");
        console.log(new Array(20).join(" "));
        console.log("   Sample1:创建一个普通工程如下");
        console.log(new Array(20).join(" ") + "ske -p hello_world");
        
    })
    /**create project step by step
        you need answer a few questions for helping customize your project
    **/
    cmd.command("wizard")
       .alias("wiz")
       .alias("custom")
       .description("through wizard to create a project");  
    
    //create a empty standard project ---------------------  
    cmd.command("standard")//sub command name
       .alias("std") // sub command shot name
       .description("create a standard project")  //sub command description
       .option("-p,--pname","project name");

    
    //use template create a project------------------
    cmd.command("template")
        .alias("temp")
       .description("choose a project template start a project");
       
    //subcommand help---------------------
    cmd.command("help")
       .description("子命令的帮助菜单")




   
    cmd.parse(process.argv);     

    if(/^-./i.test(process.argv[2])){//如果是option
        if(cmd.list){//显示项目模板
            console.log("show list");
        }
        if(cmd.angular){
            ctrl.angular(cmd.angular);
        }else if(cmd.plain){//创建普通项目
            ctrl.plain(cmd.plain);
        }else if(cmd.standard){//创建标准项目
            ctrl.stand(cmd.standard);
        }else if(cmd.delete){//删除项目
            ctrl.delete(cmd.delete);    
        }
     
    }else if(cmd.args.length){//没有options
        var subs = ["standard","std","wiz","wizard","custom","template","temp"];
        var arg1 = cmd.args[0];//忽略后面的其他参数
        var opts = process.argv.splice(3);
        if(subs.indexOf(arg1)!=-1){//子命令
            ctrl.decide({cmd:arg1,opts:opts});
        }else{
            ctrl.stand(cmd.args[0]);
        }
    }else{//没有任何参数
        greeting().hello();// 显示欢迎界面
        cmd.help();
    }

    