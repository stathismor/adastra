import Phaser from 'phaser';

import Powerup from '../sprites/Powerup';
import Behaviour from './Behaviour';


export default class extends Behaviour {

  constructor(game, owner, target) {
    super(game, owner);
    this.owner.events.onKilled.add(() => {
      const powerup = new Powerup(game, target, owner.x, owner.y, 'powerup')
      // powerup.anchor.setTo(0.5);
      // game.physics.enable(powerup);
      game.powerupsGroup.add(powerup);
    });
  }
}
