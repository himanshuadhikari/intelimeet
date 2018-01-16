// document.addEventListener('DOMContentLoaded', function() {
//     var link = document.getElementById('openPlayer');
//     // onClick's logic below:
//     link.addEventListener('click', function() {
//         alert('xxx');
//     });
// });


// // Update the relevant fields with the new data
// function setDOMInfo(info) {
//     document.getElementById('total').textContent = info.total;
//     document.getElementById('inputs').textContent = info.inputs;
//     document.getElementById('buttons').textContent = info.buttons;
// }
// debugger;


// Once the DOM is ready...
// window.addEventListener('DOMContentLoaded', function() {
//     // ...query for the active tab...
//     chrome.tabs.query({
//         active: true,
//         currentWindow: true
//     }, function(tabs) {
//         // ...and send a request for the DOM info...
//         chrome.tabs.sendMessage(
//             tabs[0].id, { from: 'popup', subject: 'DOMInfo' },
//             // ...also specifying a callback to be called 
//             //    from the receiving end (content script)
//             setDOMInfo);
//     });
// });

debugger;
var accessToken = "8c328bd976f14e57ae73c8bb9f10c88b";
var baseUrl = "https://api.api.ai/v1/";
$(document).ready(function() {
    $("#input").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            send();
        }
    });
    $("#rec").click(function(event) {
        switchRecognition();
    });
});
var recognition;

function startRecognition() {
    recognition = new webkitSpeechRecognition();
    recognition.onstart = function(event) {
        updateRec();
    };
    recognition.onresult = function(event) {
        var text = "";
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
        }
        setInput(text);
        stopRecognition();
    };
    recognition.onend = function() {
        stopRecognition();
    };
    recognition.lang = "en-US";
    recognition.start();
}

function stopRecognition() {
    if (recognition) {
        recognition.stop();
        recognition = null;
    }
    updateRec();
}

function switchRecognition() {
    if (recognition) {
        stopRecognition();
    } else {
        startRecognition();
    }
}

function setInput(text) {
    $("#input").val(text);
    send();
}

function updateRec() {
    $("#rec").text(recognition ? "Stop" : "Speak");
}

function send() {
    var text = $("#input").val();
    $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
        success: function(data) {
            setResponse(data.result.fulfillment.speech);
            var msg = new SpeechSynthesisUtterance(data.result.fulfillment.speech);
            window.speechSynthesis.speak(msg);
        },
        error: function() {
            setResponse("Internal Server Error");
        }
    });
    setResponse("Loading...");
}

function setResponse(val) {
    $("#response").text(val);
}