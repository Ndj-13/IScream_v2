class SelectPlayer {

    constructor(scene, x, namebar, password, error){    

        //this.player = player;
        this.scene = scene;
        this.posX = x;
        this.namebar = namebar;    
        this.playerName = document.getElementById(namebar);
        this.playerPassword = document.getElementById(password);
        this.playerError = document.getElementById(error);
        this.options = 2;
        this.index = 0;
        console.log('constructor');
    }

    preload(){
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
        for(var i = 1; i <= this.options; i++)
        {
            this.scene.load.spritesheet('character'+i,
            'resources/img/players/SpritesheetP'+i+'(Andar).png',
            { frameWidth: 64, frameHeight: 64 });
        }
        this.scene.load.spritesheet('modifyButton',
        'resources/img/interface/botonModify.png',
        { frameWidth: 124, frameHeight: 47 });
    }

    create()
    {
        console.log('create');
        //Recuadro personaje 1
        this.scene.add.image(this.posX, 200, "chMarkbox").setScale(3.5);
  
        //Personajes disponibles
        this.charactArray = [];
        for(var i = 1; i <= this.options; i++)
        {
            this.character = this.scene.add.sprite(this.posX, 185, 'character'+i).setInteractive();
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

        this.rightArrow = this.scene.add.image(this.posX+100, 200, "arrow").setInteractive();
        this.leftArrow = this.scene.add.image(this.posX-100, 200, "arrow").setInteractive();
        this.leftArrow.flipX = true;

        //document.getElementById(this.namebar).style.visibility = "visible"; 
        this.playerName.disabled = false;
        this.playerName.value = '';
        this.playerName.setAttribute('placeholder', 'Enter your name...');
        this.playerName.style.visibility = "visible";
        this.playerPassword.disabled = false;
        this.playerPassword.value = '';
        this.playerPassword.setAttribute('placeholder', 'Enter your password...');
        this.playerPassword.style.visibility = "visible";
        if(this.namebar == 'namebar2'){
            this.playerName.style.marginLeft = '45px';
            this.playerPassword.style.marginLeft = '45px';
            this.playerError.style.marginLeft = '45px';
        }
        //console.log(this.playerName.value);


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
            
            
            
            if(this.namebar == 'namebar1')
            {
                if(this.playerName.value == '') this.playerName.value = 'Player1';
                //player1Panel = new SelectPlayer(this, 225, 'namebar');
                
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
                        playersList[0].setCharactId(this.index+1);
                        console.log(playersList[0].confirmReady());
                    } else if (response === "Password doesn't match.") {
                        // Handle incorrect password response
                    } else {
                        // Handle other responses or errors
                    }
                });
            } else {
                if(this.playerName.value == '') this.playerName.value = 'Player2';
                //player1Panel = new SelectPlayer(this, 225, 'namebar');
                
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
                /*if(this.playerName.value == '') this.playerName.value = "Player2";
                //player1Panel = new SelectPlayer(this, 225, 'namebar');
                playersList[1].setName(this.playerName);
                this.playerName.disabled = true;
                playersList[1].readyToPlay();
                playersList[1].setCharactId(this.index+1);
                sendDataToServer("#namebar2", "#password2", "#error2");*/
            }

            this.rightArrow.disableInteractive();
            this.leftArrow.disableInteractive();

          
        })
        this.ok1.on("pointerup", ()=>{
            document.body.style.cursor = "auto";            
            //this.ok1.disableInteractive();
            //this.playerName.style.visibility = "hidden";
            
        })

        this.modifyButton = this.scene.add.sprite(this.posX, 510, "modifyButton").setInteractive();
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
            this.playerError.style.visibility = "hidden"; // Oculta el campo de contraseña
            this.scene.scene.start("ModifyUser");
        })



    }
    update()
    {
        //console.log('Index: '+this.index);
        this.charactArray[this.index].anims.play('pose'+(this.index+1), true);
    }        
    
}