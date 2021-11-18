
window.onload = function() {


    const TIMEOUT = 1200;
    var alertID = "";

    var rolling = false;
    var rollNumber = 0;
    
    var rollButtonElements = document.getElementsByClassName("roll-button");
    var rollButtonIDs = Array;

    var dieImage = "";

    var alert = document.createElement('div');
    alert.className = "alert alert-warning alert-dismissible fade show position-absolute shadow text-center top-0 left-50 mt-3 p-3";
    var rollingMsg = document.createElement('div');
    rollingMsg.className = "rollingMsg fw-normal float-end ms-3 mt-2 pe-3";
    rollingMsg.innerHTML = "Rolling...";
    var spinner = document.createElement('div');
    spinner.className = "spinner-border roll-spinner float-end fs-5 mt-2 text-dark";

    storeButtons();
    setButtons();

    // Store button IDs for later use
    function storeButtons() {
        for (let i = 0; i < rollButtonElements.length; i++) {
            rollButtonIDs[i] = rollButtonElements.item(i).id.toString();
        }
    }

    // Generate onclick events for each button with class "roll-button"
    function setButtons() {
        for (let i = 0; i < rollButtonElements.length; i++) {
            rollButtonElements.item(i).addEventListener("click", function() {
                tryToRoll(this.id);
            });
        }
    }

    function tryToRoll(rollID) {

        if (rolling == true) {
            console.log("Roll in progress...");
        }
        else {
            roll(rollID);
        }

    }

    function roll(rollID) {
        
        rolling = true;
        clearTimeout(alertID);
        
        console.log("Rolling a D" + rollID);
        document.getElementById(rollID).append(rollingMsg);
        document.getElementById(rollID).append(spinner);
        
        dieImage = document.getElementById(rollID).firstElementChild;
        dieImage.className = "vibrate-1 die-icon float-start ms-1 me-2";

        setTimeout(() => {
            document.getElementById("full_page").append(alert);
            rollNumber = getRandomIntInclusive(1, rollID);

            if (rollNumber == 20) {
                alert.innerHTML = "Rolled a nat 20!";
            }
            else {
                alert.innerHTML = "Rolled " + rollNumber;
            }

            rollingMsg.remove();
            spinner.remove();

            rolling = false;

            dieImage.className = "die-icon float-start ms-1 me-2";

        }, TIMEOUT);

        alertID = setTimeout(() => {
            alert.remove();
        }, TIMEOUT*3);

    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    
}