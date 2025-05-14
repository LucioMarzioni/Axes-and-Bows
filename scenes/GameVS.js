// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class GameVS extends Phaser.Scene {
  constructor() {
    super("GameVS");
  }

  init() {
    this.gameOver = false;
    this.timer = 3;
    this.score1 = 0;
    this.score2 = 0;
    this.shapes = {
      diamond: { points: 100, count: 0 },
      square: { points: 20, count: 0 },
      triangle: { points: 30, count: 0 },
      black: { points: 15, count: 0},
      coin: { points: 10, count: 0},
      emerald: { points: 50, count: 0},
    }
  }

  preload() {
    this.load.image("escenario", "./public/EscenarioVS.png");
    this.load.image("plataforma", "./public/Suelo.png");
    this.load.image("plataforma2", "./public/Suelo2.png");
    this.load.image("plataforma3", "./public/Plataforma1.png");
    this.load.image("plataforma4", "./public/Plataforma2.png");
    this.load.image("personaje", "./public/Barbaro.png");
    this.load.image("personaje2", "./public/Arquero.png");
    this.load.image("triangle", "./public/rubi.png");
    this.load.image("square", "./public/zafiro.png");
    this.load.image("diamond", "./public/diamante.png");
    this.load.image("black", "./public/amatista.png");
    this.load.image("coin", "./public/moneda.png");
    this.load.image("emerald", "./public/esmeralda.png");
    this.load.spritesheet("arqD", "./public/ArqD2.png", { frameWidth: 240, frameHeight: 390});
    this.load.spritesheet("arqI", "./public/ArqI2.png", { frameWidth: 240, frameHeight: 390});
    this.load.spritesheet("barD", "./public/BarD2.png", { frameWidth: 270, frameHeight: 419});
    this.load.spritesheet("barI", "./public/BarI.png", { frameWidth: 270, frameHeight: 419});
  }

  create() {
    // crear elementos
    this.escenario = this.add.image(500, 289, "escenario")

    // crear grupo plataformas
    this.plataformas = this.physics.add.staticGroup();
    this.plataformas.create(280, 600, "plataforma2").refreshBody();
    this.plataformas.create(90, 600, "plataforma").refreshBody();
    this.plataformas.create(471, 600, "plataforma").refreshBody();
    this.plataformas.create(660, 600, "plataforma2").refreshBody();
    this.plataformas.create(850, 600, "plataforma").refreshBody();
    this.plataformas.create(1040, 600, "plataforma2").refreshBody();

    this.plataformas2 = this.physics.add.staticGroup();
    this.plataformas2.create(260, 430, "plataforma3").setScale(1.5).refreshBody();
    this.plataformas2.create(500, 300, "plataforma4").setScale(1.5).refreshBody();
    this.plataformas2.create(260, 170, "plataforma3").setScale(1.5).refreshBody();
    this.plataformas2.create(740, 430, "plataforma3").setScale(1.5).refreshBody();
    this.plataformas2.create(740, 170, "plataforma4").setScale(1.5).refreshBody();

    //crear personaje
    this.personaje = this.physics.add.sprite(950, 505, "personaje");
    this.personaje.setScale(0.18);
    this.personaje.setCollideWorldBounds(true);

    this.personaje2 = this.physics.add.sprite(50, 505, "personaje2");
    this.personaje2.setScale(0.18);
    this.personaje2.setCollideWorldBounds(true);

    this.physics.add.collider(this.personaje, this.plataformas);
    this.physics.add.collider(this.personaje, this.plataformas2);
    this.physics.add.collider(this.personaje2, this.plataformas);
    this.physics.add.collider(this.personaje2, this.plataformas2);
    this.physics.add.collider(this.personaje, this.personaje2);

    this.cursor = this.input.keyboard.createCursorKeys();

    // crear grupo recolectables
    this.recolectables = this.physics.add.group();
    this.physics.add.collider(
      this.personaje,
      this.recolectables,
      this.pj,
      null,
      this
    );

    this.physics.add.collider(
      this.personaje2,
      this.recolectables,
      this.pj2,
      null,
      this
    );
    
    

    this.scoreText = this.add.text(
      800,
      50,
      `${this.score1}`, {fontSize: "32px" , fontFamily: "Arial",}
    )

    this.scoreText2 = this.add.text(
      180,
      50,
      `${this.score2}`, {fontSize: "32px" , fontFamily: "Arial",}
    )

    // evento 1 segundo
    this.time.addEvent({
      delay: 500,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });

    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    // evento 1 segundo
    this.time.addEvent({
      delay: 1000,
      callback: this.handlerTimer,
      callbackScope: this,
      loop: true,
    });

    //agregar texto de timer en la esquina superior derecha
    this.timerText = this.add.text(480, 50, `${this.timer}`, {
      fontFamily: "Arial",
      fontSize: "32px",
      fill: "#fff",
    });

    //agregar collider entre recolectables y personaje
 

    this.physics.add.collider(
      this.recolectables,
      this.plataformas,
      this.onShapeDestroy,
      null,
      this
    );

    this.physics.add.collider(
      this.recolectables,
      this.plataformas2,
      this.onShapeDestroy2,
      null,
      this
    );

    this.anims.create({
      key: 'animarqD',
      frames: this.anims.generateFrameNumbers('arqD', { start: 0, end: 3 }),
      frameRate: 15,
      repeat: 0
      });

    this.anims.create({
        key: 'animarqI',
        frames: this.anims.generateFrameNumbers('arqI', { start: 0, end: 3 }),
        frameRate: 15,
        repeat: 0
        });  
    
    this.anims.create({
        key: 'animbarD',
        frames: this.anims.generateFrameNumbers('barD', { start: 0, end: 3 }),
        frameRate: 15,
        repeat: 0
        }); 
        
    this.anims.create({
        key: 'animbarI',
        frames: this.anims.generateFrameNumbers('barI', { start: 0, end: 3 }),
        frameRate: 15,
        repeat: 0
        });      
  }

  async update() {
    if (this.gameOver) {
      //await setDoc(doc(db, "puntuaciones", "jugadores"), {
  //jugador1: score1,
  //jugador2: score2
  // });
      this.scene.start("EndVS", { score1: this.score1, score2: this.score2});
    }
    // movimiento personaje
    if (this.cursor.left.isDown) {
      this.personaje.setVelocityX(-260);
      this.personaje.anims.play('animbarI', true);
    } else if (this.cursor.right.isDown) {
      this.personaje.setVelocityX(260);
      this.personaje.anims.play('animbarD', true);
    } else {
      this.personaje.setVelocityX(0);
    }
    if (this.cursor.up.isDown && this.personaje.body.touching.down) {
      this.personaje.setVelocityY(-530);
    }

    if (this.a.isDown) {
      this.personaje2.setVelocityX(-260);
      this.personaje2.anims.play('animarqI', true);
    } else if (this.d.isDown) {
      this.personaje2.setVelocityX(260);
       this.personaje2.anims.play('animarqD', true);
    } else {
      this.personaje2.setVelocityX(0);
    }
    if (this.w.isDown && this.personaje2.body.touching.down) {
      this.personaje2.setVelocityY(-530);
    }
  }

  onSecond() {
    if (this.gameOver) {
      return;
    }
    // crear recolectable
    const tipos = ["triangle", "square", "diamond", "black", "coin", "emerald"];
    const tipo = Phaser.Math.RND.pick(tipos);
    let recolectable = this.recolectables.create(
      Phaser.Math.Between(10, 790), Phaser.Math.Between(0, 250),
      tipo
    );
    recolectable.setVelocity(0, 100);
    recolectable.setData("puntos", this.shapes[tipo].points)
    recolectable.setData("puntos2", this.shapes[tipo].points)
    recolectable.setScale(0.3)
  }

  onShapeDestroy(recolectable, plataformas) {
    this.time.delayedCall(4300, () => {
      recolectable.destroy();
    })
  }
  onShapeDestroy2(recolectable, plataformas2) {
      this.time.delayedCall(4300, () => {
        recolectable.destroy();
      }) 
  }
  handlerTimer() {
    this.timer -= 1;
    this.timerText.setText(`${this.timer}`);
    if (this.timer === 0) {
      this.gameOver = true;
    }
  }


  pj(_personaje, recolectables)
  {
    const puntos = recolectables.getData("puntos")
    this.score1 += puntos;
    console.table(this.shapes);
    console.log("score", this.score1);
    recolectables.destroy();
    this.scoreText.setText(
      `${this.score1}`
    );
  }

  pj2(_personaje2, recolectables)
  {
    const puntos2 = recolectables.getData("puntos2")
    this.score2 += puntos2;
    console.table(this.shapes);
    console.log("score2", this.score2);
    recolectables.destroy();
    this.scoreText2.setText(
      `${this.score2}`
    );
  }
}
