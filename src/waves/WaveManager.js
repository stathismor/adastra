import Phaser from 'phaser';

import Gaussian from 'gaussian';
// import ppf from 'gaussian';
const distribution = Gaussian(3, 4);
console.log(distribution.pdf(1));
console.log(distribution.pdf(2));
console.log(distribution.pdf(3));
// var distribution = gaussian(mean, variance);

import { getRandomPointInDirection } from '../utils';

import Enemy1 from '../sprites/enemy/Enemy1';
import Enemy2 from '../sprites/enemy/Enemy2';
import Mothership from '../sprites/enemy/Mothership';

const SPAWN_MIN_DISTANCE = 500;
const SPAWN_MAX_DISTANCE = 900;
const SPAWN_ANGLE_OFFSET = 0.5;
const SPAWN_MIN_TIME = 0.5; // in secs
const SPAWN_MAX_TIME = 4;

const enemyGroups = [
  {
    Class: Enemy1,
    size: 30,
  },
  {
    Class: Enemy2,
    size: 30,
  },
  {
    Class: Mothership,
    size: 10,
  },
];

export default class {

  constructor(game, player) {
    this.game = game;
    this.player = player;
    this.game.enemiesGroup = this.game.add.group();
    this.secondsCount = 0;
    this.previousSeconds = 0;
    this.queuedEnemies = 0;

    this.timer = game.time.create(false);
    this.timer.loop(Phaser.Timer.SECOND, this.process, this);
    this.timer.start(Phaser.Timer.SECOND * 4);

    enemyGroups.every((enemyGroup) => {
      const group = this.game.add.group();
      for (let i = 0; i < enemyGroup.size; i += 1) {
        const enemy = new enemyGroup.Class(this.game, 0, 0, this.player);

        // NOTE: Do not kill() here, because onKilled() is triggered, and explosion is rendered.
        enemy.exists = false;
        enemy.alive = false;
        group.add(enemy);
      }
      this.game.enemiesGroup.add(group);
      return true;
    });

    this.game.time.events.add(Phaser.Timer.SECOND * 1, () => this.spawnEnemies(2, 0), this);
  }

  process() {
    // @TODO: Obviously make this nicer
    let index = 0;
    if (this.player.points < 100) {
      index = 0;
    } else if (this.player.points < 200) {
      index = 1;
    } else if (this.player.points < 300) {
      index = 2;
    }

    const estimatedEnemiesCount = Math.floor(this.spawnFn(this.player.points));
    const currentEnemiesCount = this.game.enemiesGroup.getChildAt(index).countLiving() +
                                this.queuedEnemies;
    const newEnemiesCount = estimatedEnemiesCount - currentEnemiesCount;
    this.spawnEnemies(newEnemiesCount, index);
  }

  spawnFn(points) {
    // @TODO: Obviously make this nicer
    let factor = 0;
    if (this.player.points < 100) {
      factor = 0.08;
    } else if (this.player.points < 200) {
      factor = 0.02;
    } else if (this.player.points < 300) {
      factor = 0.005;
    }
    return points * factor;
  }

  spawnEnemies(count, index) {
    for (let i = 0; i < count && count > 0; i += 1) {
      this.queuedEnemies += 1;
      this.game.time.events.add(Phaser.Math.random(Phaser.Timer.SECOND * SPAWN_MIN_TIME,
                                                   Phaser.Timer.SECOND * SPAWN_MAX_TIME),
                                                   this.spawnEnemy,
        {
          wave: this, index,
        });
    }
  }

  spawnEnemy() {
    const randomPoint = getRandomPointInDirection(this.wave.game,
                                                  this.wave.player.x,
                                                  this.wave.player.y,
                                                  SPAWN_MIN_DISTANCE,
                                                  SPAWN_MAX_DISTANCE,
                                                  this.wave.player.body.angle,
                                                  SPAWN_ANGLE_OFFSET);

    const enemy = this.wave.game.enemiesGroup.getChildAt(this.index).getFirstDead(false,
                                                                                  randomPoint.x,
                                                                                  randomPoint.y);
    if (enemy) {
      this.wave.queuedEnemies -= 1;
      enemy.revive();
    }
  }
}
