class Player {
    constructor(id, posX, scene){

        this.scene = scene;
        this.id = id;
        this.playerName = 'Player1';
        
        this.ready = false;
        this.charactId = 1;
        this.hitbox;
        this.score = 0;
        this.hurt = false;
        this.picked=false;
    }
    /*preload(){
        this.scene.load.spritesheet('characterTransformed',
            'resources/img/players/Spritesheet(Andar)Transformed.png',
            { frameWidth: 64, frameHeight: 64 });
        this.scene.load.spritesheet('damageT',
        'resources/img/players/DamageP1.png',
        { frameWidth: 64, frameHeight: 64 });
        this.scene.anims.create({
            key: 'leftT',
            frames: this.scene.anims.generateFrameNumbers('characterTransformed', { start: 28, end: 32 }),
            frameRate: 15,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'stoppedT',
            frames: [ { key: 'characterTransformed', frame: 0 } ],
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'rightT',
            frames: this.scene.anims.generateFrameNumbers('characterTransformed', { start: 21, end: 25 }),
            frameRate: 15,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'damageT',
            frames: this.scene.anims.generateFrameNumbers('damageT', { start: 36, end: 44 }),
            frameRate: 10,
            repeat: 0
        });
    }
    /*updateTransformed(pc,keyInput){
        // Player controlls
        if (this.scene.keyInput.A.isDown)
        {
            pc.setVelocityX(-160);

            pc.anims.play('leftT', true);
        }
        else if (keyInput.D.isDown)
        {
            pc.setVelocityX(160);

            pc.anims.play('rightT', true);
        }
        
        else
        {
            pc.setVelocityX(0);

            pc.anims.play('stoppedT');
        }
        
        if (keyInput.W.isDown && pc.body.touching.down)
        {
            pc.setVelocityY(-630);
        }

    }*/
    isPicked(){
        return this.picked;
    }
    setPicked(pick){
        this.picked=pick;
    }
    getId(){
        return this.id;
    }

    setName(newName){
        this.playerName = newName;
    }
    getName(){
        return this.playerName;
    }

    getCharactId(){
        return this.charactId;
    }

    setCharactId(newCharactId)
    {
        this.charactId = newCharactId;
    }

    showScore()
    {
        return this.score;
    }
    resetScore()
    {
        this.score = 0;
    }
    updateScore(addN)
    {
        this.score = this.score + addN;
    }

    confirmReady(){
        return this.ready;
    }

    readyToPlay(){
        this.ready = true;
    }
}
