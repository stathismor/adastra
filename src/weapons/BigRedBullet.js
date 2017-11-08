import Phaser from 'phaser';

export default class extends Phaser.Bullet {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    const customData = {
      damage: 30,
    };
    this.data = Object.assign({}, this.data, customData);
  }

  static get TEXTURE() {
    return 'red_bullet_big';
  }
}
