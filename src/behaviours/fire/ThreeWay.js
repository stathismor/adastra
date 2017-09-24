import Phaser from 'phaser';

import Behaviour from '..//Behaviour';
import LaserBulletWeapon from '../../weapons/LaserBulletWeapon';
import SmallRedBullet from '../../weapons/SmallRedBullet';

const BULLET_ANGLE = 0.33;
const BULLET_DISTANCE = 100;

export default class extends Behaviour {
  constructor(game, owner) {
    super(game, owner);
    this.weapon1 = new LaserBulletWeapon(game, owner, 30, SmallRedBullet);
    this.weapon2 = new LaserBulletWeapon(game, owner, 30, SmallRedBullet);
    this.weapon3 = new LaserBulletWeapon(game, owner, 30, SmallRedBullet);
    this.bulletsGroup = this.game.add.group()

    this.key_fire_1 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.key_fire_2 = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
  }

  update() {
    if (this.key_fire_1.isDown || this.key_fire_2.isDown) {
      const x1 = this.owner.body.x + 
        (Math.cos(this.owner.rotation + BULLET_ANGLE) * BULLET_DISTANCE);
      const y1 = this.owner.body.y +
        (Math.sin(this.owner.rotation + BULLET_ANGLE) * BULLET_DISTANCE);
      const x3 = this.owner.body.x +
        (Math.cos(this.owner.rotation - BULLET_ANGLE) * BULLET_DISTANCE);
      const y3 = this.owner.body.y +
        (Math.sin(this.owner.rotation - BULLET_ANGLE) * BULLET_DISTANCE);

      this.weapon1.fire(null, x1, y1);
      this.weapon2.fire();
      this.weapon3.fire(null, x3, y3);
    }

    // @TODO: Need to make this more performant.
    for (let bulletsGroup of [this.weapon1.bullets,
                              this.weapon2.bullets,
                              this.weapon3.bullets]) {
      this.game.physics.arcade.overlap(this.game.enemiesGroup,
                                       bulletsGroup,
                                       this.collisionHandler,
                                       null,
                                       { game: this.game, owner: this.owner, weapon: this.weapon });
      }
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
