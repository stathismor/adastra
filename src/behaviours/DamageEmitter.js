import Phaser from 'phaser';

import Behaviour from './Behaviour';

const SMOKE_LIFETIME = 500; // milliseconds

export default class extends Behaviour {

  constructor(game, owner) {
    super(game, owner);

    this.smokeEmitter = game.add.emitter(-7, -12, 10);

    // Make particles fade out after 1000ms
    this.smokeEmitter.setAlpha(1, 0, SMOKE_LIFETIME, Phaser.Easing.Linear.InOut);

    // Create the actual particles
    this.smokeEmitter.makeParticles('damage', 2);

    this.owner.addChild(this.smokeEmitter);
  }

  update() {
    // @TODO: Not sure that's the most elegant way of starting this...
    // (makes it run on intro otherwise)
    if (!this.smokeEmitter.on && this.owner.health <= 80) {
      this.smokeEmitter.start(false, SMOKE_LIFETIME, 50);
      this.smokeEmitter.on = true;
    } else if (this.smokeEmitter && this.owner.health > 80) {
      this.smokeEmitter.on = false;
    }
  }
}
