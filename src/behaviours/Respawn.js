import Phaser from 'phaser';

import { getRandomPointInDirection } from '../utils';

import Behaviour from './Behaviour';

const MAX_DISTANCE = 800;
const SPAWN_MIN_DISTANCE = 600;
const SPAWN_MAX_DISTANCE = 900;
const SPAWN_ANGLE_OFFSET = 0.2;

export default class extends Behaviour {

  constructor(game, owner, target) {
    super(game, owner);
    this.target = target;
  }

  update() {
    const distance = this.game.physics.arcade.distanceBetween(this.owner, this.target);
    if (distance > MAX_DISTANCE) {
      const randomPoint = getRandomPointInDirection(this.game,
                                                    this.target.x,
                                                    this.target.y,
                                                    SPAWN_MIN_DISTANCE,
                                                    SPAWN_MAX_DISTANCE,
                                                    this.target.body.angle,
                                                    SPAWN_ANGLE_OFFSET);
      // Reset owner's position and make it look at player
      const targetAngle = this.game.physics.arcade.angleBetween(this.owner, this.target);
      this.owner.x = randomPoint.x;
      this.owner.y = randomPoint.y;
      this.owner.rotation = targetAngle;
    }
  }
}
