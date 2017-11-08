import Phaser from 'phaser';

import Follow from './Follow';

export default class extends Follow {

  update() {
    const targetAngle = this.getTargetAngle();
    this.rotate(targetAngle);

    // Calculate velocity vector based on rotation and max velocity
    // console.log('LINEAR MOVEMENT', this.owner.movement);
    this.owner.body.velocity.x = Math.cos(this.owner.rotation) * this.owner.movement.maxVelocity;
    this.owner.body.velocity.y = Math.sin(this.owner.rotation) * this.owner.movement.maxVelocity;
  }
}
