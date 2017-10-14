import Entity from '../Entity';
import Powerup from './Powerup';
import Marker from '../../behaviours/Marker';

export default class extends Powerup {

  constructor(game) {
    super(game, 'speed_powerup');
  }

  spawn(owner, target) {
    super.spawn(owner, target);
    this.addBehaviour(new Marker(this.game, this, target, 'blue_marker'));
  }

  apply() {
    this.target.movement.acceleration += 200;
    this.target.movement.maxVelocity += 200;
    this.kill();
  }
}
