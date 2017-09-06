import Phaser from 'phaser';

export default class LaserBulletWeapon extends Phaser.Weapon {
  constructor(game, owner, quantity, bulletClass, properties = null) {
    super(game, owner);
    this.outOfBoundsKill = false;
    this.checkWorldBounds = false;
    this.bulletSpeed = 1000;
    this.fireRate = 200;
    this.trackSprite(owner, 14, 0);
    this.fireAngle = owner.angle;
    this.trackRotation = true;
    this.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    this.bulletLifespan = 3000;  // in msecs
    this.trackOffset.x = owner.width * 0.6;
    
    this._bulletClass = bulletClass; // @HACK

    this.createBullets(quantity, bulletClass.TEXTURE);

    if (properties) {
      Object.assign(this, properties);
    }
  }
}