import Phaser from 'phaser';

import Behaviour from './Behaviour';

export default class extends Behaviour {

  constructor(game, owner, target) {
    super(game, owner);
    this.target = target;
  }

  update() {
    this.rotate();
  }

  rotate() {
    // The following code has been stolen from https://gamemechanicexplorer.com/#homingmissiles-1
    // Calculate the angle to the target
    const targetAngle = this.game.math.angleBetween(this.owner.x,
                                                    this.owner.y,
                                                    this.target.x,
                                                    this.target.y);
    if (this.owner !== targetAngle) {
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
