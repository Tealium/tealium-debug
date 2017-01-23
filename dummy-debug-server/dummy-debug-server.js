var ws = require("nodejs-websocket");

// listen for WebSocket connections on port 8080
var server = ws.createServer(function (conn) {
    console.log("New connection");

    // keep track of the number of events sent
    var num = 0;

    // send a new event every second
    var interval = setInterval(function() {
      // increment number of events sent
      num += 1;

      // "events" is an array of strings to send as event messages
      var messages = [
        // the following is a "Track" event
        JSON.stringify({
          type: "track",
          data: "track data"
        }),
        // the following tests the text overflow bug has been fixed
        JSON.stringify({
          type: "track",
          data: "Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data. Lots of track data."
        }),
        // the following is a "Log" event
        JSON.stringify({
          type: "log",
          data: "log data"
        }),
        // the following is a "Config Update" event
        JSON.stringify({
          type: "config_update",
          data: "config update data"
        }),
        // the following should result in a "Display Error" since it's missing data, which is needed for determining event markup for track events
        JSON.stringify({
          type: "track"
        }),
        // the following should result in a "Parse Error" since it's misformatted JSON (proper JSON as a string would be enclosed in quotes)
        "misformatted json",
        // the following should result in an unclassifiable event
        "{}",
        // What happens when some html ends up in the event?
        JSON.stringify({
          type: "track",
          data: "Here is <i>some html</i> in <b>an event message</b>."
        })
      ];

      // pick a random event message
      var message = messages[Math.floor(Math.random() * messages.length)];

      // send the event message
      conn.sendText(message);
    }, 1000);

    // whenever a message is recieved, print it to the console. Confirms the debug app is behaving to spec and sending back events it recieves.
    conn.on("text", function (str) {
        console.log("Received " + str);
    });

    // Stop sending events if the debug app is closed
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
        clearInterval(interval);
    });

}).listen(8080);
