//=============================================================
// parameters:
// my-tweets  
//	shows your last 20 tweets and when they were created
// spotify-this-song <songname>
//    shows the following info
// 	  artist
//	  songs name
//	  preview a link of the song from spotify
// 	  album that the song is from
//    if no song provided default to "the sign" but Ace of Base

// movie-this <movie name>
// 	  * Title of the movie.
//	  * Year the movie came out.
//	  * IMDB Rating of the movie.
//	  * Rotten Tomatoes Rating of the movie.
//	  * Country where the movie was produced.
//	  * Language of the movie.
//	  * Plot of the movie.
//	  * Actors in the movie. 
//  if no movie provided default to Mr. Nobody
//
// do-what-it-says
//	Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//	It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
//	Feel free to change the text in that document to test out the feature for other commands.
//
//BONUS
//
//In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
//
//Make sure you append each command you run to the log.txt file.
//
//Do not overwrite your file each time you run a command.
//===============================================================
// API require declarations
// file system stuff


   var fs = require("fs");
   var deyt = Date();
   //console.log(deyt);
   //console.log("there are this much arguments:"+process.argv.length);
	// take the arguments 
	var action = process.argv[2];
	var value = process.argv[3];
	var com="";
	for (i=0; i < process.argv.length; i++){
		com= com+" "+process.argv[i];
		//console.log(process.argv[i]);
	}

// log this command
//fs.appendFile("log.txt", deyt + " "+ action + " " + value+"\n" , function(err, data){
	fs.appendFile("log.txt", deyt+" "+com+"\n" , function(err, data){
		if (err){
		   return console.log(err);
		};
});

//
// identify what the user commanded or specified in the argument
switch (action) {
	case "my-tweets":{
		mytweets();	
		break;
		}
	case "spotify-this-song":{
		spotifythis();
		break;
		}
	case "movie-this":{
		moviethis();
		break;
		}

	case "do-what-it-says":{
		dobonus();
		console.log(" ALL COMMANDS EXECUTED, SIR, MAM, MASTER!  ");
		console.log("===========================================");
		break;
		}
    case "bonus":{
		dobonus();
		console.log(" ALL COMMANDS EXECUTED, SIR, MAM, MASTER!  ");
		console.log("===========================================");
		break;
		}
}

// functions
//================================
// do-what-it-says bonus function
//================================
function dobonus()
{
	var fs = require('fs');
	var sys = require('util');
	var exec = require('child_process').exec;
	var child;
	// clears teh screen
	child = exec("clear", function (error, stdout, stderr) 
	{
	  	//console.log('stdout: ' + stdout);
	  	//console.log('stderr: ' + stderr);
	  	console.log(stdout);
	  	if (error !== null) {
	    	console.log('exec error: ' + error);
	  	}

	  	console.log("===========================================");
	  	console.log("  running commands from random.txt         ");
	  	console.log("===========================================");

	  	// read the file content of where the commands are coming from
	  	fs.readFile("random.txt", "utf8", function(err, data) 
			{
		          if (err) {
		          return console.log(err);
		          }

		       // Break down all the numbers inside
		       data = data.split("\n");
		       var result = "";
		       console.log(data);
			  	console.log("===========================================");
		      // Loop through random.txt file and run each line
		      // adding the node liri.js command up front
		      // then run the command on the command line
		       for (var i = 0; i < data.length; i++) 
		       {
			        //if (parseFloat(data[i])) {

					result="";
			        result = "node liri.js " +  (data[i]);
			      	//}
					console.log("executing this command: node liri.js "+data[i]);
			      	//console.log(result);
			      	child = exec(result, function (error, stdout, stderr) 
					{
					  	//console.log('stdout: ' + stdout);
					  	//console.log('stderr: ' + stderr);
					  	console.log(stdout);
					  	if (error !== null) {
					    	console.log('exec error: ' + error);
					  	}
					  });
				}
	  			console.log("===========================================");
			});
	});

};

//=========================
// mytweets function
//=========================
function mytweets(){
// twitter info
var Twitter = require("twitter");
var twitclient = require("./keys.js");
//console.log("this is exported "+twitclient)

twitclient.get('statuses/user_timeline', function(error, tweets, response) {
  if(error) throw error;
  //console.log(tweets);  // The favorites.
  //console.log(response);  // Raw response object.
  //console.log(JSON.stringify(response, null, 2));
   //console.log(response);
   //console.log(tweets.length);
   //console.log(typeof(tweets));
	console.log("===========================================");
	console.log("|                 MY TWEETS               |");
	console.log("===========================================");
   for (i=0;i<tweets.length;i++){
   	//console.log(tweets[i]);
   	console.log(tweets[i].created_at+" "+tweets[i].text);
   }
	console.log("===========================================");
   //var res=JSON.parse(tweets);
   //console.log(res.text[1]);
   
});


};
//=========================
// spotify function
//=========================
function spotifythis(){
	// get the song name
	if (process.argv.length > 3){
		songname="";
		for (i=3; i< process.argv.length; i++) {
			songname=songname+process.argv[i]+" ";
		}
	}else if (process.argv.length ===3){
		var songname = "The sign";
	} else

		{
		var songname = process.argv[3];
	}
    // end get the song name

    //print out the song name

	console.log("===========================================");
	console.log("|          SPOTIFY-THIS-SONG               |");
	console.log("===========================================");
	console.log("Song title: "+songname); 
	console.log("===========================================");

	// spotify connection keys

    var Spotify = require('node-spotify-api');
	var spotifyclient = require("./spotify.js");
	 
	spotifyclient.search({ type: 'track', query: songname }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	

	var songInfo = data.tracks.items;
        for (var i = 0; i < 5; i++) {
          if (songInfo[i] != undefined) {
            var spotifyResults =
            "Artist: " + songInfo[i].artists[0].name + "\r\n" +
            "Song: " + songInfo[i].name + "\r\n" +
            "Album: " + songInfo[i].album.name + "\r\n" +
            "Preview Url: " + songInfo[i].preview_url + "\r\n" +
            "=============== " + "Song " +(i+1) + " info =================" + "\r\n";
            console.log(spotifyResults);

         }
        }
	});

};
//=========================
// movie this function
//=========================
function moviethis(){
	var request = require('request');
	// Grab or assemble the movie name and store it in a variable called "movieName"
	// if movie name has spaces then create and append it to a string variable
	if (process.argv.length > 3){
		// if the movie name has multiple words concat into a var
		movieName="";
		for (i=3; i< process.argv.length; i++) {
			movieName=movieName+process.argv[i]+" ";
		}
	} else if(process.argv.length ===3){
		//if no movie has been passed
		movieName="Mr. Nobody";

	}else {
		var movieName = process.argv[3];
	}
	
	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


	request(queryUrl, function(error, response, body) {

	  // If the request was successful...
	  if (!error && response.statusCode === 200) {

	    // Then log the body from the site!
	    //console.log(body);
	  }

	var collection=JSON.parse(body);

	console.log("===========================================");
	console.log("|             MOVIE INFO                  |");
	console.log("===========================================");
	console.log("Title: "+collection.Title);
	console.log("===========================================");
	console.log("Year: "+collection.Year);
	console.log("IMDB Rating: "+collection.imdbRating);
	if(collection.Ratings[1]!==undefined){
	console.log("Rotten Tomatoes Rating: "+collection.Ratings[1].Value);
	}
	console.log("Country Produced: "+collection.Country);
	console.log("Language: "+collection.Language);
	console.log("Plot: "+collection.Plot);
	console.log("Actors: "+collection.Actors);
	console.log("===========================================");
	//console.log(collection);

});

};
//=========================
// do this bonus function
//=========================
function dothis(){};

