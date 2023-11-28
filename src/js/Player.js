class Player extends Phaser.Physiscs.Arcade.Sprite{
    constructor(newScene, x, y, sprite){
        super(new Scene, x, y, sprite);

        this.scene = newScene;
    }
}