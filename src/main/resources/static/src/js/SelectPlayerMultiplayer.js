class SelectPlayerMultiplayer {

    constructor(scene, x, id) {
        this.playerId = id
        this.scene = scene;
        this.posX = x;
        this.options = 2;
        this.index = 0;
        console.log('constructor');
    }

    preload() {
        console.log('preload');
        this.scene.load.image("selectScreenBg", "resources/img/interface/pantallaSeleccion.png");
        this.scene.load.image('markbox', "resources/img/interface/recuadroBoton.png"); //REPE
        this.scene.load.image("chMarkbox", "resources/img/interface/eleccionPersonaje.png");
        this.scene.load.image("arrow", "resources/img/interface/flechita.png");
        //Aceptar
        this.scene.load.spritesheet('ok',
            'resources/img/interface/botonOk.png',
            { frameWidth: 120, frameHeight: 47 });
        //Menu
        this.scene.load.spritesheet('menu',
            'resources/img/interface/botonMenu.png',
            { frameWidth: 120, frameHeight: 47 });

        //Personajes disponibles
        for (var i = 1; i <= this.options; i++) {
            this.scene.load.spritesheet('character' + i,
                'resources/img/players/SpritesheetP' + i + '(Andar).png',
                { frameWidth: 64, frameHeight: 64 });
        }
    }

    create() {
        console.log('create');

        const confNombreLogin = {
            origin: 'center',
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 30,
                fontStyle: 'bold'
            }
        }

        // dnd pone nombrelogin va la variable q guarda el nombre del usuario q ha iniciao sesion  nose cual es
        console.log(playersList[0]);
        this.scene.make.text(confNombreLogin).setText(playersList[0].getName()).setPosition(this.posX, 150);

        //Recuadro personaje 1
        this.scene.add.image(this.posX, 300, "chMarkbox").setScale(3.5);

        this.charactArray = [];
        for (var i = 1; i <= this.options; i++) {
            this.character = this.scene.add.sprite(this.posX, 285, 'character' + i).setInteractive();
            this.character.setFrame(3);
            this.character.setScale(3);


            this.charactArray.push(this.character);

            this.scene.anims.create({
                key: 'pose' + i,
                frames: this.scene.anims.generateFrameNumbers('character' + i, { start: 0, end: 4 }),
                frameRate: 10,
                repeat: -1
            })

            if (i != 1) this.character.setVisible(false);
        }

        this.rightArrow = this.scene.add.image(this.posX + 100, 300, "arrow").setInteractive();
        this.leftArrow = this.scene.add.image(this.posX - 100, 300, "arrow").setInteractive();
        this.leftArrow.flipX = true;

        this.ok1 = this.scene.add.sprite(this.posX, 450, "ok").setInteractive();
        this.markbox1 = this.scene.add.image(this.posX, 450, 'markbox').setVisible(false);
        this.markbox1.setScale(1.2);

        this.rightArrow.on("pointerover", () => {
            document.body.style.cursor = "pointer";
        })
        this.rightArrow.on("pointerout", () => {
            document.body.style.cursor = "auto";
        })
        this.rightArrow.on("pointerdown", () => {
            this.charactArray[this.index].setVisible(false);
            this.index++;
            if (this.index >= this.options) this.index = 0;
            this.charactArray[this.index].setVisible(true);
        })
        this.rightArrow.on("pointerup", () => {
        })

        this.leftArrow.on("pointerover", () => {
            document.body.style.cursor = "pointer";
        })
        this.leftArrow.on("pointerout", () => {
            document.body.style.cursor = "auto";
        })
        this.leftArrow.on("pointerdown", () => {
            this.charactArray[this.index].setVisible(false);
            this.index--;
            if (this.index < 0) this.index = this.options - 1;
            this.charactArray[this.index].setVisible(true);
        })
        this.leftArrow.on("pointerup", () => {
        })

        this.ok1.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.markbox1.setVisible(true);
        })
        this.ok1.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.markbox1.setVisible(false);
        })

        this.ok1.on("pointerdown", () => {
            console.log(playersList[this.playerId-1]);
            playersList[this.playerId-1].readyToPlay();

            /*if(this.namebar == 'namebar1')
            {
            if (this.playerName.value == '') this.playerName.value = 'Player1';

            sendDataToServer("#namebar1", "#password1", "#error1", (response) => {
                console.log(response);
                if (response === "Password correct." || response === "User created successfully.") {
                    console.log("Entra al if oki111:");
                    playersList[0].setName(this.playerName);
                    this.playerName.disabled = true;
                    playersList[0].readyToPlay();
                    this.ok1.setFrame(1);
                    this.markbox1.setVisible(false);
                    this.ok1.disableInteractive();
                    playersList[0].setCharactId(this.index + 1);
                    console.log(playersList[0].confirmReady());
                } else if (response === "Password doesn't match.") {
                    // Handle incorrect password response
                } else {
                    // Handle other responses or errors
                }
            });*/
            /*} else {
                if(this.playerName.value == '') this.playerName.value = 'Player2';
                
                sendDataToServer("#namebar2", "#password2", "#error2", (response) => {
                    console.log(response);
                    if (response === "Password correct.") {
                        console.log("Entra al if oki111 22:");
                        playersList[1].setName(this.playerName);
                        this.playerName.disabled = true;
                        playersList[1].readyToPlay();
                        this.ok1.setFrame(1);
                        this.markbox1.setVisible(false);
                        this.ok1.disableInteractive();
                        playersList[1].setCharactId(this.index+1);
                        console.log(playersList[1].confirmReady());
                    } else if (response === "Password doesn't match.") {
                        // Handle incorrect password response
                    } else {
                        // Handle other responses or errors
                    }
                });
                if(this.playerName.value == '') this.playerName.value = "Player2";
                //player1Panel = new SelectPlayer(this, 225, 'namebar');
                playersList[1].setName(this.playerName);
                this.playerName.disabled = true;
                playersList[1].readyToPlay();
                playersList[1].setCharactId(this.index+1);
                sendDataToServer("#namebar2", "#password2", "#error2");
        }*/

            this.rightArrow.disableInteractive();
            this.leftArrow.disableInteractive();
        })

        this.ok1.on("pointerup", () => {
            document.body.style.cursor = "auto";
        })
    }

    update() {
        this.charactArray[this.index].anims.play('pose' + (this.index + 1), true);
    }

}