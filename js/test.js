
function tempoCalc(tempo) {

    var millisPerBeats = 0;

    millisPerBeats = 60000 / tempo; // converts tempo to beats per millisecond
    
    console.log(tempo + " - Beat length in millis: " + millisPerBeats + "ms");
    console.log(tempo + " - Length of one bar in 4/4: " + millisPerBeats * 4 + "ms");

}

var bpm;
function tempoPrompt() {
    
    console.log("Creating text box...");
    bpm = prompt("Enter BPM: ");
    tempoCalc(bpm);
    
}