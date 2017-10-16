import Enemy from './Enemy';
import AcceleratedFollow from '../../behaviours/AcceleratedFollow';
import MovableEnemyFire from '../../behaviours/MovableEnemyFire';

export default class extends Enemy {

  constructor(game, x, y, target) {
    super(game, x, y, target, 'enemy1');

    this.movement.maxVelocity = 200;
    this.movement.rotationSpeed = 2; // degrees/second
    this.movement.acceleration = 200;

    this.health = 40;
    this.maxHealth = 40;

    this.points = 20;

    this.addBehaviour(new AcceleratedFollow(this.game, this, target));
    // this.addBehaviour(new MovableEnemyFire(this.game, this, target,
    //   {
    //     fireRate: 800,
    //     bulletSpeed: 300,
    //   }));
  }
}
