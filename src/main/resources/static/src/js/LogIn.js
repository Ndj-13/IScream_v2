var bannerTxt;
var banner;

class LogIn extends Phaser.Scene {

    constructor() {
        super({ key: 'LogIn' });
        this.playerName = document.getElementById('namebar1');
        this.playerPassword = document.getElementById('password1');
        this.playerError = document.getElementById('error1');
        this.signUp = false; // distingue entre cuando los botones tienen funcion de sing up y cuando tienen de login
    }

    preload() {
        this.load.image('background', 'resources/img/interface/pantallaInicio.png');
        this.load.image('title', 'resources/img/interface/LogoI-ScreamFondoBlanco.png');
        this.load.image('textBanner', 'resources/img/interface/bannerLogIn.png');

        // marco boton (para todas las pantallas)
        this.load.image("marco", "resources/img/interface/recuadroBoton.png");

        // botones
        this.load.spritesheet('ok',
            'resources/img/interface/botonOk.png',
            { frameWidth: 120, frameHeight: 47 });
        this.load.spritesheet('signUpButton',
            'resources/img/interface/botonSignUp.png',
            { frameWidth: 122, frameHeight: 47 });
        this.load.spritesheet('logInButton',
            'resources/img/interface/botonLogIn.png',
            { frameWidth: 122, frameHeight: 47 });
        //audio
        this.load.audio('menuOst', 'resources/audio/menuOst.mp3');
    }
    create() {
        // si llega a esta pantalla pk se ha desconectado, se reinicia
        desconectado = false;

        //audio
        if (menuMusic == false) {
            this.menuOst = this.sound.add('menuOst', { volume: 0.4 });
            this.menuOst.play();
            this.menuOst.setLoop(true);
            menuMusic = true;
        }

        ///////////////////////////////////////////////////////////////////////////
        ////////////////////////////// INTERFAZ ///////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        // texto 
        const confBannerTxt = {
            origin: 'center',
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 16,
                fontStyle: 'bold'
            }
        }

        this.add.image(400, 300, 'background');
        this.add.image(game.renderer.width / 2, 180, 'title');

        banner = this.add.image(630, 530, 'textBanner').setVisible(false).setScale(3);
        bannerTxt = this.make.text(confBannerTxt).setText('').setPosition(630, 530);

        ///// INPUTS //////
        this.playerName.disabled = false;
        this.playerName.value = '';
        this.playerName.setAttribute('placeholder', 'Enter your name...');
        this.playerName.style.visibility = "visible";
        this.playerPassword.disabled = false;
        this.playerPassword.value = '';
        this.playerPassword.setAttribute('placeholder', 'Enter your password...');
        this.playerPassword.style.visibility = "visible";

        this.logInButton = this.add.sprite(325, 300, "logInButton").setInteractive();
        this.logInMarco = this.add.sprite(325, 300, "marco").setVisible(false);
        this.signUpButton = this.add.sprite(475, 300, "signUpButton").setInteractive();
        this.signUpMarco = this.add.sprite(475, 300, "marco").setVisible(false);
        this.okButton = this.add.sprite(400, 470, "ok").setInteractive();
        this.okMarco = this.add.sprite(400, 470, "marco").setVisible(false);

        ///////////////////////////////////////////////////////////////////////////
        /////////////////////////// FUNCIONALIDADES ///////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        this.logInButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.logInMarco.setVisible(true);
        })
        this.logInButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.logInMarco.setVisible(false);

        })
        this.logInButton.on("pointerdown", () => {
            this.logInButton.setFrame(2);
            this.signUpButton.setFrame(0);
        })
        this.logInButton.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.signUp = false;
            banner.setVisible(false);
            bannerTxt.setText('');
        })

        this.signUpButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.signUpMarco.setVisible(true);
        })
        this.signUpButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.signUpMarco.setVisible(false);
        })
        this.signUpButton.on("pointerdown", () => {
            this.signUpButton.setFrame(2);
            this.logInButton.setFrame(0);
        })
        this.signUpButton.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.signUp = true;
            banner.setVisible(false);
            bannerTxt.setText('');
        })

        this.okButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.okMarco.setVisible(true);
        })
        this.okButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.okMarco.setVisible(false);
        })
        this.okButton.on("pointerdown", () => {
            this.okButton.setFrame(1);
        })
        this.okButton.on("pointerup", () => {
            document.body.style.cursor = "auto";
            if (this.signUp) {
                createUser("#namebar1", "#password1", "#error1");
            } else {
                logIn("#namebar1", "#password1", (response) => {
                    if (response === "Password correct.") {
                        this.addPlayer(this.playerName.value, this.playerPassword.value);

                        this.playerName.disabled = true;
                        this.okButton.setFrame(1);

                        this.playerName.style.visibility = 'hidden';
                        this.playerPassword.style.visibility = 'hidden';
                        this.scene.start("Menu");
                    }
                });
            }
        });
    }

    addPlayer(name, pw) {
        actualPlayer = new Player(name);
        actualPlayer.setPassword(pw);
    }
}

///////////////////////////////////////////////////////////////////////////
/////////////////////////////// API-REST //////////////////////////////////
///////////////////////////////////////////////////////////////////////////

function logIn(namebar, password, callback) {
    var name = $(namebar).val();
    var pass = $(password).val();
    $.ajax({
        method: "POST",
        url: `http://${ipAddress}:8080/User`,
        data: JSON.stringify({ name: name, password: pass }),
        processData: false,
        contentType: "application/json",
        success: function (data, textStatus, jqXHR) {
            console.log(textStatus + " " + jqXHR.status);
            console.log(data);
            if (callback) callback(data);
        },
        error: function (jqXHR, textStatus) {
            console.log(textStatus + " " + jqXHR.status);
            console.log(jqXHR.responseText);
            // mostrar el error
            banner.setVisible(true);
            bannerTxt.setText(jqXHR.responseText);
        }
    });
}

function createUser(namebar, password, errorSpan) {
    var name = $(namebar).val();
    var pass = $(password).val();
    $.ajax({
        method: "POST",
        url: `http://${ipAddress}:8080/NewUser`,
        data: JSON.stringify({ name: name, password: pass }),
        processData: false,
        contentType: "application/json",
        success: function (data, textStatus, jqXHR) {
            console.log(textStatus + " " + jqXHR.status);
            console.log(data);
            banner.setVisible(true);
            bannerTxt.setText("User created succesfully");
        },
        error: function (jqXHR, textStatus) {
            console.log(textStatus + " " + jqXHR.status);
            // mostrar el error
            banner.setVisible(true);
            bannerTxt.setText("User already exists");
        }
    });
}