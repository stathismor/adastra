/* globals __DEV__ */
import Phaser from 'phaser';

import Camera from '../camera/Camera';
import Ship from '../sprites/Ship';
import Enemy from '../sprites/Enemy';
import BlinkingStar from '../sprites/BlinkingStar';
import Planet from '../sprites/Planet';
import Player from '../sprites/Player';
import Control from '../behaviours/Control';
import PlayerFire from '../behaviours/PlayerFire';

const MAX_BLINKING_STARS = 40;
const BG_SIZE = 1920;
const SMOKE_LIFETIME = 500; // milliseconds

export default class extends Phaser.State {
  init() {}
  preload() {
    this.canUpdate = false;
    this.game.time.advancedTiming = true;
  }

  create() {
    this.game.stage.backgroundColor = '#222523';

    this.player = new Player(this.game, 0, 0);

    this.bg1 = new Phaser.TileSprite(this.game,
                                     0 - (this.game.world.centerX / 2),
                                     0 - (this.game.world.centerY / 2),
                                     BG_SIZE, BG_SIZE,
                                     'stars_back');
    this.bg2 = new Phaser.TileSprite(this.game,
                                     0 - (this.game.world.centerX / 2),
                                     0 - (this.game.world.centerY / 2),
                                     BG_SIZE, BG_SIZE,
                                     'stars_front');

    this.createInstructions();
    this.camera = new Camera(this.game, this.player, [this.bg1, this.bg2]);

    const planets = this.game.add.group();
    planets.addMultiple([
      new Planet(this.game, this.player, this.camera, 'earth', 0.87, 800, 920),
      new Planet(this.game, this.player, this.camera, 'planet', 0.75, 800, 900),
      new Planet(this.game, this.player, this.camera, 'moon', 0.45, 800, 900),
    ]);

    this.backgrounds = this.game.add.group();
    this.backgrounds.addMultiple([this.bg1, this.bg2]);

    this.smokeEmitter = this.game.add.emitter(0, 0, 10);
    // Set motion parameters for the emitted particles
    this.smokeEmitter.gravity = 0;
    this.smokeEmitter.setXSpeed(0, 0);
    this.smokeEmitter.setYSpeed(-80, -50); // make smoke drift upwards

    // Make particles fade out after 1000ms
    this.smokeEmitter.setAlpha(1, 0, SMOKE_LIFETIME,
        Phaser.Easing.Linear.InOut);

    // Create the actual particles
    this.smokeEmitter.makeParticles('smoke');

    const ships = this.game.add.group();
    ships.add(this.player);

    //  An explosion pool
    this.game.explosionsGroup = this.game.add.group();
    this.game.explosionsGroup.createMultiple(10, 'explosion');
    this.game.explosionsGroup.forEach((explosion) => {
      explosion.anchor.setTo(0.5);
      explosion.animations.add('explode');
    });

    this.game.enemiesGroup = this.game.add.group();
    const enemy = new Enemy(this.game,
                            3500,
                            this.game.world.centerY,
                            this.player);
    this.game.enemiesGroup.add(enemy);

    const blinkingStars = this.game.add.group();
    for (let i = 0; i < MAX_BLINKING_STARS; i += 1) {
      const star = new BlinkingStar(this.game, this.player, this.camera);
      blinkingStars.add(star);
    }

    this.controller = new Control(this.game, this.player);

    this.intro();
  }

  createInstructions() {
    // Add some fixed instructions about how to play the game
    const instructions = this.game.add.text(10,
                                            this.game.world.height - 60,
                                            'Arrow keys to move\nZ key to shoot',
      {
        font: '16px Arial',
        fill: '#e5d7db',
        align: 'left',
      });
    instructions.fixedToCamera = true;
    instructions.alpha = 0.5;
  }

  update() {
    // @TODO: Maybe there is a more elegant way of this this
    if (this.canUpdate) {
      this.camera.update();
      this.controller.update();

      const offset = 18;
      this.smokeEmitter.x = this.player.centerX - (Math.cos(this.player.rotation) * offset);
      this.smokeEmitter.y = this.player.centerY - (Math.sin(this.player.rotation) * offset);
    }
  }

  render() {
    const renderGroup = (member) => {
      this.game.debug.body(member);
    };
    if (__DEV__) {
      // this.enemies.forEachAlive(renderGroup, this);
      // this.bullets.forEachAlive(renderGroup, this);

      this.game.debug.spriteInfo(this.player, 32, 32);
      this.game.debug.text(this.game.time.fps || '--', 2, 14, '#00ff00');
    }
  }

  intro() {
    this.player.visible = false;
    this.game.camera.focusOnXY(0, 0);

    const startY = this.game.world.height * 0.4;
    const endY = this.game.world.height * 0.4;
    const mothership = new Ship(this.game, -10, startY, 'mothership');
    this.game.add.existing(mothership);

    const motherArrives = this.game.add.tween(mothership)
      .to({ y: 0 }, 2000, Phaser.Easing.Cubic.Out, true);
    motherArrives.onComplete.addOnce(() => {
      this.player.visible = true;
    });

    const shipMoves = this.game.add.tween(this.player)
      .to({ x: 32 }, 800, Phaser.Easing.Exponential.Out, false);
    motherArrives.chain(shipMoves);

    shipMoves.onComplete.addOnce(() => {
      this.player.visible = true;
      // Start emitting smoke particles one at a time (explode=false) with a
      // lifespan of SMOKE_LIFETIME at 50ms intervals
      this.smokeEmitter.start(false, SMOKE_LIFETIME, 50);

      this.player.body.velocity.set(800, 0);
      this.canUpdate = true;
      this.game.time.events.add(Phaser.Timer.SECOND * 2, () => { mothership.kill(); }, this);
    }, this);
  }
}
