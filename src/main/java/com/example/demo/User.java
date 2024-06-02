package com.example.demo;

public class User {
	private String name;
	private String password;
	private Integer score;
	private String wsId; // el id del websocket

	public User(String n, String p, Integer s) {
		this.name = n;
		this.password = p;
		this.score = s;
		this.wsId = "";
	}

	public String getName() {
		return name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String p) {
		this.password = p;
	}

	public Integer getScore() {
		return score;
	}

	public void setScore(Integer s) {
		this.score = s;
	}

	public String getId() {
		return this.wsId;
	}

	public void setId(String id) {
		this.wsId = id;
	}
}
