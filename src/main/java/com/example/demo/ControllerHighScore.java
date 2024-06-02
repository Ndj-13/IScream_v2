package com.example.demo;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControllerHighScore {

    // POST
    @PostMapping(value = "/Score")
    public ResponseEntity<String> logScore(@RequestBody User newScore) throws IOException {
        if (scoreExists(newScore)) {
            System.out.println("Score exists = true");
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body("Score already exists and is bigger than the new one.");
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

    // DELETE
    @DeleteMapping("/Score")
    public ResponseEntity<String> deleteScore(@RequestBody User user) throws IOException {
        if (scoreExists(user)) {
            boolean deleteSuccessful = ScoreFileManager.deleteScoreFromFile(user);
            if (deleteSuccessful) {
                return ResponseEntity.ok("Score deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete score.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    private boolean scoreExists(User newScore) throws IOException {
        List<User> existingScores = ScoreFileManager.loadScores();
        if (newScore.getScore() == 0)
            return true;
        for (User existingUser : existingScores) {
            if (existingUser.getName().equals(newScore.getName())) {
                System.out.println(newScore.getName() + " ya tiene un highScore");
                if (existingUser.getScore() >= newScore.getScore()) {
                    System.out.println("Su nuevo score es mayor");
                    return true;
                }
            }
        }
        // Usuario no tiene high score o es menor que el de esta partida
        return false;
    }
}