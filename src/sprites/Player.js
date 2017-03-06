import Ship from './Ship';
import PlayerFire from '../behaviours/PlayerFire';
import Emitter from '../behaviours/Emitter';

export default class extends Ship {

  constructor(game, x, y) {
    super(game, x, y, 'ship');

    this.addBehaviour(new PlayerFire(game, this));
    this.addBehaviour(new Emitter(game, this));
  }
}

