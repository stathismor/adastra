import Phaser from 'phaser';

import FireBehaviour from './FireBehaviour';
import LaserBulletWeapon from '../../weapons/LaserBulletWeapon';
import BlueBullet from '../../weapons/BlueBullet';

export default class extends FireBehaviour {
  constructor(game, owner) {
    super(game, owner);
    this.weapon = new LaserBulletWeapon(game, owner, 30, BlueBullet,
                                        {'bulletSpeed':  1000, 'fireRate': 200});
  }

  update() {
    if (this.key_fire_1.isDown || this.key_fire_2.isDown) {
      this.weapon.fire();
    }

    this.game.physics.arcade.overlap(this.game.enemiesGroup,
                                     this.weapon.bullets,
                                     this.collisionHandler,
                                     null,
                                     { owner: this.owner, damageEnemy: this.damageEnemy });
  }
}
