// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     console.log(request.message);
//     if (request.message == "hello") {
//         sendResponse({ farewell: "goodbye" });
//     }
// })




function communicate(message) {
    // alert("message" + message);
    // chrome.runtime.sendMessage({ greeting: "hello" }, function(response) {
    //     console.log(response.farewell);
    // });
}

// debugger;
// // Inform the background page that 
// // this tab should have a page-action
// chrome.runtime.sendMessage({
//     from: 'content',
//     subject: 'showPageAction'
// });

// // Listen for messages from the popup
// chrome.runtime.onMessage.addListener(function(msg, sender, response) {
//     // First, validate the message's structure
//     if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
//         // Collect the necessary data 
//         // (For your specific requirements `document.querySelectorAll(...)`
//         //  should be equivalent to jquery's `$(...)`)
//         var domInfo = {
//             total: document.querySelectorAll('*').length,
//             inputs: document.querySelectorAll('input').length,
//             buttons: document.querySelectorAll('button').length
//         };

//         // Directly respond to the sender (popup), 
//         // through the specified callback */
//         response(domInfo);
//     }
// });
