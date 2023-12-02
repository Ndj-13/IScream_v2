class Player {
    constructor(id){

        this.id = id;
        this.playerName = 'Player1';
        this.score = 0;
        this.ready = false;
        this.charactId = 1;
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
        this.score+=addN;
    }

    confirmReady(){
        return this.ready;
    }

    readyToPlay(){
        this.ready = true;
    }
}