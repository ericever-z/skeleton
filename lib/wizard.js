var readline = require("readline");
var path = require("path");
var os = require("os");
var project = require("./project");
var grunt_deps = require("../config/grunt-deps.json");
var gulp_deps = require("../config/gulp-deps.json");
module.exports = function(name){
	var pack = require("../config/pack.json");
	var na = name || 'project'+Date.now() || path.basename(process.cwd());
	var am = os.userInfo().username;
	var frameworks = [{name:'angular',ver:"1.6.5"},{name:'react',ver:"15.6.0"},{name:'vue',ver:"2.4.0"}];
	var modules = [{name:'requirejs',ver:'2.3.4'},{name:'seajs',ver:"3.0.2"}];
	var jquerys = ['1.9.*','2.2.4','3.2.1'];
	var boots = ['0.0.2','3.3.*','4.*']
	var tasks = [{name:"grunt",ver:'1.0.1'},{name:"gulp",ver:'3.9.1'}]
	var questions = [
		'project name ('+na+'): ',
		'version (1.0.0):',
		'author ('+am+'):',
		'project description:',
		'choose a framework(or not) : [1]angular [2]react [3]vue (set a number) ',
		'choose module/loader: [1]requirejs [2]seajs (set a number)',
		'jquery options: [1]jquery1.* [2]jquery2.* [3]jquery3.* (set a number)',
		"bootstrap options : [1]bootstrap2.* [2]bootstrap3.* [3]bootstrap4.* (set a number)",
		"choose a task runner: [1]grunt1.* [2]gulp3.9*"
	];
	var o = {};
	var rl = readline.createInterface({input: process.stdin,output: process.stdout});

		var stdin = process.openStdin(),i = 0,step=0;
	    if(name){pack.name = na; step=1;}
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
				if(/[01234567]/ig.test(step.toString())){
					if(step==0){
						pack.name = na;
					}else if(step==2){
						pack.author = am;
					}else if(step==1){
						pack.version =  "1.0.0";	 
					}
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
				if(step==0){
					pack.name =  global.project_name = line;
				}else if(step==2){
					pack.author = global.project_author = line;
				}else if(step==1){
					pack.version =  global.project_version = line;
				}else if(step==3){
					pack.description = line;	 
				}else if(step == 4){
					var the = frameworks[parseInt(line)-1];
					pack.dependencies[the.name] = the.ver; 
				}else if(step == 5){
					pack.dependencies[modules[parseInt(line)-1].name] = modules[parseInt(line)-1].ver;
				}else if(step == 6){
					pack.dependencies["jquery"] = jquerys[parseInt(line)-1];
				}else if(step== 7){
					pack.dependencies["bootstrap"] = boots[parseInt(line)-1];	
				}else{
					var name = tasks[parseInt(line)-1].name;
					if(name == "grunt"){
						Object.assign(pack.devDependencies,grunt_deps);
					}else {
						Object.assign(pack.devDependencies,gulp_deps);
					}
					pack.devDependencies[name] = tasks[parseInt(line)-1].ver;
				}
						 
				next();
			}
		});
	
	function next(){
		step++;	
		if(step>=questions.length){
			console.log("--------config complete-----------");
			console.log(JSON.stringify(pack,null,4));
			
			//开始构建项目
			project(pack.name,"custom",pack);
			process.exit(0);
		}else{
			rl.setPrompt(questions[step]);
			rl.prompt();
		}
	}
	
}
