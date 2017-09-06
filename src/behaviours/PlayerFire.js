import Phaser from 'phaser';

import Behaviour from './Behaviour';
import LaserBulletWeapon from '../weapons/LaserBulletWeapon';
import BlueBullet from '../weapons/BlueBullet';

export default class extends Behaviour {
  constructor(game, owner) {
    super(game, owner);
    this.weapon = new LaserBulletWeapon(game, owner, 30, BlueBullet);
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
      e.damage(bullet.data.damage);

      if (!e.alive) {
        this.owner.points += e.points;
      }
    }
  }
}
