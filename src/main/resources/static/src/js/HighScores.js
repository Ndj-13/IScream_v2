class HighScores extends Phaser.Scene {

    constructor() {
        super({ key: 'HighScores' });
        thisScene = this; // mantiene el contexto de la escena en métodos externos
    }

    preload() {
        this.load.image("highscoreBg", "resources/img/interface/highScores.png");
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
            location.reload();
        }

        ///////////////////////////////////////////////////////////////////////////
        /////////////////////////////// INTERFAZ //////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        this.add.image(400, 300, "highscoreBg");
        this.goBackButton = this.add.sprite(80, 570, "goBack").setInteractive();
        this.goBackMarco = this.add.sprite(80, 570, "marco").setVisible(false);

        const hsScoreText = {
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
        const hsNameText = {
            origin: 'center',
            x: 400,
            y: 300,
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 27,
                textAlign: 'center',
                fontStyle: 'bold',
                lineSpacing: 10
            }
        }

        $.ajax({
            type: "GET",
            url: `http://${ipAddress}:8080/Score`,
            success: function (data) {
                //this.dataSorted = data.sort((a, b) => b.score - a.score);
                let altoCelda = (520 - 150) / 10;
                let anchoCelda = 600 / 3
                let xNombre = 100 + (anchoCelda / 2);
                let xScore = 500 + (anchoCelda / 2);
                for (let i = 0; i < data.length; i++) {
                    let y = 173 + altoCelda * i;
                    thisScene.make.text(hsScoreText).setText(data[i].score).setPosition(xScore, y);
                    thisScene.make.text(hsNameText).setText(data[i].name).setPosition(xNombre, y);
                }
            },
            error: function (xhr, status, error) {
                console.error('Solicitud get:', status, error);
            }
        });

        this.goBackButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.goBackMarco.setVisible(true);
        })
        this.goBackButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.goBackMarco.setVisible(false);
        })
        this.goBackButton.on("pointerdown", () => {
            this.goBackButton.setFrame(2);
        })
        this.goBackButton.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.goBackButton.setFrame(0);
            this.scene.start("Results");
        });
    }
}