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
    /***
    **path {String} 目录名  hello/fol1/sub1
    **depth {Integer} 底基层的目录名
    **index {Integer} 这一层的第几个 
    **arr {} 这一层的所有目录数组  【"lib","src"】
    **/
    function stroke(pat){//
        pat = path.normalize(pat);
        var arr = pat.split("/");
        var len = arr.length;//第几层的菜单
        var name = arr[len-1];//目录名  
        var depth = len-1;
        if(depth>0){
            var str = "  ";
            for(var i=0;i<depth;i++){
                str += space(i==0?0:4) + "┊";
            }
            str +="﹍﹎" + arr[depth];
        }else{
            str = space(2)+ name;
        }
		if(pat.length>35) pat = pat.substring(0,33) + "..."
        console.log((++index<10?"  "+index:(index<100?" "+index:index)) + "│" +  space(2) + pat + space(40-pat.length) + str);
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
    this.report = function(o){
        console.log();
        console.log(" ✦ 项目名称:" + o.name);
        console.log(" ✦ 类型:" + (o.type==1?"标准(Standard)":(o.type==0)?"普通(Plain)":"unknow"));
        console.log(" ✦ 版本:" + o.version||"0.0.1");
        console.log(" ✦ 作者:" + o.author||"unknow"); 
        console.log(" ✦ 项目结构如下:");
        kit.splitLine();
        self.draw(o.name);
        kit.splitLine();
        console.log();
    };
}

module.exports = new Paint();