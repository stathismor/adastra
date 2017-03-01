import Phaser from 'phaser';

import { getRandomPoint, getRandomPointInDirection } from '../utils';

import Entity from './Entity';

const SPAWN_ANGLE_OFFSET = 0.3;

export default class extends Entity {

  constructor(game, player, camera, texture, bgDistance, minPlDistance, maxPlDistance) {
    const randomPoint = getRandomPoint(game, player.x, player.y,
                                       minPlDistance / 3, minPlDistance);
    super(game, randomPoint.x, randomPoint.y, texture);
    this.player = player;
    this.camera = camera;
    this.bgDistance = bgDistance;
    this.minPlDistance = minPlDistance;
    this.maxPlDistance = maxPlDistance;

    // Better use its own camera-tracking velocity, as it has less stuttering
    this.planetVelocity = new Phaser.Point(camera.velocity.x, camera.velocity.y);
    this.oldCameraPos = new Phaser.Point(game.camera.x, game.camera.y);
    this.cameraVelocity = new Phaser.Point(0, 0);
  }

  update() {
    const playerDistance = this.game.physics.arcade.distanceBetween(this, this.player);
    if (playerDistance > this.maxPlDistance) {
      // @TODO: Make this render on the direction of the player.
      const randomPoint = getRandomPointInDirection(this.game, this.player.x, this.player.y,
                                                    this.minPlDistance, this.maxPlDistance,
                                                    this.player.body.angle, SPAWN_ANGLE_OFFSET);
      this.x = randomPoint.x;
      this.y = randomPoint.y;
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
