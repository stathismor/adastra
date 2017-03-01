import Phaser from 'phaser';

import { getRandomPoint } from '../utils';

import Behaviour from './Behaviour';
import BulletWeapon from '../weapons/BulletWeapon';

const ENEMY_SPAWN_MIN_DISTANCE = 300;
const ENEMY_SPAWN_MAX_DISTANCE = 500;
const RAY_DISTANCE = 600;

export default class extends Behaviour {
  constructor(game, owner, target) {
    super(game, owner);
    this.target = target;
    this.weapon = new BulletWeapon(game, owner, 'red_bullet',
      { fireRate: 1000,
        bulletSpeed: 300,
      }).getWeapon();
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

  collisionHandler(enemy, bullet) {
    bullet.kill();
    // Respawn on a random position
    const e = enemy;
    const randomPoint = getRandomPoint(this.game, this.owner.x, this.owner.y,
                                       ENEMY_SPAWN_MIN_DISTANCE, ENEMY_SPAWN_MAX_DISTANCE);
    e.x = randomPoint.x;
    e.y = randomPoint.y;
  }
}
