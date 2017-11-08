import Phaser from 'phaser';

import FireBehaviour from './FireBehaviour';
import LaserBulletWeapon from '../../weapons/LaserBulletWeapon';
import MissileBullet from '../../weapons/MissileBullet';
import LinearFollow from '../LinearFollow';

const LIFESPAN = 3000;
const FIRE_RATE = 800;

export default class extends FireBehaviour {
  constructor(game, owner) {
    super(game, owner);
    this.pressed = this.game.time.now;
  }

  update() {
    if (this.key_fire_2.isDown) {
      const now = this.game.time.now;
      if (now - this.pressed > FIRE_RATE) {
        // @TODO This includes children of enemies (powerups)?
        const target = this.game.enemiesGroup.children[0].getClosestTo(this.owner);
        if (target) {
          const missile = game.missilesGroup.getFirstDead();
          missile.x = this.owner.x;
          missile.y = this.owner.y;
          missile.rotation = this.game.physics.arcade.angleBetween(this.owner, target);
          missile.addBehaviour(new LinearFollow(this.game, missile, target));
          missile.revive();
        }
        this.pressed = now;
      }
    }

    this.game.physics.arcade.overlap(
        this.game.missilesGroup,
        this.game.enemiesGroup.children,
        this.collisionHandler,
        null,
        { owner: this.owner, damageEnemy: this.damageEnemy })
  }

  collisionHandler(missile, enemy) {
    // TODO: Can I avoid even doing the check when off camera?
    if (enemy.inCamera && missile.inCamera) {
      missile.kill();

      this.damageEnemy(this.owner, enemy, missile.damage);
    }
  }

  damageEnemy(owner, enemy, damage) {
    console.log('DAMAGE', owner, enemy, damage)
    const e = enemy;
    e.damage(damage);

    if (!e.alive) {
      this.owner.points += e.points;
    }
  }
}
