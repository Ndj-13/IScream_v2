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