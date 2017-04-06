import Ship from './Ship';
import Emitter from '../behaviours/Emitter';
import DamageEmitter from '../behaviours/DamageEmitter';

export default class extends Ship {

  constructor(game, x, y) {
    super(game, x, y, 'ship');

    this.health = 100;
    this.maxHealth = 100;

    this.addBehaviour(new Emitter(game, this));
    this.addBehaviour(new DamageEmitter(game, this));
  }
}
