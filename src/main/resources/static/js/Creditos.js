class Creditos extends Phaser.Scene {
    
    constructor() {
        super({ key: 'Creditos' })
        
    }

    preload(){
        this.load.image("selectScreenBg", "assets/img/interface/pantallaSeleccion.png");
        
        //this.load.image('markbox', "resources/img/interface/recuadroBoton.png"); //REPE
        this.load.image("chMarkbox", "assets/img/interface/eleccionPersonaje.png");

        this.load.image("tituloCredits", 'assets/img/interface/CREDITS.png');

        //Menu
        this.load.spritesheet('menu',
            'assets/img/interface/botonMenu.png',
            { frameWidth: 120, frameHeight: 47 });

    }
    create(){
        this.add.image(400, 300, 'selectScreenBg');
        this.add.image(400, 150, 'tituloCredits');

        //Boton menu: volver al menu
        this.menu = this.add.sprite(100, 80, "menu").setInteractive();
        this.marcoMenu = this.add.image(695, 525, 'marco').setVisible(false);
        
        //menu:
        this.menu.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
            //this.marcoMenu.setVisible(true);
        })
        this.menu.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            //this.marcoMenu.setVisible(false);
        })
        this.menu.on("pointerdown", ()=>{
            //this.marcoMenu.setVisible(false);
            this.menu.setFrame(1);
            
        })
        this.menu.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
            console.log("VA A HOME")
            this.scene.start("HomeScreen");
        })

        const confNombres = {
            origin: 'center',
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 25,
                fontStyle: 'bold',
                textAlign: 'center',
                justifyContent: 'center',
            }
        }       

        this.make.text(confNombres).setText('Óscar Alarcón Riera').setPosition(400, 250); 
        this.make.text(confNombres).setText('Nerea Díaz Jérica').setPosition(400, 300); 
        this.make.text(confNombres).setText('Adriana Sánchez Illán').setPosition(400, 350); 
        this.make.text(confNombres).setText('Jorge Sanz Coronel').setPosition(400, 400); 
        this.make.text(confNombres).setText('Rosa Suffo García').setPosition(400, 450); 

    }

}
