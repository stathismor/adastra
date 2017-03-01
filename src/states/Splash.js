import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
  init() {}

  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    //
    // load your assets
    //
    this.game.load.spritesheet('ship', 'assets/images/ship.png', 64, 64);
    this.load.image('blue_bullet', 'assets/images/blue_bullet.png');
    this.load.image('red_bullet', 'assets/images/red_bullet.png');
    this.load.image('enemy', 'assets/images/enemy.png');
    this.load.image('stars_back', 'assets/images/stars_back.png');
    this.load.image('stars_front', 'assets/images/stars_front.png');
    this.load.image('blinking_star', 'assets/images/blinking_star.png');
    this.load.image('baddie', 'assets/images/baddie.png');
    this.load.image('smoke', 'assets/images/smoke.png');
    this.load.image('planet', 'assets/images/planet.png');
    this.load.image('moon', 'assets/images/moon.png');
    this.load.image('earth', 'assets/images/earth.png');
    this.load.image('marker', 'assets/images/marker.png');
  }

  create() {
    this.state.start('Game');
  }

}