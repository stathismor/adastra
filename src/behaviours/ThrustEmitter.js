import Phaser from 'phaser';

import Behaviour from './Behaviour';

const SMOKE_LIFETIME = 250; // milliseconds
const OFFSET = 16;
const SMOKE_VELOCITY = 60;

export default class extends Behaviour {

  constructor(game, owner) {
    super(game, owner);

    this.emitter = game.add.emitter(0, 0, 40);
    // Set motion parameters for the emitted particles
    this.emitter.gravity = 0;
    this.emitter.angle = 0;
    this.emitter.rotation = 0;
    this.emitter.setAngle(0, 0, 22, 22);
    this.emitter.lifespan = 250;

    // Make particles fade out after 1000ms
    this.emitter.setAlpha(1, 0, SMOKE_LIFETIME, Phaser.Easing.Linear.InOut);

    // Create the actual particles
    this.emitter.makeParticles('thrust_particle', [1]);

  }

  update() {
    if (this.owner.body.velocity.getMagnitude() < SMOKE_VELOCITY) {
      this.emitter.on = false;
    } else if (!this.emitter.on && this.game.canUpdate) {
      this.emitter.x = this.owner.centerX - (Math.cos(this.owner.rotation) * OFFSET);
      this.emitter.y = this.owner.centerY - (Math.sin(this.owner.rotation) * OFFSET);
      this.emitter.emitParticle();
      this.emitter.emitParticle(this.emitter.x - this.owner.deltaX / 2,
                                this.emitter.y - this.owner.deltaY / 2);
    }
  }
}
