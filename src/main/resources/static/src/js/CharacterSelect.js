class CharacterSelect extends Phaser.Scene {

    constructor() {
        super({ key: 'CharacterSelect' });
        this.playersPanels = [];
        this.playersPanelsCreated = [];
        this.posX;
    }

    preload(){
        this.load.image("selectScreenBg", "resources/img/interface/pantallaSeleccion.png");
        this.load.image("chMarkbox", "resources/img/interface/eleccionPersonaje.png");

        //Menu
        this.load.spritesheet('menu',
            'resources/img/interface/botonMenu.png',
            { frameWidth: 120, frameHeight: 47 });

        this.posX = 225;
        for(var i = 1; i <= maxPlayers; i++){
            console.log('password'+i);
            this.playerPanel = new SelectPlayer(this, this.posX, 'namebar'+i, 'password'+i, 'error'+i);
            this.playersPanels.push(this.playerPanel);
            this.posX = this.posX + 345;
        }

        for(var i = 0; i < maxPlayers ; i++) this.playersPanels[i].preload();

        //Multiplayer
        this.load.image("plus", "resources/img/interface/plus.png");
    }

    create(){
        //playersList = [];
        this.add.image(400, 300, 'selectScreenBg');

        //Boton menu: volver al menu
        this.menu = this.add.sprite(100, 80, "menu").setInteractive();
        //this.marcoMenu = this.add.image(695, 525, 'marco').setVisible(false);

        //this.player1 = new Player('p1', 50, this);
        //playersList.push(this.player1);
        //player1 = new Player('p1');
        this.playersPanels[0].create();
        this.playersPanelsCreated.push(this.playersPanels[0]);
        console.log('Panel 1 creado');
        //this.player1Panel.create();
        
        this.newPlayer = this.add.image(570, 250, "chMarkbox").setInteractive();
        this.plus = this.add.image(570, 250, "plus").setScale(0.1);


        //-New player
        this.newPlayer.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
            this.newPlayer.setScale(1.1);
            this.plus.setScale(0.15);
        })
        this.newPlayer.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            this.newPlayer.setScale(1);
            this.plus.setScale(0.1);
        })
        this.newPlayer.on("pointerdown", ()=>{
            this.newPlayer.setVisible(false);
            this.plus.setVisible(false);

            this.player2 = new Player('p2');
            playersList.push(this.player2);
            console.log(playersList);
            //this.player2Panel.create();
            this.playersPanels[1].create();
            this.playersPanelsCreated.push(this.playersPanels[1]);
            console.log('Panel 2 creado');
            //player2 = new Player('p2');
            
            this.addPlayer = true
        })
        this.newPlayer.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
        })

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
            this.exitScreen();
            //playersList.splice(0, playersList.length);
            this.scene.start("HomeScreen");
            /*
            this.player1Panel.desactivarInput();
            this.player2Panel.desactivarInput();
            */
            
        })
        

    }

    update(){
        for(var i = 0; i < this.playersPanelsCreated.length; i++) this.playersPanelsCreated[i].update();
        /*
        this.player1Panel.update();
        if(this.addPlayer == true) 
        this.player2Panel.update();
        */

        /*
        if(this.addPlayer == true){
            if(player1.confirmReady() && player2.confirmReady()){
                document.getElementById("namebar").style.visibility = 'hidden';
                document.getElementById("namebar2").style.visibility = 'hidden';
                this.scene.start('MainGame');
                
            }
            
        } else {
            if(player1.confirmReady()){
                document.getElementById("namebar").style.visibility = 'hidden';
                this.scene.start('MainGame');
            }
        }*/

        if(playersList.length == 0) return;
        this.allReady = 0;
        for(var i = 0; i < playersList.length; i++)
        {
            if(playersList[i].confirmReady()) this.allReady++;
        }
        if(this.allReady == playersList.length)
        {
            this.exitScreen();
            for(var i = 0; i < playersList.length; i++) console.log('Player '+i+': '+playersList[i].getName().value);
        
            /*
            //this.scene.remove('CharacterSelect');
            var juego = this.scene.get('MainGame');
            console.log(this.scene.get('MainGame'));
           // console.log(juego)

            if(juego == null){
                console.log('JUEGO NO ESTA')
                this.scene.add('MainGame', MainGame, true)
            }*/
            menuMusic == false;
            this.scene.start('GameLoader');
        }
        
        //Animacion personajes en pausa
        //this.player1.anims.play('poseP1', true);
        //this.player2.anims.play('poseP2', true);
        /*
        if(player1Panel.checkReady() && player2Panel.checkReady()){
            player1Panel.desactivarInput();
            player2Panel.desactivarInput();
            console.log("VA A JUEGO")
            this.scene.start('MainGame');
        }*/
    }

    shutdown()
    {
        //this.scene.restart('CharacterSelect');
    }

    exitScreen()
    {
        for(var i = 1; i <= this.playersPanelsCreated.length; i++)
        {
            //document.getElementById("namebar"+i).value = '';
            //document.getElementById("namebar"+i).setAttribute('placeholder', 'Enter your name...'); 
            document.getElementById("namebar"+i).style.visibility = 'hidden';
            document.getElementById("password"+i).style.visibility = 'hidden';
            document.getElementById("error"+i).style.visibility = 'hidden';
            //Vaciar array jugadores
                
            //playersList.splice(0, playersList.length);
                
        }
        //this.playersPanels.splice(0, this.playersPanels.length);
        //this.playersPanelsCreated.splice(0, this.playersPanelsCreated.length);
    }
}
