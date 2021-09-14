const { Howl } = require("howler");

var sound = new Howl({
    src: ["unknownfile.mp3"]
});
sound.play();