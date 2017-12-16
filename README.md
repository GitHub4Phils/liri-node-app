# liri-node-app

this is a node application which uses spotify, twitter and MDB APIs as a selection for the user to query.

the script takes in arguments and shows you the information upon that arguments

node liri.js [command] [argument]

list of possible commands:
1. my-tweets (shows the 20 most recent tweets)
1. movie-this [movie-name] (shows the info of that movie name)
1. spotify-this-song [song] (shows info for the song provided)
1. do-what-it-says

My tweets:

![my tweets](mytweets.png)


movie-this [title]

![movie this with title](movieThisTitle.png)

movie-this [ no title]

![movie this no title](movieThisNoTitle.png)


spotify-this [title]

![spotify this with title](spotifyWithTitle.png)

spotify-this [ no title]

![spotify this no title](spotifyNotitle.png)



Do what it says (random.txt)
random.txt shows the lines of codes that needed to be automatically executed

![randomfile](randomfile.png)

passing the "do-what-it-says" argument will execute what is in random.txt

![do what it says](dowhatitSays.png)


and it logs everytime the program has been run

![log file](logfile.png)
