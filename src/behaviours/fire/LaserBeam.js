import Phaser from 'phaser';

import FireBehaviour from './FireBehaviour';
import LaserBeamBullet from '../../weapons/LaserBeamBullet';

const BULLET_ANGLE = 0.33;
const BULLET_DISTANCE = 100;

export default class extends FireBehaviour {
  constructor(game, owner) {
    super(game, owner);

    this.beam = new LaserBeamBullet(game);
    owner.addChild(this.beam);

    this.key_fire_1.onDown.add(this.revive_beam, this);
    this.key_fire_2.onDown.add(this.revive_beam, this);
    this.key_fire_1.onUp.add(this.kill_beam, this);
    this.key_fire_2.onUp.add(this.kill_beam, this);
  }

  revive_beam() {
    this.beam.revive();
  }

  kill_beam() {
    this.beam.kill()
  }

  destroy() {
    this.kill_beam();
    this.key_fire_1.onDown.remove(this.revive_beam, this);
    this.key_fire_2.onDown.remove(this.revive_beam, this);
    this.key_fire_1.onUp.remove(this.kill_beam, this);
    this.key_fire_2.onUp.remove(this.kill_beam, this);
  }

  update() {
    if (this.beam.alive) {
      this.game.enemiesGroup.forEachAlive(this.processGroup, this);
    }
  }

  processGroup(group) {
    group.forEachAlive(this.processEnemy, this);
  }

  processEnemy(enemy) {
    if (enemy.inCamera) {
      const ray = new Phaser.Line().fromAngle(this.owner.x, this.owner.y, this.owner.rotation, 2000);
      const rec = enemy.getBounds();
      rec.x += this.game.camera.x;
      rec.y += this.game.camera.y;
      if (Phaser.Line.intersectsRectangle(ray, rec)) {
        this.damageEnemy(this.owner, enemy, this.beam.damage);
      }
    }
  }
}
