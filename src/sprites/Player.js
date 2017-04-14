import Ship from './Ship';
import Emitter from '../behaviours/Emitter';
import DamageEmitter from '../behaviours/DamageEmitter';

export default class extends Ship {

  constructor(game, x, y) {
    super(game, x, y, 'ship');

    this.health = 100;
    this.maxHealth = 100;

    this.events.onKilled.add(() => {
      // This is needed otherwise background can be rendered out of place
      // http://www.html5gamedevs.com/topic/3359-camera-not-positioned-correctly-after-changing-start-away-from-scrolling/
      this.game.world.setBounds(0, 0, this.game.width, this.game.height);
      this.game.state.start('Menu');
    });

    this.addBehaviour(new Emitter(game, this));
    this.addBehaviour(new DamageEmitter(game, this));
  }
}
