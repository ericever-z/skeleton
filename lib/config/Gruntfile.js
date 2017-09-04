module.exports=function (grunt) {
	'use strict';

	var me = this;
    var fs = require("fs");
    var pkg = grunt.file.readJSON('package.json');
    var ske = grunt.file.readJSON('skeleton.json')||{type:"1"};
    var modules = [];
    try{
        var path = "src/js";
        var arr = fs.readdirSync(path);
        for(var i=0;i<arr.length;i++){
            var r = arr[i].match(/^([a-z]+)\.js$/i);
            if(r && r[1]!="config") modules.push({'name':r[1]});
        }
    }catch(err){}
    
    var cfg = (function(){
        var o = {requirejs:{},clean:{},cssmin:{},copy:{}};//,watch:{}
        o.requirejs.compile={
            options : {
                baseUrl: ".",
                appDir : 'src/js',
                dir : './dist/js',
                optimize : 'uglify2',
                generateSourceMaps: true,//是否生成source map
                mainConfigFile : 'src/js/config.js',
                logLevel : 0,
                modules  : modules,
                findNestedDependencies: true,
                fileExclusionRegExp: /^\./,
                inlineText: true,
                preserveLicenseComments: false
            }            
        };
        o.clean.js = {src : ['dist/js/*/','dist/js/config.*','dist/js/*.txt','dist/css/pages/']};
        o.cssmin.build={
            expand: true,
            cwd: 'src/css/',
            src : ['pages/*.css'],
            dest : 'dist/css'
		};
        o.copy.main = {
            files:[
            {expand: true, 
             src: ['src/css/fonts/*.*','lib/bootstrap/dist/fonts/*.*'],
             dest: 'dist/css/fonts/',
             flatten: true,
             filter: 'isFile'
            },      
            {//图片
                expand: true,
                cwd: 'src/imgs/',
                src: '**',
                dest: 'dist/imgs/',
                flatten: true,
                filter: 'isFile'              
              }]
        };
        return o;
    }());
	grunt.initConfig(cfg);
    var gs = JSON.stringify(pkg).match(/grunt-[a-z]+(-[a-z]+)?/ig);
        gs.forEach(function(item){grunt.loadNpmTasks(item);})
	grunt.registerTask('build', Object.keys(cfg));
	grunt.registerTask('default', ['build']);
};
