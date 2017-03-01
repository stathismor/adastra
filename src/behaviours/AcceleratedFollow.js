import Phaser from 'phaser';

import Follow from './Follow';

export default class extends Follow {

  constructor(game, owner, target) {
    super(game, owner, target);
  }

  update() {
    super.update();
    this.game.physics.arcade.accelerateToObject(this.owner,
                                                this.target,
                                                this.owner.movement.acceleration,
                                                this.owner.movement.maxVelocity,
                                                this.owner.movement.maxVelocity);
  }
}
