let overallSpeakersList = [];
let curSpeakersList = [];

function addToSpeakersList() 
{
    var button = document.getElementById("overallButton");
    var field = document.createElement("INPUT");
    field.setAttribute("type", "text");
    field.setAttribute("id", "overallField"); 
    button.appendChild(field);
    button.setAttribute("disabled", "true");
    field.addEventListener("keydown", setOverallSpeaker);
    document.getElementById("overallField").focus();
    
}


function setOverallSpeaker(event) 
{
    var key = event.key;
    if (key == "Enter"|| key=="ENTER") 
    {
        var field = document.getElementById("overallField");
        var name = field.value;
        overallSpeakersList.unshift(name);
        var button = document.getElementById("overallButton");
        button.removeChild(field);
        button.removeAttribute("disabled");
        addSpeakerPara(overallSpeakersList[0], "overallButton", "overallCol");
        
    }
}




function addToCurSpeakersList() 
{
    var button = document.getElementById("curButton");
    var field = document.createElement("INPUT");
    field.setAttribute("type", "text");
    field.setAttribute("id", "curField");
    button.appendChild(field);
    button.setAttribute("disabled", "true");
    field.addEventListener("keydown", setCurrentSpeaker);
    document.getElementById("curField").focus();
}

function setCurrentSpeaker(event) 
{
    var key = event.key;
    if (key == "Enter"|| key=="ENTER") 
    {
        var field = document.getElementById("curField");
        var name = field.value;
        curSpeakersList.unshift(name);
        var button = document.getElementById("curButton");
        var col = document.getElementById("currentCol");
        button.removeChild(field);
        button.removeAttribute("disabled");
        addSpeakerPara(curSpeakersList[0], button.id, col.id);
        
    }
}


function changeTopic() 
{
    var p1 = prompt("Please enter the new topic, note changing the topic will clear the current topic's speaker list.");
    if (p1 != null) {
        document.getElementById("curTopic").innerHTML = "Current Topic: " + p1;
        curSpeakersList.forEach(deletePara);
        curSpeakersList = [];
        var col = document.getElementById("currentCol");

    }
}

function deletePara(item) 
{
    var col = document.getElementById("currentCol");
    col.removeChild(document.getElementById(item));
}

function removeOnClickCur(event) 
{
    var p1 = confirm("Remove speaker?");
    if (p1) 
    {
        var item = event.currentTarget;
        var column_id = item.parentElement.id;
        const isItem = (element) => element == item.id;
        if (column_id=="currentCol") 
        {
            var index = curSpeakersList.findIndex(isItem, item);
            curSpeakersList.splice(index, 1);
        } 
        else 
        {
            var index = overallSpeakersList.findIndex(isItem, item);
            overallSpeakersList.splice(index, 1);
        }
        var col = document.getElementById(column_id);
        col.removeChild(item);
    }
}

function currentlyTalking() 
{

    if (curSpeakersList.length != 0)
    {
        newSpeak = curSpeakersList.pop();
        document.getElementById("curtalk").innerHTML = "Currently talking: " + newSpeak;

        if (curSpeakersList.length != 0) 
        {
            document.getElementById("nextSpeak").innerHTML = "Next to speak: " + curSpeakersList[curSpeakersList.length-1];
        } else if (overallSpeakersList.length != 0)
        {
            document.getElementById("nextSpeak").innerHTML = "Next to speak: " + overallSpeakersList[overallSpeakersList.length-1];
        } else 
        {
            document.getElementById("nextSpeak").innerHTML = "Next to speak:";
        }
        document.getElementById("currentCol").removeChild(document.getElementById(newSpeak));
        startCountdown();
    }
    //No one in current and someone in overall
    else if (curSpeakersList.length == 0 && overallSpeakersList.length != 0) 
    {
        newSpeak = overallSpeakersList.pop();
        
        document.getElementById("curtalk").innerHTML = "Currently talking: " + newSpeak;

        if (overallSpeakersList.length != 0) 
        {
            document.getElementById("nextSpeak").innerHTML = "Next to speak: " + overallSpeakersList[overallSpeakersList.length-1];
        } else 
        {
            document.getElementById("nextSpeak").innerHTML = "Next to speak:";
        }
        document.getElementById("overallCol").removeChild(document.getElementById(newSpeak));
        startCountdown();
    }
    else 
    {
        alert("No one on either Speaker's List");
    }
    
}

function startCountdown() 
{
    var initialTime = document.getElementById("speakerstime").innerHTML;
    if (initialTime > 0) 
    {
        var x = setInterval(function() {
            var time = document.getElementById("speakerstime").innerHTML;
            var distance = time - 1;
            document.getElementById("speakerstime").innerHTML = distance;
    
            if (distance <= 0) {
                clearInterval(x);
                alert("The Current Speaker's Time Is Up");
                setTimeout(() => {  document.getElementById("speakerstime").innerHTML = initialTime; }, 3500);
              }
    
        }, 1000);

    }
    


}

function addSpeakerPara(item, but, col) 
{
    var p = document.createElement("p");
    p.innerHTML = item;
    p.setAttribute("id", item);
    p.addEventListener("click", removeOnClickCur);
    var button = document.getElementById(but);
    document.getElementById(col).insertBefore(p, button);
}


function changeSpeakersTime() 
{
    var button = document.getElementById("speakerstimeButton");
    var field = document.createElement("INPUT");
    field.setAttribute("type", "text");
    field.setAttribute("id", "speakerstimeField"); 
    button.appendChild(field);
    button.setAttribute("disabled", "true");
    field.addEventListener("keydown", setSpeakersTime);
    document.getElementById("speakerstimeField").focus();
    
}


function setSpeakersTime(event) 
{
    var key = event.key;
    if (key == "Enter"|| key=="ENTER") 
    {
        var field = document.getElementById("speakerstimeField");
        var time = field.value;
        var button = document.getElementById("speakerstimeButton");
        button.removeChild(field);
        button.removeAttribute("disabled");
        document.getElementById("speakerstime").innerHTML = time
        
    }
}



// function search(ele) {
//     if(ele.keyCode == 13) {
//         alert(ele.value);        
//     }
// }