class LoadScreen extends Phaser.Scene {

    constructor() {
        super({ key: 'LoadScreen' });
    }

    preload() {
        this.load.image('logo', 'resources/img/interface/BakeryStudiosLogo.png');

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xde72ca
            }
        })
        this.load.image('loading', 'resources/img/players/charactIcon1.png');

        //Barra de carga
        this.load.on("progress", (percent) => {
            this.time.delayedCall(1000, () => {
                loadingBar.fillRect(100, 350, 600 * percent, 40);
            });
        })
    }

    create() {
        this.add.image(400, 300, 'logo');
        this.helado = this.add.image(100, 370, 'loading');
        this.helado.setScale(1.3);

        this.time.delayedCall(2000, () => {
            this.scene.start('LogIn');
        });
    }
}
