class Pause {

    constructor(scene) {
        this.scene = scene;
        this.retry = false;
        this.menu = false;
    }
    preload() {
        this.scene.load.image("fondo1", "resources/img/interface/pauseFondo_chico.png");
        this.scene.load.image("titulo", "resources/img/interface/PAUSE.png");
        this.scene.load.image("controlsTit", "resources/img/interface/CONTROLS.png");
        this.scene.load.image("controlsFlechas", "resources/img/scene/tutorialSoloFlechas.png");
        this.scene.load.image("controlsLetras", "resources/img/scene/tutorialSoloLetras.png");
        this.scene.load.image("textBanner2", "resources/img/interface/banner2.png");
        
        // menu
        this.scene.load.spritesheet('menu',
            'resources/img/interface/botonMenu.png',
            { frameWidth: 120, frameHeight: 47 });

        this.scene.load.spritesheet('retry',
            'resources/img/interface/botonRepeat.png',
            { frameWidth: 120, frameHeight: 47 });

        //Pestaña aviso
        this.scene.load.spritesheet('yes', 'resources/img/interface/confirmButton.png', { frameWidth: 120, frameHeight: 47 });
        this.scene.load.spritesheet('no', 'resources/img/interface/cancelButton.png', { frameWidth: 120, frameHeight: 47 });

    }

    create() {
        ///////////////////////////////////////////////////////////////////////////
        ////////////////////////////// INTERFAZ ///////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        const confTexto = {
            origin: 'right',
            style: {
                fontFamily: 'estilo',
                color: '#0000000',
                fontSize: 20,
            }
        }
        this.titulo = this.scene.add.image(game.renderer.width / 2, 150, 'titulo');
        this.titulo.setScale(0.8);

        this.fondo1 = this.scene.add.image(400, 280, "fondo1");
        this.fondo1.setScale(1.1);

        this.tutorialTitle = this.scene.add.image(game.renderer.width / 2, 425, 'controlsTit').setScale(0.9);
        this.tutorial = this.scene.add.image(400, 515, 'controlsLetras').setScale(0.9);

        //Botones
        this.menuButton = this.scene.add.sprite(400, 250, "menu").setInteractive();
        this.marcoMenu = this.scene.add.image(400, 250, 'marco').setVisible(false);

        this.retryButton = this.scene.add.sprite(400, 310, "retry").setInteractive();
        this.marcoRetry = this.scene.add.image(400, 310, 'marco').setVisible(false);

        //Mensaje abandonar partida
        this.niebla = this.scene.add.graphics({
            fillStyle: {
                color: 0x828282,
                alpha: 0.6,
            }
        })
        this.niebla.fillRect(0, 0, 800, 600).setVisible(false);
        this.fondoAbandonar = this.scene.add.image(400,330,'textBanner2').setVisible(false).setScale(3.3);
        this.abandonar = this.scene.make.text(confTexto).setText(
            'Are you sure you want to exit?').setPosition(
                400, 290).setFontSize(25).setVisible(false);

        //yes y no
        this.yes = this.scene.add.sprite(300, 350, 'yes').setVisible(false);
        this.marcoYes = this.scene.add.image(300, 350, 'marco').setVisible(false);

        this.no = this.scene.add.sprite(500, 350, 'no').setVisible(false);
        this.marcoNo = this.scene.add.image(500, 350, 'marco').setVisible(false);

        ///////////////////////////////////////////////////////////////////////////
        /////////////////////////// FUNCIONALIDADES ///////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        //menu
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
            this.menuButton.setFrame(0);
            document.body.style.cursor = "auto";
            this.niebla.setVisible(true);
            this.fondoAbandonar.setVisible(true);
            this.abandonar.setVisible(true);
            this.yes.setVisible(true).setInteractive();
            this.no.setVisible(true).setInteractive();
        })

        //retry
        this.retryButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.marcoRetry.setVisible(true);
        })
        this.retryButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.marcoRetry.setVisible(false);
        })
        this.retryButton.on("pointerdown", () => {
            this.retryButton.setFrame(1);
        })
        this.retryButton.on("pointerup", () => {
            this.retry = true;
            document.body.style.cursor = "auto";
            this.retryButton.setFrame(0);
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
        })
        this.yes.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.menu = true;
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
        })
        this.no.on("pointerup", () => {
            this.no.setFrame(0);
            document.body.style.cursor = "auto";
            this.niebla.setVisible(false);
            this.abandonar.setVisible(false);
            this.fondoAbandonar.setVisible(false);
            this.yes.setVisible(false).disableInteractive();
            this.marcoYes.setVisible(false);
            this.no.setVisible(false).disableInteractive();
            this.marcoNo.setVisible(false);
            this.menuButton.setInteractive();
        })
    }

    // getters y setters pa q no se raye cambiando esas variables
    getRetry() {
        return this.retry;
    }
    setRetry(retry) {
        this.retry = retry;
    }

    getMenu(){
        return this.menu;
    }
    setMenu(menu) {
        this.menu = menu;
    }

    setVisible() {
        this.titulo.setVisible(true);
        this.menuButton.setVisible(true);
        this.retryButton.setVisible(true);
        this.fondo1.setVisible(true);
        this.tutorial.setVisible(true);
        this.tutorialTitle.setVisible(true);
    }

    setInvisible() {
        this.titulo.setVisible(false);
        this.menuButton.setVisible(false);
        this.retryButton.setVisible(false);
        this.fondo1.setVisible(false);
        this.tutorial.setVisible(false);
        this.tutorialTitle.setVisible(false);
    }
}