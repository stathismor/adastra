import Phaser from 'phaser';

import Behaviour from './Behaviour';

const AVOID_DISTANCE = 50;
const ANGLE_DIFF = 0.0015;

export default class extends Behaviour {

  constructor(game, owner, target) {
    super(game, owner);
    this.target = target;
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
          if (Phaser.Utils.chanceRoll(90)) {
            avoidAngle *= -1; // zag
          }
        }
      }, this);

      targetAngle += avoidAngle;
    }

    return targetAngle;
  }

  rotate(targetAngle) {
    // console.log('FOLLOW MOVEMENT', this.owner);
    // The following code has been stolen from https://gamemechanicexplorer.com/#homingmissiles-1
    if (Phaser.Math.difference(this.owner.rotation, targetAngle) > ANGLE_DIFF) {
      // Calculate difference between the current angle and targetAngle. Keep it in range from
      // -180 to 180 to make the most efficient turns.
      // const delta = Phaser.Math.wrapAngle(targetAngle - this.owner.rotation);
      let delta = targetAngle - this.owner.rotation;

      // Keep it in range from -180 to 180 to make the most efficient turns.
      if (delta > Math.PI) {
        delta -= Phaser.Math.PI2;
      }
      if (delta < -Math.PI) {
        delta += Phaser.Math.PI2;
      }

      if (delta > 0) {
        // Turn clockwise
        this.owner.angle += this.owner.movement.rotationSpeed;
      } else {
        // Turn counter-clockwise
        this.owner.angle -= this.owner.movement.rotationSpeed;
      }

      // Just set angle to target angle if they are close
      if (Math.abs(delta) < this.game.math.degToRad(this.owner.movement.rotationSpeed)) {
        this.owner.rotation = targetAngle;
      }
    }
  }
}
