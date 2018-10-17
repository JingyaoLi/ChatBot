var CHAT_HEIGHT = 500;
var $input=$(".chat-input")
var Messages = function() {
	this.$input = $(".chat-input");
}

var msg = new Messages();

Messages.prototype.appendSelfMessage = function(message){
	var $messageContainer=$("<li/>")
		.addClass('chat-message '+('chat-message-self'))
		.appendTo($(".messages-list"))
	;
	var $messageBubble=$("<div/>")
		.addClass('box')
		.appendTo($messageContainer)
	;

	$messageBubble.text(message);

	return {
		$container:$messageContainer,
		$bubble:$messageBubble
	};
}

Messages.prototype.appendCrossMessage = function(message){
	var $messageContainer=$("<li/>")
		.addClass('chat-message '+('chat-message-friend'))
		.appendTo($(".messages-list"))
	;
	var $messageBubble=$("<div/>")
		.addClass('box')
		.appendTo($messageContainer)
	;

	$messageBubble.text(message);

	return {
		$container:$messageContainer,
		$bubble:$messageBubble
	};
}



Messages.prototype.getCleanText = function(m){
	for(var i =0 ; i<=Math.floor(m.length/25); i++) {
		m = m.substr(0, (i+1)*25+i-1) + '\n' + m.substr((i+1)*25+i);
	}
	return m;
}

Messages.prototype.addMessage = function(){
	if($input.text()=="") return;
	var newMessage = this.getCleanText($input.text());

	var messageElements;
	messageElements=this.appendSelfMessage(newMessage);
	this.sendMessage(newMessage);
	$input.text('');
	msg.setHeight();
	var $messageEffect=$("<div/>")
		.addClass('chat-message-effect')
		.appendTo($(".chat-effect-container"))
		.css({
			left:$input.position().left-10
		})
	;
	$messageEffect.text('');
	$(".chat-input").text('');
	$(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight }, "slow");
}

Messages.prototype.setHeight = function(){
	$(".messages").css({
		height:CHAT_HEIGHT-$(".bar").height()
	});
}

Messages.prototype.setDefaults = function(){
	$input.keydown(function(e) {
		if(e.keyCode==13){
			e.preventDefault();
			msg.addMessage();
		}
	});

	$(".chat-send").click(function(e){
		e.preventDefault();
		msg.addMessage();
	});

	$(".chat-send").on("touchstart",function(e){
		e.preventDefault();
		msg.addMessage();
	});

	$input.on("input",function(){
		msg.setHeight();
	});

}


Messages.prototype.sendMessage = function (str) {
	var $this = this;
	var obj = {
		"messages": [
		{
		  type: "string",
		  unstructured: {
		    id: new Date(),
		    text:str,
		    timestamp: + new Date()
		  }
		}
		]
	}
	$.ajax({
		url:'https://ruqsoq1ld2.execute-api.us-east-1.amazonaws.com/prod/chatbot',
		type:'post',
		data:JSON.stringify(obj),
        contentType: "application/json;charset=utf-8", 
        headers: {'X-Api-Key': 'tfLg3nOGH34GAzqkSLwJr9vHkvpzK6Eo9IDbVGim'},
		success:function (data) {
			if(data)$this.appendCrossMessage(data['messages'][0]['unstructured']['text']);
        },
        fail:function () {
        	this.appendCrossMessage("Error!")
        }
	});
}

msg.setHeight();
msg.setDefaults();
