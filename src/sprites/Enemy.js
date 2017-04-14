import Ship from './Ship';
import AcceleratedFollow from '../behaviours/AcceleratedFollow';
import EnemyFire from '../behaviours/EnemyFire';
import Marker from '../behaviours/Marker';

export default class extends Ship {

  constructor(game, x, y, target) {
    super(game, x, y, 'baddie');

    this.movement.maxVelocity = 200;
    this.movement.rotationSpeed = 2; // degrees/second
    this.movement.acceleration = 200;

    this.health = 40;
    this.maxHealth = 40;

    this.events.onKilled.add(() => {
      const explosion = this.game.explosionsGroup.getFirstExists(false);
      explosion.reset(this.x, this.y);
      explosion.play('explode', 30, false, true);
    });

    this.addBehaviour(new AcceleratedFollow(this.game, this, target));
    this.addBehaviour(new EnemyFire(this.game, this, target));
    this.addBehaviour(new Marker(this.game, this, target));
  }
}
