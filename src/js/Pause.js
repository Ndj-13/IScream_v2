class Pause{

    constructor(scene) {
        this.scene = scene;
    }
    preload() {
        //Botones
        this.scene.load.image("marco", "resources/img/interface/recuadroBoton.png");

        //x
        this.scene.load.spritesheet('exit',
            'resources/img/interface/closeButton.png',
            { frameWidth: 80, frameHeight: 47 });

        // menu
        this.scene.load.spritesheet('menu',
            'resources/img/interface/botonMenu.png',
            { frameWidth: 120, frameHeight: 47 });

        //Iconos:
        this.scene.load.image('iconoJ1', 'resources/img/players/purpleIceHead.png');
        this.scene.load.image('iconoJ2', 'resources/img/players/blueIceHead.png');

        //Variables
        //Puntuacion:

        //Pestaña aviso
        this.scene.load.image('aviso', 'resources/img/interface/Warning.png');
        this.scene.load.spritesheet('yes', 'resources/img/interface/confirmButton.png', { frameWidth: 120, frameHeight: 47 });
        this.scene.load.spritesheet('no', 'resources/img/interface/cancelButton.png', { frameWidth: 120, frameHeight: 47 });

    }

    create() {
        //Titulo PAUSA
        const confTitulo = {
            origin: 'center',
            x: game.renderer.width / 2,
            y: 100,
            text: 'PAUSE',
            style: {
                color: '#000000',
                fontSize: 30,
                fontFamily: 'titulo',
            }
        }
        this.titulo = this.scene.make.text(confTitulo);

        //Recuadro CAMBIAR QUEDA FEO
        this.recuadroP = this.scene.add.graphics({
            fillStyle: {
                color: 0xFFFFFF,
                alpha: 1,
            }
        })
        this.recuadroP.fillRect(80, 140, 640, 300);

        this.resaltarP = this.scene.add.graphics({
            fillStyle: {
                color: 0xF5DCA2,
                alpha: 1
            }
        })
        this.resaltarP.fillRect(80, 140, 640, 75);

        //Botones
        this.menu = this.scene.add.sprite(400, 500, "menu").setInteractive();
        this.marcoMenu = this.scene.add.image(400, 500, 'marco').setVisible(false);
        //this.marcoMenu.setScale("1");

        //Jugadores
        const confJugadores = {
            origin: 'center',
            x: 240,
            y: 180,
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 25,
                fontStyle: 'bold',
                textAlign: 'center',
                justifyContent: 'center',
            }
        }
        this.name1 = this.scene.make.text(confJugadores).setText(playersList[0].getName().value);                                                
        this.icon1 = this.scene.add.image(140, 180, 'iconoJ1');

        if (playersList.length > 1) {
            this.name2 = this.scene.make.text(confJugadores).setText(playersList[1].getName().value).setPosition(540, 180);
            this.icon2 = this.scene.add.image(440, 180, 'iconoJ2');        
            this.score2 = this.scene.make.text(confVariables).setText('Score').setPosition(450, 270);
        }

        //Variables
        const confVariables = {
            origin: 'right',
            style: {
                fontFamily: 'estilo',
                color: '#0000000',
                fontSize: 20,
            }
        }
        //Puntuación
        this.score1 = this.scene.make.text(confVariables).setText('Score').setPosition(150,270);
        //this.add.image(260, 270, 'vidaJ1');
        
        //Mensaje abandonar partida
        //tapar fondo
        this.niebla = this.scene.add.graphics({
            fillStyle: {
                color: 0x828282,
                alpha: 0.6,
            }
        })        
        
        //warning
        this.niebla.fillRect(0, 0, 800, 600).setVisible(false);
        //this.pestaña = this.add.image(400, 300, 'aviso').setVisible(false);
        this.abandonar = this.scene.make.text(confVariables).setText(
            'Are you sure you want to exit?').setPosition(
                400, 230).setFontSize(25).setVisible(false);

        //yes y no
        this.yes = this.scene.add.sprite(300, 350, 'yes').setVisible(false);
        this.marcoYes = this.scene.add.image(300, 350, 'marco').setVisible(false);
        this.marcoYes.scale = 1.2;

        this.no = this.scene.add.sprite(500, 350, 'no').setVisible(false);
        this.marcoNo = this.scene.add.image(500, 350, 'marco').setVisible(false);
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
            //this.pestaña.setVisible(true);
            this.abandonar.setVisible(true);
            this.yes.setVisible(true).setInteractive();
            this.no.setVisible(true).setInteractive();
            this.menu.disableInteractive();
            //this.exit.disableInteractive();
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
            this.scene.scene.start("CharacterSelect");
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
            //this.pestaña.setVisible(false);
            this.abandonar.setVisible(false);
            this.yes.setVisible(false).disableInteractive();
            this.no.setVisible(false).disableInteractive();
            this.menu.setInteractive();
            //this.exit.setInteractive();
        })

    }

    destroy(){
        this.titulo.destroy();
        this.no.destroy();
        this.yes.destroy();
        this.abandonar.destroy();
        this.menu.destroy();
        this.niebla.destroy();
        this.recuadroP.destroy();
        this.resaltarP.destroy();
        this.marcoMenu.destroy();
        this.marcoYes.destroy();
        this.marcoNo.destroy();
        this.name1.destroy();
        this.icon1.destroy();
        this.score1.destroy();
        if (playersList.length > 1) {
            this.name2.destroy();
            this.icon2.destroy();
            this.score2.destroy();
        }
    }
}
