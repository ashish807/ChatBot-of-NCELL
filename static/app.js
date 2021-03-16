
function callBackEnd()
{
  var sendText = document.getElementById("output").innerHTML;
  const XHR = new XMLHttpRequest();
  const form = document.getElementById("myForm");
  const FD = new FormData(form);
  // Define what happens on successful data submission
  XHR.addEventListener("load", function (event) {

    // document.getElementById("in").innerHTML = event.target.responseText;
    swal({
      title: "Reply",
      text: event.target.responseText,
      icon: "success",
      button: "Ok",
    });
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10]; 
    msg.volume = 1; // From 0 to 1
    msg.rate = 0.8; // From 0.1 to 10
    msg.pitch = 1; // From 0 to 2
    msg.text =event.target.responseText;
    msg.lang = 'en';
    speechSynthesis.speak(msg);
  });

  // Define what happens in case of error
  XHR.addEventListener("error", function (event) {

    // document.getElementById("in").innerHTML = "Something Wrong";
    swal({
      title: "Reply",
      text: "Something Went Wrong",
      icon: "success",
      button: "Ok",
    });
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10]; 
    msg.volume = 1; // From 0 to 1
    msg.rate = 0.8; // From 0.1 to 10
    msg.pitch = 1; // From 0 to 2
    msg.text ="Something Went Wrong";
    msg.lang = 'en';
    speechSynthesis.speak(msg);
  });

  // Set up our request
  XHR.open("POST", "http://127.0.0.1:5000/upload/" + sendText);

  // The data sent is what the user provided in the form
  XHR.send(FD);
}


function runSpeechRecognition() {
	// get output div reference
	var output = document.getElementById("output");
	// get action element reference
	var action = document.getElementById("action");
	// new speech recognition object
	var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
	var recognition = new SpeechRecognition();

	// This runs when the speech recognition service starts
	recognition.onstart = function() {
		action.innerHTML = "बोल्नुस्";
	};
	
	recognition.onspeechend = function() {
		action.innerHTML = "सुन्न रोकियो, फेरि सुरु गर्न माइक्रोफोन आइकनमा क्लिक गर्नुहोस्";
		recognition.stop();
	}
  
	// This runs when the speech recognition service returns result
	recognition.onresult = function(event) {
		var transcript = event.results[0][0].transcript;
		var confidence = event.results[0][0].confidence;
		output.innerHTML = transcript;
    callBackEnd();
		//output.classList.remove("hide");
	};
  
	 // start recognition
	 recognition.start();
}






var mybutton = document.getElementById("back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}