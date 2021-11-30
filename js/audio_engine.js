
window.onload = function() { // Have to wait for page to load before running anything


    const FADELENGTH = 2000;
    const TIMEOUT = FADELENGTH + 50;






    // MUSIC ENGINE
    // crossfades between tracks and fades out when stopped
    


    // Initialize song objects and store them in the parent object
    var howlerObjectsHolder = {
        soft_piano: soft_piano = new Howl({
                src: ['../audio/demo/music/loop_soft_piano.ogg'],
                onplay: function() {
                    console.log("Fading in...");
                    // soft_piano.fade(0, 1, FADELENGTH);
                },
                volume: .6,
                loop: true
            }),
        town_outside: town_outside = new Howl({
                src: ['../audio/demo/music/loop_town_outside.ogg'],
                onplay: function() {
                    console.log("Fading in...");
                    // adventuring.fade(0, 1, FADELENGTH);
                },
                loop: true
            })
    }

    
    // Make a collection of all the buttons with the "music-button" class
    var musicButtons =  document.getElementsByClassName("music-button");
    var songIDs = Array; // Note: JavaScript Arrays are mutable
    var defaultSong;
    var currentSong = {
        obj_play: "",
        obj_fade: "",
        id_play: "",
        id_fade: "",
        song_playing: ""
    };
    var loading = false;
    var songIsPlaying = false;
    var songIsCrossfading = false;
    var noSongYet = true;

    var alert = document.createElement('div');
    alert.className = "alert alert-warning alert-dismissible fade show position-absolute shadow text-center top-0 left-50 mt-3 p-3";

    storeButtonSongs();
    setButtonSongs();

    // Store button IDs in array for later use
    function storeButtonSongs() {
        // Loop through both array and collection to read and store
        for (let i = 0; i < musicButtons.length; i++) {
            songIDs[i] = musicButtons.item(i).id.toString();
            // console.log("Storing " + songIDs[i]);
        }
    }

    // Generate onclick events for each button with class "music-button"
    function setButtonSongs() {
        for (let i = 0; i < musicButtons.length; i++) {
            musicButtons.item(i).addEventListener("click", function() {
                musicLogic(this.id); // e.g., onclick="musicLogic(pizza)"
            });
        }
    }

    
    /*** BEGIN PROPER MUSIC ENGINE ***/
    
    // Primary logic for playback
    function musicLogic(id) {

        // console.log("ID found: " + id);

        // Catching exception if no song is actually playing
        if (id == "killAll") {
            console.log("Killing everything.");
            Howler.stop();
        }

        else if (id == "stop" && noSongYet == true) {
            alert.innerHTML = "No songs are playing!";
            document.getElementById("full_page").append(alert);
            console.log("No songs are playing!");
            setTimeout(() => {
                alert.remove();
            }, TIMEOUT);
        }
        
        else if (loading == true && id != "stop") {
            alert.innerHTML = "Have patience, young padawan.";
            document.getElementById("full_page").append(alert);
            console.log("Please wait for song to finish loading.");
        }

        else if (loading == true && id == "stop") {
            alert.innerHTML = "Hold your horses there, bucko. We're working on it.";
            document.getElementById("full_page").append(alert);
            console.log("Please wait for song to finish loading.");
        }

        else if (id == "stop" && loading == false && noSongYet == false) {

            loading = true;
            console.log("Stopping music...");

            // Add spinner to clicked button
            var spinner = document.createElement('div');
            spinner.className = "spinner-border float-end";
            var currentButton = document.getElementById(id);
            currentButton.append(spinner);

            // Fade out audio
            currentSong.obj_play.fade(1, 0, FADELENGTH);
            // Remove song from playing
            currentSong.song_playing = "";

            setTimeout(() => {
                console.log("Done stopping.");
                currentSong.obj_play.stop(currentSong.id_play);
                spinner.remove();
                alert.remove();
                loading = false;
                noSongYet = true;
            }, TIMEOUT);

        }

        else if (id != "stop" && loading == false) {
            tryToPlay(howlerObjectsHolder[id], id);
            noSongYet = false;
        }


    }                            

    // Attempt to start playing song when triggered
    function tryToPlay(howlerObj, id) {

        if (id == currentSong.song_playing) {
            alert.innerHTML = "This song is already playing!";
            document.getElementById("full_page").append(alert);
            setTimeout(() => {
                alert.remove();
            }, TIMEOUT);
        }

        else {

            loading = true;

            // Add spinner to clicked button
            var spinner = document.createElement('div');
            spinner.className = "spinner-border float-end";
            var currentButton = document.getElementById(id);
            currentButton.append(spinner);
    
            // Start song and music mode if page is silent
            if (songIsPlaying == false) {
                console.log("Starting music...");
    
                // Store song instance ID and object to be passed
                currentSong.id_play = howlerObj.play();
                currentSong.obj_play = howlerObj;
                currentSong.song_playing = id;
                // currentSong.obj_play.fade(0, 1, FADELENGTH - 1);
    
                songIsPlaying = true;
            }
    
            // Crossfade between tracks if a song is playing already
            else {
    
                songIsCrossfading = true;
                crossFade(howlerObj, id);
                songIsCrossfading = false;
    
            }
    
            // Artificially wait to hide the loading spinner
            setTimeout(() => {
                console.log("Done loading.");
                spinner.remove();
                alert.remove();
                loading = false;
            }, TIMEOUT);

        }

    }
    
    // Fade out currently playing song
    function crossFade(howlerObj, id) {

        console.log("Crossfading...");

        currentSong.obj_fade = currentSong.obj_play;
        currentSong.id_fade = currentSong.id_play;
        currentSong.obj_play = howlerObj;
        currentSong.id_play = howlerObj.play();
        currentSong.song_playing = id;
        
        currentSong.obj_play.fade(0, 1, FADELENGTH);
        currentSong.obj_fade.fade(1, 0, FADELENGTH);
        
        // Wait until after fade to stop previous song
        setTimeout(() => {
            console.log("Done fading. Stopping previous song...");
            currentSong.obj_fade.pause(currentSong.id_fade);
        }, TIMEOUT);

        if (songIsCrossfading == true) {
            songIsPlaying = true;
        }
        else {
            songIsPlaying = false;
        }

    }




    

    // AMBIENCE ENGINE
    // used for fire crackling, forest sounds, rain, etc...

    var ambiencesHolder = {
        campfire: campfire = new Howl({
                src: ['../audio/demo/ambience/ambience_fire_crackling.wav'],
                onplay: function() {
                    console.log("Fading in...");
                    // campfire.fade(0, 1, FADELENGTH);
                },
                loop: true,
                volume: .5
            }),
        babbling_brook: babbling_brook = new Howl({
                src: ['../audio/demo/ambience/ambience_babbling_brook.wav'],
                onplay: function() {
                    console.log("Fading in...");
                    // babbling_brook.fade(0, 1, FADELENGTH);
                },
                loop: true,
                volume: .2
            }),
        daytime: daytime = new Howl({
                src: ['../audio/demo/ambience/ambience_forest_day.wav'],
                onplay: function() {
                    console.log("Fading in...");
                    // daytime.fade(0, 1, FADELENGTH);
                },
                loop: true,
                volume: .5
            }),
        nighttime: nighttime = new Howl({
                src: ['../audio/demo/ambience/ambience_forest_night.wav'],
                onplay: function() {
                    console.log("Fading in...");
                    // nighttime.fade(0, 1, FADELENGTH);
                },
                loop: true,
                volume: .5
            }),
        rain: rain = new Howl({
                src: ['../audio/demo/ambience/ambience_rain.wav'],
                onplay: function() {
                    console.log("Fading in...");
                    // rain.fade(0, 1, FADELENGTH);
                },
                loop: true,
                volume: .5
            })         
    }


    var ambienceButtons = document.getElementsByClassName("ambience-button");
    var ambienceButtonIDs = Array;

    var playingAmbiencesIndex = 0;
    var stopIndex = "";
    var playingAmbiencesButtonIDs = [""];
    var playingAmbiencesPlayIDs = [""];

    var clickedAmbienceIsPlaying = false;

    storeAmbiences();
    setAmbiences();


    function storeAmbiences() {
        for (let i = 0; i < ambienceButtons.length; i++) {
            ambienceButtonIDs[i] = ambienceButtons.item(i);
        }
    }

    function setAmbiences() {
        for (let i = 0; i < ambienceButtons.length; i++) {
            ambienceButtons.item(i).addEventListener("click", function() {
                ambienceLogic(this.id);
            });
        }
    }


    function ambienceLogic(ambienceID) {

        console.log("ID found: " + ambienceID);

        // Look through playingAmbiencesButtonIDs array to see if ID is listed
        for (let i = 0; i < playingAmbiencesButtonIDs.length; i++) {
            // console.log("Checking index " + i + " against " + playingAmbiencesButtonIDs[i]);
            if (ambienceID == playingAmbiencesButtonIDs[i]) {
                console.log(ambienceID + " is playing!");
                clickedAmbienceIsPlaying = true;
                stopIndex = i;
                break;
            }
        }
        
        if (clickedAmbienceIsPlaying == false) {
            // play clicked ambience
            // store button ID and play() ID in arrays
            console.log("Playing " + ambienceID);

            // console.log("playingAmbiencesButtonIDs [" + playingAmbiencesIndex + ", " + ambienceID + " ]");
            playingAmbiencesButtonIDs[playingAmbiencesIndex] = ambienceID;

            playingAmbiencesPlayIDs[playingAmbiencesIndex] = ambiencesHolder[ambienceID].play();
            ambiencesHolder[ambienceID].fade(0, 1, FADELENGTH);
            
            // console.log("Increasing index and lowering volume...");
            playingAmbiencesIndex++;
            Howler.volume(1 - (playingAmbiencesIndex / 10) * 1.2);
            console.log("Volume: " + Howler.volume());
        }

        else if (clickedAmbienceIsPlaying == true) {
            // TODO: fade clicked ambience
            // remove from array of playing ambiences
            // console.log("Searching for " + ambienceID);
            ambiencesHolder[ambienceID].stop(playingAmbiencesPlayIDs[stopIndex]);
            playingAmbiencesPlayIDs.splice(stopIndex, 1);
            playingAmbiencesButtonIDs.splice(stopIndex, 1);
            clickedAmbienceIsPlaying = false;
            playingAmbiencesIndex--;
            Howler.volume(1 - (playingAmbiencesIndex / 10) * 1.2);
            console.log("Volume: " + Howler.volume());
        }
        
    }

}