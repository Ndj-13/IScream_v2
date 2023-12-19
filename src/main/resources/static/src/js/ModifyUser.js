class ModifyUser extends Phaser.Scene {

    constructor() {
        super({ key: 'ModifyUser' });
        this.playerName = document.getElementById('namebarMU');
        this.playerPassword = document.getElementById('passwordMU');
        this.playerError = document.getElementById('errorMU');
    }

    preload(){
        this.load.image('background', 'resources/img/interface/pantallaInicio.png');
        this.load.image('title', 'resources/img/interface/LogoI-ScreamFondoBlanco.png');
        this.load.spritesheet('modifyButton',
            'resources/img/interface/playbutton.png',
            { frameWidth: 64, frameHeight: 47 });

        this.load.spritesheet('deleteButton',
            'resources/img/interface/botonCredits.png',
            { frameWidth: 124, frameHeight: 47 });

        //this.load.image('markbox', "resources/img/interface/recuadroBoton.png");

        //audio
        this.load.audio('menuOst', 'resources/audio/menuOst.mp3');
    }
    create(){
        //audio
        if(menuMusic == false)
        {
            this.menuOst = this.sound.add('menuOst', {volume:0.4});
            this.menuOst.play();
            this.menuOst.setLoop(true);
            menuMusic = true;
        }


        this.add.image(400, 300, 'background');
        this.add.image(game.renderer.width/2, 200, 'title');


        this.modifyButton = this.add.sprite(400, 400, "modifyButton").setInteractive().setScale(2.5);
        this.deleteButton = this.add.sprite(400, 460, "deleteButton").setInteractive();

        //this.markbox = this.add.image(400, 425, 'markbox').setVisible(false);
        //this.markbox.setScale(1.2);

        //Iniciar los inputs
        this.playerName.disabled = false;
        this.playerName.value = '';
        this.playerName.setAttribute('placeholder', 'Enter your name...');
        this.playerName.style.visibility = "visible";

        this.playerPassword.disabled = false;
        this.playerPassword.value = '';
        this.playerPassword.setAttribute('placeholder', 'Enter your password...');
        this.playerPassword.style.visibility = "visible";

        //Interaccion botones
        this.modifyButton.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
            this.modifyButton.setFrame(1);
        })

        this.modifyButton.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            this.modifyButton.setFrame(0);
        })

        this.modifyButton.on("pointerdown", ()=>{
            this.modifyButton.setFrame(2);
        })

        this.modifyButton.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
            //modifyDataToServer(namebar, password, errorSpan, callback)
            modifyDataToServer("#namebarMU", "#passwordMU", "#errorMU", (response) => {
                console.log(response);
                if (response === "Password correct.") {
                    console.log("Entra al if oki111:");

                    //playersList[0].setName(this.playerName);
                    //this.playerName.disabled = true;
                    //playersList[0].readyToPlay();
                    //this.ok1.setFrame(1);
                    //this.markbox1.setVisible(false);
                    //this.ok1.disableInteractive();
                    //playersList[0].setCharactId(this.index+1);
                    //console.log(playersList[0].confirmReady());
                } else if (response === "Password doesn't match.") {
                    // Handle incorrect password response
                } else {
                    // Handle other responses or errors
                }
            });
            //window.open("/signUp.html");
            //window.location.href = "/signUp.html";
            
            
        })

        // creditos
        this.deleteButton.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
            this.deleteButton.setFrame(1);
        })

        this.deleteButton.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            this.deleteButton.setFrame(0);
        })

        this.deleteButton.on("pointerdown", ()=>{
            this.deleteButton.setFrame(2);
        })

        this.deleteButton.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
            deleteDataToServer("#namebarMU", "#passwordMU", "#errorMU", (response) => {
                console.log(response);
                if (response === "Password correct.") {
                    console.log("Entra al if oki111:");

                    //playersList[0].setName(this.playerName);
                    //this.playerName.disabled = true;
                    //playersList[0].readyToPlay();
                    //this.ok1.setFrame(1);
                    //this.markbox1.setVisible(false);
                    //this.ok1.disableInteractive();
                    //playersList[0].setCharactId(this.index+1);
                    //console.log(playersList[0].confirmReady());
                } else if (response === "Password doesn't match.") {
                    // Handle incorrect password response
                } else {
                    // Handle other responses or errors
                }
            });
            
        })
    }
}