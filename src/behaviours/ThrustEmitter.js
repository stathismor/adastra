import Phaser from 'phaser';

import Behaviour from './Behaviour';

const SMOKE_LIFETIME = 700; // milliseconds
const OFFSET = 14;
const SMOKE_VELOCITY = 60;

export default class extends Behaviour {

  constructor(game, owner) {
    super(game, owner);

    this.smokeEmitter = game.add.emitter(0, 0, 8);
    // Set motion parameters for the emitted particles
    this.smokeEmitter.gravity = 0;

    // Make particles fade out after 1000ms
    this.smokeEmitter.setAlpha(1, 0, SMOKE_LIFETIME, Phaser.Easing.Linear.InOut);

    // Create the actual particles
    this.smokeEmitter.makeParticles('damage', [1, 2]);

    this.smokeEmitter.setAngle(-33, 33);
    this.smokeEmitter.area = new Phaser.Rectangle(this.owner.x-10, this.owner.y-4, 20, 8);
  }

  update() {
    if (this.owner.body.velocity.getMagnitude() < SMOKE_VELOCITY) {
      this.smokeEmitter.on = false;
    } else if (!this.smokeEmitter.on && this.game.canUpdate) {
      this.smokeEmitter.start(false, SMOKE_LIFETIME, 90);
    }

    this.smokeEmitter.x = this.owner.centerX - (Math.cos(this.owner.rotation) * OFFSET);
    this.smokeEmitter.y = this.owner.centerY - (Math.sin(this.owner.rotation) * OFFSET);
  }
}
