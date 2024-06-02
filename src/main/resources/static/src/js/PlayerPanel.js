class PlayerPanel {

    constructor(scene, x) {
        this.scene = scene;
        this.posX = x;
        this.index = 1;
        this.options = 4; // 4 skins disponibles
        this.lehallegao = true;
        this.ok1;
    }

    preload() {
        this.scene.load.image("bg", "resources/img/interface/eleccionPersonaje.png");
        this.scene.load.image("arrow", "resources/img/interface/flechita.png");

        // botones
        this.scene.load.spritesheet('ok',
            'resources/img/interface/botonOk.png',
            { frameWidth: 120, frameHeight: 47 });
        this.scene.load.spritesheet('menu',
            'resources/img/interface/botonMenu.png',
            { frameWidth: 120, frameHeight: 47 });

        //Skins disponibles
        for (var i = 1; i <= this.options; i++) {
            this.scene.load.spritesheet('icy' + i,
                'resources/img/players/SpritesheetP' + i + '(Andar).png',
                { frameWidth: 64, frameHeight: 64 });
        }
    }

    create() {
        ///////////////////////////////////////////////////////////////////////////
        ////////////////////////////// INTERFAZ ///////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        const confNombreLogin = {
            origin: 'center',
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 30,
                fontStyle: 'bold'
            }
        }
        this.nameText = this.scene.make.text(confNombreLogin).setText(actualPlayer.getName()).setPosition(this.posX, 150);
        // recuadro personaje
        this.bg = this.scene.add.image(this.posX, 300, "bg").setScale(3.5);

        this.charactArray = [];
        for (var i = 1; i <= this.options; i++) {
            this.character = this.scene.add.sprite(this.posX, 285, 'icy' + i).setInteractive();
            this.character.setFrame(3);
            this.character.setScale(3);

            this.charactArray.push(this.character);

            this.scene.anims.create({
                key: 'pose' + i,
                frames: this.scene.anims.generateFrameNumbers('icy' + i, { start: 0, end: 4 }),
                frameRate: 10,
                repeat: -1
            })
            if (i != 1) this.character.setVisible(false);
        }
        console.log(this.charactArray);

        this.rightArrow = this.scene.add.image(this.posX + 100, 300, "arrow").setInteractive();
        this.leftArrow = this.scene.add.image(this.posX - 100, 300, "arrow").setInteractive();
        this.leftArrow.flipX = true;

        this.ok1 = this.scene.add.sprite(this.posX, 450, "ok").setInteractive();
        this.okMarco = this.scene.add.image(this.posX, 450, 'marco').setVisible(false);

        ///////////////////////////////////////////////////////////////////////////
        /////////////////////////// FUNCIONALIDADES ///////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        this.rightArrow.on("pointerover", () => {
            document.body.style.cursor = "pointer";
        })
        this.rightArrow.on("pointerout", () => {
            document.body.style.cursor = "auto";
        })
        this.rightArrow.on("pointerdown", () => {
            this.charactArray[this.index-1].setVisible(false);
            this.index++;
            if (this.index > this.options) this.index = 1;
            this.charactArray[this.index-1].setVisible(true);
        })

        this.leftArrow.on("pointerover", () => {
            document.body.style.cursor = "pointer";
        })
        this.leftArrow.on("pointerout", () => {
            document.body.style.cursor = "auto";
        })
        this.leftArrow.on("pointerdown", () => {
            this.charactArray[this.index-1].setVisible(false);
            this.index--;
            if (this.index <= 0) this.index = this.options;
            this.charactArray[this.index-1].setVisible(true);
        })

        this.ok1.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.okMarco.setVisible(true);
        })
        this.ok1.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.okMarco.setVisible(false);
        })

        this.ok1.on("pointerdown", () => {
            actualPlayer.setReady(true);
            if (rivalPlayer != null && rivalPlayer.getReady() == true) this.lehallegao = false;
            this.ok1.setFrame(1);
            this.rightArrow.disableInteractive();
            this.leftArrow.disableInteractive();
        })

        this.ok1.on("pointerup", () => {
            document.body.style.cursor = "auto";
        })
    }

    update() {
        this.charactArray[this.index-1].anims.play('pose' + (this.index), true);
    }

    invisible() {
        for (var i = 0; i < this.charactArray.length; i++) {
            this.charactArray[i].setVisible(false);
        }
        this.okMarco.setVisible(false);
        this.bg.setVisible(false);
        this.nameText.setVisible(false);

        this.leftArrow.setVisible(false);
        this.leftArrow.disableInteractive();

        this.rightArrow.setVisible(false);
        this.rightArrow.disableInteractive();

        this.ok1.setVisible(false);
        this.ok1.disableInteractive();
    }

    visible(rival) {
        this.charactArray[this.index-1].setVisible(true);

        this.bg.setVisible(true);
        this.ok1.setVisible(true);

        this.nameText.setText(rival);
        this.nameText.setVisible(true)
    }

    updateColorOk(color, ready) {
        this.charactArray[this.index-1].setVisible(false);
        this.index = color;
        this.charactArray[this.index-1].setVisible(true);
        if (ready) {
            this.ok1.setFrame(1);
        } else {
            this.ok1.setFrame(0);
        }
    }

    getIndex() {
        return this.index;
    }
    setIndex(idx) {
        this.index = idx;
    }
}