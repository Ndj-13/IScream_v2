class ResultsOnline extends Phaser.Scene {

    constructor() {
        super({ key: 'ResultsOnline' });
    }

    preload() {
        //Background:
        this.load.image("fondo", "resources/img/scene/fondoNivel1.png");
        this.load.image("defeat", "resources/img/interface/pantallaDefeat.png");
        this.load.image("victory", "resources/img/interface/pantallaVictory.png");

        //Botones
        this.load.image("marco", "resources/img/interface/recuadroBoton.png");
        this.load.spritesheet('menu',
            'resources/img/interface/botonMenu.png',
            { frameWidth: 120, frameHeight: 47 });
        this.load.spritesheet('retry',
            'resources/img/interface/botonRepeat.png',
            { frameWidth: 120, frameHeight: 47 });
        this.load.spritesheet('highScores',
            'resources/img/interface/botonHighScores.png',
            { frameWidth: 120, frameHeight: 47 });

        //Iconos:
        this.load.image('icyIcon0', 'resources/img/interface/charactIcon1.png');
        this.load.image('icyIcon1', 'resources/img/interface/charactIcon2.png');
        this.load.image('crown', 'resources/img/interface/corona.png');

        //Pestaña aviso
        this.load.image('aviso', 'resources/img/interface/pauseFondo1.png');
        this.load.spritesheet('yes', 'resources/img/interface/confirmButton.png', { frameWidth: 120, frameHeight: 47 });
        this.load.spritesheet('no', 'resources/img/interface/cancelButton.png', { frameWidth: 120, frameHeight: 47 });

    }

    create() {
        ///////////////////////////////////////////////////////////////////////////
        ////////////////////////////// WEBSOCKETS /////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        connection.send(JSON.stringify({ endGame: true }));

        connection.onclose = (e) => {
            console.log(`Socket cerrado`);
            desconectado = true;
            rivalPlayer = undefined;
            actualPlayer = undefined;
            players = null;
            // va al login otra ve
            this.scene.start('LogIn');
        }

        connection.onmessage = (message) => {
            let msg = JSON.parse(message.data);
            //console.log(msg);
        }

        this.updateHighScores();

        ///////////////////////////////////////////////////////////////////////////
        /////////////////////////////// INTERFAZ //////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        const confJugadores = {
            origin: 'center',
            x: 275,
            y: 200,
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 50,
                fontStyle: 'bold',
                textAlign: 'center',
                justifyContent: 'center',
            }
        }
        const confScore = {
            origin: 'center',
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 80,
                fontStyle: 'bold',
                textAlign: 'center',
                justifyContent: 'center',
            }
        }

        const confVariables = {
            origin: 'right',
            style: {
                fontFamily: 'estilo',
                color: '#0000000',
                fontSize: 20,
            }
        }

        this.add.image(400, 300, "fondo");
        if (actualPlayer.getScore() > rivalPlayer.getScore()) {
            this.winner = actualPlayer;
            this.loser = rivalPlayer;
            this.fondo = this.add.image(400, 290, "victory");
            this.fondo.setScale(1.1);
        } else if (actualPlayer.getScore() < rivalPlayer.getScore()) {
            this.winner = rivalPlayer;
            this.loser = actualPlayer;
            this.fondo = this.add.image(400, 290, "defeat");
            this.fondo.setScale(1.1);
        } else {
            this.fondo = this.add.image(400, 290, "defeat"); // cambiar a una de empate
        }
        // ANCHO 800 | ALTO 600
        if (this.winner && this.loser) {
            this.nameW = this.make.text(confJugadores).setText(this.winner.getName()).setPosition(400, 240);
            this.iconW = this.add.image(300, 240, 'icy' + this.winner.getIcy()).setScale(2);
            this.scoreW = this.make.text(confVariables).setText('Score').setPosition(310, 320);
            this.scoreWnumber = this.make.text(confScore).setText(this.winner.getScore()).setPosition(400, 330);
            this.add.image(300, 190, 'crown');

            this.nameL = this.make.text(confJugadores).setText(this.loser.getName()).setPosition(530, 375).setScale(0.5);
            this.iconL = this.add.image(470, 375, 'icy' + this.loser.getIcy());
            this.scoreL = this.make.text(confVariables).setText('Score').setPosition(480, 420).setScale(0.8);
            this.scoreLnumber = this.make.text(confScore).setText(this.loser.getScore()).setPosition(530, 430).setScale(0.5);
        } else if (actualPlayer.getName() == players[0]) {
            // POSICION A LA IZDA
            this.nameI = this.make.text(confJugadores).setText(actualPlayer.getName()).setPosition(275, 200);
            this.iconI = this.add.image(175, 200, 'icy' + actualPlayer.getIcy());
            this.scoreI = this.make.text(confVariables).setText('Score').setPosition(180, 250);
            this.scoreInumber = this.make.text(confScore).setText(actualPlayer.getScore()).setPosition(250, 320).setScale(2);

            // POSICION A LA DCHA
            this.nameD = this.make.text(confJugadores).setText(rivalPlayer.getName()).setPosition(540, 200);
            this.iconD = this.add.image(440, 200, 'icy' + rivalPlayer.getIcy());
            this.scoreD = this.make.text(confVariables).setText('Score').setPosition(450, 250);
            this.scoreDnumber = this.make.text(confScore).setText(rivalPlayer.getScore()).setPosition(550, 320).setScale(2);
        } else {
            // POSICION A LA IZDA
            this.nameI = this.make.text(confJugadores).setText(rivalPlayer.getName()).setPosition(275, 200);
            this.iconI = this.add.image(175, 200, 'icy' + rivalPlayer.getIcy());
            this.scoreI = this.make.text(confVariables).setText('Score').setPosition(180, 280);
            this.scoreInumber = this.make.text(confScore).setText(rivalPlayer.getScore()).setPosition(250, 320).setScale(2);

            // POSICION A LA DCHA
            this.nameD = this.make.text(confJugadores).setText(actualPlayer.getName()).setPosition(540, 200);
            this.iconD = this.add.image(440, 200, 'icy' + actualPlayer.getIcy());
            this.scoreD = this.make.text(confVariables).setText('Score').setPosition(450, 280);
            this.scoreDnumber = this.make.text(confScore).setText(actualPlayer.getScore()).setPosition(550, 320).setScale(2);
        }

        //menu
        this.menu = this.add.sprite(500, 525, "menu").setInteractive();
        this.marcoMenu = this.add.image(500, 525, 'marco').setVisible(false);

        this.retry = this.add.sprite(300, 525, "retry").setInteractive();
        this.marcoRetry = this.add.image(300, 525, 'marco').setVisible(false);

        this.highScores = this.add.sprite(720, 550, "highScores").setInteractive();

        //Mensaje abandonar partida
        //tapar fondo
        this.niebla = this.add.graphics({
            fillStyle: {
                color: 0x828282, //color barra de cargar (CAMBIAR)
                alpha: 0.6,
            }
        })

        //warning
        this.niebla.fillRect(0, 0, 800, 600).setVisible(false);
        this.abandonar = this.make.text(confVariables).setText(
            'Are you sure you want to exit?').setPosition(
                400, 230).setFontSize(25).setVisible(false);

        //yes y no
        this.yes = this.add.sprite(300, 350, 'yes').setVisible(false);
        this.marcoYes = this.add.image(300, 350, 'marco').setVisible(false);
        this.marcoYes.scale = 1.2;

        this.no = this.add.sprite(500, 350, 'no').setVisible(false);
        this.marcoNo = this.add.image(500, 350, 'marco').setVisible(false);
        this.marcoNo.scale = 1.2;

        //FUNCIONALIDADES
        //menu
        this.menu.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.marcoMenu.setVisible(true);
        })
        this.menu.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.marcoMenu.setVisible(false);
        })
        this.menu.on("pointerdown", () => {
            this.menu.setFrame(1);
            this.marcoMenu.setVisible(false);
        })
        this.menu.on("pointerup", () => {
            this.menu.setFrame(0);
            document.body.style.cursor = "auto";
            this.niebla.setVisible(true);
            this.abandonar.setVisible(true);
            this.yes.setVisible(true).setInteractive();
            this.no.setVisible(true).setInteractive();
            this.menu.disableInteractive();
        })

        //retry
        this.retry.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.marcoRetry.setVisible(true);
        })
        this.retry.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.marcoRetry.setVisible(false);
        })
        this.retry.on("pointerdown", () => {
            this.retry.setFrame(1);
            this.marcoRetry.setVisible(false);
        })
        this.retry.on("pointerup", () => {
            this.retry.setFrame(0);
            document.body.style.cursor = "auto";

            player2Panel.invisible();
            panelsCount--;
            actualPlayer.setReady(false);
            players = null;

            this.scene.start("CharacterSelectMultiplayer");
        })

        //yes
        this.yes.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.marcoYes.setVisible(true);
        })
        this.yes.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.marcoYes.setVisible(false);
        })
        this.yes.on("pointerdown", () => {
            this.yes.setFrame(1);
            this.marcoYes.setVisible(false);
        })
        this.yes.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.sound.stopAll();
            menuMusic = false;

            player2Panel.invisible();
            panelsCount--;
            actualPlayer.setReady(false);
            rivalPlayer = null;
            players = null;

            this.scene.start("HomeScreen");
        })

        //no
        this.no.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.marcoNo.setVisible(true);
        })
        this.no.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.marcoNo.setVisible(false);
        })
        this.no.on("pointerdown", () => {
            this.no.setFrame(1);
            this.marcoNo.setVisible(false);
        })
        this.no.on("pointerup", () => {
            this.no.setFrame(0);
            document.body.style.cursor = "auto";
            this.niebla.setVisible(false);
            this.abandonar.setVisible(false);
            this.yes.setVisible(false).disableInteractive();
            this.no.setVisible(false).disableInteractive();
            this.menu.setInteractive();
        })

        this.highScores.on("pointerover", () => {
            document.body.style.cursor = "pointer";
        })
        this.highScores.on("pointerout", () => {
            document.body.style.cursor = "auto";
        })
        this.highScores.on("pointerdown", () => {
            this.highScores.setFrame(1);
            this.scene.start("HighScores");
        })
        this.highScores.on("pointerup", () => {
            this.highScores.setFrame(0);
        })
    }

    updateHighScores(){
        console.log(actualPlayer);
        $.ajax({
            type: "POST",
            url: `http://${ipAddress}:8080/Score`,
            data: JSON.stringify({ name: actualPlayer.getName(), score: actualPlayer.getScore(), }),
            processData: false,
            contentType: "application/json",
            success: function (status) {
                //console.log(status);
            },
            error: function (xhr, status, error) {
                console.error('Solicitud post:', status, error);
            }
        });
    }
}


