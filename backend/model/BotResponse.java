package com.amazonaws.lambda.demo.model;

public class BotResponse {
	private Message[] messages;
	
	public Message[] getMessages() {
		return messages;
	}
	
	public void setMessages(Message[] messages) {
		this.messages = messages;
	}
	
    public BotResponse(Message[] messages) {
        this.messages = messages;
    }

    public BotResponse() {
    }

}
