import Ship from '../Ship';
import Marker from '../../behaviours/Marker';
import Respawn from '../../behaviours/Respawn';

export default class extends Ship {

  constructor(game, x, y, target, texture) {
    super(game, x, y, texture);

    this.events.onKilled.add(() => {
      const explosion = this.game.explosionsGroup.getFirstExists(false);
      explosion.reset(this.x, this.y);
      explosion.play('explode', 30, false, true);
    });

    this.addBehaviour(new Marker(this.game, this, target));
    this.addBehaviour(new Respawn(this.game, this, target));
  }
}
