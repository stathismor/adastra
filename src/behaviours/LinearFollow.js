import Phaser from 'phaser';

import Follow from './Follow';

export default class extends Follow {

  constructor(game, owner, target) {
    super(game, owner);
    this.target = target;
  }

  update() {
    super.update();

    // Calculate velocity vector based on this.rotation and this.SPEED
    this.owner.body.velocity.x = Math.cos(this.owner.rotation) * this.owner.movement.maxVelocity;
    this.owner.body.velocity.y = Math.sin(this.owner.rotation) * this.owner.movement.maxVelocity;
  }
}
