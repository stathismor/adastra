import Entity from './../Entity';
import LaserBeam from '../../behaviours/fire/LaserBeam';
import Powerup from './Powerup';
import Marker from '../../behaviours/Marker';

export default class extends Powerup {

  constructor(game) {
    super(game, 'beam_powerup');
  }

  spawn(owner, target) {
    super.spawn(owner, target);
    this.addBehaviour(new Marker(this.game, this, target, 'marker'));
  }

  apply() {
    this.fireBehaviour = new LaserBeam(this.game, this.target);
    this.target.changeWeapon(this.fireBehaviour);
    this.kill();
  }
}
