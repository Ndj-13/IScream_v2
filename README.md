  


# I-Scream vol.2
## Game Design Document
### Fase 1

### Equipo:
Nerea Díaz Jérica - n.diazj.2020@alumnos.urjc.es - Ndj-13

Rosa Suffo García - r.suffo.2020@alumnos.urjc.es - rosasuffo

Adriana Sanchez Illán - a.sanchezi.2020@alumnos.urjc.es - AdrianaSanchezIllan

Jorge Sanz Coronel - j.sanzc.2020@alumnos.urjc.es - Jorgesanzcoronel

Óscar Alarcón Riera -o.alarcon.2020@alumnos.urjc.es - oscaralri

## Índice

### 1.   Cambios
### 2.   Introducción 

2.1.   Concepto del juego

2.2.   Características principales

2.3.   Género

2.4.   Propósito y público objetivo

2.5.   Plataformas

2.6.   Jugabilidad

2.7.   Estilo visual

### 3.   Mecánicas

3.1. Jugabilidad

3.2. Flujo de juego

3.3. Personajes

3.4. Objetos

3.5. Movimiento y físicas

  3.5.1. Interacción entre elementos
  
  3.5.2. Controles

### 4. Interfaz

4.1. Diagrama de flujo

4.2. Menú Principal	

4.3. Créditos

4.4. Selección de skin y modo de juego	

4.5. Juego	

  4.5.1. Nivel	

  4.5.2. Pausa

4.6. Fin de nivel	

### 5. Iplementación Online	

5.1. Servicio LogIn	

5.2. Juego Multijugador

### 6. Arte	

6.1. Estilo Visual	

6.2. Personajes	

6.3. Paleta de Colores	

6.4. Animación	

6.5. Fondos y Escenarios	

### 7. Instrucciones para ejecutar la aplicación y enlaces



## 1.   Cambios

En este apartado se irán introduciendo los cambios que se vayan efectuando en las siguientes fases. 
3/12/23: Se ha cambiado la naturaleza del juego, de juego tipo hack and slash a juego de acción/arcade. Esto significa que no hay hordas de enemigos y sooperación entre jugadores, si no que es competitivo y de recolección y evasión de obstáculos.Por ello, se ha reducido la cantidad de pantallas, niveles y mecánicas para adaptarlo al nuevo juego.
19/12/23: Se ha cambiado el número de jugadore en local a 1. Hay cambios en el flujo de interfaces, se ha añadido una interfaz para modificar la cuenta llamada Account. Se ha implementado un sistema de Log in con usuario y contraseña, un sistema de reconocimiento de usuarios conectados y un sistema de records. Además se ha implementado un combo que cambia de skin al jugador. También se ha implementado un sistema de FullScreen.
02/06/2024: Se ha añadido la jugabilidad de la partida en online y tiempo real. Se han implementado cambios en los servivios de login para mejorarlos en usabilidad y ante errores. Se ha modificado el ReadMe en consecuencia, añadiendo los siguientes apartados: Implementación online (apartado 5) y enlaces (apartado 7), donde se aportan enlaces al juego en diversas plataformas.

## 2.   Introducción

 Este es el documento de diseño de **_I-Scream vol.2_**, es un videojuego de supervivencia cooperativa de 2024 desarrollado por Bakery Studios y disponible para PC. Se trata de una nueva versión de su predecesor I-Scream de 2023, en la que de la misma forma, los jugadores se enfrentan a hordas de enemigos pero esta vez en desafiantes plataformas que pondrán a prueba sus habilidades.

Este escrito tiene como objetivo principal plasmar los elementos que debe incluir  **_I-Scream vol.2_** y servir como carta de presentación del juego.

### 2.1.   Concepto del juego

 **_I-Scream vol.2_** es un videojuego en el que los jugadores deberán competir por conseguir la máxima puntuación de manzanas.
 
### 2.2.   Características principales

El juego se basa en los siguientes pilares:

- Mecánica sencilla y profunda: se trata de un sistema de juego con normas y reglas sencillas que el jugador reconozca y le permitan adaptarse rápidamente, pero que a la vez ofrece un sinfín de posibilidades de manera que deba demostrar su habilidad y destreza para enfrentarse a los niveles con éxito.
- Rejugabilidad: el desarrollo de este juego dicta un aumento del reto que satisface la necesidad de autosuperación del jugador debido a la oportunidad de mejorar consiguiendo mayor número de puntos en menor tiempo de forma más rápida y a la diversidad de la competitividad en cada nivel con presencia de objetos.
- Ampliación: **_I-Scream vol.2_**, al no tener una narrativa cerrada y contar con un desarrollo de un motor todo lo independiente posible del contenido, podrá ser ampliable añadiendo nuevos personajes, escenarios y objetos.

### 2.3.   Género

 **_I-Scream vol.2_** Este juego fusiona elementos de plataformas con mecánicas de sueperar obstáculos y puntuación. Los jugadores se sumergirán en un desafío donde la prioridad es sortear obstáculos y recoger manzanas que aumentan la puntuación. El foco está en la destreza para navegar un entorno lleno de desafíos, esquivando obstáculos y evitando perder contra tu compañero.
 
### 2.4.   Propósito y público objetivo

 El principal objetivo de **_I-Scream vol.2_** es entretener al usuario con este divertido pero desafiante juego que le permitirá autosuperarse con el fin de ganar a sus amigos disfrutando del modo multijugador para jugar en compañía. Además, su estilo cuidado y detallado pretende lograr una buena inmersión que dé como resultado un lugar en el que el jugador se sienta cómodo y al que quiera regresar.

 En cuanto al público, **_I-Scream vol.2_** está dirigido a jugadores de un amplio rango de edades a los que les gusten los desafíos competitivos, y que dispongan de un tiempo limitado, puesto que el sistema de partidas cortas permite poder jugar de forma espontánea.
 
### 2.5.   Plataformas

 **_I-Scream vol.2_** estará disponible únicamente para PC.
 
### 2.6.   Jugabilidad

 **_I-Scream vol.2_** consta de un escenario en el que el jugador se enfrentará contra su compañero durante un tiempo limitado, con el objetivo de conseguir el máximo de puntos posibles. Para ello, este videojuego dispondrá de:
 
- Movilidad: cada jugador controla a un personaje con el que desplazarse por todo el escenario, incluyendo el salto entre plataformas.
- Selección de personajes: el jugador contará con personajes con distintas skins entre los que elegir para jugar con él.
- Objetos: a lo largo y ancho del escenario habrá distribuidos objetos que podrán servir de ayuda como bonus de puntuación.
  
### 2.7.   Estilo visual
  **_I-Scream vol.2_** tendrá un estilo sencillo pero detallado y cuidado que pueda ser apreciado por los jugadores para que les ayude a sentirse cómodos e inmersos en el juego. Se trata de un estilo de pixel art muy suave y agradable a la vista con colores vivos acordes con la acción que requiere el juego que creen un ambiente de batalla pero acogedor a la vez. En cuanto a la temática, consistirá en un mundo de gominolas y dulces en los que todo está hecho de los más deliciosos manjares, incluyendo a los propios personajes, creando así un juego de supervivencia diferente a los que acostumbramos a ver.


## 3.   Mecánicas

En esta sección se describen todas las mecánicas implementadas y la jugabilidad del juego, así como el transcurso de una partida normal en modo online. Se detallan las acciones que pueden realizar los personajes, su interacción con el mundo virtual y una descripción a fondo sobre sus características. 

### 3.1. Jugabilidad

El concepto inicial del videojuego está basado en los géneros de plataformas y arcade/acción. Se trata de un juego competitivo en el que los jugadores se enfrentarán entre ellos, valiéndose de sus habilidades y destreza, para esquivar la lluvia de obstáculos y obtener la mayor puntuación.

El plano de la cámara será frontal, de forma que se pueda observar todo el escenario. El estilo visual será 2D y todos los personajes serán visibles en pantalla, por lo que no será necesario requerir de una pantalla partida a la hora de jugar multijugador local.

El juego se desarrolla en partidas independientes, en la que cada partida termina con un ganador, un perdedor (o un empate) y una puntuación. 

El modo de juego principal se explica a continuación:

Modo principal: Dos jugadores competirán por conseguir la máxima puntuación.
### 3.2. Flujo de juego
El juego comienza en la pantalla de login en la cual se requerirá de un usuario y contraseña para acceder a la pantalla de inicio. Luego, la pantalla de inicio está conformada por el título y la imagen principal. Si desde esta, se pulsa el botón PLAY se mostrará la pantalla de selección de personaje. Esta pantalla está formada por una animación de personaje, un recuadro para escribir el nombre del jugador, y unas flechas para elegir las skins deseadas para jugar. En el menú de selección de personaje, antes de iniciar la partida, el jugador podrá escoger el personaje con el que quiere jugar y comenzar a jugar.
Al jugar, los jugadores se encontrarán el el juego principal, donde se podrá pausar el juego (menú de pausa) y se terminará la partida surgiendo la pantalla de resultados y donde se mostrarán los resultados de los jugadores en esa partida. 
En todas las pantallas se podrá volver hacia atrás a través de diferentes botones.

### 3.3. Personajes

Los personajes seleccionables se corresponden con las distintas skins que se podrán usar; que en nuestro caso son cuatro helados. También se puede realizar un combo de teclas para transformarse en un color especial.
  
### 3.4. Objetos

Hay dos tipos de "objetos":
-Obstáculos: durante toda la partida irán cayendo bolas de fuego en posiciones aleatorias, las cuales los jugadores tendrán que evitar a toda costa, pues te devuelve a la posición inicial y te retiene durante unos segundos, en los cuales no podrás obtener cerezas para aumentar la puntuación ni moverte. Estos objetos funcionan como obstáculos en la finalidad de obtener la mayor puntuación y ganar la partida.
-Pickeables: durante la partida caerán de manera menos frecuente y colisionan con el suelo, para poder ser recogidos por los jugadores.
### 3.5. Movimiento y físicas

3.5.1. Interacción entre elementos
  
Personaje - Objetos. Colisiones para recoger objetos. En nuestro caso cerezas, bolas de fuego y bonus.
Objetos - Mundo Virtual. Colisiones entre cerezas y suelo.
Personajes - Mundo virtual. Colisiones para el terreno caminable.

3.5.2. Controles
  
- Moverse
- Esquivar
- Saltar
- Recoger objeto

## 4. Interfaz

En esta sección se describe detalladamente cada una de las pantallas que componen  **_I-Scream vol.2_**, junto con sus transiciones y la utilidad de cada elemento de la GUI. Se adjuntan a continuación bocetos que marcan las partes de cada pantalla que tendrá el juego. Son, como antes dicho, simples ideas de lo que más adelante los artistas desarrollarán, aplicando el estilo y la estética definidas.

### 4.1. Diagrama de flujo

A continuación se muestran las pantallas del Nombre y las transiciones entre ellas. Antes de empezar, se ve una pantalla de carga.
![Flujo de pantallas](/resources/img/readmeImgs/Flujo_Pantallas.jpg)
_Flujo de Pantallas_
![Pantalla de carga](/resources/img/readmeImgs/Pantalla_Carga.jpg)
_Pantalla de carga_

### 4.2. Menú Principal

Lista de los elementos:
- Logo del juego.
- Botón ONLINE: lleva a la selección de skin de dos jugadores y el modo de juego.
- Botón Créditos: para apagar o activar la música del juego.
![Pantalla de inicio](scr/main/resources/static/resources/img/readmeImgs/Pantalla_Inicio.jpg)
_Pantalla de inicio_

### 4.3. Créditos

Lista de los elementos:
- Panel: texto con los roles de cada miembro del equipo.
- Botón menú: vuelve al menú principal al pulsarse.
![Pantalla de créditos](/resources/img/readmeImgs/Pantalla_Creditos.jpg)
_Pantalla de créditos_
### 4.4. Selección de skin y modo de juego

Lista de los elementos:

- Listas de skins disponibles, pulsando izquierda o derecha se cambia de uno a otro.
- Input usuario: campo de texto donde meter el nombre de usuario.
- Input contraseña: campo de texto donde meter el nombre de contraseña.
- Boton OK: Selecciona el skin en el centro de la lista.
- Botón de Modify: Lleva a la pantalla Account.
- Botón de Menú: Lleva al menú principal.
![Pantalla de selección de personajes](/resources/img/readmeImgs/Pantalla_Seleccion_Personajes.jpg)
_Pantalla de selección de personajes_

### 4.5. Juego

4.5.1.  Nivel

Lista de los elementos:
- Escenario: donde se desarrolla toda la acción en el nivel
- Imagen superior con la cabeza del skin seleccionado por el jugador y barra superior con un número que representa la puntuación del jugador. Señala a qué jugador pertenece esa parte del interfaz y la puntuación que va consiguiendo.
- Panel con temporizador: muestra el tiempo restante de la partida
-Botón pausa.
-Tutorial incluido al inicio del juego, mostrando controles para los jugadores.
  ![Pantalla de juego](/resources/img/readmeImgs/Pantalla_Juego_Principal.jpg)
_Pantalla de juego_

4.5.2. Pausa
Lista de los elementos:
- Botón volver (X): para salir de la pantalla de pausa y seguir jugando.
- Botón menú: para salir al menú principal y dejar la partida. Se pierde todo el progreso.
  ![Pantalla de pausa](/resources/img/readmeImgs/Pantalla_Pausa.jpg)
_Pantalla de pausa_

### 4.6. Fin de nivel

Lista de los elementos:
- Botón Menú: Lleva al menú principal
- Panel que muestra el ganador de la partida. En caso de que sea modo campaña muestra el resultado que han conseguido entre los dos jugadores.
- Botón RETRY: empieza el nivel de 0.
![Pantalla de fin](/resources/img/readmeImgs/Pantalla_Fin.jpg)
_Pantalla de fin_

### 4.7. Account

Lista de los elementos:
- Input usuario: campo de texto donde meter el nombre de usuario.
- Input contraseña: campo de texto donde meter el nombre de contraseña.
- Botón Delete: borra el usuario.
- Botón Modify: modifica la contraseña del usuario.
![Pantalla de Account](/resources/img/readmeImgs/Pantalla_HighScore.jpg)
_Pantalla de fin_

## 5. Juego Online
En este juego se han implementado tecnologías que facilitan la comunicación e intercambio de información entre jugadores, así como su almacenamiento. Estas funcionalidades permiten a los usuarios crear una cuenta con contraseña, conocer la cantidad de usuarios conectados y participar en partidas multijugador en línea con amigos.
### 5.1. Servicio Log In
El servicio de Inicio de Sesión, Registro, Modificación de Usuario y Eliminación de Usuario, entre otros, se han implementado utilizando la tecnología API Rest (servicios RESTful). Estos servicios siguen un enfoque restringido para la comunicación entre distintos sistemas de software y se caracterizan por el uso de métodos HTTP para realizar peticiones y recibir respuestas por parte del servidor. En el caso de IScream Vol2, las solicitudes del cliente se han realizado a través de jQuery (importado desde un CDN en la cabecera del index.html del juego), mientras que la parte del servidor se ha desarrollado con código Java utilizando un proyecto Maven con Spring Boot.

En este escenario, existen archivos JavaScript que envían peticiones HTTP (Inicio de Sesión, Puntuaciones Altas, Modificación de Usuario, etc.) a otros archivos Java que reciben y procesan la información (Controlador de Usuarios Conectados, Controlador de Usuarios, Controlador de Puntuaciones Altas, etc.). Específicamente, el Inicio de Sesión envía solicitudes POST al Controlador de Usuarios, donde se envía el nombre y la contraseña del usuario para su almacenamiento si los datos son correctos; la modificación de usuarios realiza solicitudes HTTP DELETE, MODIFY y POST al Controlador de Usuarios para modificar, eliminar y crear nuevos usuarios. Los archivos Java del Controlador de Usuarios Conectados reciben solicitudes GET cada cierto tiempo desde ConnectedUsers.js, además de solicitudes POST cada vez que se conecta un nuevo usuario. Este mismo enfoque se sigue en los archivos HighScores.js y ControladorHighScores.java.

De esta manera, se ha utilizado la tecnología API Rest para gestionar la información de los usuarios en IScream.Vol2, un videojuego RESTful.
### 5.2. Juego Multijugador
El servicio de juego en línea se ha implementado utilizando otra tecnología: WebSockets. Esta tecnología implica una comunicación bidireccional activa entre el cliente y el servidor, lo que permite abrir una conexión persistente para el intercambio continuo de mensajes. A diferencia de la API Rest, WebSockets posibilita un flujo de mensajes más dinámico y rápido. En el lado del cliente, solo cuenta con 4 métodos: open, close, send y otros. Además, incluye atributos como OnMessage, OnClose y OnOpen que informan sobre la apertura, cierre de conexión y recepción de mensajes.

En este juego, el "servidor" también se ha desarrollado con Spring Boot y se gestiona desde el archivo WebSocketEchoHandler, el cual administra las sesiones abiertas del juego y facilita el reenvío de información entre las sesiones de sockets. La información se envía y recibe a través de los archivos CharacterSelect y MainGame, donde se llevan a cabo la creación y desarrollo de las partidas.

Esta implementación permite a los usuarios participar en partidas multijugador en línea con otras personas, además de gestionar desconexiones y problemas relacionados con el envío de información.
## 6. Arte

### 6.1. Estilo Visual

 **_I-Scream vol.2_** presenta un estilo de arte en pixel art que rinde homenaje a la estética clásica de los videojuegos, creando una experiencia visual nostálgica para los jugadores. El juego se desarrolla en un mundo vibrante y colorido que combina elementos del género de plataformas con una temática de helados.
 
### 6.2. Personajes

 Los personajes de **_I-Scream vol.2_** son seres animados que encarnan diferentes variedades de helados, cada uno con su propia personalidad única. Los diseños de los personajes se basan en conceptos cuidadosamente elaborados que reflejan su sabor y estilo, lo que aporta un toque distintivo a cada uno. Los jugadores pueden seleccionar a su personaje favorito antes de embarcarse en la aventura, lo que les permite disfrutar de diferentes habilidades y armas relacionadas con su elección.

![Primeros concepts de los personajes](/resources/img/readmeImgs/conceptsJeR_II.jpg)
_Primeros concepts de los personajes_

![Primeros sprites de los personajes](/resources/img/readmeImgs/conceptsJeR.jpg)
_Primeros sprites de los personajes_

### 6.3. Paleta de Colores

 La paleta de colores de **_I-Scream vol.2_** está compuesta por una gama de tonos brillantes y atractivos que recuerdan a los colores de los helados y postres. Los fondos y entornos se diseñan de manera que reflejen una sensación de diversión y alegría, mientras que los enemigos y obstáculos presentan colores que contrastan para destacar en la pantalla y proporcionar una experiencia visual estimulante.

![Paleta de colores 1](/resources/img/readmeImgs/paletaJeR_I.jpg)
_Paleta de colores 1_

![Paleta de colores 2](/resources/img/readmeImgs/paletaJeR_II.jpg)
_Paleta de colores 2_


### 6.4. Animación

 El juego incorpora animaciones fluidas y detalladas para los personajes y enemigos, lo que da vida al mundo del juego. Cada personaje tiene animaciones de caminar, correr, saltar y atacar que reflejan sus características y personalidad, mientras que los enemigos se mueven de manera única y reaccionan de forma distintiva a los ataques de los jugadores. Las animaciones se integran perfectamente con la jugabilidad para ofrecer una experiencia inmersiva.

Primeras animaciones del personaje:

### 6.5. Fondos y Escenarios

Los fondos y escenarios de **_I-Scream vol.2_** son una parte crucial de la experiencia de juego. Cada nivel está cuidadosamente diseñado para ofrecer una variedad de entornos que incluyen paisajes de postres, áreas heladas y escenarios temáticos relacionados con los sabores de los personajes. Los fondos están llenos de detalles y elementos interactivos que contribuyen a la inmersión del jugador.

Imágenes de referencia para los escenarios:

En resumen, el arte de **_I-Scream vol.2_** combina elementos nostálgicos del píxel art con diseños creativos que representan la temática de helados de una manera única. Tanto los personajes como los enemigos están diseñados con atención al detalle, y la paleta de colores y animaciones contribuyen a la creación de un mundo visualmente atractivo y cautivador que complementa la jugabilidad del juego.


### 7. Instrucciones para ejecutar la aplicación y enlaces.

Para ejecutar la aplicación deberá lanzarse SpringBoot para crear el servidor. Por defecto se lanzará la IP de la máquina desde la que se lance y en el puerto 8080. Una vez el servidor esté ejecutando se podrá acceder a la aplicación desde el navegador insertando en la url del buscador IPdelamáquina:8080.
Además el juego, en su versión local, se ha subido a diversas plataformas de juegos ejecutados en buscadores. 
Itch.io: https://bakerystudios.itch.io/iscreamv2
Gamejolt: https://gamejolt.com/games/bakerystudios_iscreamv2/901167
NewGrounds: https://www.newgrounds.com/portal/view/932975

 
