import Ship from './Ship';
import AcceleratedFollow from '../behaviours/AcceleratedFollow';
import EnemyFire from '../behaviours/EnemyFire';

export default class extends Ship {

  constructor(game, x, y, asset, target) {
    super(game, x, y, asset);

    this.movement.maxVelocity = 200;
    this.movement.rotationSpeed = 2; // degrees/second
    this.movement.acceleration = 200,

    this.addBehaviour(new AcceleratedFollow(this.game, this, target));
    this.addBehaviour(new EnemyFire(this.game, this, target));
  }
}
