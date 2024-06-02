class Results extends Phaser.Scene {

    constructor() {
        super({ key: 'Results' });
    }

    preload() {
        //Background
        this.load.image("fondo", "resources/img/scene/fondoNivel1.png");
        this.load.image("defeat", "resources/img/interface/pantallaDefeat2.png");
        this.load.image("victory", "resources/img/interface/pantallaVictory2.png");
        this.load.image("draw", "resources/img/interface/pantallaDraw.png");

        //Botones
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
        //this.load.image('aviso', 'resources/img/interface/pauseFondo1.png');
        //this.load.spritesheet('yes', 'resources/img/interface/confirmButton.png', { frameWidth: 120, frameHeight: 47 });
        //this.load.spritesheet('no', 'resources/img/interface/cancelButton.png', { frameWidth: 120, frameHeight: 47 });

    }

    create() {
        ///////////////////////////////////////////////////////////////////////////
        ////////////////////////////// WEBSOCKETS /////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        connection.send(JSON.stringify({ endGame: true }));

        connection.onclose = (e) => {
            console.log(`Socket cerrado`);
            /*desconectado = true;
            rivalPlayer = undefined;
            actualPlayer = undefined;
            players = null;
            this.scene.start('LogIn');*/
            location.reload();
        }

        connection.onmessage = (message) => {
            let msg = JSON.parse(message.data);
        }

        this.updateHighScores();

        ///////////////////////////////////////////////////////////////////////////
        /////////////////////////////// INTERFAZ //////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        // 1 letra es tamaño 20+30(100%) = 50, 20 letras es tamaño 20+0(0%) = 20
        this.letras = actualPlayer.getName().length < rivalPlayer.getName().length ? rivalPlayer.getName().length : actualPlayer.getName().length;
        this.porc = this.letras <= 20 ? 30 * ((20 - this.letras) / 19) : 0
        console.log('20 + ' + this.porc);
        const confJugadores = {
            origin: 'center',
            x: 275,
            y: 200,
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 20 + this.porc,
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
        if (actualPlayer.getScore() > rivalPlayer.getScore()) { // ganador: actualplayer
            this.fondo = this.add.image(400, 270, "victory");
            this.fondo.setScale(1.1);
            this.crown = this.add.image(460, 250, 'crown'); // corona a la dcha
            this.crown.rotation = Phaser.Math.DegToRad(-35);
        } else if (actualPlayer.getScore() < rivalPlayer.getScore()) { // ganador: rivalplayer
            this.fondo = this.add.image(400, 270, "defeat");
            this.fondo.setScale(1.1);
            this.crown = this.add.image(340, 250, 'crown'); // corona a la izda
            this.crown.rotation = Phaser.Math.DegToRad(35);
        } else {
            this.fondo = this.add.image(400, 270, "draw"); // cambiar a una de empate
            this.fondo.setScale(1.1);
        }

        // POSICION A LA IZDA
        this.nameI = this.make.text(confJugadores).setText(rivalPlayer.getName()).setPosition(265, 270);
        this.iconI = this.add.image(210, 350, 'icy' + rivalPlayer.getIcy()).setScale(2);
        this.scoreI = this.make.text(confVariables).setText('Score').setPosition(320, 410);
        this.scoreInumber = this.make.text(confScore).setText(rivalPlayer.getScore()).setPosition(320, 350);

        // POSICION A LA DCHA
        this.nameD = this.make.text(confJugadores).setText(actualPlayer.getName()).setPosition(535, 270);
        this.iconD = this.add.image(480, 350, 'icy' + actualPlayer.getIcy()).setScale(2);
        this.scoreD = this.make.text(confVariables).setText('Score').setPosition(590, 410);
        this.scoreDnumber = this.make.text(confScore).setText(actualPlayer.getScore()).setPosition(590, 350);

        /////// BOTONES ////////
        this.menu = this.add.sprite(500, 525, "menu").setInteractive();
        this.marcoMenu = this.add.image(500, 525, 'marco').setVisible(false);

        this.retry = this.add.sprite(300, 525, "retry").setInteractive();
        this.marcoRetry = this.add.image(300, 525, 'marco').setVisible(false);

        this.highScores = this.add.sprite(720, 550, "highScores").setInteractive();
        this.marcoHighScores = this.add.image(720, 550, 'marco').setVisible(false);

        //Mensaje abandonar partida
        this.niebla = this.add.graphics({
            fillStyle: {
                color: 0x828282,
                alpha: 0.6,
            }
        })
        this.niebla.fillRect(0, 0, 800, 600).setVisible(false);
        this.banner = this.add.image(400,330, 'textBanner2').setVisible(false).setScale(3.3);
        this.abandonar = this.make.text(confVariables).setText(
            'Are you sure you want to exit?').setPosition(
                400, 290).setFontSize(25).setVisible(false);

        this.yes = this.add.sprite(300, 350, 'yes').setVisible(false);
        this.marcoYes = this.add.image(300, 350, 'marco').setVisible(false);

        this.no = this.add.sprite(500, 350, 'no').setVisible(false);
        this.marcoNo = this.add.image(500, 350, 'marco').setVisible(false);

        ///////////////////////////////////////////////////////////////////////////
        //////////////////////////// FUNCIONALIDADES //////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
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
            this.banner.setVisible(true);
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

            this.scene.start("CharacterSelect");
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

            this.scene.start("Menu");
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
            this.banner.setVisible(false);
            this.abandonar.setVisible(false);
            this.yes.setVisible(false).disableInteractive();
            this.no.setVisible(false).disableInteractive();
            this.menu.setInteractive();
        })

        // highscores
        this.highScores.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.marcoHighScores.setVisible(true);
        })
        this.highScores.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.marcoHighScores.setVisible(false);
        })
        this.highScores.on("pointerdown", () => {
            this.highScores.setFrame(1);
            this.scene.start("HighScores");
        })
        this.highScores.on("pointerup", () => {
            this.highScores.setFrame(0);
        })
    }

    updateHighScores() {
        console.log(actualPlayer);
        $.ajax({
            type: "POST",
            url: `http://${ipAddress}:8080/Score`,
            data: JSON.stringify({ name: actualPlayer.getName(), score: actualPlayer.getScore(), }),
            processData: false,
            contentType: "application/json",
            error: function (xhr, status, error) {
                console.error('Solicitud post:', status, error);
            }
        });
    }
}


