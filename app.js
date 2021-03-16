
function callBackEnd()
{
  var sendText = document.getElementById("output").innerHTML;
  const XHR = new XMLHttpRequest();
  const form = document.getElementById("myForm");
  const FD = new FormData(form);
  // Define what happens on successful data submission
  XHR.addEventListener("load", function (event) {

    // document.getElementById("in").innerHTML = event.target.responseText;
    // swal({
    //   title: "Thank you for asking",
    // });
    swal({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
        button: "Aww yiss!",
      });
    let speech = new SpeechSynthesisUtterance();

    speech.lang = "hi";
    speech.text = event.target.responseText;
    speech.volume = 1;
    speech.rate = 0.8;
    speech.pitch = 1;                

    window.speechSynthesis.speak(speech);
  });

  // Define what happens in case of error
  XHR.addEventListener("error", function (event) {

    // document.getElementById("in").innerHTML = "Something Wrong";
    swal({
      title: "Thank you for asking",
    });
    let speech = new SpeechSynthesisUtterance();

    speech.lang = "hi";
    speech.text = event.target.responseText;
    speech.volume = 1;
    speech.rate = 0.8;
    speech.pitch = 1;                

    window.speechSynthesis.speak(speech);
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




function play(content)
{
  if(content=="mapase")
  {
    swal({
      title: "कृपया कोठा नम्बर ५ मा जानु होस्, अनि त्यहाँ उपलब्द फारम भोर्नुहोस अनि इन्चार्जले भने बमोजिम प्रक्रिया पुरा गर्नु होस्  ।  एदी हजुर ट्राफिक जनचेतना कक्षा लगाउन आउनु भएको हो भने सार्बजनी बिदा छोडी अन्ने दिन बिहान १० देखि ११ बजे वा दिउसो १२ देखि १ वा  दिउसो २ देखि ३ बजे भित्र आउन सक्नुहुन्छ ।",
    }).then(function (){
      audio.pause();
    });
    var audio = new Audio("audio/mapase.mp3");
    audio.play();
  }
  else if(content=="lane")
  {
    swal({
      title: "कृपया कोठा नम्बर ५ मा जानु होस्, अनि त्यहाँ उपलब्द फारम भोर्नुहोस अनि इन्चार्जले भने बमोजिम प्रक्रिया पुरा गर्नु होस्  ।  एदी हजुर ट्राफिक जनचेतना कक्षा लगाउन आउनु भएको हो भने सार्बजनी बिदा छोडी अन्ने दिन बिहान ११  देखि दिउसो १२  बजे वा दिउसो १२ देखि १ वा  दिउसो ३  देखि ४  बजे भित्र आउन सक्नुहुन्छ ।",
    }).then(function (){
      audio.pause();
    });
    var audio = new Audio("audio/laneCrossing.mp3");
    audio.play();
  }
  else if(content=="park")
  {
    swal({
      title: "कृपया कोठा नम्बर ५ मा जानु होस्, अनि त्यहाँ उपलब्द फारम भोर्नुहोस अनि इन्चार्जले भने बमोजिम प्रक्रिया पुरा गर्नु होस्  ।  एदी हजुर ट्राफिक जनचेतना कक्षा लगाउन आउनु भएको हो भने सार्बजनी बिदा छोडी अन्ने दिन बिहान १० देखि ११ बजे वा दिउसो १२ देखि १ वा  दिउसो २ देखि ३ बजे भित्र आउन सक्नुहुन्छ ।",
    }).then(function (){
      audio.pause();
    });
    var audio = new Audio("audio/parking.mp3");
    audio.play();
  }

  
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