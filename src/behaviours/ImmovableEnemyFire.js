import Behaviour from './Behaviour';
import WeaponDamage from './WeaponDamage';
import LaserBulletWeapon from '../weapons/LaserBulletWeapon';
import BigLaserBullet from '../weapons/BigLaserBullet';

export default class extends Behaviour {
  constructor(game, owner, target, weaponProps) {
    super(game, owner);
    this.target = target;
    this.weapon = new LaserBulletWeapon(game,
                                        owner,
                                        'red_bullet_big',
                                        BigLaserBullet,
                                        weaponProps).getWeapon();
    // @TODO: Not sure this is the right place for it
    owner.addBehaviour(new WeaponDamage(this.game, owner, target, this.weapon));
  }

  update() {
    this.weapon.fire(null, this.target.x, this.target.y);
  }
}
