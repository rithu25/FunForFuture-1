var level1Bg;
var waste;
var category;
var organic;
var garbage;
var recycling;
var counter = 5;
var num;
var min = 1;
var max = 18;
var score = 0;
var scoreText;
var scoreImage;
var timedEvent;
var bonusScore = 500;
var bonus1Image;
var bonus2Image;
var bonus3Image;
var timerText;
var timerImage;

var Baselevel = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function Baselevel() {
            Phaser.Scene.call(this, { key: 'Baselevel' });
        },

    preload: function () {
        this.loadAssets();
    },

    create: function () {
        this.setUp();
    },

    loadAssets: function () {
        this.load.image('level1_background', 'assets/Level1/level1_background.jpg');
        this.load.image('organic', 'assets/common/organic.png');
        this.load.image('garbage', 'assets/common/garbage.png');
        this.load.image('recycling', 'assets/common/recycling.png');
        this.load.image('organic', 'assets/common/organic.png');
        this.load.image('score', 'assets/common/score.png');
        this.load.image('bonus', 'assets/common/bonus.png');
        this.load.image('timer', 'assets/common/timer.png');

        this.load.image('l1_1', 'assets/Level1/waste/1.png');
        this.load.image('l1_2', 'assets/Level1/waste/2.png');
        this.load.image('l1_3', 'assets/Level1/waste/3.png');
        this.load.image('l1_4', 'assets/Level1/waste/4.png');
        this.load.image('l1_5', 'assets/Level1/waste/5.png');
        this.load.image('l1_6', 'assets/Level1/waste/6.png');
        this.load.image('l1_7', 'assets/Level1/waste/7.png');
        this.load.image('l1_8', 'assets/Level1/waste/8.png');
        this.load.image('l1_9', 'assets/Level1/waste/9.png');
        this.load.image('l1_10', 'assets/Level1/waste/10.png');
        this.load.image('l1_11', 'assets/Level1/waste/11.png');
        this.load.image('l1_12', 'assets/Level1/waste/12.png');
        this.load.image('l1_13', 'assets/Level1/waste/13.png');
        this.load.image('l1_14', 'assets/Level1/waste/14.png');
        this.load.image('l1_15', 'assets/Level1/waste/15.png');
        this.load.image('l1_16', 'assets/Level1/waste/16.png');
        this.load.image('l1_17', 'assets/Level1/waste/17.png');
        this.load.image('l1_18', 'assets/Level1/waste/18.png');
    },

    setUp: function () {
        level1Bg = this.add.image(0, 0, 'level1_background').setOrigin(0);
        this.matter.world.setBounds(0, 0, 1920, 1080);

        this.add.image(500, 600, 'organic').setOrigin(0);
        this.add.image(800, 600, 'garbage').setOrigin(0);
        this.add.image(1100, 600, 'recycling').setOrigin(0);

        bonus1Image = this.add.image(1605, 290, 'bonus');
        bonus2Image = this.add.image(1705, 290, 'bonus');
        bonus3Image = this.add.image(1805, 290, 'bonus');
        timedEvent = this.time.addEvent({ delay: 1000, repeat: 60 });

        this.showScore();
        this.updateWaste();
    },

    updateWaste: function () {
        num = Math.floor(Math.random() * (+max - +min)) + +min;

        if (num >= 1 && num <= 5)
            category = 'organic';
        else if (num >= 6 && num <= 14)
            category = 'recycling';
        else if (num >= 15 && num <= 18)
            category = 'garbage';

        waste = this.matter.add.image(900, 250, 'l1_' + num, null, { isStatic: true }).setInteractive();
    },

    dragObject: function (object) {
        object.on('pointerover', function () {
            this.setTint(0xffc7f2);
        });

        object.on('pointerout', function () {
            this.clearTint();
        });

        this.input.setDraggable(object);

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xffc7f2);
        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', function (pointer, gameObject) {
            gameObject.clearTint();
            gameObject.x = 850;
            gameObject.y = 150;
        });
    },

    update: function () {
        if (counter > 0) {
            this.dragObject(waste);
            this.sortWaste();
            this.updateBonusTimer();
        }
        else {
            endLevel();
        }
    },

    sortWaste: function () {
        if ((category == 'recycling' && waste.x > 1100 && waste.x < 1400 && waste.y > 800 && waste.y < 1100)
            || (category == 'organic' && waste.x > 500 && waste.x < 800 && waste.y > 800 && waste.y < 1100)
            || (category == 'garbage' && waste.x > 800 && waste.x < 1100 && waste.y > 800 && waste.y < 1100)) {
            waste.destroy();
            this.updateWaste();
            score += 100;
            scoreText.setText(score);
            counter--;
        }
    },

    showScore: function () {
        scoreImage = this.add.image(1550, 70, 'score');
        scoreText = this.add.text(1605, 50, score, { fontSize: '48px', fill: 0xfffdfc, fontFamily: 'Courier New', });

        timerImage = this.add.image(1550, 180, 'timer');
        timerText = this.add.text(1605, 160, score, { fontSize: '48px', fill: 0xfffdfc, fontFamily: 'Courier New', })
    },

    updateBonusTimer: function () {
        if (timedEvent.repeatCount == 60) {
            bonusScore = 500;
        }
        else if (timedEvent.repeatCount == 30) {
            bonusScore = 300;
            bonus3Image.destroy();
        }
        else if (timedEvent.repeatCount == 10) {
            bonusScore = 100;
            bonus2Image.destroy();
        }
        else if (timedEvent.repeatCount == 0) {
            bonusScore = 0;
            bonus1Image.destroy();
        }

        timerText.setText(timedEvent.repeatCount);
    },

    endLevel: function () {
        score += bonusScore;
        scoreText.setText(score);
    }
});