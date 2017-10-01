import Phaser from 'phaser';

import Powerup from '../../sprites/Powerup';
import Behaviour from '../Behaviour';


export default class extends Behaviour {

  constructor(game, owner, target) {
    super(game, owner);
    this.owner.events.onKilled.add(() => {
      const powerup = new Powerup(game, owner, target, 'powerup')
      game.powerupsGroup.add(powerup);
    });
  }
}
