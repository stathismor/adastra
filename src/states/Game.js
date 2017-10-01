/* globals __DEV__ */
import Phaser from 'phaser';

import Camera from '../camera/Camera';
import Ship from '../sprites/Ship';
import BlinkingStar from '../sprites/BlinkingStar';
import Planet from '../sprites/Planet';
import Player from '../sprites/Player';
import Control from '../behaviours/Control';
import LaserBulletWeapon from '../weapons/LaserBulletWeapon';
import WaveManager from '../waves/WaveManager';
import Hud from '../hud/Hud';

const MAX_BLINKING_STARS = 40;
const BG_SIZE = 1920;

export default class extends Phaser.State {
  init() {}
  preload() {
    this.game.canUpdate = true;
    this.game.time.advancedTiming = true;

    // Init groups
    this.game.planetsGroup = this.game.add.group();
    this.game.backgroundsGroup = this.game.add.group();
    this.game.shipsGroup = this.game.add.group();
    this.game.explosionsGroup = this.game.add.group();
    this.game.blinkingStarsGroup = this.game.add.group();
    this.game.powerupsGroup = this.game.add.group();
    this.game.enemiesGroup = this.game.add.group();
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

    this.camera = new Camera(this.game, this.player, [this.bg1, this.bg2]);

    this.game.planetsGroup.addMultiple([
      new Planet(this.game, this.player, this.camera, 'earth', 0.87, 800, 920),
      new Planet(this.game, this.player, this.camera, 'planet', 0.75, 800, 900),
      new Planet(this.game, this.player, this.camera, 'moon', 0.45, 800, 900),
    ]);

    this.game.backgroundsGroup.addMultiple([this.bg1, this.bg2]);

    this.game.shipsGroup.add(this.player);

    //  An explosion pool
    this.game.explosionsGroup.createMultiple(10, 'explosion');
    this.game.explosionsGroup.forEach((explosion) => {
      explosion.anchor.setTo(0.5);
      explosion.animations.add('explode');
    });

    
    for (let i = 0; i < MAX_BLINKING_STARS; i += 1) {
      const star = new BlinkingStar(this.game, this.player, this.camera);
      this.game.blinkingStarsGroup.add(star);
    }

    const waveManager = new WaveManager(this.game, this.player);
    this.hud = new Hud(this.game, this.player);

    this.controller = new Control(this.game, this.player);

    this.intro();
  }

  update() {
    // @TODO: Maybe there is a more elegant way of this this
    if (this.game.canUpdate) {
      this.camera.update();
      this.controller.update();
      this.hud.update();
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
    this.game.canUpdate = false;
    this.player.visible = false;
    this.game.camera.focusOnXY(0, 0);

    const startY = this.game.world.height * 0.4;
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
      this.player.body.velocity.set(800, 0);
      this.game.canUpdate = true;
      this.game.time.events.add(Phaser.Timer.SECOND * 2, () => { mothership.kill(); }, this);
    }, this);
  }
}
