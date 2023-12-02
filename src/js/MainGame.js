class MainGame extends Phaser.Scene {

    constructor() {
        super({ key: 'MainGame' });
        this.pauseScene = new Pause(this);
        this.player1Paused = false; 
        this.player2Paused = false; 
    }

    preload(){
        //Scene
        this.load.image('gameBg', 'resources/img/scene/fondoNivel1.png');
        this.load.image('ground', 'resources/img/scene/suelo.png');
        //interface
        this.load.image('defeat', 'resources/img/interface/pantallaDefeat.png');
        this.load.image('timerImg', 'resources/img/interface/timer.png');
        this.load.spritesheet('timer', 'resources/img/interface/timerSpritesheet.png',
            { frameWidth: 800, frameHeight: 600 });

        //Tutorial
        this.load.image('tutorial', 'resources/img/scene/tutorial.png');

        //Items
        this.load.image('red', 'resources/img/scene/red.png');
        //this.load.image('rock', 'resources/img/scene/rock.png');
        this.load.image('fruit', 'resources/img/scene/cereza.png');
        this.load.image('trans', 'resources/img/scene/trans.png');
        this.load.spritesheet('fireball', 'resources/img/scene/fireball.png',
            { frameWidth: 65, frameHeight: 100 });

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
        //this.time.timeScale = 10; para cambiar la velocidad de ejecucións
        //SCENE
        this.add.image(400, 300, 'gameBg');

        //PLATAFORMAS
        
        var platforms = this.physics.add.staticGroup();
        
        platforms.create(400, 580, 'ground').refreshBody();

        
        platforms.create(800, 410, 'ground');
        platforms.create(-100, 270, 'ground');
        platforms.create(1000, 220, 'ground');

        
        //////////TIMER///////////////////
        this.add.image(400, 300, 'timerImg');
        //this.timerSprite = this.add.sprite(400, 300, 'timer');
        this.anims.create({
            key: 'timer',
            frames: this.anims.generateFrameNumbers('timer', { start: 0, end: 12 }),
            frameRate: 15,
            repeat: -1
        });
        //this.timerSpriteCount = 1;
        this.tiempoPartida = 59; // Duración de la partida en segundos
        var timerText = this.add.text(365, 20, '00:'+this.tiempoPartida, { font: '30px estilo', fill: '#000000' });

        this.timer = this.time.addEvent({
            delay: 1000, // Ejecutar cada segundo
            callback: ()=> {
                this.tiempoPartida--;
                timerText.setText('00:'+this.tiempoPartida);
                
                if (this.tiempoPartida === 0) {
                    this.timer.paused = true; // Pausar el temporizador cuando llegue a 0
                    
                    this.scene.start("Results");                    
                }
                if (this.tiempoPartida<=5){
                    timerText.setStyle({fontSize: '19px',color: '#FF1D1D'});
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
            callback: createFruit, 
            callbackScope: this, 
            loop: true 
        });
        function createFruit() {
            let randomNum = Phaser.Math.Between(100, 700);
            this.fruit = this.fruits.create(randomNum, 0, 'fruit');
            //debug
            //console.log("fruta");
        }

        //BOLAS
            //grupo bolas
        this.bolas = this.physics.add.group({
            allowGravity: false,
            velocityY: 150,
        });

         //creacion n bolas
        var yBolaPos = -35;
        this.animatedBolas = [];
        for(let i = 0; i < 10; i++)
        { 
            let randomNum = Phaser.Math.Between(100, 700);
            this.bola = this.bolas.create(randomNum, yBolaPos, 'fireball');
            this.bola.setScale(0.5);
            this.anims.create({
                key: 'fireball'+i,
                frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 7 }),
                frameRate: 15,
                repeat: -1
            });
            yBolaPos -= 200;
            this.animatedBolas.push(this.bola);
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
        this.posXRec = 75;
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
            this.physics.add.collider(this.player, this.hitbox);

            //Name
            this.name = this.make.text(confJugadores).setText(playersList[i].getName().value);
            this.name.setScale(0.5);
            this.name.setPosition(this.posX, this.player.y+45);
            namesText.push(this.name);

            //this.players.push(this.player);
            console.log(this.player);
            playersList[i].hitbox = this.player;
            //console.log(playersList[i].hitbox);

            //Interface
            this.rec = this.add.image(this.posXRec, 40, 'score'+i).setScale(1.4);
            if(playersList[i].getId() == 'p2'){
                this.rec.flipX = true;
            }
            this.add.image(this.posX, 40, 'charactIcon'+playersList[i].getCharactId());
            this.score = this.make.text(confJugadores).setText(playersList[i].showScore());
            this.score.setPosition(this.posXRec+30, 40);
            if(playersList[i].getId() == 'p2') this.score.setPosition(this.posXRec-30, 40);
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
            //'ESC': Phaser.Input.Keyboard.KeyCodes.ESC,
        });
        this.contadorPause = false;
            

        /*
        function spawnHitbox()
        {
            this.hitboxV = hitbox.create(70, 550, 'trans');
            this.hitboxV.setScale(0.1, 10);
            this.hitboxH = hitbox.create(70, 450, 'trans');
            this.hitboxH.setScale(5, 0.1);
        }*/
        
        //console.log(this.players);
        ///COLLISIONS///////////////////////////
        

        //JUGADOR 1
        var player1 = playersList[0];
        //colision bolas-jugador
        this.physics.add.overlap(player1.hitbox, this.bolas, function(player, bola) {
            let randomNumX = Phaser.Math.Between(100, 700);
            let randomNumY = Phaser.Math.Between(-10, -250);
            bola.setPosition(randomNumX, randomNumY);

            player.setVelocity(0);
                player.setPosition(0, 500);
                player.setTint(0xFF0000);
            
                //crear hitbox
                let hitboxV1 = this.hitbox.create(65, 525, 'trans');
                hitboxV1.setScale(0.1, 3);
                hitboxV1.setImmovable(true);
                let hitboxH1 = this.hitbox.create(30, 485, 'trans');
                hitboxH1.setScale(3.5, 0.1);
                hitboxH1.setImmovable(true);

                this.stop = this.time.addEvent({
                    delay: 2500, 
                    callbackScope: this,
                    loop: false, 
                    callback: ()=> {
                        player.clearTint();
                        hitboxV1.destroy();
                        hitboxH1.destroy();
                    },
                });
        }, null, this);

        //colision fruta-jugador
        this.physics.add.overlap(player1.hitbox, this.fruits, function(player, fruit) {
            player1.updateScore(1);
            //console.log('Player 1 Score: '+player1.showScore()); 
            //console.log('Player 1: '+player1.getName().value);
            fruit.destroy();    
        }, null, this);

        if(playersList.length > 1)
        {
            var player2 = playersList[1];
            this.physics.add.overlap(player2.hitbox, this.bolas, function(player, bola) {
                let randomNumX = Phaser.Math.Between(100, 700);
                let randomNumY = Phaser.Math.Between(-10, -250);
                bola.setPosition(randomNumX, randomNumY);

                player.setVelocity(0);
                player.setPosition(800, 500);
                player.setTint(0xFF0000);
            
                //crear hitbox
                let hitboxV2 = this.hitbox.create(750, 525, 'trans');
                hitboxV2.setScale(0.1, 3);
                hitboxV2.setImmovable(true);
                let hitboxH2 = this.hitbox.create(770, 485, 'trans');
                hitboxH2.setScale(3.5, 0.1);
                hitboxH2.setImmovable(true);

                this.stop = this.time.addEvent({
                    delay: 2500, 
                    callbackScope: this,
                    loop: false, 
                    callback: ()=> {
                        player.clearTint();
                        hitboxV2.destroy();
                        hitboxH2.destroy();
                    },
                });
            }, null, this);
            this.physics.add.overlap(player2.hitbox, this.fruits, function(player, fruit) {
                player2.updateScore(1);
                //console.log('Player 2 score: '+player2.showScore()); 
                fruit.destroy();    
            }, null, this);
        }

        //colision bolas-hitbox
        this.physics.add.overlap(this.bolas, this.hitbox, function(bola, hitbox)
        {
            let randomNumX = Phaser.Math.Between(100, 700);
            let randomNumY = Phaser.Math.Between(-10, -250);
            bola.setPosition(randomNumX, randomNumY);
        }); 

        //colision bola-bola
        this.physics.add.overlap(this.bolas, this.bolas, function(bola1, bola2)
        {
            let randomNumX = Phaser.Math.Between(100, 700);
            let randomNumY = Phaser.Math.Between(-10, -250);
            bola1.setPosition(randomNumX, randomNumY);

            //console.log("cambiado pos bola: " + bola1);
        }); 
        //}

        //// PAUSE QUE ESTO NO LO TOQUE NADIE Y SI ALGUIEN LO TOCA Q PREGUNTE A ROSA
        this.pauseButton = this.add.sprite(400,90,"pause").setInteractive();
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


        //////TUTORIAL/////////
        this.tutorial = this.add.image(400, 300, 'tutorial');
        this.tiempoTutorial = 3; // Duración de la partida en segundos
        this.pausaTutorial(); 
        this.timer = this.time.addEvent({
            delay: 1000, // Ejecutar cada segundo
            callback: ()=> {
                this.tiempoTutorial--;
                if (this.tiempoTutorial === 0) {
                    this.comenzarJuego();
                    this.tutorial.setVisible(false);                   
                }
            },
            callbackScope: this,
            loop: true // Repetir el evento
        });
    }
    
    update(){
        //console.log('PUNTUACION JUGADOR 1:' + playersList[0].score);
        
        ////////KEYBOARD INPUT//////////////7
        //1 player:
        if(playersList.length == 1 && !this.playersPaused){
            this.firstPlayerController(playersList[0].hitbox, 0);
            //this.secondPlayerController(this.players[0], 0);
        }
        //2 players:
        else if (playersList.length == 2 && !this.playersPaused) {
            this.firstPlayerController(playersList[0].hitbox, 0);
            this.secondPlayerController(playersList[1].hitbox, 1);
        }
        
        for(let i = 0; i < 10; i++)
        {
            this.animatedBolas[i].anims.play('fireball'+i, true);
        }

        ///TIMER ANIMATION////
        /*
        if(this.tiempoPartida % 10 == 0)
        {
            this.timerSprite.setFrame(this.timerSpriteCount);
            this.timerSpriteCount++;
        }*/

        ///////TIMER/////////////////
        //this.timerSprite.anims.play('time', true);
        /* 
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
        })*/

        /*this.input.keyboard.on('keydown_ESC', (event) => {
            if (event.repeat) return;
            if(this.timer.paused == true)
            {
                this.continuarJuego();
                this.pauseScene.destroy();
            }
            else 
            {
                this.contadorPause = true;
                this.pararJuego();
                this.pauseScene.create();
            }
        });
*/

        /////////COLLISIONS///////////7
        for(var i = 0; i < playersList.length; i++)
        {
            namesText[i].setPosition(playersList[i].hitbox.x, playersList[i].hitbox.y-40);
        } 

        ////////SCORE////////////
        for(var i = 0; i < playersList.length; i++)
        {
            this.scoresText[i].setText(playersList[i].showScore());
        }
    }
      
    firstPlayerController(playerController, pIndex)
    {
        //1st Player controlls
        if (keyInput.A.isDown)
        {
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
        //2nd Player controlls
        if (cursorInput.left.isDown)
        {
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
        //this.fruits.paused = true;
        this.fruits.children.iterate(function (fruit) {
            fruit.body.setVelocity(0); // Detener la velocidad de cada bola
        });
        this.bolas.children.iterate(function (bola) {
            bola.body.setVelocity(0); // Detener la velocidad de cada bola
        });
        this.player1Paused = true;
        this.player2Paused = true;
        this.anims.pauseAll();

        this.timer.paused = true;

    }

    continuarJuego(){
        this.fruitSpawn.paused = false;
        this.fruits.children.iterate(function (fruit) {
            fruit.body.setVelocityY(150); // Detener la velocidad de cada bola
        });
        this.bolas.children.iterate(function (bola) {
            bola.body.setVelocityY(150); // Reanudar la velocidad de cada bola
        });
        this.player1Paused = false;
        this.player2Paused = false;
        this.anims.resumeAll();

        this.timer.paused = false;

    }

    pausaTutorial(){
        this.fruitSpawn.paused = true;
        //this.fruits.paused = true;
        this.fruits.children.iterate(function (fruit) {
            fruit.body.setVelocity(0); // Detener la velocidad de cada bola
        });
        this.bolas.children.iterate(function (bola) {
            bola.body.setVelocity(0); // Detener la velocidad de cada bola
        });
        this.timer.paused = true;

    }

    comenzarJuego(){
        this.fruitSpawn.paused = false;
        this.fruits.children.iterate(function (fruit) {
            fruit.body.setVelocityY(150); // Detener la velocidad de cada bola
        });
        this.bolas.children.iterate(function (bola) {
            bola.body.setVelocityY(150); // Reanudar la velocidad de cada bola
        });

        this.timer.paused = false;

    }

    
}

