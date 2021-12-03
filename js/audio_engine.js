
window.onload = function() { // Have to wait for page to load before running anything


    const FADELENGTH = 2000;
    const TIMEOUT = FADELENGTH + 50;
    var AMBIENCE_VOLUME = .15;






    // MUSIC ENGINE
    // crossfades between tracks and fades out when stopped
    


    // Initialize song objects and store them in the parent object
    var howlerObjectsHolder = {
        soft_piano: soft_piano = new Howl({
            src: ['../audio/demo/music/loop_soft_piano.wav'],
            onplay: function() {
                // console.log("Fading in...");
            },
            volume: 1,
            loop: true
        }),
        town_outside: town_outside = new Howl({
            src: ['../audio/demo/music/loop_town_outside.wav'],
            onplay: function() {
                // console.log("Fading in...");
            },
            volume: 1,
            loop: true
        }),
        soft_harp: soft_harp = new Howl({
            src: ['../audio/demo/music/loop_soft_harp.wav'],
            onplay: function() {
                // console.log("Fading in...");
            },
            volume: 1,
            loop: true
        })
    }

    
    // Make a collection of all the buttons with the "music-button" class
    var musicButtons =  document.getElementsByClassName("music-button");
    var songIDs = Array; // Note: JavaScript Arrays are mutable
    var currentSong = {
        obj_play: "",
        obj_fade: "",
        id_play: "",
        id_fade: "",
        button_playing: ""
    };
    var loading = false;
    var songIsPlaying = false;
    var songIsCrossfading = false;
    var noSongYet = true;

    var alert = document.createElement('div');
    alert.className = "alert alert-warning alert-dismissible fade show position-absolute shadow text-center top-0 left-50 mt-3 p-3";
    var play_icon = document.createElement('img');
    play_icon.src = '../img/audio-spectrum-svgrepo-com.svg';
    play_icon.classList = "play-icon float-end m-0 p-0";

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

            setTimeout(() => {

                console.log("Done stopping.");
                currentSong.obj_play.stop(currentSong.id_play);
                spinner.remove();
                alert.remove();
                play_icon.remove();

                // Clear currentSong object
                currentSong.obj_play = "";
                currentSong.id_play = "";
                currentSong.obj_fade = "";
                currentSong.id_fade = "";
                currentSong.button_playing = "";

                
                loading = false;
                noSongYet = true;
                songIsPlaying = false;

            }, TIMEOUT);

        }

        else if (id != "stop" && loading == false) {
            tryToPlay(howlerObjectsHolder[id], id);
            noSongYet = false;
        }


    }                            

    // Attempt to start playing song when triggered
    function tryToPlay(howlerObj, id) {

        if (id == currentSong.button_playing) {
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
                currentSong.button_playing = id;
                console.log("Current song: " + id);
                currentSong.obj_play.fade(0, 1, 20);
    
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
                // Add audio icon to button
                currentButton.append(play_icon);
            }, TIMEOUT);

            songIsPlaying = true;

        }

    }
    
    // Fade out currently playing song
    function crossFade(howlerObj, id) {

        console.log("Crossfading...");

        currentSong.obj_fade = currentSong.obj_play;
        currentSong.id_fade = currentSong.id_play;
        currentSong.obj_play = howlerObj;
        currentSong.id_play = howlerObj.play();
        currentSong.button_playing = id;
        console.log("Current song: " + id);
        
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

        // THE TOWN


        // THE WOODS
        daytime: daytime = new Howl({
            src: ['../audio/demo/ambience/ambience_forest_day.wav'],
            onplay: function() {
                // console.log("Fading in...");
            },
            loop: true
        }),
        nighttime: nighttime = new Howl({
            src: ['../audio/demo/ambience/ambience_forest_night.wav'],
            onplay: function() {
                // console.log("Fading in...");
            },
            loop: true
        }),
        campfire: campfire = new Howl({
            src: ['../audio/demo/ambience/ambience_fire_crackling.wav'],
            onplay: function() {
                // console.log("Fading in...");
            },
            loop: true
        }),
        rain: rain = new Howl({
            src: ['../audio/demo/ambience/ambience_rain.wav'],
            onplay: function() {
                // console.log("Fading in...");
            },
            loop: true
        }),


        // THE WATER
        babbling_brook: babbling_brook = new Howl({
            src: ['../audio/demo/ambience/ambience_babbling_brook.wav'],
            onplay: function() {
                // console.log("Fading in...");
            },
            loop: true
        }),
        ocean_shore: ocean_shore = new Howl({
            src: ['../audio/demo/ambience/ambience_ocean_shore.wav'],
            onplay: function() {
                // console.log("Fading in...");
            },
            loop: true
        }),
        waterfall: waterfall = new Howl({
            src: ['../audio/demo/ambience/ambience_waterfall.wav'],
            onplay: function() {
                // console.log("Fading in...");
            },
            loop: true
        }),
        boat_rocking: boat_rocking = new Howl({
            src: ['../audio/demo/ambience/ambience_boat_rocking.wav'],
            onplay: function() {
                // console.log("Fading in...");
            },
            loop: true
        })
            

        // THE CAVE


        // THE MONSTERS

        
        
    }


    var ambienceButtons = document.getElementsByClassName("ambience-button");
    var ambienceButtonIDs = Array;

    var playingAmbiencesIndex = 0;
    var stopIndex = "";
    var playingAmbiencesButtonIDs = [""];
    var playingAmbiencesPlayIDs = [""];
    var ambienceGroup = "";
    var ambienceClassName = "";

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
                ambienceLogic(this.id, this.className);
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
        
        // TURN AMBIENCE ON
        if (clickedAmbienceIsPlaying == false) {

            // play clicked ambience
            // store button ID and play() ID in arrays
            // console.log("Playing " + ambienceID);

            // Add icon to accordion group if nothing is playing
            if (isAmbienceGroupPlaying(ambienceID) == false) {
                console.log("Adding play icon to " + ambienceClassName);
                // This is silly but it works /shrug
                document.getElementById(ambienceClassName)
                    .previousElementSibling.firstElementChild.firstElementChild
                    .nextElementSibling.className
                    = "play-icon position-absolute float-end me-3 m-0 p-0 d-block";
            }

            // console.log("playingAmbiencesButtonIDs [" + playingAmbiencesIndex + ", " + ambienceID + " ]");
            playingAmbiencesButtonIDs[playingAmbiencesIndex] = ambienceID;

            playingAmbiencesPlayIDs[playingAmbiencesIndex] = ambiencesHolder[ambienceID].play();
            ambiencesHolder[ambienceID].fade(0, AMBIENCE_VOLUME, FADELENGTH);
            
            // console.log("Increasing index and lowering volume...");
            playingAmbiencesIndex++;
            Howler.volume(1 - (playingAmbiencesIndex / 10));
            // console.log("Volume: " + Howler.volume());

        }

        // TURN AMBIENCE OFF
        else if (clickedAmbienceIsPlaying == true) {

            // TODO: fade clicked ambience
            // remove from array of playing ambiences
            // console.log("Searching for " + ambienceID);
            ambiencesHolder[ambienceID].stop(playingAmbiencesPlayIDs[stopIndex]);
            playingAmbiencesPlayIDs.splice(stopIndex, 1);
            playingAmbiencesButtonIDs.splice(stopIndex, 1);
            clickedAmbienceIsPlaying = false;
            playingAmbiencesIndex--;
            Howler.volume(1 - (playingAmbiencesIndex / 11));
            // console.log("Volume: " + Howler.volume());

            // Remove icon from accordion group if nothing is playing
            if (isAmbienceGroupPlaying(ambienceID) == false) {
                console.log("Removing play icon from " + ambienceClassName);
                // This is silly but it works /shrug
                document.getElementById(ambienceClassName)
                    .previousElementSibling.firstElementChild.firstElementChild
                    .nextElementSibling.className
                    = "play-icon position-absolute float-end me-3 m-0 p-0 d-none";
            }
        }
        
    }

    // Check if any ambiences are playing in group
    function isAmbienceGroupPlaying(ambienceID) {

        // Parse class name of button
        // Loop through array of id's in group, checking against id's in playingAmbiencesButtonIDs
        ambienceClassName = document.getElementById(ambienceID).className.split(" ")[0];
        ambienceGroup = document.getElementsByClassName(ambienceClassName);

        console.log("Checking if items in " + ambienceClassName + " are playing...");
        for (let j = 0; j < 4; j++) {
            console.log(ambienceGroup.item(j).id);

            for (let i = 0; i < playingAmbiencesButtonIDs.length; i++) {
                if (ambienceGroup.item(j).id == playingAmbiencesButtonIDs[i]) {
                    console.log("An ambience in the group is playing!");
                    return true;
                }
            }

        }
        console.log("No ambiences in the group are playing.");
        return false;

    }

}