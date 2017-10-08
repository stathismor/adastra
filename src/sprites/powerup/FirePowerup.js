import Entity from './../Entity';
import ThreeWay from '../../behaviours/fire/ThreeWay';
import Powerup from './Powerup';

export default class extends Powerup {

  constructor(game, owner, target, texture) {
    super(game, owner, target, texture);
    this.fireBehaviour = new ThreeWay(game, target);
  }

  apply() {
    this.target.changeWeapon(this.fireBehaviour);
    this.kill();
  }
}
