var emacs = document.getElementsByTagName('emacs-window')[0]
var terminal = document.getElementsByTagName('terminal-window')[0]

document.addEventListener("impress:stepenter", function (event) {
  switch (event.target.id) {
    case "slide1":
      document.getElementById('slide1-emacs').cancelTyping();
      document.getElementById('slide1-emacs').startTyping();
      break;
    case "slide2":
      document.getElementById('slide1-term').cancelTyping();
      document.getElementById('slide1-term').startTyping();
      break;
    case "slide4":
      document.getElementById('slide5-term').cancelTyping();
      document.getElementById('slide5-term').startTyping();
      break;
    case "slide6":
      document.getElementById('slide6-term').cancelTyping();
      document.getElementById('slide6-term').startTyping();
      break;
    case "slide7":
      document.getElementById('slide8-term').cancelTyping();
      document.getElementById('slide8-term').startTyping();
      break;
    case "slide10":
      document.getElementById('slide10-term').cancelTyping();
      document.getElementById('slide10-term').startTyping();
      break;
    case "slide11":
      document.getElementById('slide11-emacs').cancelTyping();
      document.getElementById('slide11-emacs').startTyping();
      break;
  }
});
