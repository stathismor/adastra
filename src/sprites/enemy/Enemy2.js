import Enemy from './Enemy';
import LinearFollow from '../../behaviours/LinearFollow';
import MovableEnemyFire from '../../behaviours/MovableEnemyFire';

export default class extends Enemy {

  constructor(game, x, y, target) {
    super(game, x, y, target, 'enemy2');

    this.movement.maxVelocity = 450;
    this.movement.rotationSpeed = 2; // degrees/second
    this.movement.acceleration = 300;

    this.health = 60;
    this.maxHealth = 60;

    this.points = 10;

    this.addBehaviour(new LinearFollow(this.game, this, target));
    this.addBehaviour(new MovableEnemyFire(this.game, this, target,
      {
        fireRate: 1000,
        bulletSpeed: 500,
      }));
  }
}
