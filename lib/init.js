var readline = require("readline");
var path = require("path");
var os = require("os");
require("shelljs/global");
module.exports = function(){
	var pack = require("../config/pack.json");
	var project = path.basename(process.cwd());
	var am = os.userInfo().username;
	var frameworks = ['angular','react','vue','backbone'];
	var modules = ['requirejs','seajs','commonjs'];
	var jquerys = ['1.9.*','2.11.*','3.2.1'];
	var boots = ['2.1.*','3.*','4.*']
	var questions = [
		'which framework : [1]angular [2]react [3]vue [4]backbone (set a number) ',
		'which module/loader: [1]requirejs [2]seajs [3]commonjs (set a number)',
		'jquery options: [1]jquery1.* [2]jquery2.* [3]jquery3.* (set a number)',
		"bootstrap options : [1]bootstrap2.* [2]bootstrap3.* [3]bootstrap4.* (set a number)"
	];
	var o = {};
	var rl = readline.createInterface({input: process.stdin,output: process.stdout});

		var stdin = process.openStdin(),i = 0,step=0;
		process.stdin.on("data", function(char) {
			char = char + "";
			switch (char) {
				case "\n":
				case "\r":
				case "\u0004":
					//stdin.pause();
					break;
				default:
					//process.stdout.write("\033[2K\033[200D"+ str +"["+((i%2==1)?"=-":"-=")+"]");
					i++;
					break;
			}
		});

		rl.setPrompt(questions[step]);
		rl.prompt();
		rl.on('line',function(line){
			if(!line.trim()){
				if(/[0123]/ig.test(step.toString())){
					o.framework = null;
					o.jquery = null;
					o.bootstrap = null;
					o.loader = null;
					next();
				}else{
					str = 'you just typed nothing,try again : '
					rl.setPrompt(str);
					rl.prompt();
					return;  
				}
			}else{
				if(step == 0){
					o.framework = frameworks[parseInt(line)-1];		 
				}else if(step == 1){
					o.loader = modules[parseInt(line)-1];	
				}else if(step == 2){
					o.jquery = modules[parseInt(line)-1];			 
				}else{
					o.bootstrap = boots[parseInt(line)-1];	
				}
						 
				next();
			}
		});
	
	function next(){
		step++;	
		if(step>=questions.length){
			shell.exec("npm init");
		}else{
			rl.setPrompt(questions[step]);
			rl.prompt();
		}
	}
	
}
