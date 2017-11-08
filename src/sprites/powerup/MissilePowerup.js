import Entity from './../Entity';
import Missile from '../../behaviours/fire/Missile';
import Powerup from './Powerup';
import Marker from '../../behaviours/Marker';

export default class extends Powerup {

  constructor(game) {
    super(game, 'missile_powerup');
  }

  spawn(owner, target) {
    super.spawn(owner, target);
    this.addBehaviour(new Marker(this.game, this, target, 'marker'));
  }

  apply() {
    this.fireBehaviour = new Missile(this.game, this.target);
    this.target.changeWeapon(this.fireBehaviour);
    this.kill();
  }
}
