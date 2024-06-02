var scoresText = [];
var namesText = [];
var pauseScene;
var pauseButton;
var reloadButton;
var juegoParado = false; // solo controla la pausa del boton pause
var rivalActivo = true; // controla si la otra sesion ws sigue activa
var CARGADO = false; // controla que hasta que el otro jugador no haya cargado, no empieza la partida
var dir;
var comboTimer = false;

class MainGame extends Phaser.Scene {

    constructor() {
        super({ key: 'MainGame' });
    }

    preload() {
        pauseScene = new Pause(this);

        //Scene
        this.load.image('gameBg', 'resources/img/scene/fondoNivel1.png');
        this.load.image('ground', 'resources/img/scene/suelo.png');
        this.load.image('timerImg', 'resources/img/interface/timer.png');
        this.load.image('fruit', 'resources/img/scene/cereza.png');
        this.load.image('trans', 'resources/img/scene/trans.png');
       // this.load.image('icyIcon0', 'resources/img/interface/charactIcon1.png');
        this.load.image('score', 'resources/img/interface/InterfazPuntuacionVacio.png');
        this.load.image('warning', 'resources/img/interface/connectionLost.png')

        //audio
        this.load.audio('ouch', 'resources/audio/OuchSound.mp3');
        this.load.audio('coin', 'resources/audio/Classic Arcade SFX/coins/Coin_5.wav');
        this.load.audio('jump', 'resources/audio/Classic Arcade SFX/Jumps/Jump_6.wav');
        this.load.audio('ost', 'resources/audio/ost.mp3');

        //Players
        for (var i = 1; i <= 4; i++) {
            this.load.image('icyIcon' + i, 'resources/img/players/charactIcon' + i + '.png');
        }
        
        this.load.spritesheet('icyT', 'resources/img/players/Spritesheet(Andar)Transformed.png',
            { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('icyDamage', 'resources/img/players/DamageP1.png',
            { frameWidth: 64, frameHeight: 64 });

        //Pause
        this.load.spritesheet('pause', 'resources/img/interface/botonPause.png',
            { frameWidth: 80, frameHeight: 47 });
        //Timer
        this.load.spritesheet('timer', 'resources/img/interface/timerSpritesheet.png',
            { frameWidth: 800, frameHeight: 600 });
        //Items
        this.load.spritesheet('fireball', 'resources/img/scene/fireball_compacto.png',
            { frameWidth: 33, frameHeight: 73 });
        //Reload
        this.load.spritesheet('reload', 'resources/img/interface/botonReload.png',
            { frameWidth: 80, frameHeight: 47 });
        pauseScene.preload();
    }

    create() {
        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////WEBSOCKETS//////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        connection.onclose = (e) => {
            console.log(`Socket cerrado`);
            /*rivalActivo = false;
            rivalPlayer = null;
            actualPlayer = null;
            players = null;
            this.scene.start('LogIn');*/
            location.reload();
        }

        connection.onmessage = (message) => {
            let msg = JSON.parse(message.data);
            //console.log(msg);

            // PLAYER
            if (msg.type === 'rival') {
                if (actualPlayer.getName() == players[1] && msg.scorePlayer0 !== undefined && msg.scorePlayer1 !== undefined) {
                    actualPlayer.setScore(msg.scorePlayer1);
                    rivalPlayer.setScore(msg.scorePlayer0);
                }
                this.updateRival(msg.dir, msg.x, msg.y, msg.combo, msg.paused, msg.retry, msg.menu);
            }
            // FRUTA
            if (msg.type === 'fruit' && msg.xFruit !== undefined && msg.yFruit !== undefined) this.createFruit(msg.xFruit, msg.yFruit);
            // BOLAS
            if (msg.type === 'ball' && msg.xBall !== undefined && msg.yBall !== undefined) this.createBall(msg.xBall, msg.yBall);
            if (msg.type === 'session' && msg.closed) this.gameOver();
            if(msg.type === 'startGame') CARGADO = true;
        }

        ///////////////////////////////////////////////////////////////////////////
        ////////////////////////////////// GAME ///////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////  

        /////// AUDIO
        this.sound.stopAll();
        this.hitSound = this.sound.add('ouch');
        this.coinSound = this.sound.add('coin', { volume: 0.5 });
        this.jumpSound = this.sound.add('jump', { volume: 0.6 });

        this.ost = this.sound.add('ost');
        this.ost.play();
        this.ost.setLoop(true);

        //////// BG
        this.add.image(400, 300, 'gameBg');
        /////// PLATAFORMAS
        var platforms = this.physics.add.staticGroup();
        platforms.create(400, 580, 'ground').refreshBody();
        platforms.create(800, 410, 'ground');
        platforms.create(-100, 270, 'ground');
        platforms.create(1000, 220, 'ground');

        /////// TIMER
        this.add.image(400, 300, 'timerImg');
        this.anims.create({
            key: 'timer',
            frames: this.anims.generateFrameNumbers('timer', { start: 0, end: 12 }),
            frameRate: 15,
            repeat: -1
        });
        this.tiempoPartida = 60; // Duración de la partida en segundos
        var timerText = this.add.text(365, 20, '00:' + this.tiempoPartida, { font: '30px estilo', fill: '#000000' });
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                if(CARGADO) this.tiempoPartida--;
                timerText.setText('00:' + this.tiempoPartida);

                if (this.tiempoPartida === 0) {
                    this.timer.paused = true;
                    this.scene.start("Results");
                }
                if (this.tiempoPartida < 10) {
                    timerText.setText('00:0' + this.tiempoPartida);
                    timerText.style.color = '#FF1D1D';
                }

            },
            callbackScope: this,
            loop: true
        });

        ////// ITEMS
        //Frutas
        this.fruits = this.physics.add.group({
            allowGravity: false,
            velocityY: 150
        })

        //Fireballs
        this.bolas = this.physics.add.group({
            allowGravity: false,
            velocityY: 150,
        });
        this.anims.create({
            key: 'fireball',
            frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1
        });

        //Hitboxes
        this.hitbox = this.physics.add.group({
            allowGravity: false
        });
        this.hitboxOOB = this.hitbox.create(400, 850, 'trans');
        this.hitboxOOB.setScale(30, 0.5);

        ///////////////////////////////////////////////////////////////////////////
        //////////////////////////////// PLAYERS //////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////  

        /////// CONFIG TEXT
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

        /////// RESET
        scoresText = [];
        namesText = [];
        actualPlayer.setScore(0);
        rivalPlayer.setScore(0);

        /////// ADD PLAYERS
        this.addPlayerToGame(actualPlayer, platforms, confJugadores);
        this.addPlayerToGame(rivalPlayer, platforms, confJugadores);

        //////// KEYBOARD INPUT
        cursorInput = this.input.keyboard.createCursorKeys();
        this.keyInput = this.input.keyboard.addKeys(
            {
                'A': Phaser.Input.Keyboard.KeyCodes.A,
                'D': Phaser.Input.Keyboard.KeyCodes.D,
                'W': Phaser.Input.Keyboard.KeyCodes.W,
                /*'ESC': Phaser.Input.Keyboard.KeyCodes.ESC,
                'LEFT': Phaser.Input.Keyboard.KeyCodes.LEFT,
                'RIGHT': Phaser.Input.Keyboard.KeyCodes.RIGHT,
                'UP': Phaser.Input.Keyboard.KeyCodes.UP,*/
            });

        //////// COMBO
        var combo = this.input.keyboard.createCombo('UIOP');
        this.input.keyboard.on('keycombomatch', function (event) {
            if (CARGADO && event.keyCodes.toString() === combo.keyCodes.toString()) {
                actualPlayer.setCombo(true);
                comboTimer = true;
                console.log('Key Combo 1 matched!');
            }
        });

        //////// COLLISIONS
        //colision bolas-jugadores
        this.collisionPlayer(actualPlayer, this.bolas, this.fruits);
        this.collisionPlayer(rivalPlayer, this.bolas, this.fruits);

        //colision bolas-hitbox
        this.physics.add.overlap(this.bolas, this.hitbox, function (bola, hitbox) {
            bola.destroy();
        });

        console.log(actualPlayer, rivalPlayer);

        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////// PAUSE ///////////////////////////////////
        /////////////////////////////////////////////////////////////////////////// 

        pauseButton = this.add.sprite(400, 90, "pause").setInteractive();
        this.pauseMarco = this.add.sprite(400, 90, "marco").setVisible(false).setScale(0.9);

        pauseScene.create();
        pauseScene.setInvisible();

        pauseButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.pauseMarco.setVisible(true);
        })
        pauseButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.pauseMarco.setVisible(false);
        })

        pauseButton.on("pointerup", () => {
            document.body.style.cursor = "auto";
            console.log('entra en pausebutton on pointerup');
            if (pauseButton.frame.name === 0) {
                pauseButton.setFrame(1);
            } else {
                pauseButton.setFrame(0);
            }
        })

        ///////////////////////// notify ready to star playing
        this.sendInfoGame(true);
    }

    update() {
        // mandar info si los dos sockets están activos
        if (rivalActivo) this.sendInfoGame(false); // false pk si es true es pa q notifique q empieza el juego (no quiere q empiece, quiere actualizar)

        if (CARGADO) {
            // actualizar pause
            if (pauseButton.frame.name == 0 && !juegoParado) {
                this.continuarJuego();
            } else if (pauseButton.frame.name == 1 && juegoParado) {
                this.pararJuego(false);
            }
            // actualizar jugador si no está parado
            if (pauseButton.frame.name == 0 && !actualPlayer.getHurt()) {
                this.actualPlayerController(actualPlayer.getHitbox(), actualPlayer.getIcy(), actualPlayer.getCombo());
            }
            // si se activa el combo, empezar tiempo de combo
            if (actualPlayer.getCombo() && comboTimer) {
                comboTimer = false;
                this.timerCombo = this.time.addEvent({
                    delay: 10000,
                    callback: () => {
                        actualPlayer.setCombo(false);
                        console.log('END of Key Combo 1');
                    },
                    callbackScope: this,
                    loop: false
                });
            }
        }


        ////// BOTONES PAUSE //////
        if (pauseScene.getRetry()) {
            this.scene.restart();
            pauseScene.setRetry(false);
            this.continuarJuego();
        }
        if(pauseScene.getMenu()) {
            this.sendInfoGame(false);
            this.sound.stopAll();
            player2Panel.invisible();
            panelsCount--;
            actualPlayer.setReady(false);
            rivalPlayer = null;
            players = null;

            this.scene.start("Menu");
        }

        /////////NAME///////////
        namesText[0].setPosition(actualPlayer.hitbox.x, actualPlayer.hitbox.y - 40);
        if (rivalPlayer) namesText[1].setPosition(rivalPlayer.hitbox.x, rivalPlayer.hitbox.y - 40);

        ////////SCORE////////////
        scoresText[0].setText(actualPlayer.getScore());
        if (rivalPlayer) scoresText[1].setText(rivalPlayer.getScore());
    }

    collisionPlayer(player, bolas, fruits) {
        // DAÑO
        this.physics.add.overlap(player.getHitbox(), bolas, function (playerHB, bola) {
            this.hitSound.play();
            bola.destroy();

            player.setHurt(true);
            playerHB.setVelocity(0);
            playerHB.setTint(0xFF0000);
            playerHB.anims.play('damage', true);
            this.stop = this.time.addEvent({
                delay: 2000,
                callbackScope: this,
                loop: false,
                callback: () => {
                    player.setHurt(false);
                    playerHB.clearTint();
                    if (player.getName() == players[1]) {
                        playerHB.setPosition(750, 500);
                    } else {
                        playerHB.setPosition(45, 500);
                    }

                },
            });
        }, null, this);

        // GANA PUNTOS
        this.physics.add.overlap(player.getHitbox(), fruits, function (playerHB, fruit) {
            this.coinSound.play();
            console.log('COLISION CON FRUTA DE ', player.getName())
            if (actualPlayer.getName() == players[0]) player.getCombo() ? player.updateScore(2) : player.updateScore(1);
            fruit.destroy();
        }, null, this);
    }

    actualPlayerController(playerController, icy, combo) {
        if (combo) {
            if (this.keyInput.A.isDown) {
                playerController.setVelocityX(-160);
                playerController.anims.play('leftT', true);
                dir = 'left';
            }
            else if (this.keyInput.D.isDown) {
                playerController.setVelocityX(160);
                playerController.anims.play('rightT', true);
                dir = 'right';
            }
            else {
                playerController.setVelocityX(0);
                playerController.anims.play('stoppedT');
                dir = 'stop';
            }
        } else {
            if (this.keyInput.A.isDown) {
                playerController.setVelocityX(-160);
                playerController.anims.play('left' + icy, true);
                dir = 'left';
            }
            else if (this.keyInput.D.isDown) {
                playerController.setVelocityX(160);
                playerController.anims.play('right' + icy, true);
                dir = 'right';
            }
            else {
                playerController.setVelocityX(0);
                playerController.anims.play('stopped' + icy);
                dir = 'stop';
            }
        }
        if (this.keyInput.W.isDown && playerController.body.touching.down) {
            playerController.setVelocityY(-630);
        }
    }

    updateRival(direction, xPos, yPos, combo, paused, retry, menu) {
        // botones pause
        if (retry !== undefined) pauseScene.setRetry(retry);
        if (menu !== undefined) pauseScene.setMenu(menu);

        // actualiza posicion (con un poco de lag pero es lo q hay)
        if (xPos !== undefined && yPos !== undefined) {
            rivalPlayer.hitbox.x = xPos;
            rivalPlayer.hitbox.y = yPos;
        }
        // actualiza combo y pause
        if (combo !== undefined && rivalPlayer.getCombo() !== combo) rivalPlayer.setCombo(combo);
        if (paused !== undefined && juegoParado !== paused) {
            juegoParado = paused;
            if (paused) {
                pauseButton.setFrame(1);
            } else if (!paused) {
                pauseButton.setFrame(0);
            }
        }

        if (!rivalPlayer.getHurt() && direction !== undefined) {
            if (rivalPlayer.getCombo()) {
                if (direction == 'left') {
                    rivalPlayer.hitbox.anims.play('leftT', true);
                }
                else if (direction == 'right') {
                    rivalPlayer.hitbox.anims.play('rightT', true);
                }
                else {
                    rivalPlayer.hitbox.setVelocityX(0);
                    rivalPlayer.hitbox.anims.play('stoppedT');
                }
            }
            else {
                if (direction == 'left') {
                    rivalPlayer.hitbox.anims.play('left' + rivalPlayer.icy, true);
                }
                else if (direction == 'right') {
                    rivalPlayer.hitbox.anims.play('right' + rivalPlayer.icy, true);
                }
                else {
                    rivalPlayer.hitbox.anims.play('stopped' + rivalPlayer.icy);
                }
            }
        }
    }

    pararJuego(gameOver) {
        if (!gameOver) {
            if (pauseButton.frame.name === 0) pauseButton.setFrame(1);
            pauseScene.setVisible();
        }

        // SE PARA EL SPAWN DE FRUTAS EN EL SERVIDOR
        this.fruits.children.iterate(function (fruit) {
            fruit.body.setVelocity(0); // Detener la velocidad de cada fruta
        });

        // SE PARA EL SPAWN DE BOLAS EN EL SERVIDOR
        this.bolas.children.iterate(function (bola) {
            bola.body.setVelocity(0); // Detener la velocidad de cada bola
        });

        actualPlayer.hitbox.setVelocityX(0);
        actualPlayer.hitbox.setVelocityY(0);
        this.anims.pauseAll();
        this.timer.paused = true;

        juegoParado = true;
    }

    continuarJuego() {
        if (pauseButton.frame.name === 1) pauseButton.setFrame(0);
        pauseScene.setInvisible()

        // SE REANUDA EL SPAWN DE FRUTAS EN EL SERVIDOR
        this.fruits.children.iterate(function (fruit) {
            fruit.body.setVelocityY(150); // Reanudar la velocidad de cada bola
        });
        // SE REANUDA EL SPAWN DE BOLAS EN EL SERVIDOR
        this.bolas.children.iterate(function (bola) {
            bola.body.setVelocityY(150); // Reanudar la velocidad de cada bola
        });
        this.anims.resumeAll();
        this.timer.paused = false;

        juegoParado = false;
    }

    addPlayerToGame(player, platforms, confJugadores) {
        this.posX = 45; this.posXRec = 80;
        if (player.getName() == players[1]) { this.posX = 750; this.posXRec = 720; }

        this.icy = this.physics.add.sprite(this.posX, 450, 'icy' + player.getIcy());
        this.icy.setBounce(0.2);
        this.icy.setCollideWorldBounds(true);

        // ANIMS
        this.anims.create({
            key: 'left' + player.getIcy(),
            frames: this.anims.generateFrameNumbers('icy' + player.getIcy(), { start: 28, end: 32 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'stopped' + player.getIcy(),
            frames: [{ key: 'icy' + player.getIcy(), frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right' + player.getIcy(),
            frames: this.anims.generateFrameNumbers('icy' + player.getIcy(), { start: 21, end: 25 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'damage',
            frames: this.anims.generateFrameNumbers('icyDamage', { start: 36, end: 44 }),
            frameRate: 10,
            repeat: 0
        });

        // ANIMS CON EL COMBO
        this.anims.create({
            key: 'leftT',
            frames: this.anims.generateFrameNumbers('icyT', { start: 28, end: 32 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'stoppedT',
            frames: [{ key: 'icyT', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'rightT',
            frames: this.anims.generateFrameNumbers('icyT', { start: 21, end: 25 }),
            frameRate: 15,
            repeat: -1
        });

        //COLLISIONS
        this.physics.add.collider(this.icy, platforms);
        this.physics.add.collider(this.fruits, platforms);
        this.physics.add.collider(this.icy, this.hitbox);

        //Name
        this.nameText = this.make.text(confJugadores).setText(player.getName());
        this.nameText.setStyle({ font: '12px estilo', fill: '#ffffff' });
        this.nameText.setPosition(this.posX, this.icy.y + 45);

        namesText.push(this.nameText);

        //Agregar jugador creado a lista global jugadores
        player.setHitbox(this.icy);

        //Interface
        this.rec = this.add.image(this.posXRec, 40, 'score');
        this.icyIcon = this.add.image(this.posXRec - 30, 40, 'icyIcon' + player.getIcy());
        this.score = this.make.text(confJugadores).setText(player.getScore());
        this.score.setPosition(this.posXRec + 30, 40);
        if (player.getName() == players[1]) {
            this.score.setPosition(this.posXRec - 30, 40);
            this.icyIcon.setPosition(this.posXRec + 30, 40);
            this.rec.flipX = true;
        }
        scoresText.push(this.score);
    }

    createFruit(x, y) {
        this.fruit = this.fruits.create(x, y, 'fruit');
        this.fruit.setScale(0.9);
    }
    createBall(x, y) {
        this.bola = this.bolas.create(x, -y, 'fireball');
        this.bola.setScale(0.6);
        this.bola.anims.play('fireball', true);
    }

    sendInfoGame(loaded) {
        let message;
        if (actualPlayer.getName() == players[0]) {
            message =
            {
                loaded: loaded,
                paused: pauseButton.frame.name == 1 ? true : false,
                combo: actualPlayer.getCombo(),
                dir: dir,
                x: actualPlayer.hitbox.x,
                y: actualPlayer.hitbox.y,
                retry: pauseScene.getRetry(),
                menu: pauseScene.getMenu(),
                scorePlayer0: actualPlayer.getScore(),
                scorePlayer1: rivalPlayer.getScore(),
            }
        } else {
            message =
            {
                loaded: loaded,
                paused: pauseButton.frame.name == 1 ? true : false,
                combo: actualPlayer.getCombo(),
                dir: dir,
                retry: pauseScene.getRetry(),
                menu: pauseScene.getMenu(),
                x: actualPlayer.hitbox.x,
                y: actualPlayer.hitbox.y,
            }
        }
        connection.send(JSON.stringify(message));
    }

    gameOver() {
        rivalActivo = false;
        console.log('EL RIVAL SE HA DESCONECTADO, rivalActivo = ', rivalActivo);
        this.pararJuego(true);
        juegoParado = true;

        this.niebla = this.add.graphics({
            fillStyle: {
                color: 0x828282,
                alpha: 0.6,
            }
        });
        this.niebla.fillRect(0, 0, 800, 600);
        this.add.image(400, 300, 'warning');

        reloadButton = this.add.sprite(400, 400, "reload").setInteractive();
        reloadButton.on("pointerdown", () => {
            //this.marcoMenu.setVisible(false);
            reloadButton.setFrame(1);
        })

        reloadButton.on("pointerup", () => {
            document.body.style.cursor = "auto";
            reloadButton.setFrame(0);
            location.reload();
        })
    }
}