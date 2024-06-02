class Player {
    constructor(name) { // el name hace de id, pk es unico
        this.playerName = name;
        this.playerPassword = '';

        this.ready = false;
        this.hitbox;
        this.score = 0;
        this.hurt = false;
        this.combo = false;
        this.icy = 1;
    }

    getPicked() {
        return this.picked;
    }
    setPicked(pick) {
        this.picked = pick;
    }

    setName(newName) {
        this.playerName = newName;
    }
    getName() {
        return this.playerName;
    }

    setPassword(password) {
        this.playerPassword = password;
    }
    getPassword() {
        return this.playerPassword;
    }

    getScore() {
        return this.score;
    }
    updateScore(addN) {
        this.score = this.score + addN;
    }
    setScore(score) {
        this.score = score;
    }

    getReady() {
        return this.ready;
    }
    setReady(ready) {
        this.ready = ready;
    }

    getIcy() {
        return this.icy;
    }
    setIcy(icy) {
        this.icy = icy;
    }

    getCombo() {
        return this.combo;
    }
    setCombo(combo) {
        this.combo = combo;
    }

    getHitbox() {
        return this.hitbox;
    }
    setHitbox(htbx) {
        this.hitbox = htbx;
    }

    getHurt() {
        return this.paused;
    }
    setHurt(hurt) {
        this.paused = hurt;
    }

}