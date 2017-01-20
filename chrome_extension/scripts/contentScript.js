// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     console.log(request.message);
//     if (request.message == "hello") {
//         sendResponse({ farewell: "goodbye" });
//     }
// })




function communicate(message) {
    alert("message" + message);
    // chrome.runtime.sendMessage({ greeting: "hello" }, function(response) {
    //     console.log(response.farewell);
    // });
}
