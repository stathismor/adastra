import Phaser from 'phaser';

import Entity from '../sprites/Entity';

const DURATION = 90; // msecs
const BLINK_ALPHA = 0.7;

export default class extends Entity {
  constructor(game) {
    super(game, 0, 0, 'beam');
    this.anchor.set(-0.015, 0.5);
    this.damage = 3;
    game.physics.enable(this);

    game.add.tween(this).to({ alpha: BLINK_ALPHA},
                  DURATION,
                  null,
                  true,
                  0,
                  -1,
                  true);

    this.kill();
  }
}
