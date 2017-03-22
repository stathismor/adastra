import Phaser from 'phaser';

import Entity from './Entity';

export default class extends Entity {

  constructor(game, x, y, asset) {
    super(game, x, y, asset);

    //  Movement component
    this.movement = {
      acceleration: 700,
      maxVelocity: 1500,
      angularVelolicy: 300,
      rotationSpeed: 180, // degrees/second
    };

    game.physics.enable(this);
    this.anchor.setTo(0.5);
  }
}
