class GameLoader extends Phaser.Scene {

    constructor() {
        super({ key: 'GameLoader' });
    }

    preload(){
        console.log('GameLoader');
        this.load.image('gameBg', 'resources/img/scene/fondoNivel1.png');

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0x5B2970
            }
        })
        this.load.image('loading', 'resources/img/interface/charactIcon1.png');

        //Barra de carga
        this.load.on("progress", (percent)=>{
            this.time.delayedCall(1000, () => {
            loadingBar.fillRect(100, 350, 600*percent, 40);
            console.log(percent);
            });
        })
        this.load.on("complete", ()=>{
            console.log('done');
        })

        for(var i = 0; i < playersList.length; i++)
        {
            this.load.spritesheet('character'+playersList[i].getCharactId(),
            'resources/img/players/SpritesheetP'+playersList[i].getCharactId()+'(Andar).png',
            { frameWidth: 64, frameHeight: 64 });
            //Damage
            this.load.spritesheet('damageP'+playersList[i].getCharactId(),
            'resources/img/players/DamageP'+playersList[i].getCharactId()+'.png',
            { frameWidth: 64, frameHeight: 64 });

            //Character interface
            this.load.image('charactIcon'+playersList[i].getCharactId(), 'resources/img/interface/charactIcon'+playersList[i].getCharactId()+'.png');
            this.load.image('score'+i, 'resources/img/interface/InterfazPuntuacionVacio.png');
        }
    }

    create()
    {
        //this.add.image(400, 300, 'gameBg');
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
        this.loadText.setStyle({font: '32px estilo', fill:'#ffffff'});
        this.loadText.setPosition(400, 270); 
        this.loadText.setScale(1.5);
        
        this.helado = this.add.image(400, 340, 'loading');
        this.helado.setScale(1.5);

        for(var i = 0; i < playersList.length; i++)
        {
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

            this.anims.create({
                key: 'damageP'+i,
                frames: this.anims.generateFrameNumbers('damageP'+playersList[i].getCharactId(), { start: 36, end: 44 }),
                frameRate: 10,
                repeat: 0
            });

            
        }

        this.time.delayedCall(2000, () => {
            this.scene.start('MainGame');
        });
    }
}