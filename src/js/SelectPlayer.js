class SelectPlayer {

    constructor(scene, x, namebar){    

        this.scene = scene;
        this.posX = x;
        this.namebar = namebar;    
        this.playerName = document.getElementById(this.namebar);;

    }

    preload(){
        this.scene.load.image("selectScreenBg", "resources/img/interface/pantallaSeleccion.png");
        this.scene.load.image('markbox', "resources/img/interface/recuadroBoton.png"); //REPE
        this.scene.load.image("chMarkbox", "resources/img/interface/eleccionPersonaje.png");
        //Aceptar
        this.scene.load.spritesheet('ok',
            'resources/img/interface/botonOk.png',
            { frameWidth: 120, frameHeight: 47 });
        //Menu
        this.scene.load.spritesheet('menu',
            'resources/img/interface/botonMenu.png',
            { frameWidth: 120, frameHeight: 47 });
    
        this.scene.load.spritesheet('player1',
            'resources/img/players/SpritesheetP1(Andar).png',
            { frameWidth: 64, frameHeight: 64 });
    }

    create()
    {
        //Recuadro personaje 1
        this.scene.add.image(this.posX, 250, "chMarkbox").setScale(3.5);
  
        //Personaje 1
        this.player1 = this.scene.add.sprite(this.posX, 235, 'player1').setInteractive();
        this.player1.setFrame(3);
        this.player1.setScale(3);

        document.getElementById(this.namebar).style.visibility = "visible"; 
        if(this.namebar == 'namebar2') document.getElementById(this.namebar).style.marginLeft = '45px';

        this.ok1 = this.scene.add.sprite(this.posX, 450, "ok").setInteractive(); 
        //CAMBIARIA EL OK POR UN READY Y CUANDO ESTEN TODOS READY QUE PASE A LA ESCENA DE JUGAR 

        this.markbox1 = this.scene.add.image(this.posX, 450, 'markbox').setVisible(false);
        this.markbox1.setScale(1.2);

        this.scene.anims.create({
            key: 'poseP1',
            frames: this.scene.anims.generateFrameNumbers('player1', {start: 0, end: 4}),
            frameRate: 10,
            repeat: -1
        })

        this.ok1.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
            this.markbox1.setVisible(true);    
        })
        this.ok1.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            this.markbox1.setVisible(false);
        })
        this.ok1.on("pointerdown", ()=>{
            this.markbox1.setVisible(false);
            this.ok1.setFrame(1);

          if(this.playerName.value == null) document.getElementById(this.namebar).value = "Player1";
            console.log("Player:"+ this.playerName.value);
            this.playerName.disabled = true;
        })
        this.ok1.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
            //this.scene.scene.start('MainGame');
            this.ok1.disableInteractive();
            //this.playerName.style.visibility = "hidden";
            
        })


    }
    update()
    {
        this.player1.anims.play('poseP1', true);
    }        
    
    desactivarInput() {
            // Desactiva la barra de input manualmente
            //this.playerName.disabled = true;
            this.playerName.style.visibility = "hidden";
        }
    checkReady() {
        if(this.playerName.disabled == true){ 
            return true
        }
        else{
            return false
        }
    }
}