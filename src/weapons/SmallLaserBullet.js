import Phaser from 'phaser';

export default class extends Phaser.Bullet {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    // this.data = { ...this.data, blah: 1 };
    const customData = {
      damage: 15,
    };
    this.data = Object.assign({}, this.data, customData);
  }
}
