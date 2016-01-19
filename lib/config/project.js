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
	var std = ["/src","/src/css","/src/css/"];
    if(this.type == 0){//plain
        var str = "/css#/css/global#/css/modules#/css/pages#/css/fonts#/js#/imgs#/html#/lib";
		str += "#js/view/pages#/js/view/pages/pieces#/js/view/pages/pieces/segs";
		str +="#/js/view/pages/pieces/segs/combs";
		str +="#/js/core#/js/model#/js/utils";
        if(o.frame=="angular") str +="#/js/controllers#/js/directives#/js/filters#/js/services";
    }else if(this.type == 1){//standard
        str = "/src#/src/css#/src/css/global#/src/css/modules#/src/css/pages#/src/js";
        str +="#/src/css/fonts#/html#/src/imgs#/lib#/test#/test/spec#/test/report";
		str +="#/src/js/view#/src/js/kernel";
		str +="#/src/js/view/pages#/src/js/view/pages/pieces";
		str +="#/src/js/view/pages/pieces/segs";
		str +="#/src/js/view/pages/pieces/segs/combs";
		str +="#/src/js/model#/src/js/utils";
        if(o.frame=="angular")
			str+="#/src/js/controllers#/src/js/directives#/src/js/filters#/src/js/services";
    }else{//custom  through wizard
        
    }  
    var arr = str.split("#");
    arr.unshift(this.name);
    this.structure = arr;
	fun._instance = this;
}