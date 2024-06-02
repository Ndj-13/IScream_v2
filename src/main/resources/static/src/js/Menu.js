class Menu extends Phaser.Scene {

    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
        this.load.image('background', 'resources/img/interface/pantallaInicio.png');
        this.load.image('title', 'resources/img/interface/LogoI-ScreamFondoBlanco.png');
        // botones
        this.load.spritesheet('playButton',
            'resources/img/interface/BotonPlay.png',
            { frameWidth: 122, frameHeight: 47 });
        this.load.spritesheet('accountButton',
            'resources/img/interface/botonAccount.png',
            { frameWidth: 122, frameHeight: 47 });
        this.load.spritesheet('creditsButton',
            'resources/img/interface/botonCredits.png',
            { frameWidth: 122, frameHeight: 47 });

        // audio
        this.load.audio('menuOst', 'resources/audio/menuOst.mp3');
    }
    create() {

        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////WEBSOCKETS//////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        if (connection == undefined) connection = new WebSocket(`ws://${ipAddress}:8080/echo`);

        connection.onopen = function () {
            console.log(`Socket abierto`);
        }

        connection.onclose = (e) => { //esto se ejecuta cuando se recarga pa pestaña tmb creo
            console.log(`Socket cerrado`);
            /*desconectado = true;
            rivalPlayer = undefined;
            actualPlayer = undefined;
            players = null;
            // va al login otra ve
            this.scene.start('LogIn');*/
            location.reload();
        }

        connection.onmessage = (message) => {
            let msg = JSON.parse(message.data);
            if (msg.type === 'session') this.updateWS(msg.id);
        }

        //audio
        if (menuMusic == false) {
            this.menuOst = this.sound.add('menuOst', { volume: 0.4 });
            this.menuOst.play();
            this.menuOst.setLoop(true);
            menuMusic = true;
        }

        ///////////////////////////////////////////////////////////////////////////
        ////////////////////////////// INTERFAZ ///////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        this.add.image(400, 300, 'background');
        this.add.image(game.renderer.width / 2, 200, 'title');

        this.playButton = this.add.sprite(400, 400, "playButton").setInteractive();
        this.playMarco = this.add.sprite(400,400,"marco").setVisible(false);
        this.creditsButton = this.add.sprite(400, 480, "creditsButton").setInteractive();
        this.creditsMarco = this.add.sprite(400,480,"marco").setVisible(false);
        this.accountButton = this.add.sprite(725, 35, "accountButton").setInteractive();
        this.accountMarco = this.add.sprite(725,35,"marco").setVisible(false);

        ///////////////////////////////////////////////////////////////////////////
        /////////////////////////// FUNCIONALIDADES ///////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        // Online
        this.playButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.playMarco.setVisible(true);
        })
        this.playButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.playMarco.setVisible(false);
        })
        this.playButton.on("pointerdown", () => {
            this.playButton.setFrame(2);
        })
        this.playButton.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.scene.start("CharacterSelect");
        })

        // Creditos
        this.creditsButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.creditsMarco.setVisible(true);
        })
        this.creditsButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.creditsMarco.setVisible(false);
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
            this.accountMarco.setVisible(true);
        })
        this.accountButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.accountMarco.setVisible(false);
        })
        this.accountButton.on("pointerdown", () => {
            this.accountButton.setFrame(2);
        })
        this.accountButton.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.scene.start("ModifyUser");
        })

    }

    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////////// API-REST /////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    updateWS(id) {
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