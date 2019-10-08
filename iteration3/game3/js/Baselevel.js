var background;
var recycle;
var player;
var platforms;
var cursors;
var player;
var waste;
var bin;
var scoreText;

var Baselevel = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function Baselevel() {
    Phaser.Scene.call(this, { key: 'Baselevel' });
  },

  preload: function () {
    this.loadAssets();
  },

  create: function () {
    this.setUp();
  },

  loadAssets: function () {
    this.load.image('background', 'assets/common/background.png');
    this.load.image('ground', 'assets/common/ground.png');
    this.load.image('recycle', 'assets/common/recycle_badge.png');
    this.load.image('bin', 'assets/common/bin.png');
    this.load.image('platform_long', 'assets/common/platform_long.png');
    this.load.image('platform_medium', 'assets/common/platform_medium.png');
    this.load.image('platform_short', 'assets/common/platform_short.png');
    this.load.spritesheet('girl',
      'assets/common/girl.png',
      { frameWidth: 130, frameHeight: 240 }
    );
  },

  setUp: function () {
    background = this.add.image(0, 0, 'background').setOrigin(0);
    cursors = this.input.keyboard.createCursorKeys();
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  },

  createPlayer: function () {

    player = this.physics.add.sprite(850, 600, 'girl');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('girl', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'girl', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('girl', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  },

  createBin: function () {
    bin = this.physics.add.group({
      key: 'bin',
      repeat: 3,
      setXY: { x: 200, y: 0, stepX: 500 }
    });

    bin.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

    });
  },

  createRecycleBonus: function () {
    recycle = this.physics.add.group({
      key: 'recycle',
      repeat: 5,
      setXY: { x: 300, y: 0, stepX: 600 }
    });

    recycle.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

    });
  },

  update: function () {
    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play('right', true);
    }
    else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-400);
    }
  },

  updateScore: function () {
    score += 10;
    scoreText.setText('Score: ' + score);
  },

  collectWaste: function (player, waste) {
    waste.disableBody(true, true);
    this.updateScore();
  },

  collectRecycleBonus: function (player, recycle) {
    recycle.disableBody(true, true);
    this.updateScore();
  },

  hitBin: function (player, bin) {
    bin.disableBody(true, true);
    player.anims.play('turn');
  }
});