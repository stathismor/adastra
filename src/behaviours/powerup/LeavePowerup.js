import Phaser from 'phaser';

import SpeedPowerup from '../../sprites/powerup/SpeedPowerup';
import Behaviour from '../Behaviour';


export default class extends Behaviour {

  constructor(game, owner, target) {
    super(game, owner);
    this.owner.events.onKilled.add(() => {
      if (Phaser.Utils.chanceRoll(40)) {
        const powerup = game.powerupsGroup.getFirstDead();
        if (powerup) {
            powerup.spawn(owner, target);
            // @TODO: Find a more efficient random way
            this.game.powerupsGroup.shuffle();
        }
      }
    });
  }
}
