/***
真正意义上，创建文件夹，读取文件夹，写入，读取，更新文件夹的工作在这里处理
**/
function Concrate(){
   var fs = require("fs"),
    path   = require("path"),
    paint = require("./paint"),
	kit = require("./kit"),
	Project = require("../config/project");
    this.carve = function(project){
        mkdirSync(project.structure);
        this.setConFile(project);
        this.setPlainFile(project,{directory:'lib',json:"bower.json"});
        paint.draw(project.name);
    }
    /***
    ** 阻塞io创建文件夹
    **/
    function mkdirSync(pa,mode){
        if(pa instanceof Array){
            for(var i=0;i<pa.length;i++){
                if(i){
                    arguments.callee(pa[0] + pa[i]);
                }else{
                    arguments.callee(pa[i]);
                }   
            }

        }else{
            if(pa){
                fs.mkdirSync(path.normalize(pa));
            }        
        }
   }
   /**
   **设置配置文件
   **/
   this.setConFile = function(data){
       var pa = path.normalize(process.cwd() +"/" + data.name +  "/skeleton.json");
       fs.writeFileSync(pa,JSON.stringify(data,null,4));
   };
    /**
    **读取配置文件
    **name {String} 项目名称
    **return {Object} Json 对象
    **/
    this.readCofFile = function(name){
        var pa = path.normalize(process.cwd() +"/" + name +  "/skeleton.json");
        try{
            var data = fs.readFileSync(pa,{encoding:"utf8"});
        }catch(err){
           return {"name":name}; 
        }
        return JSON.parse(data);
    };
    
    function moduleJS(scdata,name,tag){
        var txt = scdata.replace(/module.service/i,function(){
           return "module."+tag;
        });
        var to = process.cwd()+"/"+ name + "/src/js/"+tag+"/module.js";
        fs.writeFileSync(to,txt);   
    };
    
    function jsonFile(scdata,key,data){
    
    };
    
    /***
    ** 重模板文件中读取相关文件，然后替换其中的变量
    ** 设置 GruntFile.js，读取模板文件写入
    ** 设置 gulpFile.js,  读取模板文件写入
    ** 设置 README.md  读取模板文件写入
    ** 设置 .bowerrc 读取模板文件写入
    **/
    this.setPlainFile = function(p){
		kit.writeJSON("package.json","package.json",function(json){
                json.name = p.name;
                json.version = p.version;
                json.author = p.author;
                json.description = p.description;
				return json;
		});
  		kit.copy("Gruntfile.js","Gruntfile.js");//默认拷贝到，生成项目 根目录
		kit.copy("bowerrc",".bowerrc");
		kit.copy("README.md","README.md",function(data){
				return data.replace(/{([a-z]+)}/ig,function(all,a){
					if(a=="name") return p[a];
					if(a=="description") return p[a];
				});			
		});
		kit.copy("project/index.js",tr("index.js",p));
		kit.copy("project/reset.css",tr("reset.css",p));
		kit.copy("project/module.css",tr("module.css",p));
		kit.copy("project/index.css",tr("index.css",p));
		kit.copy("project/demo.html","html/demo.html");
//		kit.copy("skeleton.js","skeleton.js");
        if(p.frame == "angular"){
            var url = path.join(__dirname, '..','templates',"module.js");
            var js = fs.readFileSync(url,{encoding:'utf8'});
            moduleJS(js,p.name,"controllers");
            moduleJS(js,p.name,"services");
            moduleJS(js,p.name,"filters");
            moduleJS(js,p.name,"directives");

        }

		kit.writeJSON("bower.json","bower.json",function(json){
//			json.dependencies.angular = "^1.*";
			json.name = p.name;
			json.version = p.version;
			json.author = p.author;
			json.description = p.description; 
			if(p.frame == "angular") json.dependencies.angular = "*";
			return json;
		});		
		kit.copy((p.frame == "angular")?"project/config2.js":"project/config.js",
				 tr("config.js",p));
		
		
//		kit.recurse(function(ps,subdir,filename){
//			var project = new Project();
//			var root = path.join(__dirname, '..','templates');
//			var rest = subdir.replace(/\/project\/core/i,"");
//			var filepath = subdir?path.normalize(root+"/"+subdir):root;
//			if(rest){
//				var to = path.normalize(process.cwd() +"/" + project.name + "/lib/"+rest);
//				if(!fs.existsSync(to)){
//					fs.mkdirSync(to);
//				}
//				if(filename!=".DS_Store"){
//					var data = fs.readFileSync(path.normalize(filepath+"/"+filename),{encoding:"utf8"});
//					fs.writeFileSync(path.normalize(to+"/"+filename),data,{encoding:"utf8"});
//				}
//			}
//		},"/project/core");
    }
    
    function tr(file,p){
        if(file=="config.js"){
            return (p.type=="1")?"src/js/config.js":"js/config.js";
        }else if(file == "reset.css"){
            return (p.type=="1")?"src/css/global/reset.css":"css/global/reset.css";
        }else if(file == "index.js"){
            return (p.type=="1")?"src/js/index.js":"js/index.js";
        }else if(file == "module.css"){
            return (p.type=="1")?"src/css/modules/"+file:"css/modules/"+file;
        }else if(file == "index.css"){
            return (p.type=="1")?"src/css/pages/"+file:"css/pages/"+file;
        }
    }
   
};

module.exports = new Concrate();

