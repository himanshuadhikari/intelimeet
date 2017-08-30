/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */



// uncomment this code when want to use it as a chrome app
// if want to open chrome app on when ever new tab opens comment this code 
// chrome.app.runtime.onLaunched.addListener(function() {
//     chrome.app.window.create('index.html', {
//         id: 'main',
//         bounds: { width: 620, height: 500 }
//     });
// });
// debugger;
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     alert(request);
// })

// debugger;
// chrome.runtime.onMessage.addListener(function(msg, sender) {
//     // First, validate the message's structure
//     if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
//         // Enable the page-action for the requesting tab
//         alert(getString(msg), getString(sender));
//         // chrome.pageAction.show(sender.tab.id);
//     }
// });

// function getString(message) {
//     return JSON.stringify(message);
// }
