package com.example.demo;

import java.io.IOException;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketEchoHandler extends TextWebSocketHandler {

	private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private final ObjectMapper mapper = new ObjectMapper();
	private final Random random = new Random();
	private final Object lock = new Object();
	private boolean pause = false;
	private boolean disconnected = false;
	@Autowired
	private UserController userController;
	private int gamesLoaded = 0;

	public WebsocketEchoHandler() {
		ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1); // programa q se ejecuta cada 3s para
																					// enviar la pos de una nueva fruta
																					// a todos los clientes
		scheduler.scheduleAtFixedRate(() -> {
			try {
				if (!pause && !disconnected) {
					sendFruitPosition(); // genera pos para la fruta y la manda a todos los clientes
				}
			} catch (IOException e) {
				System.err.println("Exception occurred while sending fruit position");
				e.printStackTrace();
			}
		}, 3, 3, TimeUnit.SECONDS); // se espera 3s (tutorial) y luego empieza a enviar una fruta cada 3 segundos

		int rnd = random.nextInt(4000) + 1000;
		System.out.print(rnd);
		scheduler.scheduleAtFixedRate(() -> {
			try {
				if (!pause && !disconnected) {
					sendBallPosition(); // genera pos para la fruta y la manda a todos los clientes
				}
			} catch (IOException e) {
				System.err.println("Exception occurred while sending ball position");
				e.printStackTrace();
			}

		}, 0, rnd, TimeUnit.MILLISECONDS); // se espera 3s (tutorial) y luego empieza a enviar una fruta cada 3 segundos
	}

	// Notify a connection
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New session: " + session.getId());
		sessions.put(session.getId(), session);
		System.out.print("Current open sessions: ");
		for (WebSocketSession participant : sessions.values()) {
			System.out.print(participant.getId() + " ");
		}
		System.out.println();

		// envia el id del ws para q se lo meta al usuario (con api-rest)
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("type", "session");
		newNode.put("id", session.getId());
		synchronized (lock) {
			for (WebSocketSession participant : sessions.values()) {
				if (participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}
		}
		disconnected = false;
	}

	// Notify a disconnection
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());

		// pa q en se quite el jugador de la lista loggedUsers de api-rest
		userController.deleteActiveUser(session.getId());

		// manda mensaje al otro de cliente pa q salga de la partida
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("type", "session");
		newNode.put("closed", true);
		synchronized (lock) {
			for (WebSocketSession participant : sessions.values()) {
				if (!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}
		}
		sessions.remove(session.getId());
		disconnected = true;
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) {
		try {
			JsonNode node = mapper.readTree(message.getPayload());
			if (!disconnected) {
				sendOtherParticipants(session, node);
				if (node.get("loaded") != null && node.get("loaded").asBoolean()) {
					System.out.println("le llega loaded");
					gameStart();
				}
			}
		} catch (IOException e) {
			System.err.println("Exception occurred while handling message: " + message.getPayload());
			e.printStackTrace();
		}

	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {
		// para que el servidor sepa cuando el juego está parado y deje de enviar bolas
		// y frutas
		if (node.get("paused") != null) {
			pause = node.get("paused").asBoolean();
		}
		if (node.get("endGame") != null) {
			pause = node.get("endGame").asBoolean();
		}

		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("type", "rival");
		if (node.get("id") != null) {
			newNode.put("id", node.get("id").asText());
		}
		if (node.get("name") != null) {
			newNode.put("name", node.get("name").asText());
		}
		if (node.get("ready") != null) {
			newNode.put("ready", node.get("ready").asBoolean());
		}
		if (node.get("icy") != null) {
			newNode.put("icy", node.get("icy").asInt());
		}
		if (node.get("scorePlayer0") != null) {
			newNode.put("scorePlayer0", node.get("scorePlayer0").asInt());
		}
		if (node.get("scorePlayer1") != null) {
			newNode.put("scorePlayer1", node.get("scorePlayer1").asInt());
		}
		if (node.get("paused") != null) {
			newNode.put("paused", node.get("paused").asBoolean());
		}
		if (node.get("combo") != null) {
			newNode.put("combo", node.get("combo").asBoolean());
		}
		if (node.get("x") != null) {
			newNode.put("x", node.get("x").asInt());
		}
		if (node.get("y") != null) {
			newNode.put("y", node.get("y").asInt());
		}
		if (node.get("dir") != null) {
			newNode.put("dir", node.get("dir").asText());
		}
		if (node.get("retry") != null) {
			newNode.put("retry", node.get("retry").asBoolean());
		}
		if (node.get("menu") != null) {
			newNode.put("menu", node.get("menu").asBoolean());
		}

		synchronized (lock) {
			for (WebSocketSession participant : sessions.values()) {
				if (!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}
		}
	}

	private void gameStart() throws IOException {
		gamesLoaded++;
		if(gamesLoaded >= 2) {
			synchronized (lock) {
				ObjectNode startGameNode = mapper.createObjectNode(); // mensaje JSON con tipo de objeto fruta y sus coordenadas
				startGameNode.put("type", "startGame");
				for (WebSocketSession session : sessions.values()) { // envia el mensaje a todos los clientes conectados a
																		// traves de sus sesiones websocket
					session.sendMessage(new TextMessage(startGameNode.toString()));
				}
			}
		}
	}

	private void sendFruitPosition() throws IOException {
		int randomX = random.nextInt(600) + 100; // Genera una posición aleatoria entre 100 y 700
		ObjectNode fruitNode = mapper.createObjectNode(); // mensaje JSON con tipo de objeto fruta y sus coordenadas
		fruitNode.put("type", "fruit");
		fruitNode.put("xFruit", randomX);
		fruitNode.put("yFruit", 0);

		synchronized (lock) {
			for (WebSocketSession session : sessions.values()) { // envia el mensaje a todos los clientes conectados a
																	// traves de sus sesiones websocket
				session.sendMessage(new TextMessage(fruitNode.toString()));
			}
		}
	}

	private void sendBallPosition() throws IOException {
		int randomX = random.nextInt(600) + 100;
		ObjectNode ballNode = mapper.createObjectNode();
		ballNode.put("type", "ball");
		ballNode.put("xBall", randomX);
		ballNode.put("yBall", 0);

		synchronized (lock) {
			for (WebSocketSession session : sessions.values()) {
				session.sendMessage(new TextMessage(ballNode.toString()));
			}
		}
	}
}
