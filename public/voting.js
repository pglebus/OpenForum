let yesList = [];
let noList = [];
let abstainList = [];
let sm = 0;
let m = 0;
let total = 0;
let ycount = 0;
let ncount = 0;
let acount= 0;


function addYesVote() 
{
    var button = document.getElementById("yesButton");
    var field = document.createElement("INPUT");
    field.setAttribute("type", "text");
    field.setAttribute("id", "yesField");
    button.appendChild(field);
    button.setAttribute("disabled", "true");
    field.addEventListener("keydown", yesButtonSetText);
    document.getElementById("yesField").focus();
}

function yesButtonSetText(event) 
{
    var key = event.key;
    if (key == "Enter"|| key=="ENTER") 
    {
        var field = document.getElementById("yesField");
        var name = document.getElementById("yesField").value;
        yesList.unshift(name);
        var button = document.getElementById("yesButton");
        button.removeChild(field);
        button.removeAttribute("disabled");
        addSpeakerPara(yesList[0], "yesButton", "yesCol");
        updateYesVotesNeeded();
        
    }
}


function addNoVote() 
{
    var button = document.getElementById("noButton");
    var field = document.createElement("INPUT");
    field.setAttribute("type", "text");
    field.setAttribute("id", "noField");
    button.appendChild(field);
    button.setAttribute("disabled", "true");
    field.addEventListener("keydown", noButtonSetText);
    document.getElementById("noField").focus();
}

function noButtonSetText(event) 
{
    var key = event.key;
    if (key == "Enter"|| key=="ENTER") 
    {
        var field = document.getElementById("noField");
        var name = document.getElementById("noField").value;
        noList.unshift(name);
        var button = document.getElementById("noButton");
        button.removeChild(field);
        button.removeAttribute("disabled");
        addSpeakerPara(noList[0], "noButton", "noCol");
        
    }
}

function addAbstainVote() 
{
    var button = document.getElementById("abstainButton");
    var field = document.createElement("INPUT");
    field.setAttribute("type", "text");
    field.setAttribute("id", "abstainField");
    button.appendChild(field);
    button.setAttribute("disabled", "true");
    field.addEventListener("keydown", abstainButtonSetText);
    document.getElementById("abstainField").focus();
    acount++;
}

function abstainButtonSetText(event) 
{
    var key = event.key;
    if (key == "Enter"|| key=="ENTER") 
    {
        var field = document.getElementById("abstainField");
        var name = document.getElementById("abstainField").value;
        abstainList.unshift(name);
        var button = document.getElementById("abstainButton");
        button.removeChild(field);
        button.removeAttribute("disabled");
        addSpeakerPara(abstainList[0], "abstainButton", "abstainCol");
        
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

function removeOnClickCur(event) 
{
    var p1 = confirm("Remove voter?");
    if (p1) 
    {
        var item = event.currentTarget;
        var col = item.parentElement.id;
        const isItem = (element) => element == item.id;
        if (col == "yesCol") 
        {
            var index = yesList.findIndex(isItem, item);
            yesList.splice(index, 1);
            updateYesVotesNeeded();
        }
        else if (col == "noCol") 
        {
            var index = noList.findIndex(isItem, item);
            noList.splice(index, 1);
        } 
        else
        {
            var index = abstainList.findIndex(isItem, item);
            abstainList.splice(index, 1);
            acount--;
        }
        
        var col = document.getElementById(col);
        col.removeChild(item);
    }
}

function changeVotingYes() 
{
    var p1 = prompt("Please enter what voting yes means.");
    if (p1 != null) {
        document.getElementById("voteYes").innerHTML = "Voting Yes to: " + p1;
    }
}

function changeVotingNo() 
{
    var p1 = prompt("Please enter what voting no means.");
    if (p1 != null) {
        document.getElementById("voteNo").innerHTML = "Voting No to: " + p1;
    }
}

function changeTopic() 
{
    var p1 = prompt("Please enter the new topic, note changing the topic will clear the current topic's speaker list.");
    if (p1 != null) {
        document.getElementById("curTopic").innerHTML = "Current Topic: " + p1;
    }
}

function changeBrothers() 
{
    var p1 = prompt("Please enter the amount of present brothers.");
    if (p1 != null) {
        document.getElementById("totalBrothers").innerHTML = "Total Brothers Present<br>" + p1;
        total = parseInt(p1);
        sm = Math.floor (parseInt(p1) * .75);
        document.getElementById("supermajority").innerHTML = "Supermajority<br>" + sm;
        m = Math.floor (parseInt(p1) * .50);
        document.getElementById("majority").innerHTML = "Majority<br>" + m;
        document.getElementById("yesVotes").innerHTML = "Yes votes needed<br>SM: " + sm + " M: " + m;
    }
}

function updateYesVotesNeeded() 
{
    sm = Math.floor((total-acount) * .75);
    m = Math.floor((total-acount) * .50);
    if (yesList.length != 0) 
    {
        document.getElementById("yesVotes").innerHTML = "Yes votes needed<br>SM: " + (sm-yesList.length) + " M: " + (m-yesList.length);
    }
    else 
    {
        document.getElementById("yesVotes").innerHTML = "Yes votes needed<br>SM: " + (sm-ycount) + " M: " + (m-ycount);
    }

}

function yesTally() 
{
    ycount++;
    document.getElementById("yesVoteNum").innerHTML = ycount;
    updateYesVotesNeeded();
}

function yesRemove() 
{
    ycount--;
    document.getElementById("yesVoteNum").innerHTML = ycount;
    updateYesVotesNeeded();
}

function noTally() 
{
    ncount++;
    document.getElementById("noVoteNum").innerHTML = ncount;
}

function noRemove() 
{
    ncount--;
    document.getElementById("noVoteNum").innerHTML = ncount;
}

function abstainTally() 
{
    acount++;
    document.getElementById("abstainVoteNum").innerHTML = acount;
    updateYesVotesNeeded();
}

function abstainRemove() 
{
    acount--;
    document.getElementById("abstainVoteNum").innerHTML = acount;
    updateYesVotesNeeded();
}