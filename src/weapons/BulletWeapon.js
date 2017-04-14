import Phaser from 'phaser';

export default class {
  constructor(game, owner, texture, properties = null) {
    this.weapon = game.add.weapon(30, texture);
    this.weapon.outOfBoundsKill = false;
    this.weapon.checkWorldBounds = false;
    this.weapon.bulletSpeed = 1000;
    this.weapon.fireRate = 200;
    this.weapon.trackSprite(owner, 14, 0);
    this.weapon.fireAngle = owner.angle;
    this.weapon.trackRotation = true;
    this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    this.weapon.bulletLifespan = 3000;  // in msecs
    this.weapon.trackOffset.x = owner.width * 0.6;

    // Custom properties
    this.weapon.damage = 20;

    if (properties) {
      this.weapon = Object.assign(this.weapon, properties);
    }
  }

  getWeapon() {
    return this.weapon;
  }
}
