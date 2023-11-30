class Pause extends Phaser.Scene {

    constructor() {
        super({ key: 'Pause' });
    }
    preload() {
        //Background:
        this.load.image("stop", "resources/img/scene/fondoNivel1.png");

        //Botones
        this.load.image("marco", "resources/img/interface/recuadroBoton.png");

        //x
        this.load.spritesheet('exit',
            'resources/img/interface/closeButton.png',
            { frameWidth: 80, frameHeight: 47 });

        // menu
        this.load.spritesheet('menu',
            'resources/img/interface/botonMenu.png',
            { frameWidth: 120, frameHeight: 47 });

        //Iconos:
        this.load.image('iconoJ1', 'resources/img/players/purpleIceHead.png');
        this.load.image('iconoJ2', 'resources/img/players/blueIceHead.png');

        //Variables
        //Puntuacion:

        //Pestaña aviso
        this.load.image('aviso', 'resources/img/interface/Warning.png');

        this.load.spritesheet('yes', 'resources/img/interface/confirmButton.png', { frameWidth: 120, frameHeight: 47 });
        this.load.spritesheet('no', 'resources/img/interface/cancelButton.png', { frameWidth: 120, frameHeight: 47 });

    }

    create() {
        //CREACION ESCENA
        //Background
        this.add.image(400, 300, "stop");

        //Titulo PAUSA
        //Modo de juego:
        const confTitulo = {
            origin: 'center',
            x: game.renderer.width / 2,
            y: 100,
            text: 'PAUSA',
            style: {
                color: '#000000',
                fontSize: 30,
                fontFamily: 'titulo',
            }
        }
        this.make.text(confTitulo);

        //Recuadro
        let recuadroP = this.add.graphics({
            fillStyle: {
                color: 0xFFFFFF, //color barra de cargar (CAMBIAR)
                alpha: 0.4,
            }
        })
        recuadroP.fillRect(80, 140, 640, 300);

        let resaltarP = this.add.graphics({
            fillStyle: {
                color: 0xF5DCA2, //color barra de cargar (CAMBIAR)
                alpha: 1
            }
        })
        resaltarP.fillRect(80, 140, 640, 75);

        //Botones
        //x
        this.exit = this.add.sprite(710, 70, "exit").setInteractive();
        this.exit.setScale(0.8);
        //menu
        this.menu = this.add.sprite(400, 500, "menu").setInteractive();
        this.marcoMenu = this.add.image(400, 500, 'marco').setVisible(false);
        //this.marcoMenu.setScale("1");

        //Jugadores
        /*const confJugadores = {
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
        // player1T.text es el nombre del jugador 1, igual con el 2
        this.make.text(confJugadores).setText(player1T.text);                                                
        this.make.text(confJugadores).setText(player2T.text).setPosition(game.renderer.width * 3 / 4, 180);*/

        //Iconos jugadores
        this.add.image(140, 180, 'iconoJ1');
        this.add.image(440, 180, 'iconoJ2');

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
        this.make.text(confVariables).setText('Score').setPosition(150,270);
        //this.add.image(260, 270, 'vidaJ1');

        this.make.text(confVariables).setText('Score').setPosition(450, 270);
        //this.add.image(610, 270, 'vidaJ2');

        /*let vidaJ1 = this.add.graphics({
            fillStyle: {
                color: 0x32C93B
            }
        })
        
        //Vida Jugador 1:
        if (player1.health == 100) {
            vidaJ1.fillRect(214, 267, 132, 10);
        } else if (player1.health < 100 && player1.health > 0) {
            vidaJ1.fillRect(214, 267, (132 / 100) * player1.health, 10);
        } else if (player1.health <= 0) {
            vidaJ1.fillRect(214, 267, 0, 10);
        }
        //Vida Jugador 2:
        if (player2.health == 100) {
            vidaJ1.fillRect(657, 267, -132, 10);
        } else if (player2.health < 100 && player1.health > 0) {
            vidaJ1.fillRect(657, 267, -(132 / 100) * player2.health, 10);
        } else if (player2.health <= 0) {
            vidaJ1.fillRect(657, 267, 0, 10);
        }
*/
        
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
        //this.pestaña = this.add.image(400, 300, 'aviso').setVisible(false);
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
        //exit
        this.exit.on("pointerover", () => {
            document.body.style.cursor = "pointer";
        })
        this.exit.on("pointerout", () => {
            document.body.style.cursor = "auto";
        })
        this.exit.on("pointerdown", () => {
            this.exit.setFrame(1);
        })
        this.exit.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.scene.start('MainGame')
        })
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
            this.exit.disableInteractive();
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
            //this.pestaña.setVisible(false);
            this.abandonar.setVisible(false);
            this.yes.setVisible(false).disableInteractive();
            this.no.setVisible(false).disableInteractive();
            this.menu.setInteractive();
            this.exit.setInteractive();
        })

    }
}
