import Entity from '../Entity';
import Powerup from './Powerup';
import Marker from '../../behaviours/Marker';

export default class extends Powerup {

  apply() {
    this.target.movement.acceleration += 200;
    this.target.movement.maxVelocity += 200;
    this.kill();
  }
}
