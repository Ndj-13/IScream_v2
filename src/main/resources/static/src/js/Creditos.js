class Creditos extends Phaser.Scene {

    constructor() {
        super({ key: 'Creditos' })
    }

    preload() {
        this.load.image("selectScreenBg", "resources/img/interface/pantallaSeleccion.png");
        this.load.image("chMarkbox", "resources/img/interface/eleccionPersonaje.png");
        this.load.image("tituloCredits", 'resources/img/interface/CREDITS.png');

        this.load.spritesheet('menu',
            'resources/img/interface/botonMenu.png',
            { frameWidth: 120, frameHeight: 47 });

    }
    create() {

        /////// WEBSOCKETS ///////
        connection.onclose = (e) => {
            console.log(`Socket cerrado`);
            location.reload();
        }

        /////// FONDO ///////
        this.add.image(400, 300, 'selectScreenBg');
        this.add.image(400, 150, 'tituloCredits');

        /////// MENU ///////
        this.menuButton = this.add.sprite(100, 80, "menu").setInteractive();
        this.marcoMenu = this.add.image(100, 80, 'marco').setVisible(false);

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
            this.scene.start("Menu");
        })

        ////// NOMBRES //////
        const confNombres = {
            origin: 'center',
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 25,
                fontStyle: 'bold',
                textAlign: 'center',
                justifyContent: 'center',
            }
        }
        this.make.text(confNombres).setText('Óscar Alarcón Riera').setPosition(400, 250);
        this.make.text(confNombres).setText('Nerea Díaz Jérica').setPosition(400, 300);
        this.make.text(confNombres).setText('Adriana Sánchez Illán').setPosition(400, 350);
        this.make.text(confNombres).setText('Jorge Sanz Coronel').setPosition(400, 400);
        this.make.text(confNombres).setText('Rosa Suffo García').setPosition(400, 450);
    }
}