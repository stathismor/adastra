import Ship from './Ship';
import PlayerFire from '../behaviours/PlayerFire';
import Emitter from '../behaviours/Emitter';

export default class extends Ship {

  constructor(game, x, y) {
    super(game, x, y, 'ship');

    this.health = 100;
    this.maxHealth = 100;

    this.addBehaviour(new PlayerFire(game, this));
    this.addBehaviour(new Emitter(game, this));
  }
}

