import { getRandomPoint, getRandomPointInDirection } from '../utils';

import Entity from './Entity';

const MIN_DISTANCE = 800;
const MAX_DISTANCE = 800;
const SPAWN_ANGLE_OFFSET = 0.4;
const MIN_BLINK_DURATION = 500; // msecs
const MAX_BLINK_DURATION = 900; // msecs
const MIN_BLINK_ALPHA = 0.1;
const MAX_BLINK_ALPHA = 0.5;
const VELOCITY_RATE = 0.4;

export default class extends Entity {

  constructor(game, player, camera) {
    const randomPoint = getRandomPoint(game, player.x, player.y, 0, MIN_DISTANCE);
    super(game, randomPoint.x, randomPoint.y, 'blinking_star');
    this.player = player;
    this.camera = camera;
    game.add.tween(this).to({ alpha: game.rnd.realInRange(MIN_BLINK_ALPHA, MAX_BLINK_ALPHA) },
                  game.rnd.integerInRange(MIN_BLINK_DURATION, MAX_BLINK_DURATION),
                  null,
                  true,
                  0,
                  -1,
                  true);
  }

  update() {
    const distance = this.game.physics.arcade.distanceBetween(this, this.player);
    if (distance > MAX_DISTANCE) {
      // @TODO: Make this render on the direction of the player.
      const randomPoint = getRandomPointInDirection(this.game, this.player.x, this.player.y,
                                                    MIN_DISTANCE, MAX_DISTANCE,
                                                    this.player.body.angle, SPAWN_ANGLE_OFFSET);
      this.x = randomPoint.x;
      this.y = randomPoint.y;
    } else {
      this.x += this.camera.velocity.x * VELOCITY_RATE;
      this.y += this.camera.velocity.y * VELOCITY_RATE;
    }
  }
}
