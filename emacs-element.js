Polymer({
    is: 'emacs-window',
    created: function() {
	this.timeouts = [];
    },
    cancelTyping: function() {
	for (var i in this.timeouts) {
	    window.clearTimeout(this.timeouts[i]);
	}
	this.timeouts = [];
	$(this.$$('.prompt')).text('');
	$(this.$$('.history')).text('');
    },
    startTyping: function() {
	var commands = Polymer.dom(this).querySelectorAll('pre');
	var prompt = $(this.$$('.prompt'));
	writeEmacsOutput(this, commands);
    }
});

function scrollDown(term) {
    var t = $(term.$$('.terminal'));
    t.scrollTop(t.prop("scrollHeight"));
}

function writeEmacsOutput(term, commands) {
    var first = commands.shift();
    if (first) {
	// Cleanup
	$(term.$$('.typed-cursor')).text('');
	var prompt = $(term.$$('.prompt'));

	if (first.classList.contains("typed")) {
	    scrollDown(term);
	    
	    prompt.typed({
	    	strings: [first.innerHTML],
	    	callback: function() {
	    	    // Clear up the mess
	    	    var history = $(term.$$('.history')).html();
	    	    history = history ? [history] : [];

	    	    prompt.removeData();
	    	    history.push(prompt.html());
	    	    prompt.html('');

	    	    $(term.$$('.history')).html(history.join('<br>'));
	    	    scrollDown(term);

		    var pause = first.attributes.pause || {value: '1000'};
	    	    var timeoutID = setTimeout(writeEmacsOutput, +pause.value, term, commands);
		    term.timeouts.push(timeoutID);
	    	}
	    });
	} else if (first.classList.contains("lines")) {
	    var lines = first.innerHTML.split("\n");
	    var history = $(term.$$('.history')).html();
	    history = history ? [history] : [];

	    history.push(lines.shift());
	    $(term.$$('.history')).html(history.join('<br>'));		
	    scrollDown(term);

	    if (lines.length > 0) {
		var pre = document.createElement("pre");
		$(pre).html(lines.join("\n"));
		pre.classList.add("lines");
		commands.unshift(pre);
	    } 
	    var pause = first.attributes.pause || {value: '20'};
	    var timeoutID = setTimeout(writeEmacsOutput, +pause.value, term, commands);
	    term.timeouts.push(timeoutID);
	} else {
	    commands.shift();
	    writeOutput(term, commands);
	}
    } else {
	scrollDown(term);
    }
}

var emacs = document.querySelector('emacs-window');
