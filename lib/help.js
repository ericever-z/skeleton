var path = require("path");
var fs = require("fs");
var paint = require("./paint");
module.exports = {
	list:function(filename){
		if(filename){
			var url = path.resolve(process.cwd() + "/"+filename);
			if(fs.existsSync(url)){
				console.log();
				paint.report(filename);
				process.exit(0);			
			}else{
				console.log(url + "\n" + "上述路径下未找到相关项目");
			 }
		}else{
			console.log("未输入项目名称");
		}
	}
}
