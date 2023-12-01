class MainGame extends Phaser.Scene {

    constructor() {
        super({ key: 'MainGame' });
        this.pauseScene = new Pause(this);
    }

    preload(){
        //Scene
        this.load.image('gameBg', 'resources/img/scene/fondoNivel1.png');
        this.load.image('ground', 'resources/img/scene/suelo.png');

        //Items
        this.load.image('red', 'resources/img/scene/red.png');
        this.load.image('rock', 'resources/img/scene/rock.png');
        this.load.image('fruit', 'resources/img/scene/cereza.png');
        this.load.image('trans', 'resources/img/scene/trans.png');

        //Players
        for(var i = 0; i < playersList.length; i++)
        {
            console.log('Character del Player 1: ' + playersList[i].getCharactId())
            this.load.spritesheet('character'+playersList[i].getCharactId(),
            'resources/img/players/SpritesheetP'+playersList[i].getCharactId()+'(Andar).png',
            { frameWidth: 64, frameHeight: 64 });

            //Character interface
            this.load.image('charactIcon'+playersList[i].getCharactId(), 'resources/img/interface/charactIcon'+playersList[i].getCharactId()+'.png');
            this.load.image('score'+i, 'resources/img/interface/InterfazPuntuacionVacio.png');
        }

        this.load.spritesheet('pause', 'resources/img/interface/botonPause.png',
            { frameWidth: 80, frameHeight: 47});

        this.pauseScene.preload();
    }
    
    create(){
        //SCENE
        this.add.image(400, 300, 'gameBg');

        //PLATAFORMAS
        var platforms = this.physics.add.staticGroup();
        
        platforms.create(400, 580, 'ground').refreshBody();

        /*
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
        */
        //        TIMER              /////////////////
        // Inicialización de variables
        var tiempoPartida = 20; // Duración de la partida en segundos
        var timerText = this.add.text(370, 10, 'Tiempo: ' + tiempoPartida, { font: '16px estilo', fill: '#ffffff' });

        var timer = this.time.addEvent({
            delay: 1000, // Ejecutar cada segundo
            callback: ()=> {
                tiempoPartida--;
                timerText.setText('Tiempo: ' + tiempoPartida);
                
                if (tiempoPartida === 0) {
                    timer.paused = true; // Pausar el temporizador cuando llegue a 0
                    
                    this.mostrarFinDeJuego();                    
                }
                if (tiempoPartida<=5){
                    timerText.setStyle({fontSize: '20px',color: '#FF1D1D'});
                }
            },
            callbackScope: this,
            loop: true // Repetir el evento
        });
        
        //FRUTAS
        this.fruits = this.physics.add.group({
            allowGravity: false,
            velocityY: 150
        })
        this.fruitSpawn = this.time.addEvent({
            delay: 3000, 
            callback: createFruit, // La función que se ejecutará
            callbackScope: this, // El ámbito en el que se ejecutará la función (opcional, puede ser 'this' si es en la escena)
            loop: true // Establecer en true para que se repita
        });
        function createFruit() {
            let randomNum = Phaser.Math.Between(10, 780);
            this.fruit = this.fruits.create(randomNum, 10, 'fruit');
            //debug
            console.log("fruta");
        }

        //BOLAS
            //grupo bolas
        this.bolas = this.physics.add.group({
            allowGravity: false,
            velocityY: 150,
        });

         //creacion n bolas
        var yBolaPos = 10;
        for(let i = 0; i < 5; i++)
        { 
            let randomNum = Phaser.Math.Between(10, 780);
            this.bola = this.bolas.create(randomNum, yBolaPos, 'rock');
            yBolaPos -= 200;
            //debug
            //console.log("yBolaPos: " + yBolaPos);
        }
        
        //HITBOXES
        this.hitbox = this.physics.add.group({
            allowGravity: false
        });
        this.hitboxOOB = this.hitbox.create(400, 850, 'trans');
        this.hitboxOOB.setScale(35, 1);

        //Configuration text
        const confJugadores = {
            origin: 'center',
            x: 240,
            y: 180,
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 25,
                fontStyle: 'bold',
                textAlign: 'center',
                justifyContent: 'center',
            }
        }

        //PLAYERS
        this.players = [];
        this.scoresText = [];
        this.posX = 50;
        this.posXRec = 70;
        for(var i = 0; i < playersList.length; i++)
        {
            this.player = this.physics.add.sprite(this.posX, 450, 'character'+playersList[i].getCharactId());
            this.player.setBounce(0.2);
            this.player.setCollideWorldBounds(true);

            this.anims.create({
                key: 'leftP'+i,
                frames: this.anims.generateFrameNumbers('character'+playersList[i].getCharactId(), { start: 28, end: 32 }),
                frameRate: 15,
                repeat: -1
            });

            this.anims.create({
                key: 'stoppedP'+i,
                frames: [ { key: 'character'+playersList[i].getCharactId(), frame: 0 } ],
                frameRate: 20
            });

            this.anims.create({
                key: 'rightP'+i,
                frames: this.anims.generateFrameNumbers('character'+playersList[i].getCharactId(), { start: 21, end: 25 }),
                frameRate: 15,
                repeat: -1
            });

            //COLLISIONS
            this.physics.add.collider(this.player, platforms);
            //this.physics.add.collider(bolas, platforms);
            this.physics.add.collider(this.fruits, platforms);

            this.players.push(this.player);

            //Interface
            this.rec = this.add.image(this.posXRec, 30, 'score'+i).setScale(1.4);
            if(playersList[i].getId() == 'p2'){
                this.rec.flipX = true;
            }
            this.add.image(this.posX, 30, 'charactIcon'+playersList[i].getCharactId());
            this.score = this.make.text(confJugadores).setText(playersList[i].showScore());
            this.score.setPosition(this.posXRec+30, 30);
            if(playersList[i].getId() == 'p2') this.score.setPosition(this.posXRec-30, 30);
            this.scoresText.push(this.score);

            this.posX = this.posX + 700;  
            this.posXRec = this.posXRec + 660;

        }
        
        

        //CONTROLS
        cursorInput = this.input.keyboard.createCursorKeys();
        keyInput = this.input.keyboard.addKeys(
        {
            'A': Phaser.Input.Keyboard.KeyCodes.A,
            'D': Phaser.Input.Keyboard.KeyCodes.D,
            'W': Phaser.Input.Keyboard.KeyCodes.W,
        });
            
        // PAUSE
        //this.pauseScene.create();
        //this.pauseScene.ocultarContenido();
        this.pauseButton = this.add.sprite(400, 50, "pause").setInteractive();

        this.pauseButton.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
            //this.marcoMenu.setVisible(true);
        })
        this.pauseButton.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            //this.marcoMenu.setVisible(false);
        })            
        this.pauseButton.on("pointerdown", ()=>{
            //this.marcoMenu.setVisible(false);
            if(this.pauseButton.frame.name === 0){
                this.pauseButton.setFrame(1);
            }else{
                this.pauseButton.setFrame(0);
            }
        })

        this.pauseButton.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
            if(this.pauseButton.frame.name === 1){
                console.log("LE DA PA PARAR");
                this.pararJuego();
                this.pauseScene.create()
            } else {
                console.log("LE DA PA RESUME");
                this.continuarJuego();
                if(this.pauseScene){
                    console.log("ESCENA DE PAUSA CREADA");
                }
                this.pauseScene.destroy();

            }
        })
        
    }
    mostrarFinDeJuego() {
        var graphics = this.add.graphics();
        var rectWidth = 350; // Ancho del rectángulo
        var rectHeight = 100; // Alto del rectángulo

        // Dibujar el rectángulo redondeado detrás del mensaje
        graphics.fillStyle(0x5F2D1D, 1); // Color y opacidad del relleno
        graphics.fillRoundedRect(242, 170, rectWidth, rectHeight, 20); // x, y, ancho, alto, radio de esquina

        // Mostrar el mensaje de "Tiempo Acabado" encima del rectángulo
        var pantallaFin = this.add.text(270, 200, '¡Tiempo acabado!', { font: '32px estilo', fill: '#ffffff' });

        // Asegurarse de que el mensaje esté encima del rectángulo
        pantallaFin.setDepth(1)
        this.scene.pause('MainGame');
    }

    update(){
        //KEYBOARD
        //1 player:
        if(playersList.length == 1){
            this.firstPlayerController(this.players[0], 0);
            //this.secondPlayerController(this.players[0], 0);
        }
        //2 players:
        else {
            this.firstPlayerController(this.players[0], 0);
            this.secondPlayerController(this.players[1], 1);
        }

        //Collisions
        for(var i = 0; i < this.players.length; i++)
        {        
            //inputController(this.players[i]);
            //colision bola-jugador
            this.physics.add.overlap(this.players, this.bolas, function(player, bola) {
                //quitar vida jugador   
                bola.setTint(0x001020);
            }, null, this);

            
            //colision fruta-jugador
            this.physics.add.overlap(this.players, this.fruits, function(player, fruit) {
                //añadir punto jugador  
                fruit.destroy();
                //console.log("colisión player-fruit");
            }, null, this);
            
            
            this.physics.add.overlap(this.bolas, this.hitbox, function(bola, hitbox)
            {
                let randomNum = Phaser.Math.Between(10, 780);
                bola.setPosition(randomNum, -25);
                //debug
                //console.log("bola hitbox");
            });
        }
        
        //debug
        //console.log("pos canon1: " + canon1.x, canon1.y);
        //console.log("pos canon2: " + canon2.x, canon2.y);
        //console.log("pos bolaC1: " + bolaC1.x, bolaC1.y)*/
    }
      
    firstPlayerController(playerController, pIndex)
    {
        //1st Player controlls
        if (keyInput.A.isDown)
        {
            console.log('A');
            playerController.setVelocityX(-160);

            playerController.anims.play('leftP'+pIndex, true);
        }
        else if (keyInput.D.isDown)
        {
            playerController.setVelocityX(160);

            playerController.anims.play('rightP'+pIndex, true);
        }
        
        else
        {
            playerController.setVelocityX(0);

            playerController.anims.play('stoppedP'+pIndex);
        }
        
        if (keyInput.W.isDown && playerController.body.touching.down)
        {
            playerController.setVelocityY(-630);
        }

    }

    secondPlayerController(playerController, pIndex)
    {
        //1st Player controlls
        if (cursorInput.left.isDown)
        {
            console.log('A');
            playerController.setVelocityX(-160);

            playerController.anims.play('leftP'+pIndex, true);
        }
        else if (cursorInput.right.isDown)
        {
            playerController.setVelocityX(160);

            playerController.anims.play('rightP'+pIndex, true);
        }
        
        else
        {
            playerController.setVelocityX(0);

            playerController.anims.play('stoppedP'+pIndex);
        }
        
        if (cursorInput.up.isDown && playerController.body.touching.down)
        {
            playerController.setVelocityY(-630);
        }

    }
        
        
    pararJuego(){
        this.fruitSpawn.paused = true;
        //this.bolaSpawn.paused = true;
        this.fruits.paused = true;
        this.bolas.paused = true;
        for(var i = 0; i < this.players.length; i++){
            this.players[i].paused = true;
        }
    }

    continuarJuego(){
        this.fruitSpawn.paused = false;
        //this.bolaSpawn.paused = false;
        this.fruits.paused = false;
        this.bolas.paused = false;
        for(var i = 0; i < this.players.length; i++){
            this.players[i].paused = false;
        }
    }

    
}

