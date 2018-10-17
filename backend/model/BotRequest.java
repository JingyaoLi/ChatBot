package com.amazonaws.lambda.demo.model;

public class BotRequest {
	private Message[] messages;
	
	public Message[] getMessages() {
		return messages;
	}
	
	public void setMessages(Message[] messages) {
		this.messages = messages;
	}
	
    public BotRequest(Message[] messages) {
        this.messages = messages;
    }

    public BotRequest() {
    }
}
