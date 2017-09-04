var shell = require("shelljs");
var paint = require("./paint");
var fs = require("fs");
var path = require("path");
var wizard = require("./wizard");
var color = require("colors");
var kit = require("./kit");
var os = require("os");
require("shelljs/global");
module.exports = function (name,type,pack0){
	var name_pc = os.userInfo().username;
	var pack = require("../config/package.json");
	var cfg = require("../config/angular.json");
	var grunt_deps = require("../config/grunt-deps.json");
	var gulp_deps = require("../config/gulp-deps.json");
	var md = fs.readFileSync(path.resolve(__dirname + "/../config/README.md"),{encoding:"utf8"});
	var time = new Date();
	//项目的构造函数
	pack.name = name||"";
	pack.version = "1.0.0";
	pack.author = name_pc ||"";
	if(pack0) pack = pack0; 
	var ske = {
		name:pack.name,
		author:pack.author,
		create_time:time,
		structure:cfg,
		type:type
	};
	if(type=="angular"){
		pack.description = "(基于angular的js项目)an angular based javascript project"
		pack.devDependencies = grunt_deps;
	}else if(type == "custom"){
		pack.description = "用户自定义项目"	 
	}
	var md = md.replace(/\{\{project_name\}\}/im,ske.name);
	md = md.replace(/\{\{project_version\}\}/im,ske.version);
	md = md.replace(/\{\{project_create_time\}\}/im,ske.create_time);
	md = md.replace(/\{\{project_author\}\}/im,ske.author);
	md = md.replace(/\{\{[^{]+\}\}/im,"");
	//判断目录结构是否存在，不存在，创建目录结构，存在答应目录结构
	//创建目录结构，之后打印目录结构，并进入目录结构，执行脚本，安装依赖
	if (fs.existsSync(process.cwd() + "/" +name)) { //项目存在
		console.log();
		console.log((" ♨ 同名(" + name + ")项目已经存在于当前目录下,信息如下:").bgRed.white);
		paint.report(name);
		process.exit(0);
		return;
	}else{
		mkdir(name);//创建项目根目录
		//创建配置目录结构
		if(type != "custom"){
			create();
			//设置配置文件
			setFiles();
			//打印输出结果，告诉用户项目已经创建完成
			paint.draw(name);
			md = md.replace(/\{\{project_skeleton\}\}/im,global.ske);
			kit.setfile(name+"/README.md",md,1);
		}else{
			console.log("---------------------------------------------------------");
			create(require("../config/custom.json"));
			setFiles();
			//打印输出结果，告诉用户项目已经创建完成
			paint.draw(name);
			md = md.replace(/\{\{project_skeleton\}\}/im,global.ske);
			kit.setfile(name+"/README.md",md,1);			
		}
		console.log("------------------------------------------------------------");
		console.log("项目"+name + "创建完成,请处理下面两步，完成项目的配置:");
		console.log("进入项目所在的目录  "+("cd " + name).bgRed.white  );
		console.log("执行命令 " + ("npm install").bgRed.white +"  开发安装项目依赖");		
	}
	
	
	
	//拷贝，写入，更新破配置文件
	function setFiles(){
		kit.setfile(name+"/skeleton.json",ske);
		kit.setfile(name+"/package.json",pack);
		kit.setfile(name+"/README.md",md,1);
		var html = fs.readFileSync(path.resolve(__dirname + "/../config/index.html"),{encoding:"utf8"});
		html = html.replace("#title#",name);
		if(pack.devDependencies.grunt){
			cp(path.resolve(__dirname + "/../config/Gruntfile.js"),name+"/");
		}
		if(pack.devDependencies.gulp){
			cp(path.resolve(__dirname + "/../config/gulpfile.js"),name+"/");	 
		}
		if(pack.dependencies.requirejs){
			cp(path.resolve(__dirname + "/../config/config.js"),name+"/src/js/");
		}
		cp(path.resolve(__dirname + "/../config/reset.css"),name+"/src/css/global/");
		cp(path.resolve(__dirname + "/../config/index.css"),name+"/src/css/pages/");
		if(pack.dependencies.requirejs && pack.dependencies.angular){
			html = html.replace("#script#",'<script src="../node_modules/requirejs/require.js" data-main="../src/js/index"></script>');
			cp(path.resolve(__dirname + "/../config/index.js"),name+"/src/js/");			
		}else if(pack.dependencies.requirejs){
			html = html.replace("#script#","");
			html = html.replace(/\<link[^>]+\>$/igm,'');
			cp(path.resolve(__dirname + "/../config/main.js"),name+"/src/js/");
		}
		kit.setfile(name+"/html/index.html",html,1);
	}
	
	
	function create(node,last,paths){
		var paths = paths || [];
		var node = node || cfg;
		var last = last || name;
		var arr = Object.keys(node);
		for(var i=0;i<arr.length;i++){
			var the = node[arr[i]];
			var path = last + "/" + the.name;
			paths.push(path);
			mkdir(path);//创建这个目录文件夹
			if(the.children){
				arguments.callee(the.children,path);
			}
		}
		return paths;
	}
}
