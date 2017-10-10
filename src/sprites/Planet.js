import Phaser from 'phaser';

import { getRandomPoint, getRandomPointInDirection } from '../utils';

import Entity from './Entity';

const SPAWN_ANGLE_OFFSET = 0.42;
const CHECK_VIEW_INFLATE_DISTANCE = 200;
const CHECK_VIEW_INFLATE_OFFSET = 100;

export default class extends Entity {

  constructor(game, player, camera, texture, bgDistance) {
    const randomPoint = getRandomPoint(game, player.x, player.y,
                                       game.width / 2, game.height  / 2);
    super(game, randomPoint.x, randomPoint.y, texture);
    this.player = player;
    this.camera = camera;
    this.bgDistance = bgDistance;

    // Better use its own camera-tracking velocity, as it has less stuttering
    this.planetVelocity = new Phaser.Point(camera.velocity.x, camera.velocity.y);
    this.oldCameraPos = new Phaser.Point(game.camera.x, game.camera.y);
    this.cameraVelocity = new Phaser.Point(0, 0);

    this.checkBoundsRay = new Phaser.Line();
  }

  update() {
    this.checkBoundsRay.setTo(this.player.x, this.player.y, this.x, this.y);
    const checkBoundsRectangle = Phaser.Rectangle.clone(this.game.camera.view);
    const checkDistance = this.width +
                          CHECK_VIEW_INFLATE_DISTANCE +
                          this.game.rnd.integerInRange(0, CHECK_VIEW_INFLATE_OFFSET);
    if (Phaser.Line.intersectionWithRectangle(this.checkBoundsRay,
                                              checkBoundsRectangle.inflate(checkDistance,
                                                                           checkDistance))) {
      const randomPoint = getRandomPointInDirection(this.game,
                                                    this.player.x,
                                                    this.player.y,
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
      this.cameraVelocity.set(this.game.camera.x - this.oldCameraPos.x,
                              this.game.camera.y - this.oldCameraPos.y);
      this.planetVelocity.set(this.cameraVelocity.x, this.cameraVelocity.y);

      const cameraMagnitude = this.camera.velocity.getMagnitude();
      this.planetVelocity.setMagnitude(cameraMagnitude * this.bgDistance);

      this.x += this.planetVelocity.x;
      this.y += this.planetVelocity.y;

      this.oldCameraPos.set(this.game.camera.x, this.game.camera.y);
    }
  }
}
