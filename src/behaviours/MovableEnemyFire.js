import Phaser from 'phaser';

import Behaviour from './Behaviour';
import WeaponDamage from './WeaponDamage';
import LaserBulletWeapon from '../weapons/LaserBulletWeapon';
import SmallRedBullet from '../weapons/SmallRedBullet';

const RAY_DISTANCE = 600;

export default class extends Behaviour {
  constructor(game, owner, target, properties) {
    super(game, owner);
    this.target = target;
    this.weapon = new LaserBulletWeapon(game, owner, 30, SmallRedBullet, properties);
    owner.addBehaviour(new WeaponDamage(this.game, owner, target, this.weapon));
  }

  update() {
    const targetX = this.owner.x + (Math.cos(this.owner.rotation) * RAY_DISTANCE);
    const targetY = this.owner.y + (Math.sin(this.owner.rotation) * RAY_DISTANCE);
    const ray = new Phaser.Line(this.owner.x,
                                this.owner.y,
                                targetX,
                                targetY);
    const lines = [
      new Phaser.Line(this.target.x, this.target.y, this.target.x + this.target.width,
                      this.target.y),
      new Phaser.Line(this.target.x, this.target.y, this.target.x,
                      this.target.y + this.target.height),
      new Phaser.Line(this.target.x + this.target.width, this.target.y,
        this.target.x + this.target.width, this.target.y + this.target.height),
      new Phaser.Line(this.target.x, this.target.y + this.target.height,
        this.target.x + this.target.width, this.target.y + this.target.height),
    ];

    let intersects = false;
    for (let i = 0; i < lines.length; i += 1) {
      if (Phaser.Line.intersects(ray, lines[i])) {
        intersects = true;
        break;
      }
    }

    if (intersects) {
      this.weapon.fire();
    }
  }
}
