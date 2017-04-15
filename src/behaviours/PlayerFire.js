import Phaser from 'phaser';

import Behaviour from './Behaviour';

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

    this.game.physics.arcade.overlap(this.game.enemiesGroup,
                                     this.weapon.bullets,
                                     this.collisionHandler,
                                     null,
                                     { game: this.game, owner: this.owner, weapon: this.weapon });
  }

  collisionHandler(enemy, bullet) {
    // TODO: Can I avoid even doing the check when off camera?
    if (enemy.inCamera && bullet.inCamera) {
      bullet.kill();

      const e = enemy;
      e.damage(this.weapon.damage);

      if (!e.alive) {
        this.owner.points += e.points;
      }
    }
  }
}
