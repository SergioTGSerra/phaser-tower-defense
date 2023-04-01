var config = {
  type: Phaser.AUTO,
  parent: "content",
  width: 1600,
  height: 1200,
  physics: {
    default: "arcade",
  },
  scene: {
    key: "main",

    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);
var turretSpace = 2;
var path;
var turrets;
var zombie;
var zombieSaco;
var zombieGrande;
var turretButton = false;
var turret2Button = false;
var turret3Button = false;
var gold = 200;
var goldText;
var life = 100;
var lifeText;
var startgame = false;
var gameOver = false;
var gameWin = false;
var killCounter;
var kills = 0;
var level = 1;
var levelText;
var bulletSound;
var arrowSound;
var fastBulletSound;
var deathSound;

var ZOMBIE_SPEED = 1 / 30000;
var ZOMBIESACO_SPEED = 1 / 120000;
var ZOMBIEGRANDE_SPEED = 1 / 160000;

var map =  [[  0, 0, 0, 0, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0, 0,  0,  0,  0,  0,  0,  0, 0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1,  0,  0,  0, 0],
            [  0, 0, 0, 0, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0,  0,  0,  0,  0,  0,  0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,  0,  0,  0, 0],
            [  0,-1, 0, 0, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0,  0,  0,  0,  0,  0,  0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,  0,  0,  0, 0],
            [  0, 0, 0, 0, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0,  0,  0,  0,  0,  0,  0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,  0,  0,  0, 0],
            [  0, 0, 0, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,-1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,  0,  0,  0, 0],
            [  0, 0, 0, 0, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,  0,  0,  0, 0],
            [  0, 0, 0, 0, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, 0,  0,  0,  0,  0,  0, -1,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,  0, -1,  0, 0],
            [  0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, 0],
            [  0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, 0],
            [ -1, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0, 0],
            [  0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0, 0],
            [  0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0, 0],
            [  0, 0, 0, 0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1],
            [  0, 0, 0, 0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1,  0,  0,  0,  0,  0,  0, -1, -1,  0,  0,-1],
            [  0, 0, 0, 0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0, -1,  0,  0,  0,  0, -1,  0,  0,  0,  0, 0],
            [  0, 0, 0,-1,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0, -1,  0, -1, -1,  0, -1,  0,  0,  0,  0, 0],
            [  0, 0,-1, 0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0, -1,  0, -1, -1,  0, -1,  0,  0,  0, -1,-1],
            [  0,-1,-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1,-1],
            [  0,-1,-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1],
            [  0,-1,-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1],
            [  0,-1,-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [  0,-1,-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [  0,-1,-1,-1, -1, -1,  0,  0,  0, -1, -1, -1, -1,  0,  0,  0, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [  0,-1,-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [  0,-1,-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [  0,-1,-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, 0],
            [  0,-1,-1,-1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0,  0,  0,  0,  0,  0, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, 0],
            [  0,-1,-1,-1, -1, -1,  0, -1, -1, -1, -1,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0,  0,  0,  0,  0,  0, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, 0],
            [  0,-1,-1,-1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, 0],
            [  0,-1,-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [  0,-1,-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [  0,-1,-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [  0,-1,-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [  0,-1,-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0,  0, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [ -1,-1,-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1],
            [  0,-1,-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1],
            [ -1,-1,-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1],
            [ -1,-1,-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1]];
            

function preload() {
  // carrega imagens
  this.load.image("mapOne", "../assets/updatedMap.png");
  this.load.image("mapTwo", "../assets/updatedMap_1.png");
  this.load.image("bullet", "../assets/peashot.png");
  this.load.image("arrow", "../assets/spike.png");
  this.load.image("tower", "../assets/pea.png");
  this.load.image("tower2", "../assets/cattail.png");
  this.load.image("tower3", "../assets/superpea.png");
  this.load.image("zombie", "../assets/zombie.png");
  this.load.image("zombieSaco", "../assets/zombie2.png");
  this.load.image("zombieGrande", "../assets/zombie3.png");
  this.load.image("towerOneButton", "../assets/peaButton.png");
  this.load.image("towerTwoButton", "../assets/cattailButton.png");
  this.load.image("towerThreeButton", "../assets/superpeaButton.png");
  this.load.image("uibar", "../assets/Rectangle.png");
  this.load.image("startButton", "../assets/titlescreen.png");
  this.load.image("gameOver", "../assets/Gameover.png");
  this.load.image("gameWin", "../assets/GameWin.png");

  // carrega audio
  this.load.audio("arrow", "../audio/arrow.mp3");
  this.load.audio("bullet", "../audio/bullet.mp3");
  this.load.audio("fastbullet", "../audio/fastbullet.mp3");
  this.load.audio("death", "../audio/death.mp3");
  this.load.audio("music", "../audio/Music.mp3");
}

function create() {
  game.scene.pause("main");
  mapOne = this.add.image(800, 600, "mapOne");
  mapTwo = this.add.image(800, 600, "mapTwo");
  mapOne.setVisible(true);
  mapTwo.setVisible(false);
  // o elemento graphics é apenas para visualização, 
  //não está relacionado com o nosso caminho
  var graphics = this.add.graphics();
  drawGrid(graphics);

  // o caminho para o zombie
  // os parametros são o x e o y inicias dos nossos caminhos
  path = this.add.path(200, -25);
  path.lineTo(200, 300);
  path.lineTo(400, 300);
  path.lineTo(400, 600);
  path.lineTo(100, 600);
  path.lineTo(100, 1000);
  path.lineTo(600, 1000);
  path.lineTo(600, 200);
  path.lineTo(800, 200);
  path.lineTo(800, 1000);
  path.lineTo(1500, 1000);
  path.lineTo(1500, 700);
  path.lineTo(1000, 700);
  path.lineTo(1000, 300);
  path.lineTo(1400, 300);
  path.lineTo(1400, -25);

  //adiciona a barra ao fundo
  this.add.image(400, 1180, "uibar");

  graphics.lineStyle(3, 0xffffff, 1);
  //visauliza o caminho

  //Este código permite que os zombies possão ser usados em deteção de colisões e outros tipos de interações físicas
  zombie = this.physics.add.group({ classType: Zombie, runChildUpdate: true });
  this.nextZombie = 0;
  zombieSaco = this.physics.add.group({ classType: ZombieSaco, runChildUpdate: true });
  this.nextZombieSaco = 0;
  zombieGrande = this.physics.add.group({ classType: ZombieGrande, runChildUpdate: true });
  this.nextZombieGrande = 0;

  //Agrupa cada tipo de planta num grupo para facilitar o melhoramento e a renderização
  turrets = this.add.group({ classType: Turret, runChildUpdate: true });
  arrowTurrets = this.add.group({classType: ArrowTurret, runChildUpdate: true});
  fastTurrets = this.add.group({ classType: FastTurret, runChildUpdate: true });

  //Cria o botão da primeira planta
  turretOneButton = this.add.image(40, 1170, "towerOneButton");
  turretOneButton.setInteractive();
  turretOneButton.on("pointerdown", () => {
    turretButton = true;
    turret2Button = false;
    turret3Button = false;
    turretOneButton.tint = 0xfff132;
    turretTwoButton.tint = 0xffffff;
    turretThreeButton.tint = 0xffffff;
  });
  this.input.on("pointerdown", placeTurret);

  //Cria o botão da segunda planta
  turretTwoButton = this.add.image(120, 1170, "towerTwoButton");
  turretTwoButton.setInteractive();
  turretTwoButton.on("pointerdown", () => {
    turret2Button = true;
    turretButton = false;
    turret3Button = false;
    turretTwoButton.tint = 0xfff132;
    turretOneButton.tint = 0xffffff;
    turretThreeButton.tint = 0xffffff;
  });
  this.input.on("pointerdown", placeTurret2);

  //Cria o botão da terceira planta 
  turretThreeButton = this.add.image(200, 1170, "towerThreeButton");
  turretThreeButton.setInteractive();
  turretThreeButton.on("pointerdown", () => {
    turret3Button = true;
    turret2Button = false;
    turretButton = false;
    turretThreeButton.tint = 0xfff132;
    turretTwoButton.tint = 0xffffff;
    turretOneButton.tint = 0xffffff;
  });
  this.input.on("pointerdown", placeTurret3);

  //Este código permite que os projeteis possão ser usados em deteção de colisões e outros tipos de interações físicas
  bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
  arrows = this.physics.add.group({ classType: Arrow, runChildUpdate: true });
  fastbullets = this.physics.add.group({classType: FastBullet, runChildUpdate: true});

  //Este código cria a deteção de colisão entre um tipo de zombie e uma bullet
  //Quando a colisão entre estes acontece a função de dano (Ex: damageZombieBullet) é chamada
  this.physics.add.overlap(zombie, bullets, damageZombieBullet);
  this.physics.add.overlap(zombie, arrows, damageZombieArrow);
  this.physics.add.overlap(zombie, fastbullets, damageZombieFastBullet);
  this.physics.add.overlap(zombieSaco, bullets, damageZombieSacoBullet);
  this.physics.add.overlap(zombieSaco, arrows, damageZombieSacoArrow);
  this.physics.add.overlap(zombieSaco, fastbullets, damageZombieSacoFastBullet);
  this.physics.add.overlap(zombieGrande, bullets, damageZombieGrandeBullet);
  this.physics.add.overlap(zombieGrande, arrows, damageZombieGrandeArrow);
  this.physics.add.overlap(zombieGrande, fastbullets, damageZombieGrandeFastBullet);

  //Cria os textos para a quantidade de gold, life, kills e o nivel do jogador
  goldText = this.add.text(700, 1155, "Gold: " + gold, {
    fontSize: "28px",
    fill: "#FFD700",
  });
  lifeText = this.add.text(1000, 1155, "Life: " + life, {
    fontSize: "28px",
    fill: "#000",
  });
  killCounter = this.add.text(1300, 1155, "Kills: " + kills, {
    fontSize: "28px",
    fill: "#000",
  });
  levelText = this.add.text(710, 30, "Level: " + level, {
    fontSize: "56px",
    fill: "#ff8200",
  });

  //Cria o botão inicial
  const startButton = this.add.image(800, 600, "startButton");
  startButton.setInteractive();
  startButton.on("pointerdown", function () {
    startgame = true;
    startButton.destroy();
  });

  // adiciona sons sounds
  bulletSound = this.sound.add("bullet");
  arrowSound = this.sound.add("arrow");
  deathSound = this.sound.add("death");
  fastBulletSound = this.sound.add("fastbullet");

  //Colocar a musica a dar
  let music;
  music = this.sound.add("music", { loop: true });
  music.play();

  //Cria os botões que serão usados nos cheats
  this.mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
  this.nKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

}

//Funções de dano nos inimigos

function damageZombieBullet(zombie, bullet) {
  // Apenas se o zombie e a bullet tiverem vivos
  if (zombie.active === true && bullet.active === true) {
    // Remove a bullet
    var BULLET_DAMAGE = 125;
    bullet.setActive(false);
    bullet.setVisible(false);

    // diminui o dano do zombie com BULLET_DAMAGE
    zombie.receiveDamage(BULLET_DAMAGE);
  }
}

function damageZombieArrow(zombie, arrow) {
  // Apenas se o zombie e a arrowbullet tiverem vivos
  if (zombie.active === true && arrow.active === true) {
    // Remove a Arrowbullet
    var ARROW_DAMAGE = 200;
    arrow.setActive(false);
    arrow.setVisible(false);

    //diminui a vida do zombie com ARROW_DAMAGE
    zombie.receiveDamage(ARROW_DAMAGE);
  }
}

function damageZombieFastBullet(zombie, fastbullet) {
  // Apenas se o zombie e a fastbullet tiverem vivos
  if (zombie.active === true && fastbullet.active === true) {
    /// Remove a Fastbullet 
    var FASTBULLET_DAMAGE = 70;
    fastbullet.setActive(false);
    fastbullet.setVisible(false);

    // diminui a vida do zombie com BULLET_DAMAGE
    zombie.receiveDamage(FASTBULLET_DAMAGE);
  }
}

function damageZombieSacoBullet(zombieSaco, bullet) {
  // Apenas se o zombieSaco e a bullet tiverem vivos
  if (zombieSaco.active === true && bullet.active === true) {
    // Remove a bullet
    var BULLET_DAMAGE = 80;
    bullet.setActive(false);
    bullet.setVisible(false);

    // diminui a vida do zombieSaco com BULLET_DAMAGE
    zombieSaco.receiveDamage(BULLET_DAMAGE);
  }
}

function damageZombieSacoArrow(zombieSaco, arrow) {
  // Apenas se o zombieSaco e  a arrowbullet tiverem vivos
  if (zombieSaco.active === true && arrow.active === true) {
    // Remove a Arrowbullet
    var ARROW_DAMAGE = 350;
    arrow.setActive(false);
    arrow.setVisible(false);

    //diminui a vida do zombieSaco com ARROW_DAMAGE
    zombieSaco.receiveDamage(ARROW_DAMAGE);
  }
}

function damageZombieSacoFastBullet(zombieSaco, fastbullet) {
  // Apenas se o zombieGrande e  a fastbullet tiverem vivos
  if (zombieSaco.active === true && fastbullet.active === true) {
   // Remove a Fastbullet 
    var FASTBULLET_DAMAGE = 70;
    fastbullet.setActive(false);
    fastbullet.setVisible(false);

    // diminui a vida do zombieSaco com BULLET_DAMAGE
    zombieSaco.receiveDamage(FASTBULLET_DAMAGE);
  }
}

function damageZombieGrandeBullet(zombieSaco, bullet) {
  // Apenas se o zombieGrande e a bullet tiverem vivos
  if (zombieSaco.active === true && bullet.active === true) {
    // Remove a Bullet 
    var BULLET_DAMAGE = 80;
    bullet.setActive(false);
    bullet.setVisible(false);

    //diminui a vida do zombieGrande com BULLET_DAMAGE
    zombieSaco.receiveDamage(BULLET_DAMAGE);
  }
}
function damageZombieGrandeArrow(zombieGrande, arrow) {
  // Apenas se o zombieGrande e  a arrowbullet tiverem vivos
  if (zombieGrande.active === true && arrow.active === true) {
    // Remove a Arrowbullet 
    var ARROW_DAMAGE = 250;
    arrow.setActive(false);
    arrow.setVisible(false);

    //diminui a vida do zombieGrande com ARROW_DAMAGE
    zombieGrande.receiveDamage(ARROW_DAMAGE);
  }
}
function damageZombieGrandeFastBullet(zombieGrande, fastbullet) {
  // Apenas se o zombieGrande e  a fastbullet tiverem vivos
  if (zombieGrande.active === true && fastbullet.active === true) {
    // Remove a Fastbullet 
    var FASTBULLET_DAMAGE = 100;
    fastbullet.setActive(false);
    fastbullet.setVisible(false);

    // diminui a vida do zombieGrande com BULLET_DAMAGE
    zombieGrande.receiveDamage(FASTBULLET_DAMAGE);
  }
}

//Desenha a grelha no ecrã
function drawGrid(graphics) {
  graphics.lineStyle(1, 0x000000, 0.45);
  for (var i = 0; i < 38; i++) {
    graphics.moveTo(0, i * 32);
    graphics.lineTo(1600, i * 32);
  }
  for (var j = 0; j < 50; j++) {
    graphics.moveTo(j * 32, 0);
    graphics.lineTo(j * 32, 1200);
  }
  graphics.strokePath();
}

function update(time, delta) {

  //Cheats
  if (Phaser.Input.Keyboard.JustDown(this.mKey)){
    gold += 1000;
    goldText.setText('Gold: '+ gold); 
  }

  if (Phaser.Input.Keyboard.JustDown(this.nKey)){
    life += 100;
    lifeText.setText('Life:' + life);
  }

  //A variavel time apenas começa quando o jogo começa 
  if (!startgame){
    time = 0;
  }

  //Se as vidas acabarem gameover = true entra no if
  if (gameOver) {
    const gameOverButton = this.add.image(800, 600, "gameOver");
    mapOne.tint = 0xbc0505;
    gameOverButton.setInteractive();
    gameOverButton.on("pointerdown", function () {
      mapOne.tint = 0xbc0505;
      gameOverButton.destroy();
      location.reload();
      return;
    });
  }

  //Se ganha o jogo aparece mensagem win
  if (gameWin) {
    const gameWinButton = this.add.image(800, 600, "gameWin");
    mapOne.tint = 0x00ff00;
    gameWinButton.setInteractive();
    gameWinButton.on("pointerdown", function () {
      mapOne.tint = 0x00ff00;
      gameWinButton.destroy();
      location.reload();
      return;
    });
  }

  //Se o nivel for superior a 5 muda o mapa para modo noturno
  if (level % 5 == 0) {
    mapOne.setVisible(false);
    mapTwo.setVisible(true);
  } else {
    mapOne.setVisible(true);
    mapTwo.setVisible(false);
  }

  //Essas 3 funcoes gera os 3 inimigos conforme o tempo

//Cria um zombieSaco se as condições forem verdadeiras
  if (time > this.nextZombie && startgame === true) {
    var enemy = zombie.get();

    if (enemy) {
      enemy.setActive(true);
      enemy.setVisible(true);

      //coloca o zombie no inicio do caminho
      enemy.startOnPath();

      this.nextZombie = time + 5000 / (1 + 1.2 * level);
    }
  }

  //Cria um zombieSaco se as condições forem verdadeiras
  if (
    time > this.nextZombieSaco &&
    zombieSaco.children.entries.length < 5 &&
    startgame === true &&
    kills > 20
  ) {
    var robert = zombieSaco.get();

    if (robert) {
      robert.setActive(true);
      robert.setVisible(true);

      // coloca o zombieSaco no inicio do caminho
      robert.startOnPath();

      this.nextZombieSaco = time + 10000 / (1 + 0.7 * kills);
    }
  }

  //Cria um zombieGrande se as condições forem verdadeiras
  if (
    time > this.nextZombieGrande &&
    zombieGrande.children.entries.length < 1 &&
    startgame === true &&
    kills > 400
  ) {
    var dragon = zombieGrande.get();

    if (dragon) {
      dragon.setActive(true);
      dragon.setVisible(true);
      // coloca o zombieGrande no inicio do caminho
      dragon.startOnPath();

      this.nextZombieGrande = time + 10000 / (1 + 0.3 * kills);
    }
  }

  //Estes 3 for's se o enimigo estiver com a propriedade ativa = false remove do array para melhorar o desempenho

  for (var i = 0; i < zombie.children.entries.length; i++) {
    if (zombie.children.entries[i].active === false) {
      zombie.children.entries.splice(i, 1);
    }
  }

  for (var i = 0; i < zombieSaco.children.entries.length; i++) {
    if (zombieSaco.children.entries[i].active === false) {
      zombieSaco.children.entries.splice(i, 1);
    }
  }

  for (var i = 0; i < zombieGrande.children.entries.length; i++) {
    if (zombieGrande.children.entries[i].active === false) {
      zombieGrande.children.entries.splice(i, 1);
    }
  }
  

  //Define o nivel do jogo
  if(startgame && level < 20 && !gameOver && !gameWin){
    level = Math.ceil(time / 30000);
    levelText.setText("Level: " + level);
  }

  if (life <= 0) gameOver = true;
  if (level == 20) gameWin = true;
}

//Estas 3 funções abaixo são chamdas no ficheiro turrets.js

function canPlaceTurret(i, j) {
  return map[i][j] === 0;
}

function addBullet(x, y, angle) {
  var bullet = bullets.get();
  if (bullet) bullet.fire(x, y, angle);
}

function addArrow(x, y, angle) {
  var arrow = arrows.get();
  if (arrow) arrow.fire(x, y, angle);
}
