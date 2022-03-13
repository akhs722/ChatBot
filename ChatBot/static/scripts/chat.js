var coll = document.getElementsByClassName("collapsible");
var chat = "lets start the chat!"

var previousChatHistory = [];

if(window.localStorage.getItem('chatHistory') == null ){
    firstBotMessage();
}
else{
     previousChatSession();
}

function previousChatSession(){
    var retrievedObject = window.localStorage.getItem('chatHistory')
    previousChatHistory = JSON.parse(retrievedObject)
    
    for(let i = 0; i < previousChatHistory.length; i++)
    {   
        if(previousChatHistory[0].user == "USER")
        {
            let userText = previousChatHistory[i].message;
            let userHtml = '<p class="userText"><span>' + userText + '</span></p>';
            $("#textInput").val("");
            $("#chatbox").append(userHtml);
            
        }
        else 
        {
            let botResponse = previousChatHistory[i].message;
            let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
            $("#chatbox").append(botHtml);
            
        }
    }
    //iterate through list of objects to print the previous chat history
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

    let time = getTime();
    previousChatHistory.push({id : previousChatHistory.length + 1, message : userText, time: time, user: "USER"});
    
    console.log(previousChatHistory);
    window.localStorage.setItem('chatHistory',JSON.stringify(previousChatHistory))
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

    let time = getTime();
    previousChatHistory.push({id : previousChatHistory.length + 1, message : userText, time: time, user: "BOT"});
    
    window.localStorage.setItem('chatHistory',JSON.stringify(previousChatHistory))
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

// function afterRefresh() {
//     window.localStorage.getItem('chat')
// }

newFunction();
