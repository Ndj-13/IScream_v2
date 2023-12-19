package com.example.demo;
import java.io.BufferedWriter;
import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class UserFileManager {

    public static void saveUser(User user) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("users.txt", true))) {
            writer.write(user.getName() + "," + user.getPassword() + "\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static List<User> loadUsers() {
        List<User> users = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader("users.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] userData = line.split(",");
                if (userData.length == 2) {
                    User user = new User(userData[0], userData[1]);
                    users.add(user);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return users;
    }
    public static boolean updateUserPassword(User userToUpdate) {
        List<User> existingUsers = loadUsers();
        boolean passwordUpdated = false;

        try (BufferedWriter writer = new BufferedWriter(new FileWriter("users.txt"))) {
            for (User existingUser : existingUsers) {
                if (existingUser.getName().equals(userToUpdate.getName())) {
                    // Si se encuentra el usuario a actualizar, se escribe la nueva contraseña.
                    existingUser.setPassword(userToUpdate.getPassword());
                    writer.write(existingUser.getName() + "," + existingUser.getPassword() + "\n");
                    passwordUpdated = true;
                } else {
                    // Si el usuario no coincide, se vuelve a escribir en el archivo.
                    writer.write(existingUser.getName() + "," + existingUser.getPassword() + "\n");
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            return false; // Si hay un error al escribir en el archivo, devuelve false.
        }

        return passwordUpdated; // Devuelve true si se actualizó la contraseña.
    }

    public static boolean deleteUserFromFile(User userToDelete) {
        List<User> existingUsers = loadUsers();
        boolean userDeleted = false;
    
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("users.txt"))) {
            for (User existingUser : existingUsers) {
                if (!existingUser.getName().equals(userToDelete.getName())) {
                    // Si el usuario actual no coincide con el usuario a eliminar,
                    // se vuelve a escribir en el archivo.
                    writer.write(existingUser.getName() + "," + existingUser.getPassword() + "\n");
                } else {
                    // Si se encuentra el usuario a eliminar, se marca como eliminado.
                    userDeleted = true;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            return false; // Si hay un error al escribir en el archivo, devuelve false.
        }
    
        return userDeleted; // Devuelve true si el usuario fue encontrado y eliminado.
    }
    
}



