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