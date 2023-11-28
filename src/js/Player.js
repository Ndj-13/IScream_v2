class Player {
    constructor(){

        this.lifeBar = 100;
        this.playerName = 'Player1';
    }

    setName(newName){
        this.playerName = newName;
    }
    getName(){
        return this.playerName;
    }
}