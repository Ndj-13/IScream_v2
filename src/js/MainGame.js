class MainGame extends Phaser.Scene {

    constructor() {
        super({ key: 'MainGame' });
    }

    preload(){
        //borrar
            //canon
        this.load.image('red', 'resources/img/scene/red.png');
        this.load.image('rock', 'resources/img/scene/rock.png');
        this.load.image('fruit', 'resources/img/scene/fruit.png');
        this.load.image('trans', 'resources/img/scene/trans.png');

        this.load.image('ground', 'resources/img/scene/platform.png');

        for(var i = 0; i < playersList.length; i++)
        {
            console.log('Character del Player 1: ' + playersList[i].getCharactId())
            this.load.spritesheet('character'+playersList[i].getCharactId(),
            'resources/img/players/SpritesheetP'+playersList[i].getCharactId()+'(Andar).png',
            { frameWidth: 64, frameHeight: 64 });
        }
        

        this.load.spritesheet('pause', 'resources/img/interface/botonPause.png',
            { frameWidth: 80, frameHeight: 47});
    }
    
    create(){
        //SCENE

        //PLATAFORMAS
        var platforms = this.physics.add.staticGroup();
        
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
        
        //FRUTAS
        this.fruits = this.physics.add.group({
            allowGravity: false,
            velocityY: 150
        })
        var fruitSpawn = this.time.addEvent({
            delay: 3000, 
            callback: createFruit, // La función que se ejecutará
            callbackScope: this, // El ámbito en el que se ejecutará la función (opcional, puede ser 'this' si es en la escena)
            loop: true // Establecer en true para que se repita
        });
        function createFruit() {
            let randomNum = Phaser.Math.Between(10, 780);
            this.fruit = this.fruits.create(randomNum, 10, 'fruit');
            //debug
        }

        //BOLAS

        this.bolas = this.physics.add.group({
            allowGravity: false,
            velocityY: 150,
        });
        //bolaC1 = bolas.create(canon1.body.position.x, canon1.body.position.y + 100, 'rock');

        // Crear un evento que se ejecute cada 2 segundos
        var bolaSpawn = this.time.addEvent({
            delay: 1000, 
            callback: createBall, // La función que se ejecutará
            callbackScope: this, // El ámbito en el que se ejecutará la función (opcional, puede ser 'this' si es en la escena)
            loop: true // Establecer en true para que se repita
        });
        function createBall() {
            let randomNum = Phaser.Math.Between(10, 780);
            this.bola = this.bolas.create(randomNum, 10, 'rock');
            //debug
        }

        
        //HITBOXES
        var hitbox = this.physics.add.group({
            allowGravity: false
        });
        var hitboxOOB = hitbox.create(400, 850, 'trans');
        hitboxOOB.setScale(35, 1);

        this.players = [];
        this.posX = 100;
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

            this.posX = this.posX + 500;
        }
        
        

        //CONTROLS
        keyInput = this.input.keyboard.createCursorKeys();
        /*cursors = this.input.keyboard.addKeys({
            'a': Phaser.Input.Keyboard.KeyCodes.A,
            'd': Phaser.Input.Keyboard.KeyCodes.D,
        });*/
        /*this.keys = this.scene.input.keyboard.addKeys({
            A: Phaser.Input.Keyboard.KeyCodes.A,
            B: Phaser.Input.Keyboard.KeyCodes.D
        });*/
            
        // PAUSE
        this.pause = this.add.sprite(400, 50, "pause").setInteractive();

        this.pause.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
            //this.marcoMenu.setVisible(true);
        })
        this.pause.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            //this.marcoMenu.setVisible(false);
        })
        this.pause.on("pointerdown", ()=>{
            //this.marcoMenu.setVisible(false);
            this.pause.setFrame(1);
        })
        this.pause.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
            console.log("VA A PAUSE")
            this.scene.start("Pause");
        })
        
    }

    update(){
        //KEYBOARD
        for(var i = 0; i < this.players.length; i++)
        {
            if (keyInput.left.isDown)
            {
                console.log('A');
                this.players[i].setVelocityX(-160);

                this.players[i].anims.play('leftP'+i, true);
            }
            else if (keyInput.right.isDown)
            {
                this.players[i].setVelocityX(160);

                this.players[i].anims.play('rightP'+i, true);
            }
        
            else
            {
                this.players[i].setVelocityX(0);

                this.players[i].anims.play('stoppedP'+i);
            }
        
            if (keyInput.up.isDown && this.players[i].body.touching.down)
            {
                this.players[i].setVelocityY(-630);
            }
        
            //colision canon-hitbox
            /*
            this.physics.add.overlap(canon, hitbox, function(canon, hitbox) {
            console.log("colision hitbox-canon");
            canon.setVelocityX(canon.body.velocity.x * (-1)); 
            }, null, this);*/
        
            //colision bola-jugador
            this.physics.add.overlap(this.players[i], this.bolas, function(bola) {
                //quitar vida jugador   
                this.bola.destroy();
                //console.log("colisión player-bola");
            }, null, this);

            //colision fruta-jugador
            this.physics.add.overlap(this.players[i], this.fruits, function(fruit) {
                //añadir punto jugador  
                this.fruit.destroy();
                //console.log("colisión player-fruit");
            }, null, this);
        
            this.physics.add.overlap(this.bolas, this.hitbox, function(bola, hitbox)
            {
                this.bola.destroy();
                //debug
                //console.log("borrado bola: " + bola);
            });
        }

        /*
        //movimiento canones
        if(canon1.x > 748 || canon1.x < 52)
        {
            console.log('VEL1: ' + canon1.body.velocity.x)
            canon1.setVelocityX(canon1.body.velocity.x * (-1));
        }
        if(canon2.x > 748 || canon2.x < 52)
        {
            console.log('VEL2: ' + canon2.body.velocity.x)
            canon2.setVelocityX(canon2.body.velocity.x * (-1));
        }
        //overlap(bolaC1, player, bolaFuera);

        //colision bola-jugador
        this.physics.add.overlap(player, bolas, function(player, bolaC1) {
            //quitar vida jugador   
            bolaC1.destroy();
            //debug
            console.log("colisión player-bola");
        }, null, this);
        
        //debug
        //console.log("pos canon1: " + canon1.x, canon1.y);
        //console.log("pos canon2: " + canon2.x, canon2.y);
        //console.log("pos bolaC1: " + bolaC1.x, bolaC1.y)*/
    }
        

        
    
}

