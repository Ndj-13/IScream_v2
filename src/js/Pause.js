class Pause{

    constructor(scene) {
        this.scene = scene;
    }
    preload() {
        this.scene.load.image("fondo1", "resources/img/interface/pauseFondo_chico.png");
        this.scene.load.image("titulo", "resources/img/interface/PAUSE.png");

        //Botones
        this.scene.load.image("marco", "resources/img/interface/recuadroBoton.png");

        // menu
        this.scene.load.spritesheet('menu',
            'resources/img/interface/botonMenu.png',
            { frameWidth: 120, frameHeight: 47 });
        
        this.scene.load.spritesheet('retry',
            'resources/img/interface/botonRepeat.png',
            { frameWidth: 120, frameHeight: 47 });

        //Pestaña aviso
        this.scene.load.image('aviso', 'resources/img/interface/Warning.png');
        this.scene.load.spritesheet('yes', 'resources/img/interface/confirmButton.png', { frameWidth: 120, frameHeight: 47 });
        this.scene.load.spritesheet('no', 'resources/img/interface/cancelButton.png', { frameWidth: 120, frameHeight: 47 });

    }

    create() {
        //Titulo PAUSA
        /*const confTitulo = {
            origin: 'center',
            x: game.renderer.width / 2,
            y: 150,
            text: 'PAUSE',
            style: {
                color: '#FFFFFF',
                fontSize: 30,
                fontFamily: 'titulo',
            }
        }   */     
        const confTexto = {
            origin: 'right',
            style: {
                fontFamily: 'estilo',
                color: '#0000000',
                fontSize: 20,
            }
        }
        //this.titulo = this.scene.make.text(confTitulo);  
        this.titulo = this.scene.add.image(game.renderer.width / 2, 150, 'titulo');
        this.titulo.setScale(0.8);
      
        this.fondo1 = this.scene.add.image(400,300,"fondo1");
        this.fondo1.setScale(1.1);


        //Botones
        this.menu = this.scene.add.sprite(400, 250, "menu").setInteractive();
        this.marcoMenu = this.scene.add.image(400, 250, 'marco').setVisible(false);

        this.retry = this.scene.add.sprite(400, 325, "retry").setInteractive();
        this.marcoRetry = this.scene.add.image(400, 325, 'marco').setVisible(false);

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
        this.abandonar = this.scene.make.text(confTexto).setText(
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
            this.scene.scene.start("HomeScreen");
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
            for(var i = 0; i < playersList.length; i++)
            {
                playersList[i].resetScore()
            }
            this.scene.scene.start("MainGame");
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
            this.scene.scene.start("HomeScreen");
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

    destroy(){
        this.titulo.destroy();
        this.no.destroy();
        this.yes.destroy();
        this.abandonar.destroy();
        this.menu.destroy();
        this.retry.destroy();
        this.niebla.destroy();
        this.fondo1.destroy();
        this.marcoMenu.destroy();
        this.marcoYes.destroy();
        this.marcoNo.destroy();
    }
}
