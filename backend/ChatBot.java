package com.amazonaws.lambda.demo;

import com.amazonaws.lambda.demo.model.BotRequest;
import com.amazonaws.lambda.demo.model.BotResponse;
import com.amazonaws.lambda.demo.model.Message;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.google.code.chatterbotapi.ChatterBot;
import com.google.code.chatterbotapi.ChatterBotFactory;
import com.google.code.chatterbotapi.ChatterBotSession;
import com.google.code.chatterbotapi.ChatterBotType;


public class ChatBot implements RequestHandler<BotRequest, BotResponse> {
	
    public BotResponse handleRequest(BotRequest request, Context context) {
    	
    	ChatterBotFactory factory = new ChatterBotFactory();
    	Message[] messages = request.getMessages();
    	int index = 0;
    	for (Message message : messages) {
    		
    		String text = message.getUnstructured().getText();
    		try {
    			ChatterBot bot2 = factory.create(ChatterBotType.PANDORABOTS, "b0dafd24ee35a477");
    			ChatterBotSession bot2session = bot2.createSession();
    			text = bot2session.think(text);
    		} catch(Exception e) {
    			text = "Sorry, I don't understand.";
    		}
    		messages[index].getUnstructured().setText(text);
    		messages[index++].getUnstructured().setTimestamp(String.valueOf(System.currentTimeMillis()));
    	}
    	return new BotResponse(messages);
    }
}
