package com.example.demo;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketEchoHandler extends TextWebSocketHandler {

    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private int maxOnline = 2;
	private ObjectMapper mapper = new ObjectMapper();

    //Notify a connection
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception 
	{
		System.out.println("New session" + session.getId());
		sessions.put(session.getId(), session);
	}
	//Notify a disconnection 
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception 
	{
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
	}
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception 
	{
		JsonNode node = mapper.readTree(message.getPayload());
		sendOtherParticipants(session, node);
	}
	
	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException 
	{
		ObjectNode newNode = mapper.createObjectNode();
        if(node.get("id")!= null) 
		{
				newNode.put("id", node.get("id").asInt());
		}
		
	}

}
