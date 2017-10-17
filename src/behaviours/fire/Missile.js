import Phaser from 'phaser';

import FireBehaviour from './FireBehaviour';
import LaserBulletWeapon from '../../weapons/LaserBulletWeapon';
import MissileBullet from '../../weapons/MissileBullet';


export default class extends FireBehaviour {
  constructor(game, owner) {
    super(game, owner);
    this.pressed = this.game.time.now;
  }

  update() {
    if (this.key_fire_2.isDown) {
      const now = this.game.time.now;
      if (now - this.pressed > 1000) {
        const target = this.game.enemiesGroup.children[0].getClosestTo(this.owner);
        if (target) {
          const missile = new MissileBullet(this.game, this.owner.x, this.owner.y, target);
          this.game.add.existing(missile);
        }
        this.pressed = now;
      }
    }
    // if (this.key_fire_1.isDown || this.key_fire_2.isDown) {
    //   // this.weapon.fire();
    //   const target = this.game.enemiesGroup.children[0].getClosestTo(this.owner);
    //   if (target) {
    //     // const missile = new MissileBullet(this.game, this.owner.x, this.owner.y, target);
    //     // this.game.add.existing(missile);
    //   }
    // }

    // this.game.physics.arcade.overlap(this.game.enemiesGroup,
    //                                  this.weapon.bullets,
    //                                  this.collisionHandler,
    //                                  null,
    //                                  { owner: this.owner, damageEnemy: this.damageEnemy });
  }
}
