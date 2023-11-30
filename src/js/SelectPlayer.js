class SelectPlayer {

    constructor(scene, x, namebar){    

        //this.player = player;
        this.scene = scene;
        this.posX = x;
        this.namebar = namebar;    
        this.playerName = document.getElementById(this.namebar);
        this.options = 2;
        this.index = 0;
    }

    preload(){
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
        for(var i = 1; i <= this.options; i++)
        {
            this.scene.load.spritesheet('character'+i,
            'resources/img/players/SpritesheetP'+i+'(Andar).png',
            { frameWidth: 64, frameHeight: 64 });
        }
    }

    create()
    {
        //Recuadro personaje 1
        this.scene.add.image(this.posX, 250, "chMarkbox").setScale(3.5);
  
        //Personajes disponibles
        this.charactArray = [];
        for(var i = 1; i <= this.options; i++)
        {
            this.character = this.scene.add.sprite(this.posX, 235, 'character'+i).setInteractive();
            this.character.setFrame(3);
            this.character.setScale(3);

            
            this.charactArray.push(this.character);

            this.scene.anims.create({
                key: 'pose'+i,
                frames: this.scene.anims.generateFrameNumbers('character'+i, {start: 0, end: 4}),
                frameRate: 10,
                repeat: -1
            })

            if( i != 1) this.character.setVisible(false);
        }

        this.rightArrow = this.scene.add.image(this.posX+100, 250, "arrow").setInteractive();
        this.leftArrow = this.scene.add.image(this.posX-100, 250, "arrow").setInteractive();
        this.leftArrow.flipX = true;

        //document.getElementById(this.namebar).style.visibility = "visible"; 
        this.playerName.style.visibility = "visible";
        if(this.namebar == 'namebar2') this.playerName.style.marginLeft = '45px';

        this.ok1 = this.scene.add.sprite(this.posX, 450, "ok").setInteractive(); 
        //CAMBIARIA EL OK POR UN READY Y CUANDO ESTEN TODOS READY QUE PASE A LA ESCENA DE JUGAR 

        this.markbox1 = this.scene.add.image(this.posX, 450, 'markbox').setVisible(false);
        this.markbox1.setScale(1.2);

        this.rightArrow.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";       
        })
        this.rightArrow.on("pointerout", ()=>{
            document.body.style.cursor = "auto";       
        })
        this.rightArrow.on("pointerdown", ()=>{   
            //this.charactArray[this.index].anims.play('stopped', true); 
            this.charactArray[this.index].setVisible(false);
            this.index++;
            if(this.index >= this.options) this.index = 0;
            console.log('Character: ' + this.index);
            this.charactArray[this.index].setVisible(true);
        })
        this.rightArrow.on("pointerup", ()=>{       
        })

        this.leftArrow.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";       
        })
        this.leftArrow.on("pointerout", ()=>{
            document.body.style.cursor = "auto";       
        })
        this.leftArrow.on("pointerdown", ()=>{ 
            this.charactArray[this.index].setVisible(false);
            this.index--;
            if(this.index < 0) this.index = this.options-1;
            console.log('Character: ' + this.index);
            this.charactArray[this.index].setVisible(true);     
        })
        this.leftArrow.on("pointerup", ()=>{       
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
            
            if(this.namebar == 'namebar')
            {
                if(this.playerName.value == null) this.playerName.value = "Player1";
                //player1Panel = new SelectPlayer(this, 225, 'namebar');
                player1.setName(this.playerName);
                console.log("Player:"+ player1.getName().value);
                this.playerName.disabled = true;
                player1.readyToPlay();
                player1.setCharactId(this.index);
            } else {
                if(this.playerName.value == null) this.playerName.value = "Player2";
                //player1Panel = new SelectPlayer(this, 225, 'namebar');
                player2.setName(this.playerName);
                console.log("Player:"+ player2.getName().value);
                this.playerName.disabled = true;
                player2.readyToPlay();
                player2.setCharactId(this.index);
            }

            this.rightArrow.disableInteractive();
            this.leftArrow.disableInteractive();

          
        })
        this.ok1.on("pointerup", ()=>{
            document.body.style.cursor = "auto";            
            this.ok1.disableInteractive();
            //this.playerName.style.visibility = "hidden";
            
        })


    }
    update()
    {
        //console.log('Index: '+this.index);
        this.charactArray[this.index].anims.play('pose'+(this.index+1), true);
    }        
    
    /*
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
    }*/
}