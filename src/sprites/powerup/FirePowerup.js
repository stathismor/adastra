import Entity from './../Entity';
import ThreeWay from '../../behaviours/fire/ThreeWay';
import Powerup from './Powerup';
import Marker from '../../behaviours/Marker';

export default class extends Powerup {

  constructor(game) {
    super(game, 'fire_powerup');
  }

  spawn(owner, target) {
    super.spawn(owner, target);
    this.addBehaviour(new Marker(this.game, this, target, 'yellow_marker'));
  }

  apply() {
    this.fireBehaviour = new ThreeWay(this.game, this.target);
    this.target.changeWeapon(this.fireBehaviour);
    this.kill();
  }
}
