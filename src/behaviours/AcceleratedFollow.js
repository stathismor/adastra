import Phaser from 'phaser';

import Follow from './Follow';

export default class extends Follow {

  update() {
    const targetAngle = this.getTargetAngle();
    this.rotate(targetAngle);
    this.owner.body.acceleration.setTo(Math.cos(targetAngle) * this.owner.movement.acceleration,
                                       Math.sin(targetAngle) * this.owner.movement.acceleration);
    this.owner.body.maxVelocity.setTo(this.owner.movement.maxVelocity,
                                      this.owner.movement.maxVelocity);
  }
}
