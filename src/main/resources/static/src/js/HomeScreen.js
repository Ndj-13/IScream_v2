class HomeScreen extends Phaser.Scene {

    constructor() {
        super({ key: 'HomeScreen' });
    }

    preload(){
        this.load.image('background', 'resources/img/interface/pantallaInicio.png');
        this.load.image('title', 'resources/img/interface/LogoI-ScreamFondoBlanco.png');
        this.load.spritesheet('playButton',
            'resources/img/interface/playbutton.png',
            { frameWidth: 64, frameHeight: 47 });
        this.load.spritesheet('modifyButton',
        'resources/img/interface/playbutton.png',
        { frameWidth: 64, frameHeight: 47 });

        this.load.spritesheet('creditsButton',
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


        this.playButton = this.add.sprite(400, 400, "playButton").setInteractive().setScale(2.5);
        this.modifyButton = this.add.sprite(400, 520, "modifyButton").setInteractive().setScale(2.5);
        this.creditsButton = this.add.sprite(400, 460, "creditsButton").setInteractive();

        //this.markbox = this.add.image(400, 425, 'markbox').setVisible(false);
        //this.markbox.setScale(1.2);

        //Interaccion botones
        this.playButton.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
            this.playButton.setFrame(1);
        })

        this.playButton.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            this.playButton.setFrame(0);
        })

        this.playButton.on("pointerdown", ()=>{
            this.playButton.setFrame(2);
        })

        this.playButton.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
            
            this.scene.start("CharacterSelect");
            //window.open("/signUp.html");
            //window.location.href = "/signUp.html";
            
            
        })
        
        //Modificar usuario
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
            
            this.scene.start("ModifyUser");
            //window.open("/signUp.html");
            //window.location.href = "/signUp.html";
            
            
        })

        // creditos
        this.creditsButton.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
            this.creditsButton.setFrame(1);
        })

        this.creditsButton.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            this.creditsButton.setFrame(0);
        })

        this.creditsButton.on("pointerdown", ()=>{
            this.creditsButton.setFrame(2);
        })

        this.creditsButton.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
            this.scene.start("Creditos");
        })
    }
}
