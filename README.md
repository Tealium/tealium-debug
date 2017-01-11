# Tealium Debug

[![License](https://img.shields.io/badge/license-Proprietary-blue.svg?style=flat
            )](https://github.com/Tealium/tealium-debug/blob/master/LICENSE.txt)

This debug page permits monitoring of tracking events by a Tealium device integration library on a local network.  Libraries currently with this feature:
- [Android](https://github.com/tealium/tealium-android)
- [Swift](https://github.com/tealium/tealium-swift)


# Usage

1. Start your mobile application.
2. Open the debug.html page in a browser.
3. Enter the host (ip address) and port info at the top of the debug app, and click the "connect" button.
4. Use the mobile app to trigger events. They should appear in the debug app.

-----------------------

# Dummy server
There is also a dummy server which can stand in for the mobile app for testing purposes. Once connected to the debug app, it'll stream random test events.

## Installation
The dummy server requires node and npm to be installed on your system. From a terminal in the "dummy-debug-server" folder, run ```npm install```. This will install the web socket dependencies. Now the dummy server is ready to use.

## Run the Dummy server
From a terminal in the "dummy-debug-server" folder, run ```node dummy-debug-server.js```. Now it should be running and waiting for a connection on port 8080. From the debug app, enter the correct host info and port 8080 to connect; you should now see dummy test events stream in. Enter ```ctrl+c``` to stop the server.

-----------------------

# Classifiers
We want to be able to classify events when they come in so that they can be displayed properly. To do so we will define an array of "classifiers", where each classifier is an object with a few properties defined. The first classifier in the array to have a recognize function that matches the event will be used.

## title
The "title" property is a string. This is used as the title of the event (unless an error is
thrown when getting the markup).

## classes
The "classes" property is a string of space separated css class names. These are used for styling
events depending on their classification.

## recognize()
The "recognize" property is a function that takes a single argument, the JSON decoded event message.
It returns true if the event should be classified using the classifier. It returns false otherwise.

## toMarkup()
The "toMarkup" property is a function that takes a single argument, the JSON decoded event message.
It returns a string containing the HTML to display for the event under the title. If an error is
thrown when calling the function, the event will be reclassified as an error, styled as such, and
the error message will be used as the title of the event in the UI.

## License

Use of this software is subject to the terms and conditions of the license agreement contained in the file titled "LICENSE.txt".  Please read the license before downloading or using any of the files contained in this repository. By downloading or using any of these files, you are agreeing to be bound by and comply with the license agreement.

## Change Log
- 1.0.0 Initial Release
	- Library configuration reporting
	- Tracking data reporting

---
Copyright (C) 2012-2017, Tealium Inc.
