import Phaser from 'phaser';

import FireBehaviour from './FireBehaviour';
import LaserBeamBullet from '../../weapons/LaserBeamBullet';

const BULLET_ANGLE = 0.33;
const BULLET_DISTANCE = 100;
const SMOKE_LIFETIME = 700; // milliseconds

export default class extends FireBehaviour {
  constructor(game, owner) {
    super(game, owner);

    this.beam = new LaserBeamBullet(game);
    owner.addChild(this.beam);

    this.key_fire_1.onDown.add(this.revive_beam, this);
    this.key_fire_2.onDown.add(this.revive_beam, this);
    this.key_fire_1.onUp.add(this.kill_beam, this);
    this.key_fire_2.onUp.add(this.kill_beam, this);

    this.damageEmitter = game.add.emitter(0, 0, 8);
    this.damageEmitter.gravity = 0;
    this.damageEmitter.makeParticles('damage', [1, 2]);

    this.intersects = false;
    this.beamWidth = this.beam.width;
    this.cropRect = new Phaser.Rectangle(0, 0, this.beamWidth, this.beam.height);
    this.beam.crop(this.cropRect);
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
    this.intersects = false;

    if (this.beam.alive) {
      this.game.enemiesGroup.forEachAlive(this.processGroup, this);
    }

    if (this.intersects) {
      if (!this.damageEmitter.on) {
        this.damageEmitter.start(false, SMOKE_LIFETIME, 90);
      }
    } else {
      this.cropRect.width = this.beamWidth;
      this.damageEmitter.on = false;
    }

    this.beam.updateCrop();
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
      const result = new Phaser.Point();
      if (Phaser.Line.intersectionWithRectangle(ray, rec, result)) {
        this.intersects = true;
        this.damageEmitter.x = result.x;
        this.damageEmitter.y = result.y;
        const distance = this.game.math.distance(this.beam.world.x, this.beam.world.y, result.x, result.y);
        this.cropRect.width = distance;
        this.damageEnemy(this.owner, enemy, this.beam.damage);
      }
    }
  }
}
