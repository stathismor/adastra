import Phaser from 'phaser';

import Follow from './Follow';

const AVOID_DISTANCE = 50;

export default class extends Follow {

  constructor(game, owner, target) {
    super(game, owner, target);
  }

  update() {
    super.update();

    const targetAngle = this.getTargetAngle();
    this.owner.body.acceleration.setTo(Math.cos(targetAngle) * this.owner.movement.acceleration,
                                       Math.sin(targetAngle) * this.owner.movement.acceleration);
    this.owner.body.maxVelocity.setTo(this.owner.movement.maxVelocity,
                                      this.owner.movement.maxVelocity);
  }

  getTargetAngle() {
    let targetAngle = this.game.physics.arcade.angleBetween(this.owner, this.target);

    if (this.owner.inCamera) {
      // @TODO: This is taken from here: https://gamemechanicexplorer.com/#homingmissiles-6
      // Does not work perfect perfectly though, sprites can still overlap
      let avoidAngle = 0;
      this.owner.parent.forEachAlive((m) => {
        // Don't calculate anything if the other missile is me
        if (this.owner === m) {
          return;
        }

        // Already found an avoidAngle so skip the rest
        if (avoidAngle !== 0) {
          return;
        }

        // Calculate the distance between me and the other missile
        const distance = this.game.math.distance(this.owner.x, this.owner.y, m.x, m.y);

        // If the missile is too close...
        if (distance < AVOID_DISTANCE) {
          avoidAngle = Phaser.Math.random(Math.PI / 3, Math.PI / 2);
          if (Phaser.Utils.chanceRoll(50)) {
            avoidAngle *= -1; // zag
          }
        }
      }, this);

      targetAngle += avoidAngle;
    }

    return targetAngle;
  }
}
