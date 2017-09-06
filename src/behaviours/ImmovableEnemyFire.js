import Behaviour from './Behaviour';
import WeaponDamage from './WeaponDamage';
import LaserBulletWeapon from '../weapons/LaserBulletWeapon';
import BigRedBullet from '../weapons/BigRedBullet';

export default class extends Behaviour {
  constructor(game, owner, target, properties) {
    super(game, owner);
    this.target = target;
    this.weapon = new LaserBulletWeapon(game, owner, 25, BigRedBullet, properties);
    owner.addBehaviour(new WeaponDamage(this.game, owner, target, this.weapon));
  }

  update() {
    this.weapon.fire(null, this.target.x, this.target.y);
  }
}
