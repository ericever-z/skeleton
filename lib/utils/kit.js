function Kit(){
    var self = this;
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
    
    this.listSkeleton = function(project){
        var len = project.structure.length;
        var tree = project.structure;
        for(var i=0;i<len;i++){
            if(i){
                console.log(self.space(2)+(i+1)+((i+1)<=9?self.space(1):self.space(-1))+self.space(5)+project.name + tree[i]);
            }else{
                console.log(self.space(2)+(i+1)+self.space(1)+self.space(5)+tree[i]);
            }
        }        
    }
    
    this.gruntplugins = function(str){
        return str.match(/\bgrunt-.*[a-z]+\b/ig);
    }
    
    this.gulpplugins = function(){
        return str.match(/\bgulp-.*[a-z]+\b/ig);
    }
};

module.exports = new Kit();