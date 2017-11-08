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
    this.game.load.spritesheet('ship', 'assets/images/ship.png', 32, 32);
    this.load.image('blue_bullet', 'assets/images/blue_bullet.png');
    this.load.image('red_bullet', 'assets/images/red_bullet.png');
    this.load.image('red_bullet_big', 'assets/images/red_bullet_big.png');
    this.load.image('beam', 'assets/images/beam.png');
    this.load.image('missile', 'assets/images/missile.png');
    this.load.image('enemy1', 'assets/images/enemy1.png');
    this.load.image('enemy2', 'assets/images/enemy2.png');
    this.load.image('stars_back', 'assets/images/stars_back.png');
    this.load.image('stars_front', 'assets/images/stars_front.png');
    this.load.image('back', 'assets/images/back.png');
    this.load.image('back1', 'assets/images/back1.png');
    this.load.image('back2', 'assets/images/back2.png');
    this.load.image('blinking_star', 'assets/images/blinking_star.png');
    this.load.image('smoke', 'assets/images/smoke.png');
    this.load.image('planet', 'assets/images/planet.png');
    this.load.image('moon', 'assets/images/moon.png');
    this.load.image('earth', 'assets/images/earth.png');
    this.load.image('marker', 'assets/images/marker.png');
    this.load.image('blue_marker', 'assets/images/blue_marker.png');
    this.load.image('yellow_marker', 'assets/images/yellow_marker.png');
    this.load.image('mothership', 'assets/images/mothership.png');
    this.load.image('enemy_mothership', 'assets/images/enemy_mothership.png');
    this.load.image('thrust_particle', 'assets/images/thrust_particle.png');
    this.load.spritesheet('explosion', 'assets/images/explosion.png', 128, 128);
    this.load.spritesheet('damage', 'assets/images/damage.png', 4, 4);
    this.load.spritesheet('thrust', 'assets/images/thrust.png', 16, 16);
    this.load.spritesheet('fire_powerup', 'assets/images/fire_powerup.png');
    this.load.spritesheet('beam_powerup', 'assets/images/beam_powerup.png');
    this.load.spritesheet('speed_powerup', 'assets/images/speed_powerup.png');
    this.load.spritesheet('missile_powerup', 'assets/images/missile_powerup.png');
  }

  create() {
    this.state.start('Menu');
  }

}
