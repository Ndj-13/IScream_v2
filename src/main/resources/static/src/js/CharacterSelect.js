var socketOpen = true; // para que deje de mandar mensajes cuando se pierde la conexion, si no da error
let activeUsersCount = 0;
let panelsCount = 0;
let player1Panel;
let player2Panel;

class CharacterSelect extends Phaser.Scene {

    constructor() {
        super({ key: 'CharacterSelect' });
        this.panelCreado;
    }

    preload() {
        this.load.image("selectScreenBg", "resources/img/interface/pantallaSeleccion.png");
        this.load.image("chMarkbox", "resources/img/interface/eleccionPersonaje.png");

        //Menu
        this.load.spritesheet('menu',
            'resources/img/interface/botonMenu.png',
            { frameWidth: 120, frameHeight: 47 });

        this.panelCreado = player1Panel;
        player1Panel = new PlayerPanel(this, 225);
        player2Panel = new PlayerPanel(this, 570);

        player1Panel.preload();
        player2Panel.preload();
    }

    create() {
        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////WEBSOCKETS//////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        connection.onclose = (e) => {
            socketOpen = false;
            location.reload();
        }

        connection.onmessage = (message) => {
            let msg = JSON.parse(message.data);
            if (msg.type === "rival") this.updateRivalCSM(msg.name, msg.icy, msg.ready);
        }

        ///////////////////////////////////////////////////////////////////////////
        /////////////////////////////// INTERFAZ //////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        this.add.image(400, 300, 'selectScreenBg');

        //Boton menu: volver al menu
        this.menuButton = this.add.sprite(100, 80, "menu").setInteractive();
        this.marcoMenu = this.add.image(100, 80, 'marco').setVisible(false);

        player1Panel.create();
        if (!this.panelCreado) panelsCount++;

        player2Panel.create();
        player2Panel.invisible();

        //menu:
        this.menuButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.marcoMenu.setVisible(true);
        })
        this.menuButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.marcoMenu.setVisible(false);
        })
        this.menuButton.on("pointerdown", () => {
            this.menuButton.setFrame(1);
        })
        this.menuButton.on("pointerup", () => {
            document.body.style.cursor = "auto";
            player2Panel.invisible();
            panelsCount--;
            actualPlayer.setReady(false);
            this.sendInfo();
            this.scene.start("Menu");
        })
    }

    update() {
        this.sendInfo();
        this.getActiveUsersCount();

        // hacer visible el segundo panel cuando detecta que faltan
        // para que se pueda mostrar el segundo panel, el rival tiene que estar inicializado y su nombre no puede ser '' (en ese caso esq se ha desconectado y todavia no ha vuelto a loggearse)
        if (activeUsersCount > panelsCount && rivalPlayer != null && rivalPlayer.getName() != '') {
            player2Panel.visible(rivalPlayer.getName());
            panelsCount++;
        }
        // ocultar el segundo panel cuando se desconecta el otro
        else if (activeUsersCount > 0 && activeUsersCount < panelsCount) {
            player2Panel.invisible();
            panelsCount--;
        }

        if (activeUsersCount == 1) {
            player1Panel.update();
        } else if (activeUsersCount == 2) {
            player1Panel.update();
            player2Panel.update();
        }

        // EMPEZAR JUEGO (cuando ambos estén ready)
        if (panelsCount == 2 && rivalPlayer && actualPlayer.getReady() && rivalPlayer.getReady()) {
            if (player1Panel.lehallegao) {
                menuMusic == false;
                actualPlayer.setIcy(player1Panel.index);
                this.scene.start('GameLoader');
            }
        }
    }

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////////////// API-REST //////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // obtiene el número de usuarios activos del ConnectedUserController
    getActiveUsersCount() {
        this.prevCount = activeUsersCount;
        $.ajax({
            method: "GET",
            url: `http://${ipAddress}:8080/UsersCount`,
            dataType: 'json'
        }).done(function (data) {
            activeUsersCount = data;
        })
    }

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////WEBSOCKETS//////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // crea el rival en caso de que no lo esté (cuando entra por primera vez) y lo va actualizando
    updateRivalCSM(name, icy, ready) {
        if (rivalPlayer == undefined || rivalPlayer.getName() == '') { // si el nombre es '' esq el rival se ha desconectado y todavia no ha vuelto a loggearse
            rivalPlayer = new Player(name);
        }
        if (icy !== undefined) rivalPlayer.setIcy(icy);
        if (ready !== undefined) rivalPlayer.setReady(ready);
        if (rivalPlayer.getReady() && actualPlayer.getReady() && !player1Panel.lehallegao) player1Panel.lehallegao = true;
        player2Panel.updateColorOk(icy, ready);
    }

    // envía info ws al rival
    sendInfo() {
        let message;
        message =
        {
            ready: actualPlayer.getReady(),
            name: actualPlayer.getName(),
            icy: player1Panel.getIndex(),
        }

        if (socketOpen) {
            connection.send(JSON.stringify(message));
        }
    }
}