const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },

    backgroundColor: '#5B2970',

    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);

function preload()
{
    //this.load.setBaseURL('https://labs.phaser.io');
    this.load.image('logo', 'assets/interface/BakeryStudiosLogo.png');
}

function create ()
{
    this.add.image(400, 300, 'logo');
}

function update ()
{

}