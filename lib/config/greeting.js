module.exports = function(){
    this.hello = function(){
        var pkg = require("../../package.json");
        console.log("         o‧°●　  ╔╦╗ ╔╦╗ ╔╦╗ ╔╦╗      o‧°●");
        console.log("    ‧°o‧°       Ⓢ Ⓚ Ⓔ Ⓛ Ⓔ Ⓣ Ⓞ Ⓝ  Ver:"+ pkg.version + "   °‧°o‧°‧°");
        console.log("         ‧°o‧°●  ╚╩╝ ╚╩╝ ╚╩╝ ╚╩╝ ○  o‧° o‧°");
        console.log("   █▀▀▀█  █ ▄▀  █▀▀▀  █     █▀▀▀ ▀▀█▀▀  █▀▀▀█  █▄  █"); 
        console.log("   ▀▀▀▄▄  █▀▄   █▀▀▀  █     █▀▀▀   █    █   █  █ █ █"); 
        console.log("   █▄▄▄█  █  █  █▄▄▄  █▄▄█  █▄▄▄   █    █▄▄▄█  █  ▀█"); 
        console.log("　");
        console.log("　　 ☆ ☆ ☆ ☆ ☆☆ ☆☆ ☆☆☆☆☆ ☆☆☆☆☆ ☆☆☆ ☆☆☆☆ ☆☆☆☆ ☆☆");
        console.log(""); 
    }
    return this;
}