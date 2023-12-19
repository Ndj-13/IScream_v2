package com.example.demo;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ControllerHighScore {
    String currentDir = System.getProperty("user.dir");
    private final String scoreTXT = currentDir + "\\highScores.txt";

    //GET
    @GetMapping("/User/score")
    public Map<String, Integer> obtenerAllScore() throws IOException {
        
        Map<String, Integer> scoreList = new HashMap<>();

        try (Stream<String> lineas = Files.lines(Paths.get(scoreTXT))) {
            lineas.forEach(linea -> {
                String[] datos = linea.split(": ");
                String usuario = datos[0];
                int puntuacion = Integer.parseInt(datos[1]);
                scoreList.put(usuario, puntuacion);
            });
        }
        return scoreList;
    }

    //PUT
    @PutMapping("/User/score/{usuario}")
    public Map<String, Integer> actualizarScore(@PathVariable String usuario, @RequestParam int newScore) throws IOException {
        Map<String, Integer> scoreList = leerScoreFile();
        scoreList.put(usuario, newScore);
        guardarScoreOnFile(scoreList);
        return scoreList;
    }

    //DELETE
    @DeleteMapping("/User/score")
    public void borrarTodasLasPuntuaciones() throws IOException {
        Files.write(Paths.get(scoreTXT), "".getBytes());
    }




    //METODOS EXTRA
    //Leer Archivo
    private Map<String, Integer> leerScoreFile() throws IOException {
        Map<String, Integer> scoreList = new HashMap<>();
        try (Stream<String> lineas = Files.lines(Paths.get(scoreTXT))) {
            lineas.forEach(linea -> {
                String[] datos = linea.split(": ");
                String usuario = datos[0];
                int puntuacion = Integer.parseInt(datos[1]);
                scoreList.put(usuario, puntuacion);
            });
        }
        return scoreList;
    }

    //Guardar en Archivo
    private void guardarScoreOnFile(Map<String, Integer> scoreList) throws IOException {
        StringBuilder contenido = new StringBuilder();
        scoreList.forEach((usuario, puntuacion) -> contenido.append(usuario).append(": ").append(puntuacion).append("\n"));
        Files.write(Paths.get(scoreTXT), contenido.toString().getBytes());
    }
}
    /*
    //List<Integer> scoreList = new ArrayList<>(); 

    @GetMapping("/usuario")
    public List<Integer> score(){
        /////SCORE PLACEHOLDERS
        scoreList.add(0);
        scoreList.add(0);
        scoreList.add(0);
        ////////////////

        Usuario user1 = new Usuario("user1", 1);
        Usuario user2 = new Usuario("user2", 2);

        checkHigher(user1);
        //checkHigher(user2); 
        return scoreList;
    }

    private void saveFile(Usuario usuario) {
        String fileName = "highScores.txt";
        try (FileWriter writer = new FileWriter(fileName, true)) {
            //Cadena de los datos del usuario
            String datos = "UserID: " + usuario.getUserID() + ", Score: " + usuario.getScore() + "\n";

            //Escribir en archivo
            writer.write(datos);
        } catch (IOException e) {
            
            System.err.println("Error al escribir en el archivo: " + e.getMessage());
        }
    }

    private void checkHigher(Usuario user)
    {
        for(int scoreOnList: scoreList)
        {
            int index = scoreList.indexOf(scoreOnList);
            if(user.getScore() > scoreOnList)
            {
                scoreList.add(index, user.getScore());
                saveFile(user);
            }
            else if(user.getScore() == scoreOnList)
            {
                scoreList.add(index, user.getScore());
                saveFile(user);
            }
        }
    }
*/
