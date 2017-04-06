import Phaser from 'phaser';

import { getRandomPoint } from '../utils';

import Behaviour from './Behaviour';

const ENEMY_SPAWN_MIN_DISTANCE = 500;
const ENEMY_SPAWN_MAX_DISTANCE = 900;

export default class extends Behaviour {
  constructor(game, owner, weapon) {
    super(game, owner);
    this.weapon = weapon;

    this.key_fire_1 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.key_fire_2 = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
  }

  update() {
    if (this.key_fire_1.isDown || this.key_fire_2.isDown) {
      this.weapon.fire();
    }

    this.game.physics.arcade.collide(this.game.enemiesGroup,
                                     this.weapon.bullets,
                                     this.collisionHandler,
                                     null,
                                     { game: this.game, owner: this.owner });
  }

  collisionHandler(enemy, bullet) {
    bullet.kill();
    // Respawn on a random position
    const e = enemy;

    // @TODO: Need to do this with a pool of enemies
    e.kill();
    e.revive();
    const randomPoint = getRandomPoint(this.game, this.owner.x, this.owner.y,
                                       ENEMY_SPAWN_MIN_DISTANCE, ENEMY_SPAWN_MAX_DISTANCE);
    e.x = randomPoint.x;
    e.y = randomPoint.y;
  }
}
