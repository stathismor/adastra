import { getRandomPointInDirection } from '../utils';

import Enemy from '../sprites/Enemy';

const MAX_ENEMIES = 1;
const SPAWNED_ENEMIES_NUMBER = 1;
const ENEMY_SPAWN_MIN_DISTANCE = 500;
const ENEMY_SPAWN_MAX_DISTANCE = 900;
const SPAWN_ANGLE_OFFSET = 0.01;

export default class {

  constructor(game, player) {
    this.game = game;
    this.player = player;
    this.game.enemiesGroup = this.game.add.group();

    game.time.events.repeat(Phaser.Timer.SECOND * 4, 100, this.createWave, this);

    for (let i = 0; i < MAX_ENEMIES; i += 1) {
      const enemy = new Enemy(this.game,
                              0,
                              0,
                              this.player);

      // NOTE: Do not kill() here, because onKilled() is triggered, and explosion is rendered.
      enemy.exists = false;
      enemy.alive = false;
      this.game.enemiesGroup.add(enemy);
    }
  }

  createWave() {
    for (let i = 0; i < SPAWNED_ENEMIES_NUMBER; i += 1) {
      const randomPoint = getRandomPointInDirection(this.game,
                                                    this.player.x,
                                                    this.player.y,
                                                    ENEMY_SPAWN_MIN_DISTANCE,
                                                    ENEMY_SPAWN_MAX_DISTANCE,
                                                    this.player.body.angle,
                                                    SPAWN_ANGLE_OFFSET);

      let enemy = this.game.enemiesGroup.getFirstDead(false, randomPoint.x, randomPoint.y);
      if (enemy) {
        enemy.revive();
      }
    }
  }
}
