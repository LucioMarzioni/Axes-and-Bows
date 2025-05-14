export default class GameCop extends Phaser.Scene {
    constructor() {
      super("GameCop");
    }
    init() {
        this.finish = false
        this.barlife = 5
        this.arclife = 3
        this.hit2 = true
        this.hit1 = true
        this.ataqbar = true
        this.score = 0
        this.puedeDispararJugador1 = true;
    }
    preload() {
        this.load.image("player1", "./public/ArqueroDown.png");
        this.load.image("player2", "./public/BarbaroDown.png");
        this.load.image("fondo", "./public/EscenarioVS.png");
        this.load.image("background", "./public/grass.png");
        this.load.image("tree", "./public/tree.png");
        this.load.image("barrer", "./public/barrera.png");
        this.load.image("barrer2", "./public/barrera2.png");
        this.load.image("piedra", "./public/piedra.png");
        this.load.image("puerta", "./public/puerta.png");
        this.load.image("barheart", "./public/Barheart.png");
        this.load.image("barheartv", "./public/Barheartv.png");
        this.load.image("archeart", "./public/Arqheart.png");
        this.load.image("archeartv", "./public/Arqheartv.png");
        this.load.image("esqueleto", "./public/Esqueleto.png");
        this.load.image("slime", "./public/slime.png");
        this.load.image("esqarq", "./public/esqarq.png");
        this.load.image("flecha", "./public/Flecha.png");
        this.load.image("heartitem", "./public/heartItem.png");
        this.load.image("circle", "./public/circle.png");
        this.load.spritesheet("esqwalk", "./public/esqwalk.png", { frameWidth: 332, frameHeight: 317});
        this.load.spritesheet("slimewalk", "./public/slimewalk.png", { frameWidth: 243, frameHeight: 301});
        this.load.spritesheet("barbwalkleft", "./public/barbwalkleft.png", { frameWidth: 255, frameHeight: 390});
        this.load.spritesheet("barbwalkright", "./public/barbwalkright.png", { frameWidth: 255, frameHeight: 390});
        this.load.spritesheet("barbwalkdown", "./public/barbwalkdown.png", { frameWidth: 272, frameHeight: 374});
        this.load.spritesheet("barbwalkup", "./public/barbwalkup.png", { frameWidth: 272, frameHeight: 374});
        this.load.spritesheet("arcwalkleft", "./public/arcwalkleft.png", { frameWidth: 239, frameHeight: 375});
        this.load.spritesheet("arcwalkright", "./public/arcwalkright.png", { frameWidth: 239, frameHeight: 375});
        this.load.spritesheet("arcwalkdown", "./public/arcwalkdown.png", { frameWidth: 242, frameHeight: 355});
        this.load.spritesheet("arcwalkup", "./public/arcwalkup.png", { frameWidth: 255, frameHeight: 346});
        this.load.spritesheet("barbatackright", "./public/barbatackright.png", { frameWidth: 360, frameHeight: 390});
        this.load.spritesheet("barbatackleft", "./public/barbatackleft.png", { frameWidth: 360, frameHeight: 390});
        this.load.spritesheet("barbatackup", "./public/barbatackup.png", { frameWidth: 420, frameHeight: 375});
        this.load.spritesheet("barbatackdown", "./public/barbatackdown.png", { frameWidth: 420, frameHeight: 405});
    }
    create() {
    this.physics.world.setBounds(0, 0, 4000, 3000); 

    //this.fondo = this.add.image(500, 300, "fondo").setScale(0.35)
    this.bg = this.add.tileSprite(0, 0, 4000, 3000, 'background')
    .setOrigin(0);

    this.wall = this.physics.add.staticGroup();
    this.wall = this.add.tileSprite(0, 0, 2000, 100, 'piedra').setScale(1.3).setOrigin(0);

    this.player2 = this.physics.add.sprite(300, 2850, 'player2').setScale(0.13)
    this.player2.setCollideWorldBounds(true);
    this.player2.body.setAllowGravity(false);

    this.player1 = this.physics.add.sprite(400, 2850, 'player1').setScale(0.13)
    this.player1.setCollideWorldBounds(true);
    this.player1.body.setAllowGravity(false);

    this.puerta = this.physics.add.staticGroup();
        this.puerta.create(470, 105, "puerta").setScale(1.1).refreshBody()
        this.physics.add.overlap(
            this.player2,
            this.puerta,
            this.teleport,
            null,
            this
             );

    this.anims.create({
        key: 'esqwalk',
            frames: this.anims.generateFrameNumbers('esqwalk', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1 // se repite en bucle
        });

    this.anims.create({
        key: 'slimewalk',
            frames: this.anims.generateFrameNumbers('slimewalk', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1 // se repite en bucle
        });
    
    this.anims.create({
        key: 'barbwalkleft',
        frames: this.anims.generateFrameNumbers('barbwalkleft', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: 0
        });    

    this.anims.create({
            key: 'barbwalkright',
            frames: this.anims.generateFrameNumbers('barbwalkright', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
            }); 
            
    this.anims.create({
            key: 'barbwalkup',
            frames: this.anims.generateFrameNumbers('barbwalkup', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
            }); 
    
    this.anims.create({
            key: 'barbwalkdown',
            frames: this.anims.generateFrameNumbers('barbwalkdown', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
            });  
            
    this.anims.create({
                key: 'arcwalkleft',
                frames: this.anims.generateFrameNumbers('arcwalkleft', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: 0
            });    
        
    this.anims.create({
                    key: 'arcwalkright',
                    frames: this.anims.generateFrameNumbers('arcwalkright', { start: 0, end: 3 }),
                    frameRate: 10,
                    repeat: 0
            }); 
                    
    this.anims.create({
                    key: 'arcwalkup',
                    frames: this.anims.generateFrameNumbers('arcwalkup', { start: 0, end: 3 }),
                    frameRate: 10,
                    repeat: 0
            }); 
            
    this.anims.create({
                key: 'arcwalkdown',
                frames: this.anims.generateFrameNumbers('arcwalkdown', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: 0
            });  
            
    this.anims.create({
            key: 'barbatackdown1',
            frames: this.anims.generateFrameNames('barbatackdown', {start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });         

        this.anims.create({
            key: 'barbatackup1',
            frames: this.anims.generateFrameNumbers('barbatackup', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });         
        this.anims.create({
            key: 'barbatackleft1',
            frames: this.anims.generateFrameNumbers('barbatackleft', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });         
        this.anims.create({
            key: 'barbatackright1',
            frames: this.anims.generateFrameNumbers('barbatackright', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });         
       


    this.tr = this.physics.add.staticGroup();
    this.tr = this.add.tileSprite(0, 2365, 660, 127, 'tree').setScale(1.4).setOrigin(0); //1 arriba
    this.tr = this.add.tileSprite(0, 2545, 60, 320, 'tree').setScale(1.4).setOrigin(0); //1 izquierda
    this.tr = this.add.tileSprite(85, 2905, 1200, 64, 'tree').setScale(1.4).setOrigin(0); //1 abajo
    this.tr = this.add.tileSprite(1768, 2365, 60, 448, 'tree').setScale(1.4).setOrigin(0); //2 derecha
    this.tr = this.add.tileSprite(0, 1735, 1260, 127, 'tree').setScale(1.4).setOrigin(0); //3 y 4 arriba
    this.tr = this.add.tileSprite(0, 1915, 60, 320, 'tree').setScale(1.4).setOrigin(0); //4 izquierda
    this.tr = this.add.tileSprite(1853, 2365, 660, 127, 'tree').setScale(1.4).setOrigin(0); //5 abajo
    this.tr = this.add.tileSprite(2695, 1738, 60, 448, 'tree').setScale(1.4).setOrigin(0); //5 derecha
    this.tr = this.add.tileSprite(2780, 1735, 600, 127, 'tree').setScale(1.4).setOrigin(0); //7 abajo
    this.tr = this.add.tileSprite(1680, 1106, 60, 448, 'tree').setScale(1.4).setOrigin(0); //6 izquierda
    this.tr = this.add.tileSprite(3540, 1106, 60, 448, 'tree').setScale(1.4).setOrigin(0); //7 derecha
    this.tr = this.add.tileSprite(2700, 1105, 600, 127, 'tree').setScale(1.4).setOrigin(0); //7 arriba
    this.tr = this.add.tileSprite(2699, 475, 60, 448, 'tree').setScale(1.4).setOrigin(0); //8 derecha
    this.tr = this.add.tileSprite(1775, 473, 660, 64, 'tree').setScale(1.4).setOrigin(0); //8 arriba
    this.tr = this.add.tileSprite(85, 1015, 1200, 64, 'tree').setScale(1.4).setOrigin(0); //9 y 10 abajo
    this.tr = this.add.tileSprite(850, 473, 660, 64, 'tree').setScale(1.4).setOrigin(0); //9 arriba
    this.tr = this.add.tileSprite(0, 117, 60, 704, 'tree').setScale(1.4).setOrigin(0); //9 y 10 izquierda
    this.tr = this.add.tileSprite(850, 117, 60, 256, 'tree').setScale(1.4).setOrigin(0); //10 derecha

    this.barrer = this.physics.add.staticGroup();
    this.barrer.create(550, 2950, "barrer").setScale(0.5).refreshBody(); //1 y 2
    this.barrer.create(1450, 2950, "barrer").setScale(0.5).refreshBody(); //
    this.barrer.create(430, 2520, "barrer").setScale(0.5).refreshBody(); //1 arriba
    this.barrer.create(20, 2520, "barrer2").setScale(1).refreshBody(); // 1 y 4 izquierda
    this.barrer.create(1815, 2860, "barrer2").setScale(0.5).refreshBody(); //2 derecha
    this.barrer.create(46, 2430, "barrer").setScale(0.9).refreshBody(); //4 abajo
    this.barrer.create(260, 1835, "barrer").setScale(1.55).refreshBody(); //4 y 3 arriba
    this.barrer.create(2700, 2425, "barrer").setScale(0.9).refreshBody(); //5 abajo
    this.barrer.create(2765, 2720, "barrer2").setScale(1).refreshBody(); //5 derecha
    this.barrer.create(3775, 1810, "barrer").setScale(1).refreshBody(); //7 abajo
    this.barrer.create(1727, 1420, "barrer2").setScale(0.4).refreshBody(); //6 izquierda
    this.barrer.create(3580, 1420, "barrer2").setScale(0.4).refreshBody(); //7 derecha
    this.barrer.create(3775, 1230, "barrer").setScale(1).refreshBody(); //7 arriba
    this.barrer.create(2765, 320, "barrer2").setScale(1).refreshBody(); //8 derecha
    this.barrer.create(500, 100, "barrer").setScale(0.5).refreshBody(); //11 arriba
    this.barrer.create(2360, 485, "barrer").setScale(1.55).refreshBody(); //8 y 9 arriba
    this.barrer.create(260, 1114, "barrer").setScale(1.55).refreshBody(); //9 y 10 abajo
    this.barrer.create(20, 80, "barrer2").setScale(1).refreshBody(); //10 y 11 izquierda
    this.barrer.create(923, -400, "barrer2").setScale(1).refreshBody();

    this.physics.add.collider(this.player2, this.barrer);
    this.physics.add.collider(this.player1, this.barrer);

    this.cameras.main.startFollow(this.player2, true, 0.08, 0.08);
    this.cameras.main.setBounds(0, 0, 4000, 3000);

    this.cursor = this.input.keyboard.createCursorKeys();

    this.enemies = this.physics.add.group();

    const enemy1 = this.enemies.create(400, 300, 'esqueleto').setScale(0.15)
    enemy1.setCollideWorldBounds(true);
    enemy1.speed = 50;
    enemy1.activated = false;
    enemy1.body.setAllowGravity(false);

    const enemy2 = this.enemies.create(200, 2600, 'esqueleto').setScale(0.15)
    enemy2.setCollideWorldBounds(true);
    enemy2.speed = 50;
    enemy2.activated = false;
    enemy2.body.setAllowGravity(false);
    

    const enemy3 = this.enemies.create(400, 2300, 'esqueleto').setScale(0.15)
    enemy3.setCollideWorldBounds(true);
    enemy3.speed = 50;
    enemy3.activated = false;
    enemy3.body.setAllowGravity(false);

    const enemy4 = this.enemies.create(2400, 1600, 'esqueleto').setScale(0.15)
    enemy4.setCollideWorldBounds(true);
    enemy4.speed = 50;
    enemy4.activated = false;
    enemy4.body.setAllowGravity(false);

    const enemy5 = this.enemies.create(1600, 900, 'esqueleto').setScale(0.15)
    enemy5.setCollideWorldBounds(true);
    enemy5.speed = 50;
    enemy5.activated = false;
    enemy5.body.setAllowGravity(false);

    const enemy6 = this.enemies.create(1200, 900, 'esqueleto').setScale(0.15)
    enemy6.setCollideWorldBounds(true);
    enemy6.speed = 50;
    enemy6.activated = false;
    enemy6.body.setAllowGravity(false);

    this.enemies2 = this.physics.add.group();

    const enemy7 = this.enemies2.create(1300, 2800, 'slime').setScale(0.15)
    enemy7.setCollideWorldBounds(true);
    enemy7.speed = 70;
    enemy7.activated = false;
    enemy7.body.setAllowGravity(false);

    const enemy8 = this.enemies2.create(1500, 2500, 'slime').setScale(0.15)
    enemy8.setCollideWorldBounds(true);
    enemy8.speed = 70;
    enemy8.activated = false;
    enemy8.body.setAllowGravity(false);

    const enemy9 = this.enemies2.create(1600, 2100, 'slime').setScale(0.15)
    enemy9.setCollideWorldBounds(true);
    enemy9.speed = 70;
    enemy9.activated = false;
    enemy9.body.setAllowGravity(false);

    const enemy10 = this.enemies2.create(1400, 2200, 'slime').setScale(0.15)
    enemy10.setCollideWorldBounds(true);
    enemy10.speed = 70;
    enemy10.activated = false;
    enemy10.body.setAllowGravity(false);

    const enemy11 = this.enemies2.create(500, 2100, 'slime').setScale(0.15)
    enemy11.setCollideWorldBounds(true);
    enemy11.speed = 70;
    enemy11.activated = false;
    enemy11.body.setAllowGravity(false);

    const enemy12 = this.enemies2.create(2500, 2100, 'slime').setScale(0.15)
    enemy12.setCollideWorldBounds(true);
    enemy12.speed = 70;
    enemy12.activated = false;
    enemy12.body.setAllowGravity(false);

    const enemy13 = this.enemies2.create(2200, 2200, 'slime').setScale(0.15)
    enemy13.setCollideWorldBounds(true);
    enemy13.speed = 70;
    enemy13.activated = false;
    enemy13.body.setAllowGravity(false);

    const enemy14 = this.enemies2.create(2000, 2000, 'slime').setScale(0.15)
    enemy14.setCollideWorldBounds(true);
    enemy14.speed = 70;
    enemy14.activated = false;
    enemy14.body.setAllowGravity(false);

    const enemy15 = this.enemies2.create(3000, 1500, 'slime').setScale(0.15)
    enemy15.setCollideWorldBounds(true);
    enemy15.speed = 70;
    enemy15.activated = false;
    enemy15.body.setAllowGravity(false);

    const enemy16 = this.enemies2.create(3300, 1600, 'slime').setScale(0.15)
    enemy16.setCollideWorldBounds(true);
    enemy16.speed = 70;
    enemy16.activated = false;
    enemy16.body.setAllowGravity(false);

    const enemy17 = this.enemies2.create(500, 900, 'slime').setScale(0.15)
    enemy17.setCollideWorldBounds(true);
    enemy17.speed = 70;
    enemy17.activated = false;
    enemy17.body.setAllowGravity(false);

    this.enemy18 = this.physics.add.sprite(500, 2580, 'esqarq').setScale(0.15)
    this.enemy18.setImmovable(true);
    this.enemy18.body.setAllowGravity(false);

    this.enemy19 = this.physics.add.sprite(650, 1950, 'esqarq').setScale(0.15)
    this.enemy19.setImmovable(true);
    this.enemy19.body.setAllowGravity(false);

    this.enemy20 = this.physics.add.sprite(2500, 600, 'esqarq').setScale(0.15)
    this.enemy20.setImmovable(true);
    this.enemy20.body.setAllowGravity(false);

    this.enemy21 = this.physics.add.sprite(845, 300, 'esqarq').setScale(0.15)
    this.enemy21.setImmovable(true);
    this.enemy21.body.setAllowGravity(false);

    this.bullets = this.physics.add.group({
        classType: Phaser.Physics.Arcade.Image,
        runChildUpdate: true
    });

    //enemy18
    this.time.addEvent({
        delay: 1000, // cada 1 segundo
        callback: () => {
            if (this.enemy18.active) {
            this.dispararEnDirecciones(this.enemy18.x, this.enemy18.y);
        }},
        loop: true
    });
    //enemy18
    this.dispararEnDirecciones = (x, y) => {
        const bullet = this.bullets.create(this.enemy18.x, this.enemy18.y, 'flecha')
        const velocidades = [
            //{ x:  200, y:    0 },  // derecha
            //{ x: -200, y:    0 },  // izquierda
            { x:    0, y:  200 },  // abajo
            //{ x:    0, y: -200 },  // arriba
            //{ x:  141, y:  141 },  // diagonal abajo-derecha
            //{ x: -141, y:  141 },  // diagonal abajo-izquierda
            //{ x:  141, y: -141 },  // diagonal arriba-derecha
            //{ x: -141, y: -141 }   // diagonal arriba-izquierda
        ];
    
        velocidades.forEach((vel) => {
            //const bullet = this.bullets.create(x, y, 'bullet');
            bullet.setVelocity(vel.x, vel.y);
            bullet.setCollideWorldBounds(false);
            bullet.setScale(0.15);
            bullet.setBounce(0);
            bullet.body.setAllowGravity(false);
    
            // Destruir después de cierto tiempo
            this.time.delayedCall(2000, () => bullet.destroy(), null, this);
        });
    };

    //enemy19
    this.time.addEvent({
        delay: 1000, // cada 1 segundo
        callback: () => {
            if (this.enemy19.active) {
            this.dispararEnDirecciones2(this.enemy19.x, this.enemy19.y);
        }},
        loop: true
    });
    //enemy19
    this.dispararEnDirecciones2 = (x, y) => {
        const bullet = this.bullets.create(this.enemy19.x, this.enemy19.y, 'flecha')
        const velocidades = [
            //{ x:  200, y:    0 },  // derecha
            //{ x: -200, y:    0 },  // izquierda
            { x:    0, y:  200 },  // abajo
            //{ x:    0, y: -200 },  // arriba
            //{ x:  141, y:  141 },  // diagonal abajo-derecha
            //{ x: -141, y:  141 },  // diagonal abajo-izquierda
            //{ x:  141, y: -141 },  // diagonal arriba-derecha
            //{ x: -141, y: -141 }   // diagonal arriba-izquierda
        ];
    
        velocidades.forEach((vel) => {
            //const bullet = this.bullets.create(x, y, 'bullet');
            bullet.setVelocity(vel.x, vel.y);
            bullet.setCollideWorldBounds(false);
            bullet.setScale(0.15);
            bullet.setBounce(0);
            bullet.body.setAllowGravity(false);
    
            // Destruir después de cierto tiempo
            this.time.delayedCall(2000, () => bullet.destroy(), null, this);
        });
    };

    //enemy20
    this.time.addEvent({
        delay: 2000, // cada 1 segundo
        callback: () => {
            if (this.enemy20.active) {
            this.dispararEnDirecciones3(this.enemy20.x, this.enemy20.y);
        }},
        loop: true
    });
    //enemy20
    this.dispararEnDirecciones3 = (x, y) => {
        const bullet = this.bullets.create(this.enemy20.x, this.enemy20.y, 'flecha')
        const velocidades = [
            //{ x:  200, y:    0 },  // derecha
            //{ x: -200, y:    0 },  // izquierda
            { x:    0, y:  200 },  // abajo
            //{ x:    0, y: -200 },  // arriba
            //{ x:  141, y:  141 },  // diagonal abajo-derecha
            //{ x: -141, y:  141 },  // diagonal abajo-izquierda
            //{ x:  141, y: -141 },  // diagonal arriba-derecha
            //{ x: -141, y: -141 }   // diagonal arriba-izquierda
        ];
    
        velocidades.forEach((vel) => {
            //const bullet = this.bullets.create(x, y, 'bullet');
            bullet.setVelocity(vel.x, vel.y);
            bullet.setCollideWorldBounds(false);
            bullet.setScale(0.15);
            bullet.setBounce(0);
            bullet.body.setAllowGravity(false);
    
            // Destruir después de cierto tiempo
            this.time.delayedCall(10000, () => bullet.destroy(), null, this);
        });
    };

    //enemy21
    this.time.addEvent({
        delay: 2000, // cada 1 segundo
        callback: () => {
            if (this.enemy21.active) {
            this.dispararEnDirecciones4(this.enemy21.x, this.enemy21.y);
        }},
        loop: true
    });
    //enemy21
    this.dispararEnDirecciones4 = (x, y) => {
        const bullet = this.bullets.create(this.enemy21.x, this.enemy21.y, 'flecha')
        const velocidades = [
            //{ x:  200, y:    0 },  // derecha
            //{ x: -200, y:    0 },  // izquierda
            { x:    0, y:  200 },  // abajo
            //{ x:    0, y: -200 },  // arriba
            //{ x:  141, y:  141 },  // diagonal abajo-derecha
            //{ x: -141, y:  141 },  // diagonal abajo-izquierda
            //{ x:  141, y: -141 },  // diagonal arriba-derecha
            //{ x: -141, y: -141 }   // diagonal arriba-izquierda
        ];
    
        velocidades.forEach((vel) => {
            //const bullet = this.bullets.create(x, y, 'bullet');
            bullet.setVelocity(vel.x, vel.y);
            bullet.setCollideWorldBounds(false);
            bullet.setScale(0.15);
            bullet.setBounce(0);
            bullet.body.setAllowGravity(false);
    
            // Destruir después de cierto tiempo
            this.time.delayedCall(10000, () => bullet.destroy(), null, this);
        });
    };

    this.physics.add.overlap(this.bullets, this.player2, (player2, bullet) => { 
        bullet.destroy();
        this.barlife -= 1
        this.hit2 = false
    this.time.delayedCall(2000, () => {
        this.hit2 = true })
    });

    this.physics.add.overlap(this.bullets, this.player1, (player1, bullet) => { 
        bullet.destroy();
        this.arclife -= 1
        this.hit1 = false
    this.time.delayedCall(2000, () => {
        this.hit1 = true })
    });

    this.physics.add.overlap(this.enemies, this.player2, this.hitPlayer2, null, this);
    this.physics.add.collider(this.enemies, this.barrer);

    this.physics.add.overlap(this.enemies2, this.player2, this.hitPlayer2, null, this);
    this.physics.add.collider(this.enemies2, this.barrer);

    this.physics.add.overlap(this.enemies, this.player1, this.hitPlayer1, null, this);
    this.physics.add.collider(this.enemies, this.barrer);

    this.physics.add.overlap(this.enemies2, this.player1, this.hitPlayer1, null, this);
    this.physics.add.collider(this.enemies2, this.barrer);

    this.barheartsv1 = this.add.image(710, 49, "barheartv")
    this.barheartsv1.setScrollFactor(0);
    this.barheartsv2 = this.add.image(770, 49, "barheartv")
    this.barheartsv2.setScrollFactor(0);
    this.barheartsv3 = this.add.image(830, 49, "barheartv")
    this.barheartsv3.setScrollFactor(0);
    this.barheartsv4 = this.add.image(890, 49, "barheartv")
    this.barheartsv4.setScrollFactor(0);
    this.barheartsv5 = this.add.image(950, 49, "barheartv")
    this.barheartsv5.setScrollFactor(0);

    this.barhearts1 = this.add.image(710, 50, "barheart")
    this.barhearts1.setScrollFactor(0);
    this.barhearts1.setDepth(10)
    this.barhearts2 = this.add.image(770, 50, "barheart")
    this.barhearts2.setScrollFactor(0);
    this.barhearts2.setDepth(10)
    this.barhearts3 = this.add.image(830, 50, "barheart")
    this.barhearts3.setScrollFactor(0);
    this.barhearts3.setDepth(10)
    this.barhearts4 = this.add.image(890, 50, "barheart")
    this.barhearts4.setScrollFactor(0);
    this.barhearts4.setDepth(10)
    this.barhearts5 = this.add.image(950, 50, "barheart")
    this.barhearts5.setScrollFactor(0);
    this.barhearts5.setDepth(10)

    this.archeartsv1 = this.add.image(50, 50, "archeartv")
    this.archeartsv1.setScrollFactor(0);
    this.archeartsv1.setDepth(10)
    this.archeartsv2 = this.add.image(110, 50, "archeartv")
    this.archeartsv2.setScrollFactor(0);
    this.archeartsv2.setDepth(10)
    this.archeartsv3 = this.add.image(170, 50, "archeartv")
    this.archeartsv3.setScrollFactor(0);
    this.archeartsv3.setDepth(10)

    this.archearts1 = this.add.image(50, 50, "archeart")
    this.archearts1.setScrollFactor(0);
    this.archearts1.setDepth(10)
    this.archearts2 = this.add.image(110, 50, "archeart")
    this.archearts2.setScrollFactor(0);
    this.archearts2.setDepth(10)
    this.archearts3 = this.add.image(170, 50, "archeart")
    this.archearts3.setScrollFactor(0);
    this.archearts3.setDepth(10)

    this.scoreText = this.add.text(480, 20, '0', {
      fontFamily: "Arial",
      fontSize: "32px",
      fill: "#fff",
    });
    this.scoreText.setScrollFactor(0);

    this.player2Attacks = this.physics.add.group();
    this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.t = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

    this.disparosJugador1 = this.physics.add.group();
    this.direccionJugador1 = 'abajo'; // inicial
    this.puedeDispararJugador1 = true;

    this.realizarAtaque = () => { 
        if (this.ataqbar) {
        this.ataqbar = false   
        const ataque = this.player2Attacks.create(this.player2.x, this.player2.y, null);
        
        ataque.body.setAllowGravity(false);
        ataque.setSize(60, 60); // tamaño del ataque
        ataque.setVisible(false); // no mostrar, o usa sprite si quieres
        const offset = 25;

    switch (this.ultimaDireccion) {
        case 'izquierda': 
        this.player2.anims.play('barbatackleft1', true);
            ataque.x -= offset;
            break;
        case 'derecha':
        this.player2.anims.play('barbatackright1', true);
            ataque.x += offset;
            break;
        case 'arriba':
        this.player2.anims.play('barbatackup1', true);
            ataque.y -= offset;
            break;
        case 'abajo':
        this.player2.anims.play('barbatackdown1', true);
            ataque.y += offset;
            break;
        default:
            ataque.x += offset; // por defecto, derecha
    }

//this.player2.anims.play('barbatackleft', true);


    this.time.delayedCall(600, () => {
        this.ataqbar = true })
    
        // Destruir el ataque rápidamente (como una hitbox)
        this.time.delayedCall(100, () => ataque.destroy());
    }
};

this.dispararDesdeJugador1 = () => {
    this.puedeDispararJugador1 = false;
    console.log("dispara")
    const disparo = this.disparosJugador1.create(this.player1.x, this.player1.y, 'flecha');
    disparo.setScale(0.15)
    disparo.setCollideWorldBounds(true);
    disparo.body.setAllowGravity(false);
    disparo.setVelocity(0);

    const velocidad = 300;

    switch (this.direccionJugador1) {
        case 'izquierda':
            disparo.setVelocityX(-velocidad);
            disparo.setAngle(90)
            break;
        case 'derecha':
            disparo.setVelocityX(velocidad);
            disparo.setAngle(-90)
            break;
        case 'arriba':
            disparo.setVelocityY(-velocidad);
            disparo.setAngle(180)
            break;
        case 'abajo':
            disparo.setVelocityY(velocidad);
            disparo.setAngle(0);
            break;
    }

    // Destruir después de 2 segundos
    this.time.delayedCall(2000, () => {
        if (disparo.active) disparo.destroy();
    });

    //Cooldown de disparo
    this.time.delayedCall(1500, () => {
       this.puedeDispararJugador1 = true;
    });
};

this.hearts = this.physics.add.group();

    this.physics.add.overlap(this.player2Attacks, this.enemies, (ataque, enemigo) => {
        enemigo.golpesRecibidos = (enemigo.golpesRecibidos || 0) + 1;
    
        if (enemigo.golpesRecibidos >= 2) {
            enemigo.destroy();
            this.score += 50;
            this.scoreText.setText(this.score);
         if (Phaser.Math.Between(1, 80) <= 30) {
            const heartitem = this.hearts.create(enemigo.x, enemigo.y, 'heartitem');
            heartitem.setScale(0.2)
            heartitem.setCollideWorldBounds(true);
            heartitem.body.setAllowGravity(false);
        }
        }
        ataque.destroy();
    }); 
    
    this.physics.add.overlap(this.player2Attacks, this.enemies2, (ataque, enemies2) => {
        enemies2.golpesRecibidos = (enemies2.golpesRecibidos || 0) + 1;
    
        if (enemies2.golpesRecibidos >= 2) {
            enemies2.destroy();
            this.score += 100;
            this.scoreText.setText(this.score);

            if (Phaser.Math.Between(1, 80) <= 30) {
                const heartitem = this.hearts.create(enemies2.x, enemies2.y, 'heartitem');
                heartitem.setScale(0.2)
                heartitem.setCollideWorldBounds(true);
                heartitem.body.setAllowGravity(false);
            }
        }
        
        ataque.destroy(); // para que no golpee varias veces
    });

    this.physics.add.overlap(this.player2Attacks, this.enemy18, (ataque, enemy18) => {
        enemy18.golpesRecibidos = (enemy18.golpesRecibidos || 0) + 1;
    
        if (enemy18.golpesRecibidos >= 1) {
            enemy18.destroy();
            this.score += 25;
            this.scoreText.setText(this.score);
        }
        
        ataque.destroy(); // para que no golpee varias veces
    });

    this.physics.add.overlap(this.player2Attacks, this.enemy19, (ataque, enemy19) => {
        enemy19.golpesRecibidos = (enemy19.golpesRecibidos || 0) + 1;
    
        if (enemy19.golpesRecibidos >= 1) {
            enemy19.destroy();
            this.score += 25;
            this.scoreText.setText(this.score);
        }
        
        ataque.destroy(); // para que no golpee varias veces
    });

    this.physics.add.overlap(this.player2Attacks, this.enemy20, (ataque, enemy20) => {
        enemy20.golpesRecibidos = (enemy20.golpesRecibidos || 0) + 1;
    
        if (enemy20.golpesRecibidos >= 1) {
            enemy20.destroy();
            this.score += 25;
            this.scoreText.setText(this.score);
        }
        
        ataque.destroy(); // para que no golpee varias veces
    });

    this.physics.add.overlap(this.player2Attacks, this.enemy21, (ataque, enemy21) => {
        enemy21.golpesRecibidos = (enemy21.golpesRecibidos || 0) + 1;
    
        if (enemy21.golpesRecibidos >= 1) {
            enemy21.destroy();
            this.score += 25;
            this.scoreText.setText(this.score);
        }
        
        ataque.destroy(); // para que no golpee varias veces
    });

    this.physics.add.overlap(this.player2, this.hearts, (player2, heartitem) => {
        heartitem.destroy();
        if (this.barlife == 4) {
            this.barlife += 1
            this.barhearts5.x = 950
        } else if (this.barlife == 3) {
            this.barlife += 2
            this.barhearts5.x = 950
            this.barhearts4.x = 890
        } else if (this.barlife == 2) {
            this.barlife += 3
            this.barhearts5.x = 950
            this.barhearts4.x = 890
            this.barhearts3.x = 830
        } else if (this.barlife == 1) {
            this.barlife += 4
            this.barhearts5.x = 950
            this.barhearts4.x = 890
            this.barhearts3.x = 830
            this.barhearts2.x = 770
        }
        // Aumentar vida, reproducir sonido, etc.
    }, null, this);

    this.physics.add.overlap(this.player1, this.hearts, (player1, heartitem) => {
        heartitem.destroy();
        if (this.arclife == 2) {
            this.arclife += 1
            this.archearts3.x = 170
        } else if (this.arclife == 1) {
            this.arclife += 2
            this.archearts3.x = 170
            this.archearts2.x = 110
        }
        // Aumentar vida, reproducir sonido, etc.
    }, null, this);

    this.physics.add.overlap(this.disparosJugador1, this.enemies, (disparo, enemigo) => {
        enemigo.golpesRecibidos = (enemigo.golpesRecibidos || 0) + 1;
    
        if (enemigo.golpesRecibidos >= 2) {
            if (enemigo.disparoTimer) enemigo.disparoTimer.remove(false);
            enemigo.destroy();
    
            this.score += 50;
            this.scoreText.setText(this.score);
            if (Phaser.Math.Between(1, 80) <= 30) {
                const heartitem = this.hearts.create(enemigo.x, enemigo.y, 'heartitem');
                heartitem.setScale(0.2)
                heartitem.setCollideWorldBounds(true);
                heartitem.body.setAllowGravity(false);
            }
        }
    
        disparo.destroy();
    });

    this.physics.add.overlap(this.disparosJugador1, this.enemies2, (disparo, enemigo) => {
        enemigo.golpesRecibidos = (enemigo.golpesRecibidos || 0) + 1;
    
        if (enemigo.golpesRecibidos >= 2) {
            if (enemigo.disparoTimer) enemigo.disparoTimer.remove(false);
            enemigo.destroy();
    
            this.score += 50;
            this.scoreText.setText(this.score);
            if (Phaser.Math.Between(1, 80) <= 30) {
                const heartitem = this.hearts.create(enemigo.x, enemigo.y, 'heartitem');
                heartitem.setScale(0.2)
                heartitem.setCollideWorldBounds(true);
                heartitem.body.setAllowGravity(false);
            }
        }
    
        disparo.destroy();
    });

    this.physics.add.overlap(this.disparosJugador1, this.enemy18, (disparo, enemigo) => {
        enemigo.golpesRecibidos = (enemigo.golpesRecibidos || 0) + 1;
    
        if (enemigo.golpesRecibidos >= 2) {
            if (enemigo.disparoTimer) enemigo.disparoTimer.remove(false);
            enemigo.destroy();
    
            this.score += 50;
            this.scoreText.setText(this.score);
            if (Phaser.Math.Between(1, 80) <= 30) {
                const heartitem = this.hearts.create(enemigo.x, enemigo.y, 'heartitem');
                heartitem.setScale(0.2)
                heartitem.setCollideWorldBounds(true);
                heartitem.body.setAllowGravity(false);
            }
        }
    
        disparo.destroy();
    });

    this.physics.add.overlap(this.disparosJugador1, this.enemy19, (disparo, enemigo) => {
        enemigo.golpesRecibidos = (enemigo.golpesRecibidos || 0) + 1;
    
        if (enemigo.golpesRecibidos >= 2) {
            if (enemigo.disparoTimer) enemigo.disparoTimer.remove(false);
            enemigo.destroy();
    
            this.score += 50;
            this.scoreText.setText(this.score);
            if (Phaser.Math.Between(1, 80) <= 30) {
                const heartitem = this.hearts.create(enemigo.x, enemigo.y, 'heartitem');
                heartitem.setScale(0.2)
                heartitem.setCollideWorldBounds(true);
                heartitem.body.setAllowGravity(false);
            }
        }
    
        disparo.destroy();
    });

    this.physics.add.overlap(this.disparosJugador1, this.enemy20, (disparo, enemigo) => {
        enemigo.golpesRecibidos = (enemigo.golpesRecibidos || 0) + 1;
    
        if (enemigo.golpesRecibidos >= 2) {
            if (enemigo.disparoTimer) enemigo.disparoTimer.remove(false);
            enemigo.destroy();
    
            this.score += 50;
            this.scoreText.setText(this.score);
            if (Phaser.Math.Between(1, 80) <= 30) {
                const heartitem = this.hearts.create(enemigo.x, enemigo.y, 'heartitem');
                heartitem.setScale(0.2)
                heartitem.setCollideWorldBounds(true);
                heartitem.body.setAllowGravity(false);
            }
        }
    
        disparo.destroy();
    });

    this.physics.add.overlap(this.disparosJugador1, this.enemy21, (disparo, enemigo) => {
        enemigo.golpesRecibidos = (enemigo.golpesRecibidos || 0) + 1;
    
        if (enemigo.golpesRecibidos >= 2) {
            if (enemigo.disparoTimer) enemigo.disparoTimer.remove(false);
            enemigo.destroy();
    
            this.score += 50;
            this.scoreText.setText(this.score);
            if (Phaser.Math.Between(1, 80) <= 30) {
                const heartitem = this.hearts.create(enemigo.x, enemigo.y, 'heartitem');
                heartitem.setScale(0.2)
                heartitem.setCollideWorldBounds(true);
                heartitem.body.setAllowGravity(false);
            }
        }
    
        disparo.destroy();
    });

    }
    update() {
        if (!this.player2 || !this.player2.active) return;
        if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
            this.realizarAtaque();
        }
        if (this.cursor.left.isDown) {
            this.player2.anims.play('barbwalkleft', true);
            this.player2.setVelocityX(-200);
            this.ultimaDireccion = 'izquierda';
        } else if (this.cursor.right.isDown) {
            this.player2.anims.play('barbwalkright', true);
            this.player2.setVelocityX(200);
            this.ultimaDireccion = 'derecha';
        } else {
            this.player2.setVelocityX(0);
        }
        
        if (this.cursor.up.isDown) {
            this.player2.anims.play('barbwalkup', true);
            this.player2.setVelocityY(-200);
            this.ultimaDireccion = 'arriba';
        } else if (this.cursor.down.isDown) {
            this.player2.anims.play('barbwalkdown', true);
            this.player2.setVelocityY(200);
            this.ultimaDireccion = 'abajo';
        } else {
            this.player2.setVelocityY(0);
        }

        if (!this.player1 || !this.player1.active) return;
        if (this.t.isDown && this.puedeDispararJugador1) {
            this.dispararDesdeJugador1();
        }
        if (this.a.isDown) {
            this.player1.anims.play('arcwalkleft', true);
            this.player1.setVelocityX(-160);
            this.direccionJugador1 = 'izquierda';
        } else if (this.d.isDown) {
            this.player1.anims.play('arcwalkright', true);
            this.player1.setVelocityX(160);
            this.direccionJugador1 = 'derecha';
        } else {
            this.player1.setVelocityX(0);
        }
        if (this.w.isDown) {
            this.player1.anims.play('arcwalkup', true);
            this.player1.setVelocityY(-160);
            this.direccionJugador1 = 'arriba';
        } else if (this.s.isDown) {
            this.player1.anims.play('arcwalkdown', true);
            this.player1.setVelocityY(160);
            this.direccionJugador1 = 'abajo';
        } else {
            this.player1.setVelocityY(0);
        }


        this.enemies.children.iterate((enemies) => {
            if (!enemies.active) return;

            const distance1 = Phaser.Math.Distance.Between(enemies.x, enemies.y, this.player1.x, this.player1.y);
            const distance2 = Phaser.Math.Distance.Between(enemies.x, enemies.y, this.player2.x, this.player2.y);

    if (!enemies.activated && (distance1 < 200 || distance2 < 200)) {
        enemies.activated = true;
    }

            const objetivo = (distance1 < distance2) ? this.player1 : this.player2;
            this.physics.moveToObject(enemies, objetivo, enemies.speed);
        
            if (enemies.activated) {
                //this.physics.moveToObject(enemies, this.player2, enemies.speed);

                if (!enemies.anims.isPlaying || enemies.anims.currentAnim.key !== 'esqwalk') {
                   enemies.anims.play('esqwalk', true); }

            } 
             //if (distance < 350) {
            //    enemies.activated = true;}
             else if (distance1 > 200 || distance2 > 200) {
               enemies.activated = false;
               enemies.setVelocity(0);
               enemies.anims.stop();
            }
        });

        this.enemies2.children.iterate((enemies2) => {
            if (!enemies2.active) return;

            const distance1 = Phaser.Math.Distance.Between(enemies2.x, enemies2.y, this.player1.x, this.player1.y);
            const distance2 = Phaser.Math.Distance.Between(enemies2.x, enemies2.y, this.player2.x, this.player2.y);

    if (!enemies2.activated && (distance1 < 200 || distance2 < 200)) {
        enemies2.activated = true;
    }

            const objetivo = (distance1 < distance2) ? this.player1 : this.player2;
            this.physics.moveToObject(enemies2, objetivo, enemies2.speed);
        
            if (enemies2.activated) {
                //this.physics.moveToObject(enemies, this.player2, enemies.speed);

                if (!enemies2.anims.isPlaying || enemies2.anims.currentAnim.key !== 'slimewalk') {
                   enemies2.anims.play('slimewalk', true); }

            } 
             //if (distance < 350) {
            //    enemies.activated = true;}
             else if (distance1 > 200 || distance2 > 200) {
               enemies2.activated = false;
               enemies2.setVelocity(0);
               enemies2.anims.stop();
            }
        });


        if (this.barlife == 4) {
            this.barhearts5.x = -300 
        }
        if (this.barlife == 3) {
            this.barhearts4.x = -300  
        }
        if (this.barlife == 2) {
            this.barhearts3.x = -300 
        }
        if (this.barlife == 1) {
            this.barhearts2.x = -300 
        }
        if (this.barlife == 0) {
            this.player2.destroy()
            this.barhearts1.x = -300
        }

        if (this.arclife == 2) {
            this.archearts3.x = -300 
        }
        if (this.arclife == 1) {
            this.archearts2.x = -300 
        }
        if (this.arclife == 0) {
            this.player1.destroy()
            this.archearts1.x = -300
        }


        if (this.score >= 1500) {
            console.log("ya se puede")
            this.finish = true
        }
        if(this.barlife <= 0 || this.arclife <= 0) {
            this.scene.start("FailCop")
        }
    }

    hitPlayer2() {
    if (this.hit2) {
        this.barlife -= 1
        this.hit2 = false
    this.time.delayedCall(2000, () => {
        this.hit2 = true 
    }) 
    }
    }

    hitPlayer1() {
        if (this.hit1) {
            this.arclife -= 1
            this.hit1 = false
        this.time.delayedCall(2000, () => {
            this.hit1 = true 
        }) 
        }
        }


    teleport() {
      if(this.finish) {
        this.scene.start("GameCop2", { score: this.score})
      }
    }
}
