import Phaser from 'phaser';

import Entity from '../sprites/Entity';
import LinearFollow from '../behaviours/LinearFollow';

const DURATION = 90; // msecs
const BLINK_ALPHA = 0.7;

export default class extends Entity {
  constructor(game, x, y, target) {
    super(game, x, y, 'blue_bullet');
    this.anchor.set(-0.015, 0.5);
    this.damage = 10;
    game.physics.enable(this);

    this.movement = {
      acceleration: 700,
      maxVelocity: 500,
      angularVelolicy: 300,
      rotationSpeed: 230, // degrees/second
    };

    this.addBehaviour(new LinearFollow(game, this, target));
  }
}
