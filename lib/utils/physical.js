/***
真正意义上，创建文件夹，读取文件夹，写入，读取，更新文件夹的工作在这里处理
**/
function Concrate(){
   var fs = require("fs"),
    path   = require("path"),
    paint = require("./paint");   
    
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
//                pa = path.normalize(pa);
                fs.mkdirSync(pa);
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
           return "module."+tag 
        });
        var to = process.cwd()+"/"+ name + "/js/"+tag+"/module.js";
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
        setFile(path.join(__dirname, '..', 'templates', 'package.json'),p);
        
        copy_template("Gruntfile.js",process.cwd() +"/" + p.name +"/Gruntfile.js");
        copy_template("bowerrc",process.cwd() +"/" + p.name +"/.bowerrc");
        copy_template("README.md",process.cwd() +"/" + p.name +"/README.md",p);
        copy_template("project/config.js",process.cwd()+"/"+p.name +tr("config.js",p));
        copy_template("project/index.js",process.cwd()+"/"+p.name +tr("index.js",p));
        copy_template("project/reset.css",process.cwd()+"/"+p.name +tr("reset.css",p));
        copy_template("project/module.css",process.cwd()+"/"+p.name +tr("module.css",p));
        copy_template("project/index.css",process.cwd()+"/"+p.name +tr("index.css",p));
        copy_template("project/temp.html",process.cwd()+"/"+p.name +"/html/temp.html");
        if(p.frame == "angular"){
            var url = path.join(__dirname, '..','templates',"module.js");
            var js = fs.readFileSync(url,'utf8');
            moduleJS(js,p.name,"controllers");
            moduleJS(js,p.name,"services");
            moduleJS(js,p.name,"filters");
            moduleJS(js,p.name,"directives");
            url = path.join(__dirname, '..', 'templates', 'bower.json');
            var json = JSON.parse(fs.readFileSync(url,'utf8'));
            json.dependencies.angular = "1.3.*";
            fs.writeFileSync(process.cwd()+"/"+p.name + "/bower.json",JSON.stringify(json,null,'\t'));
        }else{
            setFile(path.join(__dirname, '..', 'templates', 'bower.json'),p);
        }
    }
    
    function tr(file,p){
        if(file=="config.js"){
            return (p.type=="1")?"/src/js/config.js":"/js/config.js";
        }else if(file == "reset.css"){
            return (p.type=="1")?"/src/css/global/reset.css":"/css/global/reset.css";
        }else if(file == "index.js"){
            return (p.type=="1")?"/src/js/index.js":"/js/index.js";
        }else if(file == "module.css"){
            return (p.type=="1")?"/src/css/modules/"+file:"/css/modules/"+file;
        }else if(file == "index.css"){
            return (p.type=="1")?"/src/css/pages/"+file:"/css/pages/"+file;
        }
    }
    /**
    **写入文件
    **/
    function setFile(url,p){
        try{
            var arr = url.split("/");
            var filename = arr[arr.length-1];
            var type = filename.match(/.+\.([a-z]+)$/i)[1];
            var pa = path.normalize(process.cwd() +"/" + p.name +  "/" + filename);
                var pack = require(url);
                pack.name = p.name;
                pack.version = p.version;
                pack.author = p.author;
                pack.description = p.description;                
                fs.writeFileSync(pa,JSON.stringify(pack,null,4));//4
        }catch(err){ console.log(err);}
    }
    
    
    
    
    function copy_template(from, to,p){
        from = path.join(__dirname, '..', 'templates', from);
        var data = fs.readFileSync(from, 'utf8');
        if(from.indexOf("README")!=-1){
            data = data.replace(/{([a-z]+)}/ig,function(all,a){
                if(a=="name") return p[a];
                if(a=="description") return p[a];
            });
        }
        fs.writeFileSync(to,data);
    }
};

module.exports = new Concrate();

