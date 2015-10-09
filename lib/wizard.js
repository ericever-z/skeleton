/***
    @author ericever
    @last update 2015-7-1
    wizard mode
**/
var fs = require("fs"),
    readline = require("readline");     
var rl = readline.createInterface(process.stdin,process.stdout);
var ques = ["project name:","need a module split framework, likerquirejs or seajs(n/y):","requirejs or seajs(r/s):"];
function queprocess(index){
    var the = arguments.callee;
    var index = index || 0;
    rl.question(ques[index],function(an){
        console.log("你的回答是:" + an);
        if(an){
            if(index<ques.length-1){
                the(++index);
            }else{
                //回答完毕
                rl.close();
            }
        }else{
            console.log("empty project name is not allowed!");
            the(index);
        }
    });
}

exports.init = function(){
    queprocess();
}