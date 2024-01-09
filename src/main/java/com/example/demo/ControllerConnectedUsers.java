package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Set;


@RestController
public class ControllerConnectedUsers {
    private final Map<Integer, Long> usersAlive = new ConcurrentHashMap<>();
    private final Set<Integer> usedUserIds = ConcurrentHashMap.newKeySet();

    @PostMapping("User/connect")
    public synchronized int establecerConexion() {
        if (usedUserIds.size() >= 2) {
            return -1; // Si ya hay dos usuarios, no permite más conexiones
        }

        int userId = 1;
        if (!usedUserIds.contains(1)) {
            userId = 1;
        } else if (!usedUserIds.contains(2)) {
            userId = 2;
        } else {
            return -1; // Evita asignar nuevos IDs si ya hay dos asignados
        }

        usedUserIds.add(userId);
        usersAlive.put(userId, System.currentTimeMillis());
        return userId;
    }

    @GetMapping("User/aliveUsers")
    public synchronized int mantenerConexion(@RequestParam int userId) {
        if (!usedUserIds.contains(userId)) {
            return 1; // Si el userId no está registrado, probablemente sea un usuario no válido
        }

        usersAlive.put(userId, System.currentTimeMillis());
        checkUsersAlive();
        return usedUserIds.size();
    }

    private void checkUsersAlive() {
        long currentTime = System.currentTimeMillis();
        for (Iterator<Map.Entry<Integer, Long>> iterator = usersAlive.entrySet().iterator(); iterator.hasNext(); ) {
            Map.Entry<Integer, Long> user = iterator.next();
            if (currentTime - user.getValue() > 2500) {
                usedUserIds.remove(user.getKey());
                iterator.remove();
            }
        }
    }
}





////////CODIHO OSCAR Y ROSA?///////////////////////
/*@RestController
public class ControllerConnectedUsers {
    private final Map<Integer, Long> usersAlive = new ConcurrentHashMap<>();
    private final List<Integer> freeUserID = new ArrayList<>();
    private int nextUserId = 1; // Empieza desde 1 o el valor que desees

    @PostMapping("User/connect")
    public synchronized int establecerConexion() {
        int userId;
        if (freeUserID.isEmpty()) {
            userId = nextUserId++;
        } else {
            userId = freeUserID.remove(0);
        }
        usersAlive.put(userId, System.currentTimeMillis());
        return userId;
    }

    @GetMapping("User/aliveUsers")
    public synchronized int mantenerConexion(@RequestParam int userId) {
        usersAlive.put(userId, System.currentTimeMillis());
        checkUsersAlive();
        return usersAlive.size();
    }

    private void checkUsersAlive() {
        long currentTime = System.currentTimeMillis();
        for (Iterator<Map.Entry<Integer, Long>> iterator = usersAlive.entrySet().iterator(); iterator.hasNext(); ) {
            Map.Entry<Integer, Long> user = iterator.next();
            if (currentTime - user.getValue() > 2500) {
                freeUserID.add(user.getKey());
                iterator.remove();
            }
        }
    }
}*/

/*package com.example.demo;
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


    //conecta conexión y suma id
    @PostMapping("User/connect")
    public int establecerConexion() {
        int userId = nextUserId++;
        if (freeUserID.isEmpty()) {
            userId = nextUserId++;
        } else {
            userId = freeUserID.remove(0); 
        }
        usersAlive.put(userId, System.currentTimeMillis());
        usersAlive.put(userId, System.currentTimeMillis());
        return userId;
    }

    //get constante
    @GetMapping("User/aliveUsers")
    public int mantenerConexion(@RequestParam int userId) {
        usersAlive.put(userId, System.currentTimeMillis());
        checkUsersAlive();
        return usersAlive.size();
    }

    //comprobar tiempo desde última llamada
    private void checkUsersAlive()
    {
        long currentTime = System.currentTimeMillis();
        for (Iterator<Map.Entry<Integer, Long>> iterator = usersAlive.entrySet().iterator(); iterator.hasNext();) {
            Map.Entry<Integer, Long> user = iterator.next();
            if (currentTime - user.getValue() > 2500) {
                freeUserID.add(user.getKey()); // Liberar el ID del usuario desconectado
                iterator.remove();
            }
        }
    }
}*/
