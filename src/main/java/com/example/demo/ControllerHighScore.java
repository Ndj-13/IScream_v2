package com.example.demo;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ControllerHighScore {

    // POST
    @PostMapping(value = "/Score")
    public ResponseEntity<String> logScore(@RequestBody User newScore) throws IOException {
        if (scoreExists(newScore)) {
            System.out.println("Score exists = true");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Score already exists and is bigger than the new one.");
        }
        System.out.println("Score exists = false");
        ScoreFileManager.saveScore(newScore);
        return ResponseEntity.status(HttpStatus.CREATED).body("Score logged");
    }

    // GET
    @GetMapping("/Score")
    public List<User> loadScores() throws IOException {
        return ScoreFileManager.loadScores();
    }

    // PUT
    /*@PutMapping("/User/score/{usuario}")
    public ResponseEntity<String> updateScore(@RequestBody User user) throws IOException {
        if (scoreExists(user)) {
            boolean updateSuccessful = ScoreFileManager.updateScore(user);
            if (updateSuccessful) {
                return ResponseEntity.ok("Score updated successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update score.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }*/