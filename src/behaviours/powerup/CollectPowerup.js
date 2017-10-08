import Phaser from 'phaser';

import Behaviour from '../Behaviour';
import FireBehaviour from '../fire/FireBehaviour';
import RegenerateHealth from '../RegenerateHealth';


export default class extends Behaviour {
  update() {
    const test = this.game.physics.arcade.overlap(this.owner,
                                     this.game.powerupsGroup.children,
                                     this.collisionHandler,
                                     null,
                                     { game: this.game, owner: this.owner, weapon: this.weapon });
  }

  collisionHandler(target, powerup) {
    powerup.apply();
  }
}
