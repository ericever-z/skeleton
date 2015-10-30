/***
* 项目的描述信息在这里存储，
**/

module.exports = function(o){    
    var fun = arguments.callee;
	
	if(fun._instance){
		return fun._instance;
	}
    var that = this;    
    this.name = o.name;
    this.type = o.type || this.type || 0;
    this.version = o.version || this.version || "1.0.0";
    this.author = o.author || this.author || process.env.USER;
    this.coworker = o.coworker || this.coworker;
    this.createtime = o.createtime || this.createtime;
    this.lastupdate = o.lastupdate || this.lastupdate;
    this.description = o.description || this.description;
    this.frame = o.frame || "unknow";
    if(this.type == 0){//plain
        var str = "/css#/css/global#/css/modules#/css/pages#/css/fonts#/js#/imgs#/html#/lib";
        if(o.frame=="angular") str +="#/js/controllers#/js/directives#/js/filters#/js/services";
    }else if(this.type == 1){//standard
        str = "/src#/src/css#/src/css/global#/src/css/modules#/src/css/pages#/src/js";
        str +="#/src/css/fonts#/html#/src/imgs#/lib#/test#/test/spec#/test/report";
        if(o.frame=="angular") str +="#/src/js/controllers#/src/js/directives#/src/js/filters#/src/js/services";
    }else{//custom  through wizard
        
    }  
    var arr = str.split("#");
    arr.unshift(this.name);
    this.structure = arr;
	fun._instance = this;
}