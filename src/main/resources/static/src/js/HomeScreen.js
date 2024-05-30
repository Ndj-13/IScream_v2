class HomeScreen extends Phaser.Scene {

    constructor() {
        super({ key: 'HomeScreen' });
    }

    preload() {
        this.load.image('background', 'resources/img/interface/pantallaInicio.png');
        this.load.image('title', 'resources/img/interface/LogoI-ScreamFondoBlanco.png');
        this.load.spritesheet('playButton',
            'resources/img/interface/botonLocal.png',
            { frameWidth: 124, frameHeight: 47 });
        this.load.spritesheet('onlineBt',
            'resources/img/interface/botonOnline.png',
            { frameWidth: 124, frameHeight: 47 });

        this.load.spritesheet('creditsButton',
            'resources/img/interface/botonCredits.png',
            { frameWidth: 124, frameHeight: 47 });

        this.load.spritesheet('accountButton',
            'resources/img/interface/botonAccount.png',
            { frameWidth: 122, frameHeight: 47 });

        //this.load.image('markbox', "resources/img/interface/recuadroBoton.png");

        //audio
        this.load.audio('menuOst', 'resources/audio/menuOst.mp3');
    }
    create() {

        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////WEBSOCKETS//////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        if(connection == undefined) connection = new WebSocket(`ws://${ipAddress}:8080/echo`);

        connection.onopen = function () {
            console.log(`Socket abierto`);
        }

        connection.onclose = (e) => { //esto se ejecuta cuando se recarga pa pestaña tmb creo
            console.log(`Socket cerrado`);
            desconectado = true;
            rivalPlayer = undefined;
            actualPlayer = undefined;
            players = null;
            // va al login otra ve
            this.scene.start('LogIn');
            //endSession(actualPlayer.getName());
        }

        connection.onmessage = (message) => {
            let msg = JSON.parse(message.data);
            if (msg.type === 'session') this.updateWS(msg.id);
        }

        /*
        //Al recargar la pestaña se desconecta el usuario 
        window.addEventListener('beforeunload', () => {
            deleteActiveUser(actualPlayer.getName());
        });
*/
        //audio
        if (menuMusic == false) {
            this.menuOst = this.sound.add('menuOst', { volume: 0.4 });
            this.menuOst.play();
            this.menuOst.setLoop(true);
            menuMusic = true;
        }


        this.add.image(400, 300, 'background');
        this.add.image(game.renderer.width / 2, 200, 'title');


        this.playButton = this.add.sprite(400, 400, "playButton").setInteractive();
        this.onlineBt = this.add.sprite(400, 460, "onlineBt").setInteractive()
        this.creditsButton = this.add.sprite(400, 520, "creditsButton").setInteractive();
        this.accountButton = this.add.sprite(725, 35, "accountButton").setInteractive();

        //this.markbox = this.add.image(400, 425, 'markbox').setVisible(false);
        //this.markbox.setScale(1.2);

        // Local
        this.playButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.playButton.setFrame(1);
        })

        this.playButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.playButton.setFrame(0);
        })

        this.playButton.on("pointerdown", () => {
            this.playButton.setFrame(2);
        })

        this.playButton.on("pointerup", () => {
            document.body.style.cursor = "auto";

            this.scene.start("CharacterSelect");
        })

        // Online
        this.onlineBt.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.onlineBt.setFrame(1);
        })

        this.onlineBt.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.onlineBt.setFrame(0);
        })

        this.onlineBt.on("pointerdown", () => {
            this.onlineBt.setFrame(2);
        })

        this.onlineBt.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.scene.start("CharacterSelectMultiplayer");
        })

        // Creditos
        this.creditsButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.creditsButton.setFrame(1);
        })

        this.creditsButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.creditsButton.setFrame(0);
        })

        this.creditsButton.on("pointerdown", () => {
            this.creditsButton.setFrame(2);
        })

        this.creditsButton.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.scene.start("Creditos");
        })

        // Account
        this.accountButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.accountButton.setFrame(1);
        })

        this.accountButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.accountButton.setFrame(0);
        })

        this.accountButton.on("pointerdown", () => {
            this.accountButton.setFrame(2);
        })

        this.accountButton.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.scene.start("ModifyUser");
        })

    }

    updateWS(id){
        console.log('entra en updateWS');
        $.ajax({
            method: "PUT",
            url: `http://${ipAddress}:8080/User/` + id,
            data: JSON.stringify({ name: actualPlayer.getName(), id: id }),
            processData: false,
            contentType: "application/json",
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " " + jqXHR.status + " " + errorThrown);
            }
        });
    }
}