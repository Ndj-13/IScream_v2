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
        //this.load.image('markbox', "resources/img/interface/recuadroBoton.png");
    }
    create(){
        this.add.image(400, 300, 'background');
        this.add.image(game.renderer.width/2, 200, 'title');


        this.playButton = this.add.sprite(400, 425, "playButton").setInteractive().setScale(2.5);
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
        })
    }
}
