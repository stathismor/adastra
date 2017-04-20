import Enemy from './Enemy';
import ImmovableEnemyFire from '../../behaviours/ImmovableEnemyFire';

export default class extends Enemy {

  constructor(game, x, y, target) {
    super(game, x, y, target, 'enemy_mothership');

    this.body.immovable = false;

    this.health = 100;
    this.maxHealth = 100;

    this.points = 20;

    this.addBehaviour(new ImmovableEnemyFire(this.game, this, target,
      {
        fireRate: 600,
        bulletSpeed: 200,
      }));
  }
}
