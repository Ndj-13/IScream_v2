class HighScores extends Phaser.Scene {

    constructor() {
        super({ key: 'HighScores' });
        this.buttonBorrar = false;
        this.buttonPUT = false;
        this.buttonGET = false;
        this.buttonPUT2 = false;

        scoreScene = this;
    }

    preload()
    {
        this.load.image("highscoreBg", "resources/img/interface/highScores.png");

        this.load.spritesheet('deleteScores',
            'resources/img/interface/botonDelete.png',
            { frameWidth: 122.3, frameHeight: 47 });

        this.load.spritesheet('updateNewScore',
            'resources/img/interface/botonUpdateNewScore.png',
            { frameWidth: 122.3, frameHeight: 70 });

        this.load.spritesheet('showScore',
            'resources/img/interface/botonShowScores.png',
            { frameWidth: 122.3, frameHeight: 70 });

        this.load.spritesheet('goBack',
            'resources/img/interface/botonDelete.png',
            { frameWidth: 122.3, frameHeight: 47 });

        
    }

    create()
    {        
        this.add.image(400, 300, "highscoreBg");

        this.goBack = this.add.sprite(100, 550, "goBack").setInteractive();
        

        //BOTONES CUTRES HTML PARA RESTAPI 
        //DELETE
        if (!this.buttonBorrar) {
            //const button1 = document.createElement("button");
            const button1 = this.add.sprite(600, 500, "deleteScores").setInteractive();
            //button1.innerHTML = "Borrar Puntuaciones";
            button1.on("pointerover", () => {
                document.body.style.cursor = "pointer";
                button1.setFrame(1);
            })
            button1.on("pointerout", () => {
                document.body.style.cursor = "auto";
                button1.setFrame(0);
            })
            button1.on("pointerdown", () => {
                button1.setFrame(2);
            })
            button1.on("pointerup", () => {
                document.body.style.cursor = "auto";
                button1.setFrame(0);
                borrarAllScore();
                //document.body.appendChild(button1);
                //this.buttonBorrar = true;
            })
            /*button1.onclick = borrarAllScore;
            document.body.appendChild(button1);
            this.buttonBorrar = true;*/
        }
        //PUT
        if (!this.buttonPUT) {

            const button2 = this.add.sprite(400, 500, "updateNewScore").setInteractive();
            //button1.innerHTML = "Borrar Puntuaciones";
            button2.on("pointerover", () => {
                document.body.style.cursor = "pointer";
                button2.setFrame(1);
            })
            button2.on("pointerout", () => {
                document.body.style.cursor = "auto";
                button2.setFrame(0);
            })
            button2.on("pointerdown", () => {
                button2.setFrame(2);
            })
            button2.on("pointerup", () => {
                document.body.style.cursor = "auto";
                button2.setFrame(0);
                actualizarScoreP1();
                //document.body.appendChild(button1);
                //this.buttonPUT = true;
            })
            /*
            const button2 = document.createElement("button");
            button2.innerHTML = "Actualizar Puntuacion J1";
            button2.onclick = actualizarScoreP1;
            document.body.appendChild(button2);
            this.buttonPUT = true;*/
        }
        /*
        //PUT
        if (!this.buttonPUT2) {
            const button4= document.createElement("button");
            button4.innerHTML = "Actualizar Puntuacion J2";
            button4.onclick = actualizarScoreP2;
            document.body.appendChild(button4);
            this.buttonPUT2 = true;
        }*/

        //GET
        if (!this.buttonGET) {
            const button3 = this.add.sprite(200, 500, "showScore").setInteractive();
            //button1.innerHTML = "Borrar Puntuaciones";
            button3.on("pointerover", () => {
                document.body.style.cursor = "pointer";
                button3.setFrame(1);
            })
            button3.on("pointerout", () => {
                document.body.style.cursor = "auto";
                button3.setFrame(0);
            })
            button3.on("pointerdown", () => {
                button3.setFrame(2);
            })
            button3.on("pointerup", () => {
                document.body.style.cursor = "auto";
                button3.setFrame(0);
                obtenerAllScore();
                
                //document.body.appendChild(button1);
                //this.buttonGET = true;
            })
            /*
            const button3 = document.createElement("button");
            button3.innerHTML = "Obtener Puntuaciones";
            button3.onclick = obtenerAllScore;
            document.body.appendChild(button3);
            this.buttonGET = true;*/
        }

        this.goBack.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.goBack.setFrame(1);
        })
        this.goBack.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.goBack.setFrame(0);
        })
        this.goBack.on("pointerdown", () => {
            this.goBack.setFrame(2);
        })
        this.goBack.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.goBack.setFrame(0);
            this.scene.start("Results");
        })

        
    }

    update()
    {

    }
}


function actualizarScoreP1()
{
    $.ajax({
        url: '/User/score/' + playersList[0].getName().value,
        type: 'PUT',
        data: { newScore : playersList[0].showScore() },
        success: function(data) {
            console.log('Puntuación actualizada:', data);
            scoresText.setText('');
            const datos = JSON.stringify(data, null, 2)
                .replace(/^\{/, '')
                .replace(/\}$/, '')
                .replace(/^\[/, '')
                .replace(/\]$/, '')
                .replace(/"/g, '')
                .replace(/,/g, '')
                .replace(/:/g, '                         ')
                .replace(/,/g, ',\n\n\n');
            scoresText.setText(datos);
        },
        error: function(xhr, status, error) {
          console.error('Error al actualizar la puntuación:', error);
        }
    });
}
/*
function actualizarScoreP2()
{
    $.ajax({
        url: '/User/score/' + playersList[1].getName().value,
        type: 'PUT',
        data: { newScore : playersList[1].showScore() },
        success: function(data) {
          console.log('Puntuación actualizada:', data);
        },
        error: function(xhr, status, error) {
          console.error('Error al actualizar la puntuación:', error);
        }
    });
}*/

function obtenerAllScore() {
    
    $.ajax({
        type: "GET",
        url: "/User/score",
        success: function(data) {
            //console.log("obtenerUsuario");
            //console.log(data);
            
            /*
            const jsonString = JSON.stringify(data); // Con null, 2 se muestra de forma legible
            // Mostrar la cadena de texto en el HTML  
            const container = document.getElementById("jsonContainer");
            const textElement = document.createElement("pre");
            textElement.innerText = jsonString;
            container.appendChild(textElement);
            */
            showAllScore(data);
            
        },
        error: function(xhr, status, error) {
            console.error('Hubo un problema con la solicitud:', error);
        }
    });
}

function showAllScore(parameter)
{
    const hsText = {
        origin: 'center',
        x: 400,
        y: 300,
        style: {
            fontFamily: 'estilo',
            color: '#ffffff',
            fontSize: 22,
            textAlign: 'center',
            lineSpacing: 10
        }
    }
    console.log(scoresText);
    if(scoresText != undefined) scoresText.setText('');
    const datos = JSON.stringify(parameter, null, 2)
        .replace(/^\{/, '')
        .replace(/\}$/, '')
        .replace(/^\[/, '')
        .replace(/\]$/, '')
        .replace(/"/g, '')
        .replace(/,/g, '')
        .replace(/:/g, '                         ')
        .replace(/,/g, ',\n\n\n');
    scoresText = scoreScene.make.text(hsText).setText(datos);
}

function borrarAllScore() {
    $.ajax({
      type: "DELETE",
      url: "/User/score",
      success: function(data) {
        console.log("All Score Borradas");
        scoresText.setText('');
      },
      error: function(xhr, status, error) {
        console.error('Error al borrar las puntuaciones:', error);
      }
    });
  }