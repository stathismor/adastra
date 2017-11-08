import Phaser from 'phaser';

import Entity from '../sprites/Entity';

const DURATION = 90; // msecs
const BLINK_ALPHA = 0.7;

export default class extends Entity {
  constructor(game) {
    super(game, 0, 0, 'missile');
    this.anchor.set(-0.015, 0.5);
    this.damage = 20;
    game.physics.enable(this);
    this.exists = false;
    this.alive = false;

    this.movement = {
      acceleration: 700,
      maxVelocity: 500,
      angularVelolicy: 300,
      rotationSpeed: 230, // degrees/second
    };
  }
}
