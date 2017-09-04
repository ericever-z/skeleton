/***
** 可视化展现项目信息
**/

function Paint(){
    var fs = require("fs"),
        path = require("path"),
        color = require("colors"),
        kit = require("./kit");
    var self = this;
    var space = kit.space;
    var uplayer = {};
    var index = 0;
	global.ske = "";
    /***
    **path {String} 目录名  hello/fol1/sub1
    **depth {Integer} 底基层的目录名
    **index {Integer} 这一层的第几个 
    **arr {} 这一层的所有目录数组  【"lib","src"】
    **/
    function stroke(pat){//
        pat = path.normalize(pat);
        var arr = pat.split("\\");
        var len = arr.length;//第几层的菜单
        var name = arr[len-1];//目录名  
        var depth = len-1;
        if(depth>0){
            var str = "  ";
            for(var i=0;i<depth;i++){
                str += space(i==0?0:4) + "┊";
            }
            //str +="﹍﹎" + arr[depth];
			str +="┈┈" + arr[depth];
        }else{
            str = space(2)+ name;
        }
		if(pat.length>38) pat = pat.substring(0,33) + "...";
        console.log((++index<10?"  "+index:(index<100?" "+index:index)) + "│" +  space(2) + pat + space(40-pat.length) + str);
		global.ske +=str+"\n";
    };

    /***
    **name {String} 项目名
    **pa {String}  父目录名
    **/
    this.draw = function(name,pa){
        var arr = arguments[3]||1;    
        if(pa){
            var pat = pa + "/" +  name;
        }else{
            pat = name;
        }
        stroke(path.normalize(pat));
        var sta = fs.lstatSync(String(pat));
        if(pat.match(/^.+\/+lib|node_modules\/|.git\//) && pat.split("/").length>=3) return;
         if(sta.isDirectory()){
            var nextLayer = fs.readdirSync(pat);
             for(var j=0;j<nextLayer.length;j++){
                arguments.callee(nextLayer[j],pat,j);
             }
         }
    };
    
    /**
    *项目信息报表
    */
    this.report = function(name){
		try{
			var cfg = require(process.cwd()+"/"+name+"/package.json");
			var ske = require(process.cwd()+"/"+name+"/skeleton.json");
			var stat = fs.statSync(process.cwd()+"/"+name+"/skeleton.json")
		}catch(err){
			console.log(err);
		}
        console.log();
        console.log(" ✦ project name:" + name);
        console.log(" ✦ type:" + (ske && ske.type)||"unknow");
        console.log(" ✦ version:" + (cfg && cfg.version)||"1.0.0");
        console.log(" ✦ author:" + (cfg && cfg.author)||"unknow"); 
        console.log(" ✦ create time:" + ske.create_time || stat.ctime);
        kit.splitLine();
        self.draw(name);
        kit.splitLine();
        console.log();
    };
}

module.exports = new Paint();
