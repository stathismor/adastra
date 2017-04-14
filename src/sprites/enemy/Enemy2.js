import Enemy from './Enemy';
import AcceleratedFollow from '../../behaviours/AcceleratedFollow';
import EnemyFire from '../../behaviours/EnemyFire';

export default class extends Enemy {

  constructor(game, x, y, target) {
    super(game, x, y, target, 'enemy2');

    this.movement.maxVelocity = 200;
    this.movement.rotationSpeed = 2; // degrees/second
    this.movement.acceleration = 200;

    this.health = 40;
    this.maxHealth = 40;

    this.addBehaviour(new AcceleratedFollow(this.game, this, target));
    this.addBehaviour(new EnemyFire(this.game, this, target));
  }
}
