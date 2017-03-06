import Phaser from 'phaser';

import Behaviour from './Behaviour';

const SMOKE_LIFETIME = 500; // milliseconds
const OFFSET = 18;

export default class extends Behaviour {

  constructor(game, owner) {
    super(game, owner);

    this.smokeEmitter = game.add.emitter(0, 0, 10);
    // Set motion parameters for the emitted particles
    this.smokeEmitter.gravity = 0;
    this.smokeEmitter.setXSpeed(0, 0);
    this.smokeEmitter.setYSpeed(-80, -50); // make smoke drift upwards

    // Make particles fade out after 1000ms
    this.smokeEmitter.setAlpha(1, 0, SMOKE_LIFETIME, Phaser.Easing.Linear.InOut);

    // Create the actual particles
    this.smokeEmitter.makeParticles('smoke');

    this.started = false;
  }

  update() {
    // @TODO: Not sure that's the most elegant way of starting this...
    // (makes it run on intro otherwise)
    if (!this.started && this.game.canUpdate) {
      this.smokeEmitter.start(false, SMOKE_LIFETIME, 50);
      this.started = true;
    }

    this.smokeEmitter.x = this.owner.centerX - (Math.cos(this.owner.rotation) * OFFSET);
    this.smokeEmitter.y = this.owner.centerY - (Math.sin(this.owner.rotation) * OFFSET);
  }
}
