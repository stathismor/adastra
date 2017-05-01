import Ship from './Ship';
import DamageEmitter from '../behaviours/DamageEmitter';
import EnemyDamage from '../behaviours/EnemyDamage';
import RegenerateHealth from '../behaviours/RegenerateHealth';

export default class extends Ship {

  constructor(game, x, y) {
    super(game, x, y, 'ship');

    // Set a 32x32 hitbox
    this.body.setSize(32, 32, 16, 16);

    this.health = 200;
    this.maxHealth = 200;

    this.points = 0;

    this.events.onKilled.add(() => {
      // This is needed otherwise background can be rendered out of place
      // http://www.html5gamedevs.com/topic/3359-camera-not-positioned-correctly-after-changing-start-away-from-scrolling/
      this.game.world.setBounds(0, 0, this.game.width, this.game.height);
      this.game.state.start('Menu');
    });

    this.addBehaviour(new RegenerateHealth(game, this));
    this.addBehaviour(new DamageEmitter(game, this));
    this.addBehaviour(new EnemyDamage(game, this));
  }
}
