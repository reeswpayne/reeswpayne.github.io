// State: DogeDodge.Play

'use strict'

var max = 301;
var min = 0;
var speedmax = 21;
var speedmin = 1;

var DogeDodge = {};

DogeDodge.Play = function () {};

DogeDodge.Play.prototype = {

  init: function () {
    console.log("%c~~~ Booting the DogeDodge ~~~\n Compliments of Skilstak", "color:#fdf6e3");
  },

  preload: function () {
    this.load.image('background','assets/GameBackground.png',320,568);
    this.load.spritesheet('player','assets/Guy.Who.Dodges.Stuff.png',40,71,2);
    this.load.spritesheet('faller','assets/Thing.That.Falls.From.the.Sky.png',40,71,1);
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE)
    
    // background
    this.background = this.add.tileSprite(0,0,320,568,'background');
    this.background.autoScroll(-50,50);
    this.background.scale.set(1);
    this.background.smoothed = false;
    
    // player
    this.dodger = this.add.sprite(200,500,'player',5);
    this.dodger.anchor.set(0.5,0.5);
    this.dodger.smoothed = false;
    this.dodger.animations.add('eyes');
    this.dodger.animations.play('eyes',2,true);
    game.physics.arcade.enable(this.dodger)
    this.dodger.collideWorldBounds = true;
    this.dodger.body.bounce.setTo(0.3);
    this.dodger.body.drag.setTo(3000);
    
    // faller
    this.faller = this.add.sprite(50,50,'faller',5);
    this.faller.anchor.set(0.5,0.5);
    this.faller.smoothed = false;
    game.physics.arcade.enable(this.faller)
    
    // fallerslow
    this.fallerslow = this.add.sprite(100,100,'faller',5);
    this.fallerslow.anchor.set(0.5,0.5);
    this.fallerslow.smoothed = false;
    game.physics.arcade.enable(this.fallerslow)
    
    // movement keys
    this.cursors = game.input.keyboard.createCursorKeys();
  },

  update: function() {
    if (this.cursors.left.isDown || this.cursors.right.isDown) {
      var faller_fallspeed = Math.random() * (speedmax - speedmin) + speedmin;
      this.faller.y += faller_fallspeed;
      if (this.faller.y > 568) {
        this.faller.x = Math.random() * (max - min) + min;
        this.faller.y = 50;
        var faller_fallspeed = Math.random() * (speedmax - speedmin) + speedmin;
      }
      var fallerslow_fallspeed = Math.random() * (speedmax - speedmin) + speedmin;
      this.fallerslow.y += fallerslow_fallspeed;
      if (this.fallerslow.y > 568) {
        this.fallerslow.x = Math.random() * (max - min) + min;
        this.fallerslow.y = 50;
        var fallerslow_fallspeed = Math.random() * (speedmax - speedmin) + speedmin;
      }
      if (this.cursors.left.isDown) {
        this.dodger.x -= 10;
      }
      if (this.cursors.right.isDown) {
        this.dodger.x += 10;
      }
    }
    game.physics.arcade.collide(this.faller,this.dodger,this.handleCollision)
    game.physics.arcade.collide(this.dodger,this.fallerslow,this.handleCollision)
  },

  handleCollision: function() {
    console.log("OUUCHH")
    game.state.start('Play')
  }

};
