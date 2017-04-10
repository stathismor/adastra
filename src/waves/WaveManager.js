import { getRandomPointInDirection } from '../utils';

import Enemy from '../sprites/Enemy';

const MAX_ENEMIES = 30;
const SPAWNED_ENEMIES_NUMBER = 5;
const ENEMY_SPAWN_MIN_DISTANCE = 500;
const ENEMY_SPAWN_MAX_DISTANCE = 900;
const SPAWN_ANGLE_OFFSET = 0.5;
const SPAWN_SECONDS = 5;

export default class {

  constructor(game, player) {
    this.game = game;
    this.player = player;
    this.game.enemiesGroup = this.game.add.group();
    this.secondsCount = 0;

    this.timer = game.time.create(false);
    //  Set a TimerEvent to occur every 1 second
    this.timer.loop(Phaser.Timer.SECOND, this.createWave, this);
    this.timer.start();

    this.waveText = this.game.add.text(this.game.camera.view.width - 500,
                                        20,
                                        `Next wave in ${SPAWN_SECONDS}`,
      {
        font: '20px Arial',
        fill: '#00ff00',
        align: 'left',
      });
    this.waveText.fixedToCamera = true;

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

  updateWaveText() {
    this.waveText.setText(`Next wave in ${SPAWN_SECONDS - this.secondsCount}`);
    this.secondsCount += 1;
    if (this.secondsCount > SPAWN_SECONDS) {
      this.secondsCount = 0;
    }
  }


  createWave() {
    this.updateWaveText();

    if (this.secondsCount === 0) {
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
}
