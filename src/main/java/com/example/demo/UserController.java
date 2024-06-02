package com.example.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;

import java.util.concurrent.ConcurrentHashMap;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

@RestController
public class UserController {

	private Map<String, User> loggedUsers = new ConcurrentHashMap<String, User>();

	@PostMapping(value = "/User")
	public ResponseEntity<String> logIn(@RequestBody User newUser) {
		if (userExists(newUser)) {
			// Usuario existe
			if (checkPassword(newUser)) {
				// Contraseña coincide
				if (getloggedUsersNum() < 2) {
					// Hay menos de 2 usuarios
					if (!checkLogged(newUser)) {
						// El usuario no se ha loggeado todavia
						loggedUsers.put(newUser.getName(), newUser);
						System.out.println("New logged user: " + loggedUsers);
						return ResponseEntity.ok("Password correct.");
					} else {
						// Ya hay 2 usuarios
						return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is already logged.");
					}
				} else {
					// Ya hay 2 usuarios
					return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("There's already two users\nconnected.");
				}
			} else {
				// Contraseña incorrecta
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password doesn't match.");
			}
		} else {
			// Usuario no existe, error
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User doesn't exists.");
		}
	}

	@PostMapping(value = "/NewUser")
	public ResponseEntity<String> newUser(@RequestBody User newUser) {
		if (userExists(newUser)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User already exists.");
		}
		UserFileManager.saveUser(newUser);
		return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully.");
	}

	@DeleteMapping(value = "/User/{id}")
	public void deleteActiveUser(@PathVariable("id") String id) throws IOException {
		for (String key : loggedUsers.keySet()) {
			User user = loggedUsers.get(key);
			if (user.getId().equals(id)) {
				System.out.println(user.getName() + " disconnected.");
				loggedUsers.remove(key);
			}
		}
	}

	@GetMapping("/UsersCount")
	public int getloggedUsersNum() {
		return loggedUsers.size();
	}

	@GetMapping("/UsersName")
	public String[] getloggedUsersName() {
		String[] names = new String[loggedUsers.size()];
		int idx = 0;
		for (String key : loggedUsers.keySet()) {
			names[idx] = key;
			idx++;
		}
		return names;
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

	@PutMapping(value = "/User/{wsId}")
	public ResponseEntity<String> addId(@RequestBody User user, @PathVariable("wsId") String id) {
		for (String key : loggedUsers.keySet()) {
			User loggedUser = loggedUsers.get(key);
			if (loggedUser.getName().equals(user.getName())) {
				System.out.println("WS session {" + id + "} linked to logged user {" + loggedUser.getName() + "}");
				loggedUser.setId(id);
				return ResponseEntity.status(HttpStatus.OK).body("WS added.");
			}
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
	}

	private boolean userExists(User newUser) {
		List<User> existingUsers = UserFileManager.loadUsers();

		for (User existingUser : existingUsers) {
			// Comparar nombres (considerando mayúsculas y minúsculas)
			if (existingUser.getName().equals(newUser.getName())) {
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

	private boolean checkLogged(User newUser) {
		for (String key : loggedUsers.keySet()) {
			User user = loggedUsers.get(key);
			if (user.getName().equals(newUser.getName())) {
				// ya se ha loggeado
				return true;
			}
		}
		return false;
	}
}
