var fs = require("fs");	
var gruntjs = fs.readFileSync(__dirname + "/grunt.js",{encoding:"utf8"});
	fs.unlinkSync(__dirname + "/node_modules/grunt/lib/grunt.js");
	fs.writeFileSync(__dirname + "/node_modules/grunt/lib/grunt.js",gruntjs);
fs.unlinkSync(__dirname + "/grunt.js");
fs.unlinkSync(__dirname + "/skeleton.js");