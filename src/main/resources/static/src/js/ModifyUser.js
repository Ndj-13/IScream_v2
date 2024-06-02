class ModifyUser extends Phaser.Scene {

    constructor() {
        super({ key: 'ModifyUser' });
        this.playerName = document.getElementById('namebarMU');
        this.playerPassword = document.getElementById('passwordMU');
        this.playerError = document.getElementById('errorMU');
    }

    preload() {
        this.load.image('selectScreenBg', 'resources/img/interface/pantallaSeleccion.png');
        this.load.image('AccountTitle', 'resources/img/interface/ACCOUNT.png');

        // botones
        this.load.spritesheet('modifyBt',
            'resources/img/interface/botonModify.png',
            { frameWidth: 122, frameHeight: 47 });
        this.load.spritesheet('deleteBt',
            'resources/img/interface/botonDelete.png',
            { frameWidth: 122, frameHeight: 47 });
        this.load.spritesheet('menu',
            'resources/img/interface/botonMenu.png',
            { frameWidth: 120, frameHeight: 47 });
        this.load.spritesheet('ok',
            'resources/img/interface/botonOk.png',
            { frameWidth: 120, frameHeight: 47 });

        // audio
        this.load.audio('menuOst', 'resources/audio/menuOst.mp3');
    }
    create() {
        /////// WEBSOCKETS ///////
        connection.onclose = (e) => {
            console.log(`Socket cerrado`);
            location.reload();
        }

        //audio
        if (menuMusic == false) {
            this.menuOst = this.sound.add('menuOst', { volume: 0.4 });
            this.menuOst.play();
            this.menuOst.setLoop(true);
            menuMusic = true;
        }

        ///////////////////////////////////////////////////////////////////////////
        /////////////////////////////// INTERFAZ //////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        this.add.image(400, 300, 'selectScreenBg');
        this.add.image(400, 200, 'AccountTitle');

        this.modifyButton = this.add.sprite(475, 300, "modifyBt").setInteractive();
        this.modifyMarco = this.add.sprite(475,300,'marco').setVisible(false);

        this.deleteButton = this.add.sprite(325, 300, "deleteBt").setInteractive();
        this.deleteMarco = this.add.sprite(325,300,'marco').setVisible(false);

        this.okModifyButton = this.add.sprite(400, 450, "ok").setInteractive().setVisible(false);
        this.okModifyMarco = this.add.sprite(400,450,'marco').setVisible(false);

        this.okDeleteButton = this.add.sprite(400, 450, "ok").setInteractive().setVisible(false);
        this.okDeleteMarco = this.add.sprite(400,450,'marco').setVisible(false);

        this.menuButton = this.add.sprite(100, 80, "menu").setInteractive();
        this.menuMarco = this.add.sprite(100,80,"marco").setVisible(false);

        // Alerta para eliminar cuenta
        const confAlertaDelete = {
            origin: 'center',
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 20,
                fontStyle: 'bold'
            }
        }
        this.alertaDelete = this.make.text(confAlertaDelete).setText('Are you sure you want to delete this account? \n \t         You will have to log in again.').setPosition(400, 375).setVisible(false);

        ///////////////////////////////////////////////////////////////////////////
        /////////////////////////// FUNCIONALIDADES ///////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        this.modifyButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.modifyMarco.setVisible(true);
        })
        this.modifyButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.modifyMarco.setVisible(false);
        })
        this.modifyButton.on("pointerdown", () => {
            if (this.modifyButton.frame.name == 0) {
                this.modifyButton.setFrame(2);
            } else {
                this.modifyButton.setFrame(0);
            }
        })
        this.modifyButton.on("pointerup", () => {
            document.body.style.cursor = "auto";
            if (this.modifyButton.frame.name == 2) {
                // Ocultar cosas del delete
                if (this.deleteButton.frame.name == 2) this.deleteButton.setFrame(0);
                this.okDeleteButton.setVisible(false);
                this.alertaDelete.setVisible(false);

                this.okModifyButton.setVisible(true);
                //Iniciar los inputs
                this.playerName.value = actualPlayer.getName();
                this.playerName.style.visibility = "visible";

                this.playerPassword.disabled = false;
                this.playerPassword.value = '';
                this.playerPassword.style.visibility = "visible";

            } else {
                this.okModifyButton.setVisible(false);
                //Quitar los inputs
                this.playerName.style.visibility = "hidden";
                this.playerPassword.style.visibility = "hidden";
            }
        })

        this.okModifyButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.okModifyMarco.setVisible(true);
        })
        this.okModifyButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.okModifyMarco.setVisible(false);
        })
        this.okModifyButton.on("pointerdown", () => {
            this.okModifyButton.setFrame(1);
        })
        this.okModifyButton.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.modifyUser("#passwordMU", "#errorMU", (response) => { console.log(response); });
            this.okModifyButton.setFrame(0);
        })

        this.deleteButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.deleteMarco.setVisible(true);
        })
        this.deleteButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.deleteMarco.setVisible(false);
        })
        this.deleteButton.on("pointerdown", () => {
            if (this.deleteButton.frame.name == 0) {
                this.deleteButton.setFrame(2);
            } else {
                this.deleteButton.setFrame(0);
            }
        })
        this.deleteButton.on("pointerup", () => {
            document.body.style.cursor = "auto";
            if (this.deleteButton.frame.name == 2) {
                // ocultar cosas del modify
                if (this.modifyButton.frame.name == 2) this.modifyButton.setFrame(0);
                this.okModifyButton.setVisible(false);
                this.playerName.style.visibility = "hidden";
                this.playerPassword.style.visibility = "hidden";

                this.okDeleteButton.setVisible(true);
                this.alertaDelete.setVisible(true);
            } else {
                this.okDeleteButton.setVisible(false);
                this.alertaDelete.setVisible(false);
            }
        })

        this.okDeleteButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.okDeleteMarco.setVisible(true);
        })

        this.okDeleteButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.okDeleteButton.setFrame(0);
            this.okDeleteMarco.setVisible(false);
        })

        this.okDeleteButton.on("pointerdown", () => {
            this.okDeleteButton.setFrame(1);
        })

        this.okDeleteButton.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.deleteUser();
        })

        this.menuButton.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.menuMarco.setVisible(true);
        })
        this.menuButton.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.menuMarco.setVisible(false);
        })
        this.menuButton.on("pointerdown", () => {
            this.menuButton.setFrame(1);

        })
        this.menuButton.on("pointerup", () => {
            document.body.style.cursor = "auto"; 
            this.playerName.style.visibility = "hidden";
            this.playerPassword.disabled = true;
            this.playerPassword.value = '';
            this.playerPassword.style.visibility = "hidden";
            this.playerError.style.visibility = "hidden";

            this.scene.start("Menu");
        })
    }

    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////////// API-REST /////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    modifyUser(password, errorSpan, callback) {
        var pass = $(password).val();
        $.ajax({
            method: "PUT",
            url: `http://${ipAddress}:8080/ModifyingUser`,
            data: JSON.stringify({ name: actualPlayer.getName(), password: pass }),
            processData: false,
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                console.log(textStatus + " " + jqXHR.status);
                console.log(data);
                $(errorSpan).text('').css('visibility', 'hidden');
                if (callback) callback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + " " + jqXHR.status);
                // Mostrar mensaje de error en rojo debajo del input de contraseña
                $(errorSpan).text("Password doesn't match or user doesn't exist.").css("color", "red").css("visibility", "visible");
            }
        });
    }

    deleteUser() {
        // elimina nombre y contraseña del users.txt
        $.ajax({
            method: "DELETE",
            url: `http://${ipAddress}:8080/ModifyingUser`,
            data: JSON.stringify({ name: actualPlayer.getName(), password: actualPlayer.getPassword() }),
            processData: false,
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                console.log(textStatus + " " + jqXHR.status);
                console.log(data);
            },
            error: function (jqXHR, textStatus, error) {
                console.log(textStatus + " " + jqXHR.status);
                console.error('Hubo un problema con la solicitud:', error);
            }
        });

        // elimina nombre y score del highscores.txt
        $.ajax({
            method: "DELETE",
            url: "/User/score",
            data: JSON.stringify({ name: actualPlayer.getName(), score: actualPlayer.getScore() }),
            processData: false,
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                console.log(textStatus + " " + jqXHR.status);
                console.log(data);
                location.reload();
            },
            error: function (jqXHR, textStatus, error) {
                console.log(textStatus + " " + jqXHR.status);
                console.error('Hubo un problema con la solicitud:', error);
            }
        });
    }
}
