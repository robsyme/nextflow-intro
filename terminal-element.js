Polymer({
    is: "terminal-window",
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
	$(this.$$('.PS1')).text('$');
    },
    startTyping: function() {
	var commands = Polymer.dom(this).querySelectorAll('pre');
	var prompt = $(this.$$('.prompt'));
	writeOutput(this, commands);
    }
});

function scrollDown(term) {
    var t = $(term.$$('.terminal'));
    t.scrollTop(t.prop("scrollHeight"));
}

function writeOutput(term, commands) {
    var first = commands.shift();
    if (first) {
	// Cleanup
	$(term.$$('.typed-cursor')).text('');
	var prompt = $(term.$$('.prompt'));

	if (first.classList.contains("console-command")) {
	    $(term.$$('.PS1')).text('$');
	    scrollDown(term);
	    
	    prompt.typed({
	    	strings: [first.innerHTML],
	    	callback: function() {
	    	    $(term.$$('.PS1')).text('');
	    	    // Clear up the mess
	    	    var history = $(term.$$('.history')).html();
	    	    history = history ? [history] : [];

	    	    prompt.removeData();
	    	    history.push('$ ' + prompt.html());
	    	    prompt.html('');

	    	    $(term.$$('.history')).html(history.join('<br>'));
	    	    scrollDown(term);

		    var pause = first.attributes.pause || {value: '1000'};
	    	    var timeoutID = setTimeout(writeOutput, +pause.value, term, commands);
		    term.timeouts.push(timeoutID);
	    	}
	    });
	} else if (first.classList.contains("console-output")) {
	    var lines = first.innerHTML.split("\n");
	    var history = $(term.$$('.history')).html();
	    history = history ? [history] : [];

	    history.push('<span class="console-output terminal-window">' + lines.shift() + '</span>');
	    $(term.$$('.history')).html(history.join('<br>'));		
	    scrollDown(term);

	    if (lines.length > 0) {
		var pre = document.createElement("pre");
		$(pre).html(lines.join("\n"));
		pre.classList.add("console-output");
		commands.unshift(pre);
	    } 
	    var timeoutID = setTimeout(writeOutput, 20, term, commands);
	    term.timeouts.push(timeoutID);
	} else {
	    commands.shift();
	    writeOutput(term, commands);
	}
    } else {
	$(term.$$('.PS1')).text('$');
	scrollDown(term);
    }
}

var term = document.querySelector('terminal-window')

