package com.example.demo;

import java.io.IOException;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketEchoHandler extends TextWebSocketHandler {
	private WebSocketSession playerOneSession = null;
	private WebSocketSession playerTwoSession = null;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		if (playerOneSession == null) {
			playerOneSession = session;
		} else if (playerTwoSession == null) {
			playerTwoSession = session;
		} else {
			// Cerrar la conexión si hay más de dos sesiones (ya que solo queremos dos)
			session.close();
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		if (session == playerOneSession) {
			playerOneSession = null;
		} else if (session == playerTwoSession) {
			playerTwoSession = null;
		}
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Message received: " + message.getPayload());
		if (session == playerOneSession && playerTwoSession != null) {
			playerTwoSession.sendMessage(new TextMessage(message.getPayload()));
		} else if (session == playerTwoSession && playerOneSession != null) {
			playerOneSession.sendMessage(new TextMessage(message.getPayload()));
		}
	}
}
	/*private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.put(session.getId(), session);

        if (sessions.size() > 2) {
            // En este caso, maneja solo dos sesiones.
            // Si hay más de dos sesiones, puedes implementar tu lógica para manejarlo.
            session.close();
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Aquí recibes el mensaje del cliente.
        // Puedes procesarlo y enviarlo a la otra sesión.
		System.out.println("Message received: " + message.getPayload());
        String senderId = session.getId();
        String receiverId = getReceiverId(senderId);
        WebSocketSession receiverSession = sessions.get(receiverId);

        if (receiverSession != null) {
            receiverSession.sendMessage(new TextMessage(message.getPayload()));
			System.out.println("Message sent to you " + message.getPayload());
        }
    }

    private String getReceiverId(String senderId) {
        for (String sessionId : sessions.keySet()) {
            if (!sessionId.equals(senderId)) {
                return sessionId;
            }
        }
        return null;
    }
}*/
	////////////////CODIGO ECHO PARA TIDAS LAS SESIONES///////////////////////
	/*private final Set<WebSocketSession> sessions = ConcurrentHashMap.newKeySet();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("Message received: " + message.getPayload());

        String msg = message.getPayload();
        sendMessageToAllSessions(msg);
    }

    private void sendMessageToAllSessions(String message) {
        for (WebSocketSession session : sessions) {
            if (session.isOpen()) {
                try {
                    session.sendMessage(new TextMessage(message));
                } catch (IOException e) {
                    // Handle exception
                    e.printStackTrace();
                }
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }
}
//////////////////CODIGO ROSA/////////////////////////
    /*private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
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
		System.out.println("mensaje: " + node);
		sendOtherParticipants(session, node);
	}
	
	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException 
	{
		ObjectNode newNode = mapper.createObjectNode();
        if(node.get("id")!= null) 
		{
				newNode.put("id", node.get("id").asInt());
		}
		
	}*/

