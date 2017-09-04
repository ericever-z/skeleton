var fs = require("fs");
var path   = require("path");
function Kit(){
    var self = this;
	function unixifyPath(filepath) {
	  if (path.win32) {
		return filepath.replace(/\\/g, '/');
	  } else {
		return filepath;
	  }
	};	
    this.space = function (){
        var n = arguments[0]||0
        return self.repeat(n," ");
    }
    
    this.repeat =function(n,symbol){
        if(n<-1) n=-1;
        return new Array(n+1).join(symbol);
    } 
    
    this.splitLine = function(){
        console.log(self.repeat(30,"..."));
    }

	
	/****
	** 文件copy  
	** 把源文件 copy 到 目标 地址，默认是 目标地址的 根目录
	**@{param} target  复制来源
	**@{param} des  目的
	**${prams} cb function data 元数据处理函数
	**/
	this.copy = function(target,des,cb){
		var project = new Project();
        var from = path.join(__dirname, '..', 'templates', target);//源
        var data = fs.readFileSync(from, 'utf8');//读取文件内容
		var to = process.cwd() +"/" + project.name + "/"+des;//复制到目的地的文件名
		if(cb&&typeof(cb) == "function") data = cb(data);
		fs.writeFileSync(to,data);
	};
	
	/**
	**@ jsonfile {String} 模板 json 文件
	**@ des {String} 写入到哪里，文件名是
	**/
	this.writeJSON = function(jsonfile,des,cb){
		var project = new Project();
		var from = path.join(__dirname, '..','templates',jsonfile);
		var json = JSON.parse(fs.readFileSync(from, 'utf8'));//读取文件内容,并把它变成 pojo 对象
		var to = process.cwd() +"/" + project.name + "/"+des;//复制到目的地的文件名
		if(cb&&typeof(cb)=="function") json = cb(json);//如果没有这一行 就是 copy 一个 json 文件
		fs.writeFileSync(to,JSON.stringify(json,null,4));//4 缩进，格式化
	};
	
	/***
	** 递归读取路径下的 文件，
	**/
	this.recurse = function recurse(callback, subdir) {
	  var abspath = subdir?path.join(__dirname, '..','templates',subdir) : path.join(__dirname, '..','templates');
	  fs.readdirSync(abspath).forEach(function(filename) {  
		var filepath = path.join(abspath, filename);
		if (fs.statSync(filepath).isDirectory()) {
		  recurse(callback, unixifyPath(path.join(subdir || '', filename || '')));
		} else {
		  	callback(unixifyPath(filepath),subdir, filename);
		}
	  });
	};
	
	/***
	** 写入文件， 如果文件夹不存在，创建文件夹
	**/
	this.write = function(filepath, contents, options) {
		var ps = path.dirname(filepath);//路径，除了最后一个 前面的路径地址
		try{
			var stats = fs.statSync(ps);
		}catch(err){
			fs.mkdirSync(ps);
		}
		fs.writeFileSync(filepath,contents,{encoding:'utf8'});
	};
	
	this.setfile = function(file,data){
		try{
			if(arguments[2]){
				fs.writeFileSync(file,data,{"encoding":"utf8"});
			}else{
				fs.writeFileSync(file,JSON.stringify(data,null,4),{"encoding":"utf8"});
			}
			
		}catch(err){
			console.log(err);
		}
	}
	
};

module.exports = new Kit();
