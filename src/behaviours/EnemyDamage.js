import Phaser from 'phaser';

import Behaviour from './Behaviour';
import RegenerateHealth from './RegenerateHealth';


export default class extends Behaviour {
  constructor(game, owner) {
    super(game, owner);
    this.regenerateHealth = owner.getBehaviour(RegenerateHealth);
    this.colliding = false;
  }

  update() {
    // @TODO: WIll need to investigate the performance impact of this
    // console.log(this.owner, this.game.enemiesGroup);
    if (!this.game.physics.arcade.overlap(
        this.owner,
        this.game.enemiesGroup.children,
        this.collisionHandler,
        null,
      {
        behaviour: this,
      })) {
      this.colliding = false;
    }
  }

  collisionHandler(target, enemy) {
    if (!this.behaviour.colliding) {
      this.behaviour.colliding = true;
      this.behaviour.regenerateHealth.damage(target, enemy.data.damage);
    }
  }
}
