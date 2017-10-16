import Phaser from 'phaser';

import Behaviour from '../Behaviour';

export default class extends Behaviour {
  constructor(game, owner) {
    super(game, owner);
    this.key_fire_1 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.key_fire_2 = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
  }

  collisionHandler(enemy, bullet) {
    // TODO: Can I avoid even doing the check when off camera?
    if (enemy.inCamera && bullet.inCamera) {
      bullet.kill();

      this.damageEnemy(this.owner, enemy, bullet.data.damage);
    }
  }

  damageEnemy(owner, enemy, damage) {
    const e = enemy;
    e.damage(damage);

    if (!e.alive) {
      this.owner.points += e.points;
    }
  }
}
