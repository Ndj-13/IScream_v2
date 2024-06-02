class GameLoader extends Phaser.Scene {

    constructor() {
        super({ key: 'GameLoader' });
    }

    preload() {
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0x5B2970
            }
        })
        //this.load.image('loading', 'resources/img/players/charactIcon1.png');

        //Barra de carga
        this.load.on("progress", (percent) => {
            this.time.delayedCall(1000, () => {
                loadingBar.fillRect(100, 350, 600 * percent, 40);
                console.log(percent);
            });
        })
        this.load.on("complete", () => {
            console.log('done');
        })
    }

    create() {
        /////// WEBSOCKETS ///////
        connection.onclose = (e) => {
            console.log(`Socket cerrado`);
            location.reload();
        }

        this.setPlayerNames(); // rellena players 

        this.stopMusic = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.sound.stopAll();
            },
            callbackScope: this,
            loop: false
        });
        const confTexto = {
            origin: 'center',
            x: 240,
            y: 180,
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 50,
                fontStyle: 'bold',
                textAlign: 'center',
                justifyContent: 'center',
            }
        }
        this.loadText = this.make.text(confTexto).setText('Loading...');
        this.loadText.setStyle({ font: '32px estilo', fill: '#ffffff' });
        this.loadText.setPosition(400, 270);
        this.loadText.setScale(1.5);

        this.helado = this.add.image(400, 340, 'loading');
        this.helado.setScale(1.5);

        rivalPlayer.setReady(false);
        actualPlayer.setReady(false);

        this.time.delayedCall(2000, () => {
            this.scene.start('MainGame');
        });
    }

    setPlayerNames() {
        $.ajax({
            method: "GET",
            url: `http://${ipAddress}:8080/UsersName`,
            dataType: 'json'
        }).done(function (data) {
            players = data;
        })
    }
}