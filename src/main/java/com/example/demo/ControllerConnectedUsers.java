package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.web.bind.annotation.*;
import java.util.Iterator;

@RestController
public class ControllerConnectedUsers {
    private final Map<Integer, Long> usersAlive = new ConcurrentHashMap<>();
    private final List<Integer> freeUserID = new ArrayList<>();
    private int nextUserId = 0;

    // conecta conexión y suma id
    @PostMapping("User/connect")
    public int establecerConexion() {
        int userId = nextUserId++;
        if (freeUserID.isEmpty()) {
            userId = nextUserId++;
        } else {
            userId = freeUserID.remove(0);
        }
        usersAlive.put(userId, System.currentTimeMillis());
        return userId;
    }

    // get constante
    @GetMapping("User/aliveUsers")
    public int mantenerConexion(@RequestParam int userId) {
        usersAlive.put(userId, System.currentTimeMillis());
        checkUsersAlive();
        return usersAlive.size();
    }

    // comprobar tiempo desde última llamada
    private void checkUsersAlive() {
        long currentTime = System.currentTimeMillis();
        for (Iterator<Map.Entry<Integer, Long>> iterator = usersAlive.entrySet().iterator(); iterator.hasNext();) {
            Map.Entry<Integer, Long> user = iterator.next();
            if (currentTime - user.getValue() > 2500) {
                freeUserID.add(user.getKey()); // Liberar el ID del usuario desconectado
                iterator.remove();
            }
        }
    }
}
