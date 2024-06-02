package com.example.demo;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ScoreFileManager {

    public static void saveScore(User user) {
        List<User> scores = loadScores();
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("highScores.txt", true))) {
            for (User score : scores) {
                if(score.getName().equals(user.getName())){
                    deleteScoreFromFile(score);
                }
            }
            writer.write(user.getName() + "," + user.getScore() + "\n");
            System.out.println("SCORE LOGGED: " + user.getName() + " " + user.getScore());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static List<User> loadScores() {
        List<User> scores = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader("highScores.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] scoreData = line.split(",");
                if (scoreData.length == 2) {
                    User score = new User(scoreData[0], "", Integer.parseInt(scoreData[1]));
                    scores.add(score);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return scores;
    }

    public static boolean updateScore(User userToUpdate) throws IOException {
        List<User> existingUsers = loadScores();
        boolean scoreUpdated = false;
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("highScores.txt"))) {
            for (User existingUser : existingUsers) {
                if (existingUser.getName().equals(userToUpdate.getName())) {
                    // Si se encuentra el usuario a actualizar, se escribe la nueva puntuacion.
                    existingUser.setScore(userToUpdate.getScore());
                    writer.write(existingUser.getName() + "," + existingUser.getScore() + "\n");
                    scoreUpdated = true;
                } else {
                    // Si el usuario no coincide, se vuelve a escribir en el archivo.
                    writer.write(existingUser.getName() + "," + existingUser.getPassword() + "\n");
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return scoreUpdated;
    }

    public static boolean deleteScoreFromFile(User userToDelete) {
        List<User> existingUsers = loadScores();
        boolean scoreDeleted = false;

        try (BufferedWriter writer = new BufferedWriter(new FileWriter("highScores.txt"))) {
            for (User existingUser : existingUsers) {
                if (!existingUser.getName().equals(userToDelete.getName())) {
                    // Si el usuario actual no coincide con el usuario a eliminar,
                    // se vuelve a escribir en el archivo.
                    writer.write(existingUser.getName() + "," + existingUser.getScore() + "\n");
                } else {
                    // Si se encuentra el usuario a eliminar, se marca como eliminado.
                    scoreDeleted = true;
                }
            }
        } catch(IOException e) {
            e.printStackTrace();
        }
        return scoreDeleted; // Devuelve true si el usuario fue encontrado y eliminado.
    }
}
