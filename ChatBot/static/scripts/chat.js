var coll = document.getElementsByClassName("collapsible");
var chat = "lets start the chat!"

var saveuserchat = []
var userchatcount = 0
var savebotchat = []
var botchatcount = 0

if(window.localStorage.getItem('chat') == null && window.localStorage.getItem('botchat') == null){
    firstBotMessage();
}
else{
    previousChatHistory();
}

function previousChatHistory(){
    var getuserchat = window.localStorage.getItem('chat')
    var getbotchat = window.localStorage.getItem('botchat')
    for(let i =0;i<getuserchat.length;i++){
        console.log(getuserchat[i])
    }
}

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

// Gets the first message
function firstBotMessage() {

    let firstMessage = chat
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}


// Retrieves the response
function getHardResponse(userText = prompt()) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
    saveuserchat[userchatcount++] = userText
    window.localStorage.setItem('chat',saveuserchat)
}

//Gets the text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();

    if (userText == "") {
        userText = "Please type a message";
    }

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

    savebotchat[botchatcount++] = userText
    window.localStorage.setItem('botchat',savebotchat)
}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

function sendButton() {
    getResponse();
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});

function afterRefresh() {
    window.localStorage.getItem('chat')
}

newFunction();
