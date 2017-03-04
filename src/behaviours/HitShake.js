import Phaser from 'phaser';

import Behaviour from './Behaviour';

const SHAKE_DURATION = 200;
const SHAKE_INTENSITY = 0.02;

export default class extends Behaviour {
  constructor(game, owner, target, bullets) {
    super(game, owner);
    this.target = target;
    this.bullets = bullets;
  }

  update() {
    // @TODO: WIll need to investigate the performance impact of this
    this.game.physics.arcade.collide(this.target,
                                     this.bullets,
                                     this.collisionHandler,
                                     null,
                                     { game: this.game, owner: this.owner });
  }

  collisionHandler(target, bullet) {
    bullet.kill();
    this.game.camera.shake(SHAKE_INTENSITY, SHAKE_DURATION);
  }
}
