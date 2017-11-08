import { getRandomPoint, getRandomPointInDirection } from '../utils';

import Entity from './Entity';

const MIN_DISTANCE = 800;
const MAX_DISTANCE = 800;
const SPAWN_ANGLE_OFFSET = 0.7;
const MIN_BLINK_DURATION = 500; // msecs
const MAX_BLINK_DURATION = 900; // msecs
const MIN_BLINK_ALPHA = 0.1;
const MAX_BLINK_ALPHA = 0.5;
const VELOCITY_RATE = 0.4;

export default class extends Entity {

  constructor(game, player, camera) {
    const randomPoint = getRandomPoint(game, player.x, player.y, 0, game.camera.view.width / 2);
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
    // @TODO Move this to camera, to do it only once
    const checkBoundsRectangle = Phaser.Rectangle.clone(this.game.camera.view);
    const checkDistance = this.width + 50;
    const checkBoundsRay = new Phaser.Line(this.x, this.y, this.player.x, this.player.y);
    if (Phaser.Line.intersectionWithRectangle(checkBoundsRay,
                                              checkBoundsRectangle.inflate(checkDistance,
                                                                           checkDistance))) {
      const randomPoint = getRandomPointInDirection(this.game, this.player.x, this.player.y,
                                                    2000, 2000,
                                                    this.player.body.angle, SPAWN_ANGLE_OFFSET);

      const spawnRay = new Phaser.Line(this.player.x, this.player.y,
                                       randomPoint.x, randomPoint.y);
      const spawnPoint = new Phaser.Point();
      const spawnRectangle = Phaser.Rectangle.clone(this.game.camera.view);
      if (Phaser.Line.intersectionWithRectangle(spawnRay,
                                                spawnRectangle.inflate(this.width,
                                                                       this.width),
                                                spawnPoint)) {
        this.x = spawnPoint.x;
        this.y = spawnPoint.y;
      }
    } else {
      this.x += this.camera.velocity.x * VELOCITY_RATE;
      this.y += this.camera.velocity.y * VELOCITY_RATE;
    }
  }
}
