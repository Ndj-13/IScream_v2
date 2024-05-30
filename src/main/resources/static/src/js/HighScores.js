class HighScores extends Phaser.Scene {

    constructor() {
        super({ key: 'HighScores' });
        this.buttonBorrar = false;
        this.buttonPUT = false;
        this.buttonGET = false;
        this.buttonPUT2 = false;

        thisScene = this;
    }

    preload() {
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
            'resources/img/interface/botonBack.png',
            { frameWidth: 122.3, frameHeight: 47 });
    }

    create() {
        ///////////////////////////////////////////////////////////////////////////
        ////////////////////////////// WEBSOCKETS /////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        connection.onclose = (e) => {
            console.log(`Socket cerrado`);
            //endSession(actualPlayer.getName());
            desconectado = true;
            // se reinician variables globales 
            rivalPlayer = undefined;
            actualPlayer = undefined;
            players = null;
            this.scene.start('LogIn');
        }
        connection.onmessage = (message) => {
            let msg = JSON.parse(message.data);
            //console.log(msg);
        }

        ///////////////////////////////////////////////////////////////////////////
        /////////////////////////////// INTERFAZ //////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        this.add.image(400, 300, "highscoreBg");
        this.goBack = this.add.sprite(80, 570, "goBack").setInteractive();

        const hsText = {
            origin: 'center',
            x: 400,
            y: 300,
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 30,
                textAlign: 'center',
                lineSpacing: 10
            }
        }

        $.ajax({
            type: "GET",
            url: `http://${ipAddress}:8080/Score`,
            success: function (data) {
                this.dataSorted = data.sort((a, b) => b.score - a.score);
                let altoCelda = (550 - 150) / data.length;
                let anchoCelda = 600 / 3
                let xNombre = 100 + (anchoCelda / 2);
                let xScore = 500 + (anchoCelda / 2);
                for (let i = 0; i < data.length; i++) {
                    let y = 170 + altoCelda * i;
                    thisScene.make.text(hsText).setText(data[i].score).setPosition(xScore, y);
                    thisScene.make.text(hsText).setText(data[i].name).setPosition(xNombre, y);
                }
            },
            error: function (xhr, status, error) {
                console.error('Solicitud get:', status, error);
            }
        });


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
            this.scene.start("ResultsOnline");
        })
    }
}




/*$.ajax({
    type: "POST",
    url: `http://${ipAddress}:8080/Score`,
    data: JSON.stringify({ name: actualPlayer.getName(), score: actualPlayer.getScore() }),
    processData: false,
    contentType: "application/json",
    success: function (status) {
        console.log(status);
        $.ajax({
            type: "POST",
            url: `http://${ipAddress}:8080/Score`,
            data: JSON.stringify({ name: rivalPlayer.getName(), score: rivalPlayer.getScore() }),
            processData: false,
            contentType: "application/json",
            success: function (status) {
                console.log(status);
                // luego se obtienen todas y se guardan en una lista
                $.ajax({
                    type: "GET",
                    url: `http://${ipAddress}:8080/Score`,
                    success: function (data) {
                        console.log(data);
                        let altoCelda = (550 - 150) / data.length;
                        let anchoCelda = 600 / 3
                        let xNombre = 100 + (anchoCelda / 2);
                        let xScore = 500 + (anchoCelda / 2);
                        for (let i = 0; i < data.length; i++) {
                            // pos y (alto)
                            let y = 200 + (altoCelda / 2) * i;
                            thisScene.make.text(hsText).setText(data[i].score).setPosition(xScore, y);
                            thisScene.make.text(hsText).setText(data[i].name).setPosition(xNombre, y);
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Solicitud get:', status, error);
                    }
                });
            },
            error: function (xhr, status, error) {
                console.error('Solicitud post 2:', status, error);
            }
        });
    },
    error: function (xhr, status, error) {
        console.error('Solicitud post 1:', status, error);
    }
});*/