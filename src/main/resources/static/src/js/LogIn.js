class LogIn extends Phaser.Scene {

    constructor() {
        super({ key: 'LogIn' });
        this.playerName = document.getElementById('namebar1');
        this.playerPassword = document.getElementById('password1');
        this.playerError = document.getElementById('error1');
    }

    preload() {
        this.load.image('background', 'resources/img/interface/pantallaInicio.png');
        this.load.image('title', 'resources/img/interface/LogoI-ScreamFondoBlanco.png');
        this.load.spritesheet('ok',
            'resources/img/interface/botonOk.png',
            { frameWidth: 120, frameHeight: 47 });

        //audio
        this.load.audio('menuOst', 'resources/audio/menuOst.mp3');
    }
    create() {
        //audio
        if (menuMusic == false) {
            this.menuOst = this.sound.add('menuOst', { volume: 0.4 });
            this.menuOst.play();
            this.menuOst.setLoop(true);
            menuMusic = true;
        }

        this.add.image(400, 300, 'background');
        this.add.image(game.renderer.width / 2, 200, 'title');

        //Inputs
        this.playerName.disabled = false;
        this.playerName.value = '';
        this.playerName.setAttribute('placeholder', 'Enter your name...');
        this.playerName.style.visibility = "visible";
        this.playerPassword.disabled = false;
        this.playerPassword.value = '';
        this.playerPassword.setAttribute('placeholder', 'Enter your password...');
        this.playerPassword.style.visibility = "visible";

        this.okButton = this.add.sprite(400, 450, "ok").setInteractive();

        this.okButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.okButton.setFrame(1);
        })

        this.okButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.okButton.setFrame(0);
        })

        this.okButton.on("pointerdown", () => {
            this.okButton.setFrame(2);
        })

        this.okButton.on("pointerup", () => {
            document.body.style.cursor = "auto";
            //if (this.playerName.value == '') this.playerName.value = 'Player1';

            sendDataToServer("#namebar1", "#password1", "#error1", (response) => {
                console.log(response);
                if (response === "Password correct." || response === "User created successfully.") {
                    console.log("Entra al if oki111:");
                    this.addPlayer(this.playerName.value, this.playerPassword.value );

                    this.playerName.disabled = true;
                    //playersList[0].readyToPlay();
                    this.okButton.setFrame(1);

                    this.playerName.style.visibility = 'hidden';
                    this.playerPassword.style.visibility = 'hidden';
                    this.scene.start("HomeScreen");
                }
            });
        })
    }

    addPlayer(name, pw){
        if(playersList.length == 1){
            this.player = new Player('p2', 50, this);
        } else {
            this.player = new Player('p1', 50, this);
        }
        this.player.setName(name);
        this.player.setPassword(pw);
        //this.player.setCharactId(this.index + 1);
        playersList.push(this.player);

        actualPlayer.push(name);
        actualPlayer.push(pw);

        console.log(playersList);
        console.log(actualPlayer);

    }
}
