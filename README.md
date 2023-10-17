  


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

4.2. Créditos

4.3. Selección de skin y modo de juego	

4.4. Tutorial	

4.5. Juego	

  4.5.1. Nivel	

  4.5.2. Pausa

4.6. Fin de nivel	

### 5. Arte	

5.1. Estilo Visual	

5.2. Personajes	

5.3. Paleta de Colores	

5.4. Enemigos	

5.5. Animación	

5.6. Fondos y Escenarios	



## 1.   Cambios

En este apartado se irán introduciendo los cambios que se vayan efectuando en las siguientes fases. 

## 2.   Introducción

 Este es el documento de diseño de I-Scream vol.2, es un videojuego de supervivencia cooperativa de 2024 desarrollado por Bakery Studios y disponible para PC. Se trata de una nueva versión de su predecesor I-Scream de 2023, en la que de la misma forma, los jugadores se enfrentan a hordas de enemigos pero esta vez en desafiantes plataformas que pondrán a prueba sus habilidades.

Este escrito tiene como objetivo principal plasmar los elementos que debe incluir  I-Scream vol.2 y servir como carta de presentación del juego.

### 2.1.   Concepto del juego

 I-Scream vol.2 es un videojuego en el que los jugadores deberán lograr superar las diferentes hordas de enemigos para lograr la victoria.
 
### 2.2.   Características principales

El juego se basa en los siguientes pilares:

- Mecánica sencilla y profunda: se trata de un sistema de juego con normas y reglas sencillas que el jugador reconozca y le permitan adaptarse rápidamente, pero que a la vez ofrece un sinfín de posibilidades de manera que deba demostrar su habilidad y destreza para enfrentarse a los enemigos con éxito.
- Rejugabilidad: el desarrollo de este juego dicta un aumento del reto que satisface la necesidad de autosuperación del jugador debido a la oportunidad de mejorar eliminando enemigos de forma más rápida y al incremento de la dificultad en cada ronda con un mayor número de objetivos a los que abatir.
- Ampliación: I-Scream vol.2, al no tener una narrativa cerrada y contar con un desarrollo de un motor todo lo independiente posible del contenido, podrá ser ampliable a nuevos personajes y escenarios.

### 2.3.   Género

 I-Scream vol.2 combina el género de plataformas y con el “hack and slash”, también conocido como mata-mata, de manera que cogiendo la esencia del primero, que se caracteriza por tener que caminar, correr, saltar o escalar sobre una serie de plataformas, y la del segundo, que destaca por sus enfrentamientos de forma continua a enemigos para poder ganar, queda como resultado un videojuego en el que los jugadores deberán desplazarse por un escenario de plataformas para lograr esquivar y eliminar a las hordas de enemigos que tratarán de acabar con ellos en ese limitado espacio, para poder obtener la victoria.
 
### 2.4.   Propósito y público objetivo

 El principal objetivo de I-Scream vol.2 es entretener al usuario con este divertido pero desafiante juego que le permitirá autosuperarse con el fin de derrotar a los enemigos y también disfrutar del modo multijugador para jugar en compañía. Además, su estilo cuidado y detallado pretende lograr una buena inmersión que dé como resultado un lugar en el que el jugador se sienta cómodo y al que quiera regresar.

 En cuanto al público, I-Scream vol.2 está dirigido a jugadores de un amplio rango de edades a los que les gusten los desafíos de batalla, y que dispongan de un tiempo limitado, puesto que el sistema de partidas cortas permite poder jugar de forma espontánea.
 
### 2.5.   Plataformas

 I-Scream vol.2 estará disponible únicamente para PC.
 
### 2.6.   Jugabilidad

 I-Scream vol.2 consta de un escenario en el que el jugador se enfrentará a hordas de enemigos con un tiempo limitado, y para combatirlos contará con los siguientes elementos:
 
- Movilidad: el jugador controla a un personaje con el que desplazarse por todo el escenario, incluyendo el salto entre plataformas.
- Selección de personajes: el jugador contará con distintos personajes entre los que elegir para jugar con él.
- Armas y poderes: dependiendo del personaje que escoja el usuario, este le proporcionará una forma de combatir única, ya sea a distancia con armas de fuego como pistolas o hechizos, o cuerpo a cuerpo con espadas o lanzas.
- Objetos: a lo largo y ancho del escenario habrá distribuidos objetos que podrán servir de ayuda para cubrirse o incluso atacar a los enemigos.
  
### 2.7.   Estilo visual
  I-Scream vol.2 tendrá un estilo sencillo pero detallado y cuidado que pueda ser apreciado por los jugadores para que les ayude a sentirse cómodos e inmersos en el juego. Se trata de un estilo de pixel art muy suave y agradable a la vista con colores vivos acordes con la acción que requiere el juego que creen un ambiente de batalla pero acogedor a la vez. En cuanto a la temática, consistirá en un mundo de gominolas y dulces en los que todo está hecho de los más deliciosos manjares, incluyendo a los propios personajes, creando así un juego de supervivencia diferente a los que acostumbramos a ver.


## 3.   Mecánicas

En esta sección se describen todas las mecánicas implementadas y la jugabilidad del juego, así como el transcurso de una partida normal en modo local u online. Se detallan las acciones que pueden realizar los personajes, su interacción con el mundo virtual y una descripción a fondo sobre sus características. 

### 3.1. Jugabilidad

El concepto inicial del videojuego está basado en los géneros hack and slash y plataformas. Se trata de un juego de supervivencia cooperativo en el que los jugadores se enfrentarán a hordas de enemigos, utilizando sus poderes, armas u objetos que podrán ir encontrando por el mapa.

El plano de la cámara será frontal, de forma que se pueda observar todo el escenario. El estilo visual será 2D y todos los personajes serán visibles en pantalla, por lo que no será necesario requerir de una pantalla partida a la hora de jugar multijugador local.

El juego se desarrolla en partidas independientes conformadas por un total de 3 rondas, en la que cada ronda será una horda de enemigos que deberá ser eliminada para poder avanzar y obtener la victoria. 

El modo de juego principal se explica a continuación:

Modo Arcade: modo multijugador cooperativo / un jugador. 
Consiste en oleadas de enemigos que irán incrementando en número y dificultad en cada ronda, se deberá sobrevivir el mayor número de rondas posibles y los jugadores cooperan para sobrevivir, y a su vez, compiten para obtener el mayor número de bajas posibles.

### 3.2. Flujo de juego

En el menú de selección de personaje, antes de iniciar la partida, el jugador podrá escoger el personaje con el que quiere jugar, ponerle nombre y comenzar a jugar.

Flujo de Modo Arcade. En el modo arcade, dos jugadores, cooperan para superar y sobrevivir oleadas de enemigos que irán progresando en dificultad conforme avancen las oleadas. A su vez, los jugadores también compiten entre sí para tener la mejor puntuación de bajas de enemigos.

### 3.3. Personajes

Los personajes seleccionables tendrán una serie de características que podrán ir mejorando a medida que suban de nivel. Cada personaje tendrá una serie de habilidades y funciones  únicas que podrán complementarse con armas y objetos que se vayan recogiendo. 

La lista de atributos que podrán ir mejorando será: 

- Vida. Aumenta la vida máxima del personaje.
- Resistencia. Controla el número de evasiones que podemos realizar antes de quedarnos sin estamina.
- Fuerza. Atributo que mejora el daño que se realiza con las armas.
- Magia. Atributo que mejora el daño realizado con las habilidades de daño mágico.
- Precisión. Disminuye la dispersión de las armas a distancia y aumenta la probabilidad de daño crítico.
- Manejo. Controla la destreza del personaje para portar distintas armas.
  
### 3.4. Objetos

Habrá una cantidad diversa de objetos de dos categorías distintas: consumibles y armas. Las armas pueden tener distintas características, distintos tipos de ataque y requerir de ciertos atributos para poder usarse.
Los consumibles pueden incluir pociones para curarse, armas arrojadizas, etc.

### 3.5. Movimiento y físicas

3.5.1. Interacción entre elementos
  
Personajes principales - Enemigos. Colisiones entre enemigos y PJs para ataques.

Personaje - Personaje. Colisiones entre PJs para ataques.

Personaje - Objetos. Colisiones para recoger objetos. 

Proyectiles - Enemigos. Colisiones para recibir daños.

Proyectiles - Personajes. Colisiones para recibir daños.

Personajes - NPCs - Mundo virtual. Colisiones para saber cual es el terreno caminable.

3.5.2. Controles
  
- Moverse
- Esquivar
- Ataque físico
- Ataques especiales
- Usar objeto
- Arrojar objeto
- Recoger objeto
- Abrir inventario
- Recargar armas / magia

## 4. Interfaz

En esta sección se describe detalladamente cada una de las pantallas que componen  I-Scream vol.2, junto con sus transiciones y la utilidad de cada elemento de la GUI. Se adjuntan a continuación bocetos que marcan las partes de cada pantalla que tendrá el juego. Son, como antes dicho, simples ideas de lo que más adelante los artistas desarrollarán, aplicando el estilo y la estética definidas.

### 4.1. Diagrama de flujo

A continuación se muestran las pantallas del Nombre y las transiciones entre ellas.

### 4.2. Menú Principal

Lista de los elementos:
- Logo del juego
- Botón Partida Local: lleva a la selección de skin de un jugador
- Botón Partida Multijugador: lleva a la selección de skin de dos jugadores y el modo de juego
- Botón: Tutorial: Lleva a la pantalla del tutorial
- Botón Salir: para salir del juego
- Botón Música: para apagar o activar la música del juego

### 4.2. Créditos

Lista de los elementos:
- Panel: texto con los roles de cada miembro del equipo 
- Botón menú: vuelve al menú principal al pulsarse

### 4.3. Selección de skin y modo de juego

Lista de los elementos:

- Listas de skins disponibles, pulsando izquierda o derecha se cambia de uno a otro. Si un jugador tiene seleccionado un skin, el otro no podrá elegir el mismo.
- Textos Player 1 y 2: distinguen los jugadores que tienen cada skin.
- Botones Aceptar: Selecciona el skin en el centro de la lista
- Textos Modo de Juego: para distinguir que en la parte de abajo se selecciona la manera en la que se va a jugar
- Botones Campaña, Versus: Se selecciona uno de los tres como modo de juego
- Botón Tutorial: Lleva a la pantalla de tutorial
- Botón de Menú: Lleva al menú principal

### 4.4. Tutorial

Lista de los elementos:
- Panel Reglas: donde se explican los controles y las reglas del juego
- Botón Aceptar: vuelve a la pantalla anterior

### 4.5. Juego

4.5.1.  Nivel

Lista de los elementos:
- Escenario: donde se desarrolla toda la acción en el nivel
- Zona izquierda y derecha diferencian entre el jugador 1 y el 2, respectivamente. Para cada uno se dispone de los mismos botones e iconos, por lo que se explicarán los elemento solo del jugador 1 (izquierda) y se asumirá lo mismo para el 2.
- Imagen inferior con la cabeza del skin seleccionado por el jugador y barra superior con un número que representa la puntuación del jugador. Señala a qué jugador pertenece esa parte del interfaz y la puntuación que va consiguiendo. 
- Botón Más (...) : para ver con más detalle las habilidades de los jugadores, como van progresando, y sus estadísticas. Cuando se clique sobre este, lleva a un menú de pausa a ambos jugadores, por lo que deberán de estar de acuerdo en seleccionarlo.
- Panel con temporizador: muestra el tiempo restante de la partida

4.5.2. Pausa

Lista de los elementos:
- Dos zonas diferenciadas con los mismos componentes. La izquierda para el jugador 1, y la derecha para el jugador 2.
- Icono de la skin seleccionada por el jugador, junto con su nombre al lado. Diferencia la zona de la del otro jugador.
- Puntuación en función del rendimiento durante la partida.
- Botón volver (X): para salir de la pantalla de pausa y seguir jugando.
- Botón menú: para salir al menú principal y dejar la partida. Se pierde todo el progreso.
- Botón tutorial: Lleva a la pantalla de tutorial.

### 4.6. Fin de nivel

Lista de los elementos:
- Botón Menú: Lleva al menú principal
- Panel que muestra el ganador de la partida. En caso de que sea modo campaña muestra el resultado que han conseguido entre los dos jugadores
- Botón Salir: Sale del juego.

## 5. Arte

### 5.1. Estilo Visual

 I-Scream vol.2 presenta un estilo de arte en pixel art que rinde homenaje a la estética clásica de los videojuegos, creando una experiencia visual nostálgica para los jugadores. El juego se desarrolla en un mundo vibrante y colorido que combina elementos del género de plataformas con una temática de helados.
 
### 5.2. Personajes

 Los personajes de I-Scream vol.2 son seres animados que encarnan diferentes variedades de helados, cada uno con su propia personalidad única. Los diseños de los personajes se basan en conceptos cuidadosamente elaborados que reflejan su sabor y estilo, lo que aporta un toque distintivo a cada uno. Los jugadores pueden seleccionar a su personaje favorito antes de embarcarse en la aventura, lo que les permite disfrutar de diferentes habilidades y armas relacionadas con su elección.

Primeros concepts de los personajes:

Primeros sprites de los personajes:

### 5.3. Paleta de Colores

 La paleta de colores de I-Scream vol.2 está compuesta por una gama de tonos brillantes y atractivos que recuerdan a los colores de los helados y postres. Los fondos y entornos se diseñan de manera que reflejen una sensación de diversión y alegría, mientras que los enemigos y obstáculos presentan colores que contrastan para destacar en la pantalla y proporcionar una experiencia visual estimulante.

Paleta de colores:

### 5.4. Enemigos

 Los enemigos del juego son criaturas y obstáculos ingeniosos que representan amenazas para los helados protagonistas. Cada enemigo tiene un diseño único que combina lo adorable con lo desafiante, lo que añade un elemento estratégico a la jugabilidad. La variedad de enemigos desafía a los jugadores a adaptar sus estrategias y habilidades según el tipo de enemigo que enfrenten.

Primeros diseños de uno de los enemigos:

### 5.5. Animación

 El juego incorpora animaciones fluidas y detalladas para los personajes y enemigos, lo que da vida al mundo del juego. Cada personaje tiene animaciones de caminar, correr, saltar y atacar que reflejan sus características y personalidad, mientras que los enemigos se mueven de manera única y reaccionan de forma distintiva a los ataques de los jugadores. Las animaciones se integran perfectamente con la jugabilidad para ofrecer una experiencia inmersiva.

Primeras animaciones del personaje:

### 5.6. Fondos y Escenarios

Los fondos y escenarios de I-Scream vol.2 son una parte crucial de la experiencia de juego. Cada nivel está cuidadosamente diseñado para ofrecer una variedad de entornos que incluyen paisajes de postres, áreas heladas y escenarios temáticos relacionados con los sabores de los personajes. Los fondos están llenos de detalles y elementos interactivos que contribuyen a la inmersión del jugador.

Imágenes de referencia para los escenarios:

En resumen, el arte de I-Scream vol.2 combina elementos nostálgicos del píxel art con diseños creativos que representan la temática de helados de una manera única. Tanto los personajes como los enemigos están diseñados con atención al detalle, y la paleta de colores y animaciones contribuyen a la creación de un mundo visualmente atractivo y cautivador que complementa la jugabilidad del juego.
 
