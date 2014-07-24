var message = {};
var tweet = {};
var messageList = [];
var tweetList = [];
// send message
var onMessageSend = function (userNameId, userMessage, urlId) {
    message.username = document.getElementById(userNameId).value;
    message.content = document.getElementById(userMessage).value;
    message.url = document.getElementById(urlId).value;

    var request = new XMLHttpRequest();
    request.open("POST", "https://" + message.url + ".firebaseio.com/Messages.json");

    request.onerror = function () {
        console.log("ERRR on com")
    }

    request.send(JSON.stringify(message));


}
// send tweet
var onTweetSend = function (userNameId, tweetMessage) {
    tweet.username = document.getElementById(userNameId).value;
    tweet.content = document.getElementById(tweetMessage).value;
    tweet.time = Date.now();


    var request = new XMLHttpRequest();
    request.open("POST", "https://codercamps-mojo.firebaseio.com/tweets.json");

    request.onerror = function () {
        console.log("ERRR on com");
    }

    request.send(JSON.stringify(tweet));


}
var refresh = function () {
    onFreshRequest('Messages');
    onFreshRequest('tweets');
}

var onFreshRequest = function (location) {
    //holders
    var messageHolder = "";


    //Make network call
    var requestMessages = new XMLHttpRequest();
    requestMessages.open("GET", "https://codercamps-mojo.firebaseio.com/" + location + "/.json");
    //onload
    requestMessages.onload = function () {
        // get message list
        var data = JSON.parse(this.response);
        // table headers
        if (location === "Messages") {
            // create page header
            messageHolder += "<tr class='info'><th>From</th><th>Message</th><th>Delete</th></tr>";
        } else if (location === "tweets") {
            // create page header
            messageHolder += "<tr class='info'><th>Tweets</th><th>Delete</th></tr>";
        }
        //loop

        for (var i in data) {
            data[i].key = i;
            // extract object id

            if (location === "Messages") {
                //push to array 
                messageList.push(data[i]);
                // write to message table
                messageHolder += "<tr>";
                messageHolder += "<td>" + data[i].username + " </td>";
                messageHolder += "<td>" + data[i].content + " </td>";
                messageHolder += "<td><button class='btn btn-danger glyphicon glyphicon-trash' onclick='delete/message()'> </button> </td>"

                messageHolder += "</tr>";

            } else if (location === "tweets") {
                tweetList.push(data[i]);

                // write to message table
                messageHolder += "<tr>";

                messageHolder += "<td>" + data[i].content + " </td>";
                messageHolder += "<td><button class='btn btn-danger glyphicon glyphicon-trash ' onclick='delete/message()'> </button> </td>"

                messageHolder += "</tr>";

            }
        }
        //
        // write to output
        if (location === "Messages") {
            document.getElementById('message-table').innerHTML = messageHolder;
        } else if (location === "tweets") {
            document.getElementById('tweetTable').innerHTML = messageHolder;
        }
    }
    requestMessages.onerror = function () {
        consol.log("errr on getting message.");
    }
    requestMessages.send();

};


refresh();