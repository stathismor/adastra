import Entity from './Entity';
import ThreeWay from '../behaviours/fire/ThreeWay';

export default class extends Entity {

  constructor(game, owner, x, y) {
    super(game, x, y, 'powerup');
    game.physics.enable(this);
    this.anchor.setTo(0.5);

    this.fireBehaviour = new ThreeWay(game, owner);
  }

  getBehaviour() {
    return this.fireBehaviour;
  }
}
