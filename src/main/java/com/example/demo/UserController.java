package com.example.demo;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import java.util.List;
import org.springframework.http.ResponseEntity;


@RestController
public class UserController {
    
	@PostMapping(value = "/User")
	public ResponseEntity<String> newUser(@RequestBody User newUser) {
	    // Verificar si el usuario ya existe y la contraseña es correcta
	    boolean userExists = userExists(newUser);
	    boolean passwordMatched = false;

	    if (userExists) {
	        // Usuario existe, verificar si la contraseña coincide
	        passwordMatched = checkPassword(newUser);

	        if (passwordMatched) {
	            // Contraseña coincide
	            return ResponseEntity.ok("Password correct.");
	        } else {
	            // Contraseña incorrecta
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password doesn't match.");
	        }
	    } else {
	        // Usuario no existe, guardar usuario y contraseña
	        UserFileManager.saveUser(newUser);
	        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully.");
	    }
	}
	@PutMapping(value = "/ModifyingUser")
	public ResponseEntity<String> modifyUser(@RequestBody User userToUpdate) {
	    boolean userExists = userExists(userToUpdate);

	    if (userExists) {
	        boolean updateSuccessful = UserFileManager.updateUserPassword(userToUpdate);
	        if (updateSuccessful) {
	            return ResponseEntity.ok("Password updated successfully.");
	        } else {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update password.");
	        }
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
	    }
	}

	 @DeleteMapping(value = "/ModifyingUser")
	    public ResponseEntity<String> deleteUser(@RequestBody User userToDelete) {
	        boolean userExists = userExists(userToDelete);
	    
	        if (userExists) {
	            boolean deletionSuccessful = UserFileManager.deleteUserFromFile(userToDelete);
	            if (deletionSuccessful) {
	                return ResponseEntity.ok("User deleted successfully.");
	            } else {
	                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user.");
	            }
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
	        }
	    }

    private boolean userExists(User newUser) {
        List<User> existingUsers = UserFileManager.loadUsers();

        for (User existingUser : existingUsers) {
            // Comparar nombres (considerando mayúsculas y minúsculas)
            if (existingUser.getName().equals(newUser.getName())) {
                // Nombre de usuario existe, verificar contraseña
                return true;
            }
        }
        // Nombre de usuario no existe
        return false;
    }

    private boolean checkPassword(User newUser) {
        List<User> existingUsers = UserFileManager.loadUsers();

        for (User existingUser : existingUsers) {
            // Comparar nombres (considerando mayúsculas y minúsculas)
            if (existingUser.getName().equals(newUser.getName())) {
                // Nombre de usuario existe, verificar contraseña
                return existingUser.getPassword().equals(newUser.getPassword());
            }
        }
        // Nombre de usuario no existe
        return false;
    }
}

