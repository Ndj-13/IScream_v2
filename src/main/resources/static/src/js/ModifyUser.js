class ModifyUser extends Phaser.Scene {

    constructor() {
        super({ key: 'ModifyUser' });
        this.playerName = document.getElementById('namebarMU');
        this.playerPassword = document.getElementById('passwordMU');
        this.playerError = document.getElementById('errorMU');
    }

    preload(){
        this.load.image('selectScreenBg', 'resources/img/interface/pantallaSeleccion.png');
        this.load.image('AccountTitle', 'resources/img/interface/ACCOUNT.png');

        this.load.spritesheet('modifyBt',
            'resources/img/interface/botonModify.png',
            { frameWidth: 124, frameHeight: 47 });

        this.load.spritesheet('deleteBt',
            'resources/img/interface/botonDelete.png',
            { frameWidth: 124, frameHeight: 47 });

        this.load.spritesheet('menu',
            'resources/img/interface/botonMenu.png',
            { frameWidth: 120, frameHeight: 47 });

        //audio
        this.load.audio('menuOst', 'resources/audio/menuOst.mp3');
    }
    create(){
        //audio
        if(menuMusic == false)
        {
            this.menuOst = this.sound.add('menuOst', {volume:0.4});
            this.menuOst.play();
            this.menuOst.setLoop(true);
            menuMusic = true;
        }

        this.add.image(400, 300, 'selectScreenBg');
        this.add.image(400, 200, 'AccountTitle');

        this.modifyButton = this.add.sprite(475, 460, "modifyBt").setInteractive();
        this.deleteButton = this.add.sprite(325, 460, "deleteBt").setInteractive();

        //Iniciar los inputs
        this.playerName.disabled = false;
        this.playerName.value = '';
        //this.playerName.setAttribute('placeholder', 'Enter your name...');
        this.playerName.style.visibility = "visible";

        this.playerPassword.disabled = false;
        this.playerPassword.value = '';
        //this.playerPassword.setAttribute('placeholder', 'Enter your password...');
        this.playerPassword.style.visibility = "visible";

        //Interaccion botones
        this.modifyButton.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
            this.modifyButton.setFrame(1);
        })

        this.modifyButton.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            this.modifyButton.setFrame(0);
        })

        this.modifyButton.on("pointerdown", ()=>{
            this.modifyButton.setFrame(2);
        })

        this.modifyButton.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
            modifyDataToServer("#namebarMU", "#passwordMU", "#errorMU", (response) => {console.log(response);});     
        })

        // creditos
        this.deleteButton.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
            this.deleteButton.setFrame(1);
        })

        this.deleteButton.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            this.deleteButton.setFrame(0);
        })

        this.deleteButton.on("pointerdown", ()=>{
            this.deleteButton.setFrame(2);
        })

        this.deleteButton.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
            deleteDataToServer("#namebarMU", "#passwordMU", "#errorMU", (response) => {console.log(response);});
        })

        this.menu = this.add.sprite(100, 80, "menu").setInteractive();

        this.menu.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
        })
        this.menu.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
        })
        this.menu.on("pointerdown", ()=>{
            this.menu.setFrame(1);
            
        })
        this.menu.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
            //playersList.splice(0, playersList.length);

            this.playerName.disabled = true;
            this.playerName.value = '';
            this.playerName.style.visibility = "hidden"; // Oculta el campo de nombre
            this.playerPassword.disabled = true;
            this.playerPassword.value = '';
            this.playerPassword.style.visibility = "hidden"; // Oculta el campo de contraseña
            this.playerError.style.visibility = "hidden"; // Oculta el campo de contraseña
        
            this.scene.start("HomeScreen");
        })   
    }
}
