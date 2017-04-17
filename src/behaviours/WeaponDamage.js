import Phaser from 'phaser';

import Behaviour from './Behaviour';
import RegenerateHealth from './RegenerateHealth';

export default class extends Behaviour {
  constructor(game, owner, target, weapon) {
    super(game, owner);
    this.target = target;
    this.weapon = weapon;
    this.regenerateHealth = target.getBehaviour(RegenerateHealth);
    this.persists = true;
  }

  update() {
    // @TODO: WIll need to investigate the performance impact of this
    this.game.physics.arcade.overlap(
      this.target,
      this.weapon.bullets,
      this.collisionHandler,
      null,
      {
        regenerateHealth: this.regenerateHealth,
      });
  }

  collisionHandler(target, bullet) {
    bullet.kill();
    this.regenerateHealth.damage(target, bullet.data.damage);
  }
}
