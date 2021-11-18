
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




    // MULTIROLLING

    var multiRollButton = document.getElementById("multi_roll_button");
    multiRollButton.addEventListener("click", function() {tryToMultiRoll();});
    var multiRollSelects = document.getElementsByClassName("form-select");
    var multiRollSelectsIDs = Array;
    var currentSelectItem = "";
    var multiRolling = false;
    var multiRollCount = 0;
    var multiRollCountString = "";
    var multiRollSingleCount = 0;
    var multiRollSpinner = document.createElement('div');
    multiRollSpinner.className = "spinner-border multi-roll-spinner fs-5 ms-0 mb-0 p-0 text-white";

    storeMultiButtons();
    function storeMultiButtons() {
        console.log("Found " + multiRollSelects.length + " selects.")
        for (let i = 0; i <  multiRollSelects.length; i++) {
            multiRollSelectsIDs[i] =  multiRollSelects.item(i).id.toString();
            // console.log("Storing " + multiRollSelects.item(i).id);
            // console.log("Index " + i + " contains " + multiRollSelectsIDs[i]);
        }
    }

    function tryToMultiRoll() {
        if (multiRolling == true) {
            console.log("Still rolling...");
        }
        else {
            multiRoll();
        }
    }
    
    function multiRoll() {

        multiRolling = true;
        clearTimeout(alertID);
        
        document.getElementById("multi_roll_button").innerHTML = "";
        document.getElementById("multi_roll_button").append(multiRollSpinner);
        

        for (let i = 0; i < multiRollSelects.length; i++) {

            currentSelectItem = multiRollSelects.item(i);

            switch (multiRollSelectsIDs[i]) {
                case "d4s":
                    for (let j = 0; j < currentSelectItem.options.selectedIndex; j++) {
                        multiRollSingleCount = getRandomIntInclusive(1, 4);
                        multiRollCount += multiRollSingleCount;
                        multiRollCountString += multiRollSingleCount + " + ";
                    }
                    break;

                case "d6s":
                    for (let j = 0; j < currentSelectItem.options.selectedIndex; j++) {
                        multiRollSingleCount = getRandomIntInclusive(1, 6);
                        multiRollCount += multiRollSingleCount;
                        multiRollCountString += multiRollSingleCount + " + ";
                    }
                    break;

                case "d8s":
                    for (let j = 0; j < currentSelectItem.options.selectedIndex; j++) {
                        multiRollSingleCount = getRandomIntInclusive(1, 8);
                        multiRollCount += multiRollSingleCount;
                        multiRollCountString += multiRollSingleCount + " + ";
                    }
                    break;

                case "d10s":
                    for (let j = 0; j < currentSelectItem.options.selectedIndex; j++) {
                        multiRollSingleCount = getRandomIntInclusive(1, 10);
                        multiRollCount += multiRollSingleCount;
                        multiRollCountString += multiRollSingleCount + " + ";
                    }
                    break;

                case "d12s":
                    for (let j = 0; j < currentSelectItem.options.selectedIndex; j++) {
                        multiRollSingleCount = getRandomIntInclusive(1, 12);
                        multiRollCount += multiRollSingleCount;
                        multiRollCountString += multiRollSingleCount + " + ";
                    }
                    break;

                case "d20s":
                    for (let j = 0; j < currentSelectItem.options.selectedIndex; j++) {
                        multiRollSingleCount = getRandomIntInclusive(1, 20);
                        multiRollCount += multiRollSingleCount;
                        multiRollCountString += multiRollSingleCount + " + ";
                    }
                    break;

            }

        }

        setTimeout(() => {

            multiRollCountString = multiRollCountString.slice(0, multiRollCountString.length - 2); // remove the last + symbol
            multiRollCountString += "= " + multiRollCount; // add equals and sum to end of multicount string
            alert.innerHTML = multiRollCountString;
            document.getElementById("full_page").append(alert); // display score

            document.getElementById("multi_roll_button").innerHTML = "ROLL"; // reset button text
            multiRollSpinner.remove(); // remove spinner
            multiRolling = false; // update state
            multiRollCount = 0; // reset sum
            multiRollCountString = ""; // reset multicount string

        }, TIMEOUT);

        alertID = setTimeout(() => {
            alert.remove();
        }, TIMEOUT*3);
        
    }
    
    
}