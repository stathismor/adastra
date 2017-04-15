import Enemy from './Enemy';
import LinearFollow from '../../behaviours/LinearFollow';
import EnemyFire from '../../behaviours/EnemyFire';

export default class extends Enemy {

  constructor(game, x, y, target) {
    super(game, x, y, target, 'enemy1');

    this.movement.maxVelocity = 450;
    this.movement.rotationSpeed = 1; // degrees/second
    this.movement.acceleration = 300;

    this.health = 60;
    this.maxHealth = 60;

    this.points = 20;

    this.addBehaviour(new LinearFollow(this.game, this, target));
    this.addBehaviour(new EnemyFire(this.game, this, target));
  }
}
