class Results extends Phaser.Scene {

    constructor() {
        super({ key: 'Results' });
    }
    preload() {
        //Background:
        this.load.image("stop", "resources/img/scene/fondoNivel1.png");
        this.load.image("fondo", "resources/img/interface/pauseFondo1.png");
        this.load.image("fondo2", "resources/img/interface/pauseFondo2.png");

        this.load.image("titulo", "resources/img/interface/RESULTS.png");

        //Botones
        this.load.image("marco", "resources/img/interface/recuadroBoton.png");

        // menu
        this.load.spritesheet('menu',
            'resources/img/interface/botonMenu.png',
            { frameWidth: 120, frameHeight: 47 });

        this.load.spritesheet('retry',
            'resources/img/interface/botonRepeat.png',
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
        /*const confTitulo = {
            origin: 'center',
            x: game.renderer.width / 2,
            y: 100,
            text: 'RESULTS',
            style: {
                color: '#FFFFFF',
                fontSize: 30,
                fontFamily: 'titulo',
            }
        }   */     
        
        const confJugadores = {
            origin: 'center',
            x: 275,
            y: 200,
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 25,
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
                fontSize: 75,
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


        this.add.image(400, 300, "stop");
        this.fondo1 = this.add.image(400,300,"fondo");
        this.fondo1.setScale(1.1);
        this.fondo2 = this.add.image(405,200,"fondo2");
        this.fondo2.setScale(3.35);

        //this.make.text(confTitulo);
        this.add.image(game.renderer.width / 2, 100, 'titulo');

        //menu
        this.menu = this.add.sprite(500, 525, "menu").setInteractive();
        this.marcoMenu = this.add.image(500, 525, 'marco').setVisible(false);

        this.retry = this.add.sprite(300, 525, "retry").setInteractive();
        this.marcoRetry = this.add.image(300, 525, 'marco').setVisible(false);


       //Jugadores
       this.name1 = this.make.text(confJugadores).setText(playersList[0].getName().value); 
       this.icon1 = this.add.image(175, 200, 'charactIcon'+playersList[0].getCharactId());
       this.score1 = this.make.text(confVariables).setText('Score').setPosition(180,280);

       this.score1number = this.make.text(confScore).setText(playersList[0].showScore());
       this.score1number.setPosition(250, 350);

       if (playersList.length > 1) {
           this.name2 = this.make.text(confJugadores).setText(playersList[1].getName().value).setPosition(500, 200);
           this.icon2 = this.add.image(440, 200, 'charactIcon'+playersList[1].getCharactId());
           this.score2 = this.make.text(confVariables).setText('Score').setPosition(450, 280);

           this.score2number = this.make.text(confScore).setText(playersList[1].showScore());
           this.score2number.setPosition(550, 350);        
       }
        
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
            this.scene.start("MainGame");
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
            this.abandonar.setVisible(false);
            this.yes.setVisible(false).disableInteractive();
            this.no.setVisible(false).disableInteractive();
            this.menu.setInteractive();
        })

    }
}
