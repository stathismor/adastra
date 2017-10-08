import Phaser from 'phaser';

import SpeedPowerup from '../../sprites/powerup/SpeedPowerup';
import Behaviour from '../Behaviour';


export default class extends Behaviour {

  constructor(game, owner, target) {
    super(game, owner);
    this.owner.events.onKilled.add(() => {
      const powerup = new SpeedPowerup(game, owner, target, 'powerup');
      game.powerupsGroup.add(powerup);
    });
  }
}
