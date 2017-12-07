var sys = require('util')
var exec = require('child_process').exec;
var child;

var com=["node liri.js my-tweets","node liri.js bonus"]
// executes `pwd`
for (i=0;i<com.length;i++){
child = exec(com[i], function (error, stdout, stderr) {
	  //console.log('stdout: ' + stdout);
	  //console.log('stderr: ' + stderr);
	  console.log(stdout);
	  if (error !== null) {
	    console.log('exec error: ' + error);
	  }
	});
}
